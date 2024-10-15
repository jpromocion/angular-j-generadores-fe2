import { Component, inject } from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import { MessageService } from '../../../core/services/message.service';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [NgFor, NgIf,MatButtonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {


  //inyeccion de dependencias: el servico de mensajes
  public messageService: MessageService = inject(MessageService);

  private _snackBar = inject(MatSnackBar);

  constructor() {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit(): void {

  }

  limpiarMensajes(): void {
    this.messageService.clear();
    this.openSnackBar('Mensajes limpiados','');
  }

}
