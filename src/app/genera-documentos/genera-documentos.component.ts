import { Component, OnInit, inject, Input } from '@angular/core';
import {NgFor,NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
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
import { ExcelService } from '../core/services/excel.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DoiService } from '../core/services/doi.service';



declare var $: any;

@Component({
  selector: 'app-genera-documentos',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf,MatIconModule,MatButtonModule,MatCardModule,MatTooltipModule,MatGridListModule,MatInputModule,MatSelectModule,MatFormFieldModule,MatListModule],
  templateUrl: './genera-documentos.component.html',
  styleUrl: './genera-documentos.component.scss',
})
export class GeneraDocumentosComponent implements OnInit {

  //nifGenerado: string = '';
  //nieGenerado: string = '';
  //cifGenerado: string = '';

  nifValidar: string = '';
  nieValidar: string = '';
  cifValidar: string = '';

  nifValidarOk: string = '';
  nieValidarOk: string = '';
  cifValidarOk: string = '';

  listaNifs: string[] = [];
  listaNies: string[] = [];
  listaCifs: string[] = [];

  selectedSociedad: string = '';

  numGenerar: number = 1;

  tiposSociedades: Array<any> = [
    {valor: '', nombre: 'Seleccionar un tipo concreto para generar solo este tipo.'},
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




  //inyeccion de dependencia para utilizar el servicio de clipboard
  private clipboard: Clipboard = inject(Clipboard);

  //inyeccion de dependencia para utilizar el servicio de generacion de nifs
  private doiService: DoiService = inject(DoiService);

  //inyeccion del servicio para generar excel
  private excelService: ExcelService = inject(ExcelService);

  //mensajes notificaciones
  private _snackBar = inject(MatSnackBar);





  constructor() { }

  ngOnInit(): void {
  //  this.getNifs();
    this.selectedSociedad = this.tiposSociedades[0].valor;
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
  onSelectDato(dato: string): void {
    if (dato) {
      this.clipboard.copy(dato);
      this.openSnackBar('Dato copiado al portapapeles', 'CopiaPortapapeles');
    }
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
    // if (resultados == 1) {
    //   this.doiService.getCif(resultados, this.selectedSociedad)
    //   .subscribe(cifs => {
    //     this.cifGenerado = cifs[0];
    //     if (this.cifGenerado && this.cifGenerado != ''){
    //       this.openSnackBar('CIF generado', 'GenerarCIF');
    //     }
    //   });
    // } else{
      this.doiService.getCif(resultados, this.selectedSociedad)
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



}

