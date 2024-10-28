/**
 * Componente base para que hereden todos los componbentes que generar datos
 * Contiene comun: los servicios de clipboard, excel y barra de notificaciones.
 * NOTA: No tiene parte visual, es solo para heredar funcionalidad en el Typescript de respaldo
 */
import { Component, inject, OnInit} from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { ExcelService } from '../../../core/services/excel.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-base-genera',
  standalone: true,
  imports: [],
  //templateUrl: './base-genera.component.html',
  //styleUrl: './base-genera.component.scss'
  template: ''
})
export class BaseGeneraComponent implements OnInit  {


    //inyeccion de dependencia para utilizar el servicio de clipboard
    clipboard: Clipboard = inject(Clipboard);

    //inyeccion del servicio para generar excel
    excelService: ExcelService = inject(ExcelService);

    //mensajes notificaciones
    _snackBar = inject(MatSnackBar);


  constructor() { }

  ngOnInit(): void {
  }


  /**
  * Mensaje de notificacion
  * @param message Mensaje
  * @param action
  */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }


  /**
   * Capturamos el seleccionar un item generado para copiarlo al portapapeles
   * @param dato
   */
  onSelectDato(dato: string | undefined): void {
    if (dato) {
      this.clipboard.copy(dato);
      this.openSnackBar('Dato copiado al portapapeles', 'CopiaPortapapeles');
    }
  }

}
