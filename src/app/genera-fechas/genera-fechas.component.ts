import { Component, inject, OnInit } from '@angular/core';
import {NgFor,NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CaseTransformerPipe } from '../shared/pipes/case-transformer.pipe';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {BaseGeneraComponent} from '../shared/components/base-genera/base-genera.component';
import { DateService } from '../core/services/date.service';

@Component({
  selector: 'app-genera-fechas',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, MatButtonToggleModule,MatIconModule,MatButtonModule,MatTooltipModule, CaseTransformerPipe,
    MatFormFieldModule,MatInputModule,MatSelectModule,MatListModule,MatCardModule,MatCheckboxModule],
  templateUrl: './genera-fechas.component.html',
  styleUrl: './genera-fechas.component.scss'
})
export class GeneraFechasComponent extends BaseGeneraComponent implements OnInit {

  //filtro tipos generales
  numGenerar: number = 1;
  selectedTipoGenera: string = '';
  tiposGenera: Array<any> = [
    {valor: '', nombre: 'Seleccionar un tipo de generación.'},
    {valor: 'fn', nombre: 'Fecha nacimiento'},
    {valor: 'ff', nombre: 'Fecha futura'},
  ];
  textoGenerado: string[] = [];



  //inyeccion de dependencia para utilizar el servicio de generacion de fechas
  private dateService: DateService = inject(DateService);

  constructor() {
    super();
  }

  override ngOnInit(): void {

  }




  /**
   * Invocamos la operacion del servicio para obtener una lista de fechas nacimiento
   */
  getFecNacimiento(resultados: number): void {
    this.dateService.getBirthDate(resultados)
    .subscribe(cadena => {
      this.textoGenerado = cadena;
      if (this.textoGenerado && this.textoGenerado.length > 0){
        this.openSnackBar('Fec. nacimiento generadas', 'GenerarFecNacimiento');
      }
    });
  }

  /**
   * Invocamos la operacion del servicio para obtener una lista de fechas futuras
   */
  getFutureDate(resultados: number): void {
    this.dateService.getFutureDate(resultados)
    .subscribe(cadena => {
      this.textoGenerado = cadena;
      if (this.textoGenerado && this.textoGenerado.length > 0){
        this.openSnackBar('Fec. futuras generadas', 'GenerarFecFutura');
      }
    });
  }


  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGenerarTipo(): void {
    this.textoGenerado = [];
    if (this.selectedTipoGenera == '') {
      this.openSnackBar('Debe seleccionar un tipo de generación.','Cerrar');
    } else if (this.selectedTipoGenera == 'fn') {
      this.getFecNacimiento(this.numGenerar);
    } else if (this.selectedTipoGenera == 'ff') {
      this.getFutureDate(this.numGenerar);
    }

  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarTipo(): void {
    this.textoGenerado = [];
    this.openSnackBar('Datos limpiados', 'LimpiarTipo');
  }


  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonTipos(): void {
    const formatted = this.textoGenerado.map(dato => ({ Valor: dato }));
    this.excelService.exportAsExcelFile(formatted, 'Lista_tipos');
    this.openSnackBar('Excel generado','ExcelTipos');
  }


}
