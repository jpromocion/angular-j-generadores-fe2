/**
 * La clase que actuara coimo servicio para acceder a nuestra itnerfaz
 * API rest "barcodes/"
 */
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { MessageService } from './message.service';
import { DatosConexionService } from './datos-conexion.service';


@Injectable({
  providedIn: 'root'
})
export class BarcodesService {


  //La URL de la API rest
  private urlJsonServer = environment.apiUrl;
  private interfaz = '/barcodes';

  baseHeaders = new HttpHeaders().set('X-API-KEY', '');

  //inyectamos el servicio HTTP
  private http: HttpClient = inject(HttpClient);
  //inyeccion de dependencias para que a su vez pueda hacer uso del servicio de mensajes
  messageService: MessageService = inject(MessageService);

  //inyectamos el servicio de datos conexion, para obtener la api-key que fija el componente padre
  //de todo app
  private datosConexionService: DatosConexionService = inject(DatosConexionService);

  constructor() { }


  /**
   * Fijar la apyKey
   * @param apiKeyIn
   */
  private setApiKey(apiKeyIn: string) {
    this.baseHeaders = new HttpHeaders().set('X-API-KEY', apiKeyIn);
  }

  /**
   * Fijar la api-key del servicio de datos conexion
   */
  private fijarApiKeyServicio() {
    this.setApiKey(this.datosConexionService.getApiKey());
  }

  /**
   * Loguear un mensaje en el servicio de mensajes
   * @param message
   */
  private log(message: string, error: boolean = false) {
    console.info(`BarcodesService: ${message}`);
    if (error) {
      this.messageService.addError(`BarcodesService: ${message}`);
    } else {
      this.messageService.add(`BarcodesService: ${message}`);
    }
  }

