import { Component, OnInit, inject, ElementRef, ViewChild } from '@angular/core';
import {NgIf} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
//necesario  para tooltips de bootstrap, al cambiar a angular material es innecesario
//import * as bootstrap from 'bootstrap';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatListModule} from '@angular/material/list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {BaseGeneraComponent} from '../shared/components/base-genera/base-genera.component';
import { DoiService } from '../core/services/doi.service';



declare var $: any;

@Component({
  selector: 'app-genera-documentos',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf,MatIconModule,MatButtonModule,MatCardModule,MatTooltipModule,
    MatGridListModule, MatInputModule,MatSelectModule,MatFormFieldModule,MatListModule,MatAutocompleteModule],
  templateUrl: './genera-documentos.component.html',
  styleUrl: './genera-documentos.component.scss',
})
export class GeneraDocumentosComponent extends BaseGeneraComponent implements OnInit {

  //nifGenerado: string = '';
  //nieGenerado: string = '';
  //cifGenerado: string = '';

  nifValidar: string = '';
  nieValidar: string = '';
  cifValidar: string = '';
  pasaporteValidar: string = '';
  pasaporteCalcular: string = '';

  nifValidarOk: string = '';
  nieValidarOk: string = '';
  cifValidarOk: string = '';
  pasaporteValidarOk: string = '';
  pasaporteCalcularDC: string = '';

  listaNifs: string[] = [];
  listaNies: string[] = [];
  listaCifs: string[] = [];
  listaPasaportes: string[] = [];


  numGenerar: number = 1;

  //selectedSociedad: string = '';
  @ViewChild('selectedSociedadIn') selectedSociedadIn: ElementRef<HTMLInputElement> = inject(ElementRef);
  selectedSociedadFC = new FormControl('');
  tiposSociedades: Array<any> = [
    //{valor: '', nombre: 'Seleccionar un tipo concreto para generar solo este tipo.'},
    {valor: 'A', nombre: 'A. Sociedades anónimas.'},
    {valor: 'B', nombre: 'B. Sociedades de responsabilidad limitada.'},
    {valor: 'C', nombre: 'C. Sociedades colectivas.'},
    {valor: 'D', nombre: 'D. Sociedades comanditarias.'},
    {valor: 'E', nombre: 'E. Comunidades de bienes.'},
    {valor: 'F', nombre: 'F. Sociedades cooperativas.'},
    {valor: 'G', nombre: 'G. Asociaciones y fundaciones.'},
    {valor: 'H', nombre: 'H. Comunidades de propietarios en régimen de propiedad horizontal.'},
    {valor: 'J', nombre: 'J. Sociedades civiles.'},
    {valor: 'N', nombre: 'N. Entidades no residentes.'},
    {valor: 'P', nombre: 'P. Corporaciones locales.'},
    {valor: 'Q', nombre: 'Q. Organismos autónomos, estatales o no, y asimilados, y congregaciones e instituciones religiosas.'},
    {valor: 'R', nombre: 'R. Congregaciones e instituciones religiosas (desde 2008, ORDEN EHA/451/20084​)'},
    {valor: 'S', nombre: 'S. Órganos de la Administración del Estado y comunidades autónomas'},
    {valor: 'U', nombre: 'U. Uniones Temporales de Empresas.'},
    {valor: 'V', nombre: 'V. Sociedad Agraria de Transformación.'},
    {valor: 'W', nombre: 'W. Establecimientos permanentes de entidades no residentes en España'}
  ];
  tiposSociedadesFiltrado: Array<any> = [];



  //inyeccion de dependencia para utilizar el servicio de generacion de nifs
  private doiService: DoiService = inject(DoiService);



  constructor() {
    super();
  }

  override ngOnInit(): void {
  //  this.getNifs();
  //this.selectedSociedad = this.tiposSociedades[0].valor;
  this.numGenerar = 1;

  //Incluir tooltips en la pagina
  //Forma para utilizar el tooltip normal de js, no el de bootstrap:
  //$(document).ready(function() {
  //  $('[data-toggle="tooltip"]').tooltip();
  //})

  //Forma para utilizar el tooltip de bootstrap
  //const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  //const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
  }


  /**
   * El metodo encargado de filtrar la lista de opciones de tipos de sociedad cuando se va rellenando algo.
   * Utiliza el valor provisional rellenado recuperando de #selectedSociedadIn a traves de su mapeado aqui
   * selectedSociedadIn. NOTA: recordemos que "[formControl]="selectedSociedadFC"" llevaria el valor final
   * seleccionado, pero en este metodo neccesitamos la entrada que el usuario esta rellenando... que es distinto
   */
  filterTiposSociedad(): void {
    //obtenemos el valor rellenado por usuario del campo en si
    const filterValue = this.selectedSociedadIn.nativeElement.value.toLowerCase();
    //cargamos la lista filtrada tiposGeneraFiltrado, filtrando siempore de la original tiposGenera el valor rellenado
    //NOTA: sobre la columna "nombre" que es lo que se muestra.
    this.tiposSociedadesFiltrado = this.tiposSociedades.filter(o => o.nombre.toLowerCase().includes(filterValue));
  }

