import { Component, inject, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
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
import { saveAs } from 'file-saver';
import {BaseGeneraComponent} from '../shared/components/base-genera/base-genera.component';
import { FilesService } from '../core/services/files.service';
import { Tipohash } from '../core/models/tipohash';
import { TranslateModule } from '@ngx-translate/core';
import { marker} from '@colsen1991/ngx-translate-extract-marker';

@Component({
    selector: 'app-genera-archivos',
    imports: [FormsModule, NgIf, MatButtonToggleModule, MatIconModule, MatButtonModule, MatTooltipModule,
        MatFormFieldModule, MatInputModule, MatSelectModule, MatListModule, MatCardModule, MatCheckboxModule,
        TranslateModule],
    templateUrl: './genera-archivos.component.html',
    styleUrl: './genera-archivos.component.scss'
})
export class GeneraArchivosComponent extends BaseGeneraComponent implements OnInit {

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

  //zip
  archivosZip: File[] = [];
  nombreArchivosZip: string = '';
  archivoGeneradoZip: File | undefined;



  //inyeccion de dependencia para utilizar el servicio de generacion de archivos
  private filesService: FilesService = inject(FilesService);

  constructor() {
    super();
  }

  override ngOnInit(): void {
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
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.recuperadohash.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.recuperadohash.titulo')));
      }
    });
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
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.codificadotextobase64.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.codificadotextobase64.titulo')));
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
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.codificadoarchibase64.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.codificadoarchibase64.titulo')));
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
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.errorcodibase64tipoentrada.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.errorcodibase64tipoentrada.titulo')));
      return;
    } else if (this.codifica64Entrada == 'texto' && this.textoABase64.length <= 0) {
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.errorcodibase64entrada.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.errorcodibase64entrada.titulo')));
      return;
    } else if (this.codifica64Entrada == 'archivo' && this.archivoBase64 == undefined) {
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.errorcodibase64fichero.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.errorcodibase64fichero.titulo')));
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
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.limpiarbase64.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.limpiarbase64.titulo')));
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
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.decodificarbase64.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.decodificarbase64.titulo')));
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
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.decodificararchivobase64.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.decodificararchivobase64.titulo')));
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
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.errordecodibase64texto.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.errordecodibase64texto.titulo')));
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
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.limpiardecobase64.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.limpiardecobase64.titulo')));
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
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.obtenerhash.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.obtenerhash.titulo')));
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
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.errorhashtipohash.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.errorhashtipohash.titulo')));
      return;
    } else if (this.archivoHash == undefined) {
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.errorhashfichero.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.errorhashfichero.titulo')));
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
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.limpiarhash.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.limpiarhash.titulo')));
  }


  /**
   * Manejador del tipo file para cargar archivo seleccionado en hash
   * @param event
   */
  handleSubirFilesZip(event: Event) {
    //lo fijamos en el campo de archivo
    const target = event.target as HTMLInputElement;
    if (target && target.files) {
      this.archivosZip = Array.from(target.files);
      if (this.archivosZip.length > 0){
        this.nombreArchivosZip = this.archivosZip[0].name;
        if (this.archivosZip.length > 1) {
          this.nombreArchivosZip = this.nombreArchivosZip + ' ...';
        }
      } else{
        this.nombreArchivosZip = '';
      }

    }
  }

  /**
   * Invocamos la operacion del servicio para obtener un archivo decodificado de base64
   */
  postZip(files: File[]): void {
    //cambiar el icono de iconoDescargarZip y la clase al boton para la animacion
    const btnDescargarZip = document.getElementById('btnDescargarZip');
    const iconoDescargarZip = document.getElementById('iconoDescargarZip');
    btnDescargarZip!.classList.remove('botonRotatorio');
    btnDescargarZip!.classList.add('botonAparicionLateral');
    iconoDescargarZip!.innerText = 'more_horiz';

    //setTimeout(() => {
      this.archivoGeneradoZip = undefined;
      this.filesService.postZip(files)
      .subscribe(archivo => {
        if (archivo.size > 0) {
          this.archivoGeneradoZip = new File([archivo], 'comprimido.zip', {type: 'application/zip'});
          //ahora lo descargamos
          saveAs(archivo, 'comprimido.zip');
          this.openSnackBar(
            this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.generarzip.mensaje')),
            this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.generarzip.titulo')));

          //restablecer el icono y clase del boton
          iconoDescargarZip!.innerText = 'download';
          btnDescargarZip!.classList.remove('botonAparicionLateral');
          btnDescargarZip!.classList.add('botonRotatorio');

        } else{
          this.archivoGeneradoZip = undefined;
        }
      });

    //}, 5000);
  }

  /**
  * Generar zip
  */
  onClickBotonZip(): void {


    this.textoDecodificadoBase64 = '';
    //comprobamos que tenga algo
    if (this.archivosZip.length <= 0) {
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.errorzipfichero.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.archivos.mensajes.errorzipfichero.titulo')));
      return;
    } else{
      this.postZip(this.archivosZip);

    }

  }



}