  /**
  * Manjear fallo en operación Http
  * Mantiene la app en funcionamiento.
  *
  * @param operation - nombre de la operación fallada
  * @param result - valor opcional a retornar como resultado observable
  */
  private handleError<T>(operation = 'operation', result: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} fallo: ${error.message} - Error adicional: ${error.error}`, true);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * Interfaz de invocación del servicio rest para obtener codigo de barras UPCA
   * Interfaz: GET /barcodes/upca
   * @returns Lista de numeros aleatorios
   */
  getUpca(barcode: string, width: number = 0, height: number = 0): Observable<any> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    //el texto se fija a la url
    let urlfinal: string = this.urlJsonServer + this.interfaz + '/upca/' + barcode;

    if (width > 0 || height > 0) {
      urlfinal = urlfinal + '?';
    }

    if (width > 0) {
      if (urlfinal.charAt(urlfinal.length - 1) != '?') {
        urlfinal = urlfinal + '&';
      }
      urlfinal = urlfinal + 'width=' + width;
    }

    if (height > 0) {
      if (urlfinal.charAt(urlfinal.length - 1) != '?') {
        urlfinal = urlfinal + '&';
      }
      urlfinal = urlfinal + 'height=' + height;
    }

    this.baseHeaders = this.baseHeaders.set('Accept', 'image/png');

    return this.http.get(urlfinal, {
        headers: this.baseHeaders,
        responseType: "blob" // This tells angular to parse it as a blob, default is json
      })
      .pipe(
        //tap(_ => this.log('Num aleatorios recuperados')),
        catchError(this.handleError<Blob>('getUpca', new Blob()))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener codigo de barras UPCE
   * Interfaz: GET /barcodes/upce
   * @returns Lista de numeros aleatorios
   */
  getUpcE(barcode: string, width: number = 0, height: number = 0): Observable<any> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    //el texto se fija a la url
    let urlfinal: string = this.urlJsonServer + this.interfaz + '/upce/' + barcode;

    if (width > 0 || height > 0) {
      urlfinal = urlfinal + '?';
    }


    if (width > 0) {
      if (urlfinal.charAt(urlfinal.length - 1) != '?') {
        urlfinal = urlfinal + '&';
      }
      urlfinal = urlfinal + 'width=' + width;
    }

    if (height > 0) {
      if (urlfinal.charAt(urlfinal.length - 1) != '?') {
        urlfinal = urlfinal + '&';
      }
      urlfinal = urlfinal + 'height=' + height;
    }

    this.baseHeaders = this.baseHeaders.set('Accept', 'image/png');

    return this.http.get(urlfinal, {
        headers: this.baseHeaders,
        responseType: "blob" // This tells angular to parse it as a blob, default is json
      })
      .pipe(
        //tap(_ => this.log('Num aleatorios recuperados')),
        catchError(this.handleError<Blob>('getUpcE', new Blob()))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para obtener codigo de barras EAN-13
   * Interfaz: GET /barcodes/ean13
   * @returns Lista de numeros aleatorios
   */
  getEan13(barcode: string, width: number = 0, height: number = 0): Observable<any> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    //el texto se fija a la url
    let urlfinal: string = this.urlJsonServer + this.interfaz + '/ean13/' + barcode;

    if (width > 0 || height > 0) {
      urlfinal = urlfinal + '?';
    }

    if (width > 0) {
      if (urlfinal.charAt(urlfinal.length - 1) != '?') {
        urlfinal = urlfinal + '&';
      }
      urlfinal = urlfinal + 'width=' + width;
    }

    if (height > 0) {
      if (urlfinal.charAt(urlfinal.length - 1) != '?') {
        urlfinal = urlfinal + '&';
      }
      urlfinal = urlfinal + 'height=' + height;
    }

    this.baseHeaders = this.baseHeaders.set('Accept', 'image/png');

    return this.http.get(urlfinal, {
        headers: this.baseHeaders,
        responseType: "blob" // This tells angular to parse it as a blob, default is json
      })
      .pipe(
        //tap(_ => this.log('Num aleatorios recuperados')),
        catchError(this.handleError<Blob>('getEan13', new Blob()))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener codigo de barras 128
   * Interfaz: POST /barcodes/code128
   * @returns Lista de numeros aleatorios
   */
  postCode128(barcode: string, width: number = 0, height: number = 0): Observable<any> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    //el texto se fija a la url
    let urlfinal: string = this.urlJsonServer + this.interfaz + '/code128';

    if (width > 0 || height > 0) {
      urlfinal = urlfinal + '?';
    }

    if (width > 0) {
      if (urlfinal.charAt(urlfinal.length - 1) != '?') {
        urlfinal = urlfinal + '&';
      }
      urlfinal = urlfinal + 'width=' + width;
    }

    if (height > 0) {
      if (urlfinal.charAt(urlfinal.length - 1) != '?') {
        urlfinal = urlfinal + '&';
      }
      urlfinal = urlfinal + 'height=' + height;
    }

    this.baseHeaders = this.baseHeaders.set('Accept', 'image/png');

    return this.http.post(urlfinal, barcode,{
        headers: this.baseHeaders,
        responseType: "blob" // This tells angular to parse it as a blob, default is json
      })
      .pipe(
        //tap(_ => this.log('Num aleatorios recuperados')),
        catchError(this.handleError<Blob>('getCode128', new Blob()))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para obtener codigo de barras pdf417
   * Interfaz: POST /barcodes/pdf417
   * @returns Lista de numeros aleatorios
   */
  postPdf417(barcode: string, width: number = 0, height: number = 0): Observable<any> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    //el texto se fija a la url
    let urlfinal: string = this.urlJsonServer + this.interfaz + '/pdf417';

    if (width > 0 || height > 0) {
      urlfinal = urlfinal + '?';
    }

    if (width > 0) {
      if (urlfinal.charAt(urlfinal.length - 1) != '?') {
        urlfinal = urlfinal + '&';
      }
      urlfinal = urlfinal + 'width=' + width;
    }

    if (height > 0) {
      if (urlfinal.charAt(urlfinal.length - 1) != '?') {
        urlfinal = urlfinal + '&';
      }
      urlfinal = urlfinal + 'height=' + height;
    }

    this.baseHeaders = this.baseHeaders.set('Accept', 'image/png');

    return this.http.post(urlfinal, barcode,{
        headers: this.baseHeaders,
        responseType: "blob" // This tells angular to parse it as a blob, default is json
      })
      .pipe(
        //tap(_ => this.log('Num aleatorios recuperados')),
        catchError(this.handleError<Blob>('postPdf417', new Blob()))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para obtener codigo QR
   * Interfaz: POST /barcodes/qrcode
   * @returns Lista de numeros aleatorios
   */
  postQrcode(barcode: string, width: number = 0, height: number = 0, toptext: string = '', bottomtext: string = ''): Observable<any> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    //el texto se fija a la url
    let urlfinal: string = this.urlJsonServer + this.interfaz + '/qrcode';

    if (width > 0 || height > 0 || toptext != '' || bottomtext != '') {
      urlfinal = urlfinal + '?';
    }

    if (width > 0) {
      if (urlfinal.charAt(urlfinal.length - 1) != '?') {
        urlfinal = urlfinal + '&';
      }
      urlfinal = urlfinal + 'width=' + width;
    }

    if (height > 0) {
      if (urlfinal.charAt(urlfinal.length - 1) != '?') {
        urlfinal = urlfinal + '&';
      }
      urlfinal = urlfinal + 'height=' + height;
    }

    if (toptext != '') {
      if (urlfinal.charAt(urlfinal.length - 1) != '?') {
        urlfinal = urlfinal + '&';
      }
      urlfinal = urlfinal + 'toptext=' + toptext;
    }

    if (bottomtext != '') {
      if (urlfinal.charAt(urlfinal.length - 1) != '?') {
        urlfinal = urlfinal + '&';
      }
      urlfinal = urlfinal + 'bottomtext=' + bottomtext;
    }

    this.baseHeaders = this.baseHeaders.set('Accept', 'image/png');

    return this.http.post(urlfinal, barcode,{
        headers: this.baseHeaders,
        responseType: "blob" // This tells angular to parse it as a blob, default is json
      })
      .pipe(
        //tap(_ => this.log('Num aleatorios recuperados')),
        catchError(this.handleError<Blob>('postQrcode', new Blob()))
      );
  }

}
