import { Component, inject, OnInit} from '@angular/core';
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
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { saveAs } from 'file-saver';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { FilesService } from '../core/services/files.service';
import { ExcelService } from '../core/services/excel.service';
import { Tipohash } from '../core/models/tipohash';

@Component({
  selector: 'app-genera-archivos',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, MatButtonToggleModule,MatIconModule,MatButtonModule,MatTooltipModule, CaseTransformerPipe,
    MatFormFieldModule,MatInputModule,MatSelectModule,MatListModule,MatCardModule,MatCheckboxModule,
    MatTableModule, MatPaginatorModule,MatSortModule],
  templateUrl: './genera-archivos.component.html',
  styleUrl: './genera-archivos.component.scss'
})
export class GeneraArchivosComponent implements OnInit {

  //Codificar a base 64
  codifica64Entrada: string = 'texto';
  textoABase64: string = '';
  archivoBase64: File | undefined;
  nombreArchivoBase64: string = '';
  textoCodificadoBase64: string = '';

  //decodificar de base 64
  decodifica64Salida: string = 'texto';
  textoDeBase64: string = '';
  textoDecodificadoBase64: string = '';
  archivoDecodificadoBase64: File | undefined;

  //hash
  selectedTipoHash: string = '';
  listaTiposHash: Array<Tipohash> = [];
  archivoHash: File | undefined;
  nombreArchivoHash: string = '';
  textoHash: string = '';


  //inyeccion de dependencia para utilizar el servicio de clipboard
  private clipboard: Clipboard = inject(Clipboard);

  //inyeccion de dependencia para utilizar el servicio de generacion de archivos
  private filesService: FilesService = inject(FilesService);

  //inyeccion del servicio para generar excel
  private excelService: ExcelService = inject(ExcelService);

  //mensajes notificaciones
  private _snackBar = inject(MatSnackBar);

  //inyeccion de dependencia para utilizar el servicio de liveAnnouncer para ordenar
  private _liveAnnouncer = inject(LiveAnnouncer);


  constructor() { }

  ngOnInit(): void {
    this.listaTiposHash = [];
    this.getHashTypes();
  }

