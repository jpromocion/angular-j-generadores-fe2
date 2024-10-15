import { Component, inject} from '@angular/core';
import {NgFor,NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CaseTransformerPipe } from '../shared/pipes/case-transformer.pipe';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { VehicleService } from '../core/services/vehicle.service';
import { ExcelService } from '../core/services/excel.service';


@Component({
  selector: 'app-genera-coches',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, MatButtonToggleModule,MatIconModule,MatButtonModule,MatTooltipModule, CaseTransformerPipe,
    MatFormFieldModule,MatInputModule,MatSelectModule,MatListModule,MatCardModule],
  templateUrl: './genera-coches.component.html',
  styleUrl: './genera-coches.component.scss'
})
export class GeneraCochesComponent {

  //filtros
  selectedTipoGenera: string = '';
  tiposGenera: Array<any> = [
    {valor: '', nombre: 'Seleccionar un tipo de generación.'},
    {valor: 't', nombre: 'Turismo'},
    {valor: 'c', nombre: 'Ciclomotor'},
    {valor: 'r', nombre: 'Remolque'},
    {valor: 'e', nombre: 'Especial'},
    {valor: 'u', nombre: 'Turístico'},
    {valor: 'h', nombre: 'Histórico'},
    {valor: 'tp', nombre: 'Temporal particular'},
    {valor: 'te', nombre: 'Temporal empresa'},
    {valor: 'd', nombre: 'Diplomática'},
    {valor: 'vin', nombre: 'Nº Bastidor'}
  ];
  numGenerar: number = 1;

  textoGenerado: string[] = [];

  bastidorValidar: string = '';
  bastidorValidarOk: string = '';

  //inyeccion de dependencia para utilizar el servicio de clipboard
  private clipboard: Clipboard = inject(Clipboard);

  //inyeccion de dependencia para utilizar el servicio de generacion de nifs
  private vehicleService: VehicleService = inject(VehicleService);

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
   * Invocamos la operacion del servicio para obtener una lista de caracteres aleatorios
   */
  getMatricula(resultados: number): void {
      this.vehicleService.getPlatenumber(resultados, this.selectedTipoGenera)
      .subscribe(cadena => {
        this.textoGenerado = cadena;
        if (this.textoGenerado && this.textoGenerado.length > 0){
          this.openSnackBar('Matrícula generada', 'GenerarMatricula');
        }
      });
  }

  /**
   * Invocamos la operacion del servicio para obtener una lista de caracteres aleatorios
   */
  getBastidor(resultados: number): void {
      this.vehicleService.getVin(resultados)
      .subscribe(cadena => {
        this.textoGenerado = cadena;
        if (this.textoGenerado && this.textoGenerado.length > 0){
          this.openSnackBar('Nº Bastidor generado', 'GenerarBastidor');
        }
      });
  }


  /**
  * Generamos un tipo matricula aleatorio
  */
  onClickBotonGenerarTexto(): void {
    if (this.selectedTipoGenera == '') {
      this.openSnackBar('Debe seleccionar un tipo de matrícula.','Cerrar');
    } else if (this.selectedTipoGenera != 'vin') {
      this.getMatricula(this.numGenerar);
    } else {
      this.getBastidor(this.numGenerar);
    }

  }

  /**
    * Limpiar el campo de cif generado
    */
  onClickLimpiarTexto(): void {
    this.textoGenerado = [];
    this.openSnackBar('Datos limpiados', 'LimpiarVehiculos');
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonTipos(): void {
    const formattedNies = this.textoGenerado.map(matricula => ({ Valor: matricula }));
    this.excelService.exportAsExcelFile(formattedNies, 'Lista_tipos');
    this.openSnackBar('Excel generado','ExcelVehiculos');
  }


  /**
    * Evento boton para validar un bastidor
    */
  onClickValidarBastidor(): void {
    this.vehicleService.validateVin(this.bastidorValidar)
    .subscribe(esOk => {
      this.bastidorValidarOk = esOk;
      if (this.bastidorValidarOk && this.bastidorValidarOk != ''){
        this.openSnackBar('Nº Bastidor validado', 'ValidarBastidor');
      }
    });
    //console.info('Bastidor validado: ' + this.bastidorValidarOk);
  }

}
