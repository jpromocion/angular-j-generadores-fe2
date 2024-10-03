import { Component, OnInit, inject} from '@angular/core';
import {NgFor,NgIf} from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ExcelService } from '../excel.service';
import { NumberService } from '../number.service';

@Component({
  selector: 'app-genera-numeros',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTooltipModule, MatCardModule, MatIconModule,
    MatListModule, MatCheckboxModule],
  templateUrl: './genera-numeros.component.html',
  styleUrl: './genera-numeros.component.scss'
})
export class GeneraNumerosComponent implements OnInit {
  //filtro general
  numGenerar: number = 1;

  //aleatorio
  aleatorioMinimo: number = 0;
  aleatorioMaximo: number = 100;
  aleatorioDecimales: boolean = false;
  aleatorioRepetidos: boolean = true;
  aleatorioGenerado: string[] = [];

  //moneda
  monedaCara: string = 'O';
  monedaCruz: string = 'X';
  monedaGenerado: string[] = [];

  //dado
  dadoGenerado: string[] = [];


  //inyeccion de dependencia para utilizar el servicio de clipboard
  private clipboard: Clipboard = inject(Clipboard);

  //inyeccion de dependencia para utilizar el servicio de generacion de numeros
  private numberService: NumberService = inject(NumberService);

  //inyeccion del servicio para generar excel
  private excelService: ExcelService = inject(ExcelService);

  //mensajes notificaciones
  private _snackBar = inject(MatSnackBar);


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


  /**
   * Invocamos la operacion del servicio para obtener una lista de cod promocionales
   */
  getAleatorios(resultados: number, minimo: number, maximo: number, decimales: String, repetidos: String): void {
    this.numberService.getRandom(resultados, minimo, maximo, decimales, repetidos)
    .subscribe(cadena => {
      this.aleatorioGenerado = cadena;
      if (this.aleatorioGenerado && this.aleatorioGenerado.length > 0){
        this.openSnackBar('Num. aleatorios generados', 'GenerarNumAleatorios');
      }
    });
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGenerarAleatorios(): void {
    this.aleatorioGenerado = [];
    this.getAleatorios(this.numGenerar, this.aleatorioMinimo, this.aleatorioMaximo, this.aleatorioDecimales ? "y" : "n", this.aleatorioRepetidos ? "y" : "n");

  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarAleatorios(): void {
    this.aleatorioGenerado = [];
    this.openSnackBar('Números aleatorios limpiados', 'LimpiarNumAleatorios');
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonAleatorios(): void {
    const formatted = this.aleatorioGenerado.map(dato => ({ Numero: dato }));
    this.excelService.exportAsExcelFile(formatted, 'Lista_NumAleatorios');
    this.openSnackBar('Excel generado','ExcelNumAleatorios');
  }


  /**
   * Invocamos la operacion del servicio para obtener una lista de cod promocionales
   */
  getMoneda(resultados: number, simboloCara: String = '', simboloCruz: String = ''): void {
    this.numberService.getCoin(resultados, simboloCara, simboloCruz)
    .subscribe(cadena => {
      this.monedaGenerado = cadena;
      if (this.monedaGenerado && this.monedaGenerado.length > 0){
        this.openSnackBar('Lanzamientos moneda generados', 'GenerarLanzaMoneda');
      }
    });
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGenerarMoneda(): void {
    this.monedaGenerado = [];
    this.getMoneda(this.numGenerar, this.monedaCara, this.monedaCruz);
    //fijamos el focus en un elmento cercano para que no se vaya hasta arriba de la paginba
    document.getElementById('monedaCara')?.focus();
  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarMoneda(): void {
    this.monedaGenerado = [];
    this.openSnackBar('Lanzamientos moneda limpiados', 'LimpiarLanzaMoneda');
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonMoneda(): void {
    const formatted = this.monedaGenerado.map(dato => ({ CaraCruz: dato }));
    this.excelService.exportAsExcelFile(formatted, 'Lista_LanzaMoneda');
    this.openSnackBar('Excel generado','ExcelLanzaMoneda');
  }



  /**
   * Invocamos la operacion del servicio para obtener una lista de cod promocionales
   */
  getDado(resultados: number): void {
    this.numberService.getDice(resultados)
    .subscribe(cadena => {
      this.dadoGenerado = cadena;
      if (this.dadoGenerado && this.dadoGenerado.length > 0){
        this.openSnackBar('Lanzamientos Dado generados', 'GenerarLanzaDado');
      }
    });
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGenerarDado(): void {
    this.dadoGenerado = [];
    this.getDado(this.numGenerar);
    //fijamos el focus en un elmento cercano para que no se vaya hasta arriba de la paginba
    document.getElementById('btGenerarDado')?.focus();
  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarDado(): void {
    this.dadoGenerado = [];
    this.openSnackBar('Lanzamientos Dado limpiados', 'LimpiarLanzaDado');
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonDado(): void {
    const formatted = this.dadoGenerado.map(dato => ({ Dado: dato }));
    this.excelService.exportAsExcelFile(formatted, 'Lista_LanzaDado');
    this.openSnackBar('Excel generado','ExcelLanzaDado');
  }




}
