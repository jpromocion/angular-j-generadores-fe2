import { Component, inject, OnInit, ElementRef, ViewChild} from '@angular/core';
import {NgIf} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {BaseGeneraComponent} from '../shared/components/base-genera/base-genera.component';
import { MiscService } from '../core/services/misc.service';
import { TranslateModule } from '@ngx-translate/core';
import { marker} from '@colsen1991/ngx-translate-extract-marker';

@Component({
  selector: 'app-genera-variados',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, NgIf, MatButtonToggleModule,MatIconModule,MatButtonModule,MatTooltipModule,
    MatFormFieldModule,MatInputModule,MatSelectModule,MatListModule,MatCardModule,MatCheckboxModule,
    MatAutocompleteModule,TranslateModule],
  templateUrl: './genera-variados.component.html',
  styleUrl: './genera-variados.component.scss'
})
export class GeneraVariadosComponent extends BaseGeneraComponent implements OnInit {
  //filtro general
  numGenerar: number = 1;

  //tipos generales
  //antigua valor para un combo normal y corriente asociando por ngModel el valor del seleccionado
  //selectedTipoGenera: string = '';
  //Cuando cambiamos a combo con autocompletado:
  // -selectedTipoGeneraIn: utilizamos esta forma de asociar un elemento donde en el html se le pone #selectedTipoGeneraIn y utilizar para filtrar
  // -selectedTipoGeneraFC: FormControl para asociar el valor seleccionado con este metodo (ngModel esta deprecated para el formControl). En este caso fija el objeto completo seleccionado
  // -tiposGeneraFiltrado: sera la lista donde se ira cargando las opciones de tiposGenera filtradas cuando se vaya rellenando algo
  @ViewChild('selectedTipoGeneraIn') selectedTipoGeneraIn: ElementRef<HTMLInputElement> = inject(ElementRef);
  selectedTipoGeneraFC = new FormControl('');
  tiposGenera: Array<any> = [
    //{valor: '', nombre: 'Seleccionar un tipo de generación.'},
  ];
  tiposGeneraFiltrado: Array<any> = [];
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
    //{valor: '', nombre: 'Seleccionar un tipo de teléfono.'},
    {valor: 'f', nombre: 'generadores.jpromocion.generarcomunes.lovs.tipostelefono.valorf'},
    {valor: 'm', nombre: 'generadores.jpromocion.generarcomunes.lovs.tipostelefono.valorm'}
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


  //referencias catastrales
  refCatasParamSelectedTipo: string = '';
  tiposRefCatastrales: Array<any> = [
    //{valor: '', nombre: 'Seleccionar un tipo.'},
    {valor: 'u', nombre: 'generadores.jpromocion.generarcomunes.lovs.tiporefcatastral.valoru'},
    {valor: 'r', nombre: 'generadores.jpromocion.generarcomunes.lovs.tiporefcatastral.valorr'}
  ];
  refCatasGeneradas: string[] = [];

  //validar ref catastral
  refCatasValidar: string = '';
  refCatasValidarOk: string = '';


  //CUPS
  cupsParamSelectedTipo: string = '';
  tiposCups: Array<any> = [
    //{valor: '', nombre: 'Seleccionar un tipo.'},
    {valor: 'e', nombre: 'generadores.jpromocion.generarcomunes.lovs.tipocups.valore'},
    {valor: 'g', nombre: 'generadores.jpromocion.generarcomunes.lovs.tipocups.valorg'}
  ];
  cupsGeneradas: string[] = [];

  //validar CUPS
  cupsValidar: string = '';
  cupsValidarOk: string = '';

  //validar LEI
  leiValidar: string = '';
  leiValidarOk: string = '';

  //validar ISIN
  isinValidar: string = '';
  isinValidarOk: string = '';

  //validar ISIN
  nssValidar: string = '';
  nssValidarOk: string = '';


  //inyeccion de dependencia para utilizar el servicio de generacion de miscelanea
  private miscService: MiscService = inject(MiscService);



  constructor() {
    super();
  }

