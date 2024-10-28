import { Component, inject, OnInit} from '@angular/core';
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
import { MiscService } from '../core/services/misc.service';

@Component({
  selector: 'app-genera-variados',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, MatButtonToggleModule,MatIconModule,MatButtonModule,MatTooltipModule, CaseTransformerPipe,
    MatFormFieldModule,MatInputModule,MatSelectModule,MatListModule,MatCardModule,MatCheckboxModule],
  templateUrl: './genera-variados.component.html',
  styleUrl: './genera-variados.component.scss'
})
export class GeneraVariadosComponent extends BaseGeneraComponent implements OnInit {
  //filtro general
  numGenerar: number = 1;

  //tipos generales
  selectedTipoGenera: string = '';
  tiposGenera: Array<any> = [
    {valor: '', nombre: 'Seleccionar un tipo de generación.'},
    {valor: 'em', nombre: 'Email'},
    {valor: 'ci', nombre: 'Ciudad'},
    {valor: 'cp', nombre: 'Cod. Postal'},
    {valor: 'im', nombre: 'IMEI'},
    {valor: 'ui', nombre: 'UUID'},
  ];
  textoGenerado: string[] = [];


  //password
  passLongitud: number = 21;
  passMayusMinus: boolean = true;
  passNumero: boolean = true;
  passEspecial: boolean = true;
  // passNumGenera: number = 1;
  passGenerado: string[] = [];

  //telefonos
  selectedTipoTelefono: string = '';
  tiposTelefono: Array<any> = [
    {valor: '', nombre: 'Seleccionar un tipo de teléfono.'},
    {valor: 'f', nombre: 'Fijo'},
    {valor: 'm', nombre: 'Móvil'}
  ];
  // tlfNumGenera: number = 1;
  tlfGenerado: string[] = [];

  //promocionales
  promoLongitud: number = 10;
  // promoNumGenera: number = 1;
  promoCharset: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  promoPatron: string = '';
  promoPrefijo: string = '';
  promoSufijo: string = '';
  promoGenerado: string[] = [];




  //inyeccion de dependencia para utilizar el servicio de generacion de miscelanea
  private miscService: MiscService = inject(MiscService);



  constructor() {
    super();
  }

  override ngOnInit(): void {

  }



  /**
   * Invocamos la operacion del servicio para obtener una lista de emails
   */
  getEmail(resultados: number): void {
    this.miscService.getEmail(resultados)
    .subscribe(cadena => {
      this.textoGenerado = cadena;
      if (this.textoGenerado && this.textoGenerado.length > 0){
        this.openSnackBar('Emails generados', 'GenerarEmail');
      }
    });
  }


  /**
   * Invocamos la operacion del servicio para obtener una lista de ciudades
   */
  getCiudad(resultados: number): void {
    this.miscService.getCity(resultados)
    .subscribe(cadena => {
      this.textoGenerado = cadena;
      if (this.textoGenerado && this.textoGenerado.length > 0){
        this.openSnackBar('Ciudades generadas', 'GenerarCiudad');
      }
    });
  }

  /**
   * Invocamos la operacion del servicio para obtener una lista de cod. postales
   */
  getCodPostal(resultados: number): void {
    this.miscService.getZipCode(resultados)
    .subscribe(cadena => {
      this.textoGenerado = cadena;
      if (this.textoGenerado && this.textoGenerado.length > 0){
        this.openSnackBar('Cod. postales generados', 'GenerarCP');
      }
    });
  }

  /**
   * Invocamos la operacion del servicio para obtener una lista de cod. postales
   */
  getImei(resultados: number): void {
    this.miscService.getImei(resultados)
    .subscribe(cadena => {
      this.textoGenerado = cadena;
      if (this.textoGenerado && this.textoGenerado.length > 0){
        this.openSnackBar('IMEIs generados', 'GenerarIMEI');
      }
    });
  }

