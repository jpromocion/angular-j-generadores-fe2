/**
 * La clase que actuara coimo servicio para acceder a nuestra itnerfaz
 * API rest "barcodes/"
 */
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BarcodesService {
  nombreSimpleServicio: string = 'BarcodesService';

  //La URL de la API rest
  private urlJsonServer = environment.apiUrl;
  private interfaz = '/barcodes';

  //inyectamos el servicio HTTP
  private http: HttpClient = inject(HttpClient);
  //inyectamos baseservice para utilizar como padre, de forma mas "angular" en vez de extender la clase con herencia
  private baseService: BaseService = inject(BaseService);

  constructor() {
    this.baseService.nombreServicioMensaje = this.nombreSimpleServicio;
  }



  /**
   * Interfaz de invocación del servicio rest para obtener codigo de barras UPCA
   * Interfaz: GET /barcodes/upca
   * @returns Lista de numeros aleatorios
   */
  getUpca(barcode: string, width: number = 0, height: number = 0): Observable<any> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

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

    this.baseService.baseHeaders = this.baseService.baseHeaders.set('Accept', 'image/png');

    return this.http.get(urlfinal, {
        headers: this.baseService.baseHeaders,
        responseType: "blob" // This tells angular to parse it as a blob, default is json
      })
      .pipe(
        //tap(_ => this.log('Num aleatorios recuperados')),
        catchError(this.baseService.handleError<Blob>('getUpca', new Blob()))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener codigo de barras UPCE
   * Interfaz: GET /barcodes/upce
   * @returns Lista de numeros aleatorios
   */
  getUpcE(barcode: string, width: number = 0, height: number = 0): Observable<any> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

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

    this.baseService.baseHeaders = this.baseService.baseHeaders.set('Accept', 'image/png');

    return this.http.get(urlfinal, {
        headers: this.baseService.baseHeaders,
        responseType: "blob" // This tells angular to parse it as a blob, default is json
      })
      .pipe(
        //tap(_ => this.log('Num aleatorios recuperados')),
        catchError(this.baseService.handleError<Blob>('getUpcE', new Blob()))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para obtener codigo de barras EAN-13
   * Interfaz: GET /barcodes/ean13
   * @returns Lista de numeros aleatorios
   */
  getEan13(barcode: string, width: number = 0, height: number = 0): Observable<any> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

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

    this.baseService.baseHeaders = this.baseService.baseHeaders.set('Accept', 'image/png');

    return this.http.get(urlfinal, {
        headers: this.baseService.baseHeaders,
        responseType: "blob" // This tells angular to parse it as a blob, default is json
      })
      .pipe(
        //tap(_ => this.log('Num aleatorios recuperados')),
        catchError(this.baseService.handleError<Blob>('getEan13', new Blob()))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener codigo de barras 128
   * Interfaz: POST /barcodes/code128
   * @returns Lista de numeros aleatorios
   */
  postCode128(barcode: string, width: number = 0, height: number = 0): Observable<any> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

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

    this.baseService.baseHeaders = this.baseService.baseHeaders.set('Accept', 'image/png');

    return this.http.post(urlfinal, barcode,{
        headers: this.baseService.baseHeaders,
        responseType: "blob" // This tells angular to parse it as a blob, default is json
      })
      .pipe(
        //tap(_ => this.log('Num aleatorios recuperados')),
        catchError(this.baseService.handleError<Blob>('getCode128', new Blob()))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para obtener codigo de barras pdf417
   * Interfaz: POST /barcodes/pdf417
   * @returns Lista de numeros aleatorios
   */
  postPdf417(barcode: string, width: number = 0, height: number = 0): Observable<any> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

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

    this.baseService.baseHeaders = this.baseService.baseHeaders.set('Accept', 'image/png');

    return this.http.post(urlfinal, barcode,{
        headers: this.baseService.baseHeaders,
        responseType: "blob" // This tells angular to parse it as a blob, default is json
      })
      .pipe(
        //tap(_ => this.log('Num aleatorios recuperados')),
        catchError(this.baseService.handleError<Blob>('postPdf417', new Blob()))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para obtener codigo QR
   * Interfaz: POST /barcodes/qrcode
   * @returns Lista de numeros aleatorios
   */
  postQrcode(barcode: string, width: number = 0, height: number = 0, toptext: string = '', bottomtext: string = ''): Observable<any> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

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

    this.baseService.baseHeaders = this.baseService.baseHeaders.set('Accept', 'image/png');

    return this.http.post(urlfinal, barcode,{
        headers: this.baseService.baseHeaders,
        responseType: "blob" // This tells angular to parse it as a blob, default is json
      })
      .pipe(
        //tap(_ => this.log('Num aleatorios recuperados')),
        catchError(this.baseService.handleError<Blob>('postQrcode', new Blob()))
      );
  }

}