  /**
   * Al no ser el origen una lista de string simple, sino un objeto compuesto: valor, nombre. Este metodo
   * se encarga de para el valor ya seleccionado, mostrar solo el nombre asociado a ese objeto.
   * @param tipo
   * @returns
   */
  displayTiposSociedad(tipo: any): string {
    return tipo && tipo.nombre ? tipo.nombre : '';
  }


  /**
   * Invocamos la operacion del servicio para obtener una lista de nifs aleatorios
   */
  getNifs(resultados: number): void {
    //se recupera la api-key del servicio de datos y la fijamos en nuestro servicio
    //Doi concreto.
    //La insertamos en cada llamada?? si, porque el input del app component cuando lo cambiamos
    //lo actualiza de
    //this.doiService.setApiKey(this.datosConexionService.getApiKey());

    // if (resultados == 1) {
    //   this.doiService.getNif(resultados)
    //   .subscribe(nifs => {
    //     this.nifGenerado = nifs[0];
    //     if (this.nifGenerado && this.nifGenerado != ''){
    //       this.openSnackBar('NIF generado', 'GenerarNIF');
    //     }
    //   });
    // } else{
      this.doiService.getNif(resultados)
      .subscribe(nifs => {
        this.listaNifs = nifs;
        if (this.listaNifs && this.listaNifs.length > 0) {
          this.openSnackBar('Lista NIFs generados', 'GenerarNIFs');
        }
      });
    // }
  }

  /**
   * Invocamos la operacion del servicio para obtener una lista de nies aleatorios
   */
  getNies(resultados: number): void {
    // if (resultados == 1) {
    //   this.doiService.getNie(resultados)
    //   .subscribe(nies => {
    //     this.nieGenerado = nies[0];
    //     if (this.nieGenerado && this.nieGenerado != ''){
    //       this.openSnackBar('NIE generado', 'GenerarNIE');
    //     }
    //   });
    // } else{
      this.doiService.getNie(resultados)
      .subscribe(nies => {
        this.listaNies = nies;
        if (this.listaNies && this.listaNies.length > 0) {
          this.openSnackBar('Lista NIEs generados', 'GenerarNIEs');
        }
      });
    // }
  }

  /**
   * Invocamos la operacion del servicio para obtener una lista de cifs aleatorios
   */
  getCifs(resultados: number): void {
    //let codigoTipoSeleccionado = this.selectedSociedad;
    let codigoTipoSeleccionado = (<any>this.selectedSociedadFC?.value)?.valor;
    //sino se ha seleccionado nada, se rellena cadena vacio para quye el servicio genere
    //uno cualquiera
    if (!codigoTipoSeleccionado) {
      codigoTipoSeleccionado = '';
    }

    // if (resultados == 1) {
    //   this.doiService.getCif(resultados, this.selectedSociedad)
    //   .subscribe(cifs => {
    //     this.cifGenerado = cifs[0];
    //     if (this.cifGenerado && this.cifGenerado != ''){
    //       this.openSnackBar('CIF generado', 'GenerarCIF');
    //     }
    //   });
    // } else{
      this.doiService.getCif(resultados, codigoTipoSeleccionado)
      .subscribe(cifs => {
        this.listaCifs = cifs;
        if (this.listaCifs && this.listaCifs.length > 0) {
          this.openSnackBar('Lista CIFs generados', 'GenerarCIFs');
        }
      });
    // }
  }


  /**
   * Generamos una lista nifs aleatorio
   */
  onClickBotonGenerarListaNif(): void {
    this.listaNifs = [];
    this.getNifs(this.numGenerar);
  }



  /**
   * Generamos un nuevo nie aleatorio
   */
  onClickBotonGenerarListaNie(): void {
    this.listaNies = [];
    this.getNies(this.numGenerar);
  }

  /**
  * Generamos un nuevo cif aleatorio
  */
  onClickBotonGenerarListaCif(): void {
    this.listaCifs = [];
    this.getCifs(this.numGenerar);
  }

  /**
    * Evento boton para validar un nif
    */
  onClickValidarNif(): void {
    this.nifValidarOk = '';
    this.doiService.validateNif(this.nifValidar)
    .subscribe(nifOk => {
      this.nifValidarOk = nifOk;
      if (this.nifValidarOk && this.nifValidarOk != ''){
        this.openSnackBar('NIF validado', 'ValidarNIF');
      }
    });
    //console.info('Nif validado: ' + this.nifValidarOk);
  }

  /**
    * Evento boton para validar un nie
    */
  onClickValidarNie(): void {
    this.nieValidarOk = '';
    this.doiService.validateNie(this.nieValidar)
    .subscribe(nieOk => {
      this.nieValidarOk = nieOk;
      if (this.nieValidarOk && this.nieValidarOk != ''){
        this.openSnackBar('NIE validado', 'ValidarNIE');
      }
    });
    //console.info('Nie validado: ' + this.nieValidarOk);
  }