  override ngOnInit(): void {
    this.tiposGenera = [
      {valor: 'em', nombre: this.translate.instant(marker('generadores.jpromocion.generarcomunes.lovs.tiposvariados.valorem'))},
      {valor: 'ci', nombre: this.translate.instant(marker('generadores.jpromocion.generarcomunes.lovs.tiposvariados.valorci'))},
      {valor: 'cp', nombre: this.translate.instant(marker('generadores.jpromocion.generarcomunes.lovs.tiposvariados.valorcp'))},
      {valor: 'im', nombre: this.translate.instant(marker('generadores.jpromocion.generarcomunes.lovs.tiposvariados.valorim'))},
      {valor: 'ui', nombre: this.translate.instant(marker('generadores.jpromocion.generarcomunes.lovs.tiposvariados.valorui'))},
      {valor: 'lei', nombre: this.translate.instant(marker('generadores.jpromocion.generarcomunes.lovs.tiposvariados.valorlei'))},
      {valor: 'isi', nombre: this.translate.instant(marker('generadores.jpromocion.generarcomunes.lovs.tiposvariados.valorisi'))},
      {valor: 'nss', nombre: this.translate.instant(marker('generadores.jpromocion.generarcomunes.lovs.tiposvariados.valornss'))}
    ];
  }



  /**
   * Invocamos la operacion del servicio para obtener una lista de emails
   */
  getEmail(resultados: number): void {
    this.miscService.getEmail(resultados)
    .subscribe(cadena => {
      this.textoGenerado = cadena;
      if (this.textoGenerado && this.textoGenerado.length > 0){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.generadoemail.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.generadoemail.titulo')));
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
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.generadociudad.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.generadociudad.titulo')));
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
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.generadocodpostal.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.generadocodpostal.titulo')));
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
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.generadoimei.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.generadoimei.titulo')));
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
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.generadouuid.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.generadouuid.titulo')));
      }
    });
  }

  /**
   * Invocamos la operacion del servicio para obtener una lista de LEIs
   */
  getLei(resultados: number): void {
    this.miscService.getLei(resultados)
    .subscribe(cadena => {
      this.textoGenerado = cadena;
      if (this.textoGenerado && this.textoGenerado.length > 0){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.generadolei.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.generadolei.titulo')));
      }
    });
  }

  /**
   * Invocamos la operacion del servicio para obtener una lista de ISINs
   */
  getIsin(resultados: number): void {
    this.miscService.getIsin(resultados)
    .subscribe(cadena => {
      this.textoGenerado = cadena;
      if (this.textoGenerado && this.textoGenerado.length > 0){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.generadoisin.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.generadoisin.titulo')));
      }
    });
  }

  /**
   * Invocamos la operacion del servicio para obtener una lista de NSS
   */
  getNss(resultados: number): void {
    this.miscService.getNss(resultados)
    .subscribe(cadena => {
      this.textoGenerado = cadena;
      if (this.textoGenerado && this.textoGenerado.length > 0){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.generadonss.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.generadonss.titulo')));
      }
    });
  }

  /**
   * El metodo encargado de filtrar la lista de opciones de tipos de generacion cuando se va rellenando algo.
   * Utiliza el valor provisional rellenado recuperando de #selectedTipoGeneraIn a traves de su mapeado aqui
   * selectedTipoGeneraIn. NOTA: recordemos que "[formControl]="selectedTipoGeneraFC"" llevaria el valor final
   * seleccionado, pero en este metodo neccesitamos la entrada que el usuario esta rellenando... que es distinto
   */
  filterTiposGenera(): void {
    //obtenemos el valor rellenado por usuario del campo en si
    const filterValue = this.selectedTipoGeneraIn.nativeElement.value.toLowerCase();
    //cargamos la lista filtrada tiposGeneraFiltrado, filtrando siempore de la original tiposGenera el valor rellenado
    //NOTA: sobre la columna "nombre" que es lo que se muestra.
    this.tiposGeneraFiltrado = this.tiposGenera.filter(o => o.nombre.toLowerCase().includes(filterValue));
  }