  /**
   * Invocamos la operacion del servicio para obtener la lista de hash validos
   */
  getHashTypes(): void {
    this.filesService.getHashtypes()
    .subscribe(tipos => {
      this.listaTiposHash = tipos;
      if (this.listaTiposHash && this.listaTiposHash.length > 0) {
        this.openSnackBar('Lista tipos hash recuperados', 'RecuperarListaTiposHash');
      }
    });
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
   * Invocamos la operacion del servicio para obtener un texto codificado en base64
   */
  postBase64(texto: string): void {
    this.textoCodificadoBase64 = '';
    this.filesService.postBase64(texto)
    .subscribe(textoBase64 => {
      if (textoBase64 && textoBase64 != '') {
        this.textoCodificadoBase64 = textoBase64;
        this.openSnackBar('Codificado texto a base64', 'CodificadoBase64');
      }
    });
  }

  /**
   * Invocamos la operacion del servicio para obtener un texto codificado en base64 desde un archivo
   */
  postBase64file(archivo: File, nombre: string): void {
    this.textoCodificadoBase64 = '';
    this.filesService.postBase64file(archivo, nombre)
    .subscribe(textoBase64 => {
      if (textoBase64 && textoBase64 != '') {
        this.textoCodificadoBase64 = textoBase64;
        this.openSnackBar('Codificado archivo a base64', 'CodificadoArchivoBase64');
      }
    });
  }

  /**
  * Codificar base64
  */
  onClickBotonCodificarBase64(): void {
    this.textoCodificadoBase64 = '';
    //comprobamos que tenga algo

    if (this.codifica64Entrada == '') {
      this.openSnackBar('El tipo entrada debe tener algo seleccionado', 'ErrorCodificaBase64');
      return;
    } else if (this.codifica64Entrada == 'texto' && this.textoABase64.length <= 0) {
      this.openSnackBar('El texto debe contener algo', 'ErrorCodificaBase64');
      return;
    } else if (this.codifica64Entrada == 'archivo' && this.archivoBase64 == undefined) {
      this.openSnackBar('Debe seleccionarse algún fichero', 'ErrorCodificaBase64');
      return;
    } else{
      if (this.codifica64Entrada == 'texto') {
        this.postBase64(this.textoABase64);
      } else if (this.codifica64Entrada == 'archivo') {
        if (this.archivoBase64) {
          this.postBase64file(this.archivoBase64, this.nombreArchivoBase64);
        }
      }
    }

  }

  /**
    * Limpiar codificacion base64
    */
  onClickLimpiarBase64(): void {
    this.textoCodificadoBase64 = '';
    this.openSnackBar('Texto base64 limpiado', 'LimpiarCodificaBase64');
  }

  /**
   * Invocamos la operacion del servicio para obtener un texto decodificado de base64
   */
  postDecode64(texto: string): void {
    this.textoDecodificadoBase64 = '';
    this.filesService.postDecode64(texto)
    .subscribe(textoOri => {
      if (textoOri && textoOri != '') {
        this.textoDecodificadoBase64 = textoOri;
        this.openSnackBar('Decodificado texto de base64', 'DecodificadoBase64');
      }
    });
  }

  /**
   * Invocamos la operacion del servicio para obtener un archivo decodificado de base64
   */
  postDecode64file(texto: string): void {
    this.archivoDecodificadoBase64 = undefined;
    this.filesService.postDecode64file(texto)
    .subscribe(archivo => {
      if (archivo.size > 0) {
        this.archivoDecodificadoBase64 = new File([archivo], 'archivo_decodificado.txt', {type: 'text/plain'});
        //ahora lo descargamos
        saveAs(archivo, "archivo_decodificado.txt");
        this.openSnackBar('Decodificado archivo de base64', 'DecodificadoArchivoBase64');
      } else{
        this.archivoDecodificadoBase64 = undefined;
      }
    });
  }

  /**
  * Codificar base64
  */
  onClickBotonDecodificarBase64(): void {
    this.textoDecodificadoBase64 = '';
    //comprobamos que tenga algo
    if (this.textoDeBase64.length <= 0) {
      this.openSnackBar('El texto debe contener algo', 'ErrorDecodificaBase64');
      return;
    } else{
      if (this.decodifica64Salida == 'texto') {
        this.postDecode64(this.textoDeBase64);
      } else if (this.decodifica64Salida == 'archivo') {
        this.postDecode64file(this.textoDeBase64);
      }

    }

  }

  /**
    * Limpiar codificacion base64
    */
  onClickLimpiarDecoBase64(): void {
    this.textoDecodificadoBase64 = '';
    this.openSnackBar('Texto original limpiado', 'LimpiarDecodificaBase64');
  }

  /**
   * Manejador del tipo file para cargar archivo seleccionado en codificaicon base64
   * @param event
   */
  handleSubirFileCodifica64(event: Event) {
    //lo fijamos en el campo de archivo
    const target = event.target as HTMLInputElement;
    if (target && target.files) {
      const archivo = target.files[0];
      if (archivo) {
        this.archivoBase64 = archivo;
        this.nombreArchivoBase64 = archivo.name;
      } else{
        this.archivoBase64 = undefined;
        this.nombreArchivoBase64 = '';
      }

    }
  }

  /**
   * Manejador del tipo file para cargar archivo seleccionado en hash
   * @param event
   */
  handleSubirFileHash(event: Event) {
    //lo fijamos en el campo de archivo
    const target = event.target as HTMLInputElement;
    if (target && target.files) {
      const archivo = target.files[0];
      if (archivo) {
        this.archivoHash = archivo;
        this.nombreArchivoHash = archivo.name;
      } else{
        this.archivoHash = undefined;
        this.nombreArchivoHash = '';
      }

    }
  }


  /**
   * Invocamos la operacion del servicio para obtener el hash de un archivo
   */
  postHash(archivo: File, nombre: string, tipo: string): void {
    this.textoHash = '';
    this.filesService.postHash(archivo, nombre, tipo)
    .subscribe(hash => {
      if (hash && hash != '') {
        this.textoHash = hash;
        this.openSnackBar('Obtenido hash', 'ObtenidoHash');
      }
    });
  }

  /**
    * Generar hash
    */
  onClickBotonHash(): void {
    this.textoHash = '';
    //comprobamos que tenga algo

    if (this.selectedTipoHash == '') {
      this.openSnackBar('Debe seleccionarse algún tipo de hash', 'ErrorHash');
      return;
    } else if (this.archivoHash == undefined) {
      this.openSnackBar('Debe seleccionarse algún fichero', 'ErrorHash');
      return;
    } else{
      this.postHash(this.archivoHash, this.nombreArchivoHash, this.selectedTipoHash);
    }

  }

  /**
    * Limpiar hash
    */
  onClickLimpiarHash(): void {
    this.textoHash = '';
    this.openSnackBar('Hash limpiado', 'LimpiarHash');
  }



}
