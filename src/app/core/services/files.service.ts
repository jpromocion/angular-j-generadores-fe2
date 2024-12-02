/**
 * La clase que actuara coimo servicio para acceder a nuestra itnerfaz
 * API rest "file/"
 */
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Tipohash } from '../models/tipohash';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  nombreSimpleServicio: string = 'FilesService';

  //La URL de la API rest
  private urlJsonServer = environment.apiUrl;
  private interfaz = '/file';

  //inyectamos el servicio HTTP
  private http: HttpClient = inject(HttpClient);
  //inyectamos baseservice para utilizar como padre, de forma mas "angular" en vez de extender la clase con herencia
  private baseService: BaseService = inject(BaseService);


  constructor() {
    this.baseService.nombreServicioMensaje = this.nombreSimpleServicio;
  }

  /**
   * Interfaz de invocación del servicio rest para codificar una cadena a base 64
   * Interfaz: POST /file/base64
   * @returns Lista de numeros aleatorios
   */
  postBase64(text: string): Observable<string> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    //el texto se fija a la url
    let urlfinal: string = this.urlJsonServer + this.interfaz + '/base64';

    return this.http.post(urlfinal, text,{
        headers: this.baseService.baseHeaders,
        responseType: 'text'
      })
      .pipe(
        //tap(_ => this.log('Num aleatorios recuperados')),
        catchError(this.baseService.handleError<string>('postBase64', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para codificar un archivo a base 64
   * Interfaz: POST /file/base64file
   * @returns Lista de numeros aleatorios
   */
  postBase64file(file: File, name: string): Observable<string> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    //el texto se fija a la url
    let urlfinal: string = this.urlJsonServer + this.interfaz + '/base64file';

    //archivo metido a mano con algo
    //const archivoAlterno: File = new File(["Hello, world!"], "hello world.txt", {type: "text/plain"});

    //Se pasa el archivo como un form data -> https://stackoverflow.com/questions/54693529/how-to-use-post-method-to-send-form-data-in-angular
    const form = new FormData;
    form.append('file', file);
    //form.append('file', archivoAlterno);
    form.append('name', name);

    return this.http.post(urlfinal, form,{
        headers: this.baseService.baseHeaders,
        responseType: 'text'
      })
      .pipe(
        //tap(_ => this.log('Num aleatorios recuperados')),
        catchError(this.baseService.handleError<string>('postBase64file', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para decodificar una cadena de base 64
   * Interfaz: POST /file/decode64
   * @returns Lista de numeros aleatorios
   */
  postDecode64(text: string): Observable<string> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    //el texto se fija a la url
    let urlfinal: string = this.urlJsonServer + this.interfaz + '/decode64';

    return this.http.post(urlfinal, text,{
        headers: this.baseService.baseHeaders,
        responseType: 'text'
      })
      .pipe(
        //tap(_ => this.log('Num aleatorios recuperados')),
        catchError(this.baseService.handleError<string>('postDecode64', ''))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para decodificar un archivo de base 64
   * Interfaz: POST /file/decode64file
   * @returns Lista de numeros aleatorios
   */
  postDecode64file(text: string): Observable<any> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    //el texto se fija a la url
    let urlfinal: string = this.urlJsonServer + this.interfaz + '/decode64file';

    return this.http.post(urlfinal, text,{
        headers: this.baseService.baseHeaders,
        responseType: "blob" // This tells angular to parse it as a blob, default is json
      })
      .pipe(
        //tap(_ => this.log('Num aleatorios recuperados')),
        catchError(this.baseService.handleError<Blob>('postDecode64file', new Blob()))
      );
  }



  /**
   * Interfaz de invocación del servicio rest para obtener tipos de algoritmos hash
   * Interfaz: GET /file/hashtypes
   * @returns Lista de algoritmos hash
   */
  getHashtypes(): Observable<Tipohash[]> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/hashtypes';

    return this.http.get<Tipohash[]>(urlfinal, {
      headers: this.baseService.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Tipos de hash recuperados')),
        catchError(this.baseService.handleError<Tipohash[]>('getHashtypes', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener el hash de un archivo
   * Interfaz: POST /file/hash
   * @returns hash del archivo
   */
  postHash(file: File, name: string, type: string): Observable<string> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    //el texto se fija a la url
    let urlfinal: string = this.urlJsonServer + this.interfaz + '/hash';

    //Se pasa el archivo como un form data -> https://stackoverflow.com/questions/54693529/how-to-use-post-method-to-send-form-data-in-angular
    const form = new FormData;
    form.append('file', file);
    form.append('name', name);
    form.append('type', type);

    return this.http.post(urlfinal, form,{
        headers: this.baseService.baseHeaders,
        responseType: 'text'
      })
      .pipe(
        //tap(_ => this.log('Hash recuperado')),
        catchError(this.baseService.handleError<string>('postHash', ''))
      );
    }


  /**
   * Interfaz de invocación del servicio rest para zipear archivos
   * Interfaz: POST /file/zip
   * @returns Archivo zip
   */
  postZip(files: File[]): Observable<any> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    //el texto se fija a la url
    let urlfinal: string = this.urlJsonServer + this.interfaz + '/zip';

    const form = new FormData;
    //debo pasar un form data form con una parametro de key "files" que contendra una lista de archivos recibidos como parametor en files
    for (let i = 0; i < files.length; i++) {
      form.append('files', files[i]);
    }

    return this.http.post(urlfinal, form,{
        headers: this.baseService.baseHeaders,
        responseType: "blob" // This tells angular to parse it as a blob, default is json
      })
      .pipe(
        //tap(_ => this.log('Num aleatorios recuperados')),
        catchError(this.baseService.handleError<Blob>('postZip', new Blob()))
      );
  }




}