  /**
    * Evento boton para validar un cif
    */
  onClickValidarCif(): void {
    this.cifValidarOk = '';
    this.doiService.validateCif(this.cifValidar)
    .subscribe(cifOk => {
      this.cifValidarOk = cifOk;
      if (this.cifValidarOk && this.cifValidarOk != ''){
        this.openSnackBar('CIF validado', 'ValidarCIF');
      }
    });
    //console.info('Cif validado: ' + this.cifValidarOk);
  }





  /**
    * Limpiar tooddas las listas de generacion multiples
    * @deprecated   Se han creado metodos y botones para cada lista concreta
    */
  onClickLimpiarListas(): void {
    this.listaNifs = [];
    this.listaNies = [];
    this.listaCifs = [];
  }

  /**
    * Limpiar la lista de nifs generados
    */
  onClickLimpiarListaNif(): void {
    this.listaNifs = [];
    this.openSnackBar('NIFs limpiado', 'LimpiarNIFs');
  }

  /**
    * Limpiar la lista de nies generados
    */
  onClickLimpiarListaNie(): void {
    this.listaNies = [];
    this.openSnackBar('NIEs limpiado', 'LimpiarNIEs');
  }

  /**
    * Limpiar la lista de cifs generados
    */
  onClickLimpiarListaCif(): void {
    this.listaCifs = [];
    this.openSnackBar('CIFs limpiado', 'LimpiarCIFs');
  }



  /**
   * Exportar la lista de nifs generados a excel
   */
  exportJsonNifs(): void {
    const formattedNifs = this.listaNifs.map(nif => ({ NIF: nif }));
    this.excelService.exportAsExcelFile(formattedNifs, 'Lista_NIFs');
    this.openSnackBar('Excel generado','ExcelNIFs');
  }

  /**
   * Exportar la lista de nifs generados a excel
   */
  exportJsonNies(): void {
    const formattedNies = this.listaNies.map(nie => ({ NIE: nie }));
    this.excelService.exportAsExcelFile(formattedNies, 'Lista_NIEs');
    this.openSnackBar('Excel generado','ExcelNIEs');
  }

  /**
   * Exportar la lista de nifs generados a excel
   */
  exportJsonCifs(): void {
    const formattedCifs = this.listaCifs.map(cif => ({ CIF: cif }));
    this.excelService.exportAsExcelFile(formattedCifs, 'Lista_CIFs');
    this.openSnackBar('Excel generado','ExcelCIFs');
  }


  /**
   * Invocamos la operacion del servicio para obtener una lista de pasaportes aleatorios
   */
  getPassport(resultados: number): void {
      this.doiService.getPassport(resultados)
      .subscribe(pasaportes => {
        this.listaPasaportes = pasaportes;
        if (this.listaPasaportes && this.listaPasaportes.length > 0) {
          this.openSnackBar('Lista Pasaportes generados', 'GenerarPasaporte');
        }
      });
  }


  /**
   * Generamos un nuevo pasaporte aleatorio
   */
  onClickBotonGenerarListaPasaporte(): void {
    this.listaPasaportes = [];
    this.getPassport(this.numGenerar);
  }


  /**
    * Limpiar la lista de pasaporte generados
    */
  onClickLimpiarListaPasaporte(): void {
    this.listaPasaportes = [];
    this.openSnackBar('Pasaportes limpiado', 'LimpiarPasaporte');
  }

    /**
   * Exportar la lista de pasaporte generados a excel
   */
    exportJsonPasaporte(): void {
      const formattedNies = this.listaPasaportes.map(nie => ({ NIE: nie }));
      this.excelService.exportAsExcelFile(formattedNies, 'Lista_Pasaportes');
      this.openSnackBar('Excel generado','ExcelPasaporte');
    }

  /**
    * Evento boton para validar un pasaporte
    */
  onClickValidarPasaporte(): void {
    this.pasaporteValidarOk = '';
    this.doiService.getValidatepassport(this.pasaporteValidar)
    .subscribe(pasaporteOk => {
      this.pasaporteValidarOk = pasaporteOk;
      if (this.pasaporteValidarOk && this.pasaporteValidarOk != ''){
        this.openSnackBar('Pasaporte validado', 'ValidarPasaporte');
      }
    });
    //console.info('Nie validado: ' + this.pasaporteValidarOk);
  }

  /**
    * Evento boton para calcular DC un pasaporte
    */
  onClickCalcularDCPasaporte(): void {
    this.pasaporteCalcularDC = '';
    this.doiService.getCalculatepassportdc(this.pasaporteCalcular)
    .subscribe(dc => {
      this.pasaporteCalcularDC = dc;
      if (this.pasaporteCalcularDC && this.pasaporteCalcularDC != ''){
        this.openSnackBar('Calculado dígitos de control del pasaporte', 'CalculadoDCPasaporte');
      }
    });
  }


}