  /**
   * Invocamos la operacion del servicio para obtener una lista de uuids
   */
  getUuid(resultados: number): void {
    this.miscService.getUuid(resultados)
    .subscribe(cadena => {
      this.textoGenerado = cadena;
      if (this.textoGenerado && this.textoGenerado.length > 0){
        this.openSnackBar('UUIDs generados', 'GenerarUUID');
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
    } else if (this.selectedTipoGenera == 'em') {
      this.getEmail(this.numGenerar);
    } else if (this.selectedTipoGenera == 'ci') {
      this.getCiudad(this.numGenerar);
    } else if (this.selectedTipoGenera == 'cp') {
      this.getCodPostal(this.numGenerar);
    } else if (this.selectedTipoGenera == 'im') {
      this.getImei(this.numGenerar);
    } else if (this.selectedTipoGenera == 'ui') {
      this.getUuid(this.numGenerar);
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



  /**
   * Invocamos la operacion del servicio para obtener una lista de passwords
   */
  getPassword(resultados: number, longitud: number, mayusminus: string, numeros: string, especial: string): void {
    this.miscService.getPassword(resultados, longitud, mayusminus, numeros, especial)
    .subscribe(cadena => {
      this.passGenerado = cadena;
      if (this.passGenerado && this.passGenerado.length > 0){
        this.openSnackBar('Passwords generados', 'GenerarPassword');
      }
    });
  }


  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGenerarPassword(): void {
    this.passGenerado = [];
    this.getPassword(this.numGenerar, this.passLongitud, this.passMayusMinus ? 'y' : 'n', this.passNumero ? 'y' : 'n', this.passEspecial ? 'y' : 'n');

  }


  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarPassword(): void {
    this.passGenerado = [];
    this.openSnackBar('Passwords limpiados', 'LimpiarPassword');
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonPassword(): void {
    const formatted = this.passGenerado.map(dato => ({ Password: dato }));
    this.excelService.exportAsExcelFile(formatted, 'Lista_passwords');
    this.openSnackBar('Excel generado','ExcelPasswords');
  }


  /**
   * Invocamos la operacion del servicio para obtener una lista de telefonos
   */
  getTelefono(resultados: number, tipo: string): void {
    this.miscService.getPhonenumber(resultados, tipo)
    .subscribe(cadena => {
      this.tlfGenerado = cadena;
      if (this.tlfGenerado && this.tlfGenerado.length > 0){
        this.openSnackBar('Teléfonos generados', 'GenerarTelefono');
      }
    });
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGenerarTelefono(): void {
    this.tlfGenerado = [];
    if (this.selectedTipoTelefono == '') {
      this.openSnackBar('Debe seleccionar un tipo de teléfono.','Cerrar');
    } else {
      this.getTelefono(this.numGenerar, this.selectedTipoTelefono);
    }

  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarTelefono(): void {
    this.tlfGenerado = [];
    this.openSnackBar('Telefonos limpiados', 'LimpiarTelefono');
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonTelefono(): void {
    const formatted = this.tlfGenerado.map(dato => ({ Telefono: dato }));
    this.excelService.exportAsExcelFile(formatted, 'Lista_Telefonos');
    this.openSnackBar('Excel generado','ExcelTelefono');
  }


  /**
   * Invocamos la operacion del servicio para obtener una lista de cod promocionales
   */
  getPromocionales(resultados: number, charset: string, length: number,
    pattern: string, prefix: string, suffix: string): void {
    this.miscService.getVoucher(resultados, charset, length, pattern, prefix, suffix)
    .subscribe(cadena => {
      this.promoGenerado = cadena;
      if (this.promoGenerado && this.promoGenerado.length > 0){
        this.openSnackBar('Cod. promocionales generados', 'GenerarCodPromocional');
      }
    });
  }


  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGenerarPromocionales(): void {
    this.promoGenerado = [];
    this.getPromocionales(this.numGenerar, this.promoCharset, this.promoLongitud, this.promoPatron, this.promoPrefijo, this.promoSufijo);

  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarPromocionales(): void {
    this.promoGenerado = [];
    this.openSnackBar('Cod. promocionales limpiados', 'LimpiarCodPromocional');
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonPromocionales(): void {
    const formatted = this.promoGenerado.map(dato => ({ Cod_Promocional: dato }));
    this.excelService.exportAsExcelFile(formatted, 'Lista_CodPromocionales');
    this.openSnackBar('Excel generado','ExcelCodPromocional');
  }



}
