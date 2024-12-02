import { Component, inject } from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import { MessageService } from '../../../core/services/message.service';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import {TranslateService} from "@ngx-translate/core";
import { marker} from '@colsen1991/ngx-translate-extract-marker';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [NgFor, NgIf,MatButtonModule, TranslateModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {


  //inyeccion de dependencias: el servico de mensajes
  public messageService: MessageService = inject(MessageService);

  private _snackBar = inject(MatSnackBar);

  translate = inject(TranslateService);

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
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.generarcomunes.mensajes.limpiarmensajeserror.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.generarcomunes.mensajes.limpiarmensajeserror.titulo')));
  }

}