  /**
   * Al no ser el origen una lista de string simple, sino un objeto compuesto: valor, nombre. Este metodo
   * se encarga de para el valor ya seleccionado, mostrar solo el nombre asociado a ese objeto.
   * @param tipo
   * @returns
   */
  displayTiposGenera(tipo: any): string {
    return tipo && tipo.nombre ? tipo.nombre : '';
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGenerarTipo(): void {
    this.textoGenerado = [];

    //let codigoTipoSeleccionado = this.selectedTipoGenera;
    let codigoTipoSeleccionado = (<any>this.selectedTipoGeneraFC?.value)?.valor;

    if (!codigoTipoSeleccionado || codigoTipoSeleccionado == '') {
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.variados.mensajes.errortipogene.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.variados.mensajes.errortipogene.titulo')));
    } else if (codigoTipoSeleccionado == 'em') {
      this.getEmail(this.numGenerar);
    } else if (codigoTipoSeleccionado == 'ci') {
      this.getCiudad(this.numGenerar);
    } else if (codigoTipoSeleccionado == 'cp') {
      this.getCodPostal(this.numGenerar);
    } else if (codigoTipoSeleccionado == 'im') {
      this.getImei(this.numGenerar);
    } else if (codigoTipoSeleccionado == 'ui') {
      this.getUuid(this.numGenerar);
    } else if (codigoTipoSeleccionado == 'lei') {
      this.getLei(this.numGenerar);
    } else if (codigoTipoSeleccionado == 'isi') {
      this.getIsin(this.numGenerar);
    } else if (codigoTipoSeleccionado == 'nss') {
      this.getNss(this.numGenerar);
    }

  }


  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarTipo(): void {
    this.textoGenerado = [];
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.variados.mensajes.limpiadotipogene.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.variados.mensajes.limpiadotipogene.titulo')));
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonTipos(): void {
    const formatted = this.textoGenerado.map(dato => ({ [(<any>this.selectedTipoGeneraFC?.value)?.nombre]: dato }));
    this.excelService.exportAsExcelFile(formatted, this.translate.instant(marker('generadores.jpromocion.variados.excel.tipos.titulo')));
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.variados.mensajes.errortipogene.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.variados.mensajes.exceltipogene.titulo')));
  }



  /**
   * Invocamos la operacion del servicio para obtener una lista de passwords
   */
  getPassword(resultados: number, longitud: number, mayusminus: string, numeros: string, especial: string): void {
    this.miscService.getPassword(resultados, longitud, mayusminus, numeros, especial)
    .subscribe(cadena => {
      this.passGenerado = cadena;
      if (this.passGenerado && this.passGenerado.length > 0){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.generadopass.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.generadopass.titulo')));
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
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.variados.mensajes.limpiadopass.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.variados.mensajes.limpiadopass.titulo')));
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonPassword(): void {
    const formatted = this.passGenerado.map(dato => ({ [this.translate.instant(marker('generadores.jpromocion.variados.excel.passwords.columnas.password'))]: dato }));
    this.excelService.exportAsExcelFile(formatted, this.translate.instant(marker('generadores.jpromocion.variados.excel.passwords.titulo')));
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.variados.mensajes.excelpass.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.variados.mensajes.excelpass.titulo')));
  }


  /**
   * Invocamos la operacion del servicio para obtener una lista de telefonos
   */
  getTelefono(resultados: number, tipo: string): void {

    //metemos la pantalla bloqueando con el simbolo de carga -> utilizamos este de ejemplo
    this.activarPantallaCarga();
    //para probar que se ve la carga -> espera unos segundos
    //setTimeout(() => {
      // Continue with the rest of the code

      this.miscService.getPhonenumber(resultados, tipo)
      .subscribe(cadena => {

        //independentiemente de que tengamos resultado o sea error, quitamos la pantalla de carga
        this.desactivarPantallaCarga();

        this.tlfGenerado = cadena;
        if (this.tlfGenerado && this.tlfGenerado.length > 0){
          this.openSnackBar(
            this.translate.instant(marker('generadores.jpromocion.variados.mensajes.generadotlf.mensaje')),
            this.translate.instant(marker('generadores.jpromocion.variados.mensajes.generadotlf.titulo')));
        }
      });

    //}, 3000);

  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGenerarTelefono(): void {
    this.tlfGenerado = [];
    if (this.selectedTipoTelefono == '') {
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.variados.mensajes.errortlf.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.variados.mensajes.errortlf.titulo')));
    } else {
      this.getTelefono(this.numGenerar, this.selectedTipoTelefono);
    }

  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarTelefono(): void {
    this.tlfGenerado = [];
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.variados.mensajes.limpiadotlf.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.variados.mensajes.limpiadotlf.titulo')));
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonTelefono(): void {
    const formatted = this.tlfGenerado.map(dato => ({ [this.translate.instant(marker('generadores.jpromocion.variados.excel.telefonos.columnas.telefono'))]: dato }));
    this.excelService.exportAsExcelFile(formatted, this.translate.instant(marker('generadores.jpromocion.variados.excel.telefonos.titulo')));
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.variados.mensajes.exceltlf.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.variados.mensajes.exceltlf.titulo')));
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
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.generadopromo.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.generadopromo.titulo')));
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
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.variados.mensajes.limpiadopromo.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.variados.mensajes.limpiadopromo.titulo')));
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonPromocionales(): void {
    const formatted = this.promoGenerado.map(dato => ({ [this.translate.instant(marker('generadores.jpromocion.variados.excel.promocionales.columnas.codigo'))]: dato }));
    this.excelService.exportAsExcelFile(formatted, this.translate.instant(marker('generadores.jpromocion.variados.excel.promocionales.titulo')));
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.variados.mensajes.excelpromo.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.variados.mensajes.excelpromo.titulo')));
  }




  /**
   * Invocamos la operacion del servicio para obtener una lista de refe catastrales
   */
  getCatastral(resultados: number, tipo: string): void {
    this.miscService.getCatastral(resultados, tipo)
    .subscribe(cadena => {
      this.refCatasGeneradas = cadena;
      if (this.refCatasGeneradas && this.refCatasGeneradas.length > 0){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.generadocatas.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.generadocatas.titulo')));
      }
    });
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGenerarRefCatastral(): void {
    this.refCatasGeneradas = [];
    this.getCatastral(this.numGenerar, this.refCatasParamSelectedTipo);
  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarRefCatastral(): void {
    this.refCatasGeneradas = [];
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.variados.mensajes.limpiadocatas.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.variados.mensajes.limpiadocatas.titulo')));
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonRefCatastral(): void {
    const formatted = this.refCatasGeneradas.map(dato => ({ [this.translate.instant(marker('generadores.jpromocion.variados.excel.catastrales.columnas.referencia'))]: dato }));
    this.excelService.exportAsExcelFile(formatted, this.translate.instant(marker('generadores.jpromocion.variados.excel.catastrales.titulo')));
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.variados.mensajes.excelcatas.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.variados.mensajes.excelcatas.titulo')));
  }




  /**
    * Evento boton para validar una ref. catastral
    */
  onClickValidaRefCatastral(): void {
    this.refCatasValidarOk = '';
    this.miscService.getValidatecatastral(this.refCatasValidar)
    .subscribe(nifOk => {
      this.refCatasValidarOk = nifOk;
      if (this.refCatasValidarOk && this.refCatasValidarOk != ''){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.validadicatas.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.validadicatas.titulo')));
      }
    });
  }







  /**
   * Invocamos la operacion del servicio para obtener una lista de refe catastrales
   */
  getCups(resultados: number, tipo: string): void {
    this.miscService.getCups(resultados, tipo)
    .subscribe(cadena => {
      this.cupsGeneradas = cadena;
      if (this.cupsGeneradas && this.cupsGeneradas.length > 0){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.generadocups.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.generadocups.titulo')));
      }
    });
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGenerarCups(): void {
    this.cupsGeneradas = [];
    this.getCups(this.numGenerar, this.cupsParamSelectedTipo);
  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarCups(): void {
    this.cupsGeneradas = [];
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.variados.mensajes.limpiadocups.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.variados.mensajes.limpiadocups.titulo')));
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonCups(): void {
    const formatted = this.cupsGeneradas.map(dato => ({ [this.translate.instant(marker('generadores.jpromocion.variados.excel.cups.columnas.cups'))]: dato }));
    this.excelService.exportAsExcelFile(formatted, this.translate.instant(marker('generadores.jpromocion.variados.excel.cups.titulo')));
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.variados.mensajes.excelcups.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.variados.mensajes.excelcups.titulo')));
  }




  /**
    * Evento boton para validar una CUPS
    */
  onClickValidaCups(): void {
    this.cupsValidarOk = '';
    this.miscService.getValidatecups(this.cupsValidar)
    .subscribe(cups => {
      this.cupsValidarOk = cups;
      if (this.cupsValidarOk && this.cupsValidarOk != ''){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.validadicups.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.validadicups.titulo')));
      }
    });
  }



  /**
    * Evento boton para validar un LEI
    */
  onClickValidaLei(): void {
    this.leiValidarOk = '';
    this.miscService.getValidatelei(this.leiValidar)
    .subscribe(lei => {
      this.leiValidarOk = lei;
      if (this.leiValidarOk && this.leiValidarOk != ''){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.validadilei.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.validadilei.titulo')));
      }
    });
  }


  /**
    * Evento boton para validar un ISIN
    */
  onClickValidaIsin(): void {
    this.isinValidarOk = '';
    this.miscService.getValidateisin(this.isinValidar)
    .subscribe(isin => {
      this.isinValidarOk = isin;
      if (this.isinValidarOk && this.isinValidarOk != ''){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.validadiisin.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.validadiisin.titulo')));
      }
    });
  }

  /**
    * Evento boton para validar un NSS
    */
  onClickValidaNss(): void {
    this.nssValidarOk = '';
    this.miscService.getValidatenss(this.nssValidar)
    .subscribe(nss => {
      this.nssValidarOk = nss;
      if (this.nssValidarOk && this.nssValidarOk != ''){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.validadinss.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.variados.mensajes.validadinss.titulo')));
      }
    });
  }




}
