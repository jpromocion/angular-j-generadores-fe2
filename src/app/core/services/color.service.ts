/**
 * La clase que actuara coimo servicio para acceder a nuestra itnerfaz
 * API rest "coolor/"
 */
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Color } from '../models/color';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  nombreSimpleServicio: string = 'ColorService';

  //La URL de la API rest
  private urlJsonServer = environment.apiUrl;
  private interfaz = '/color';

  //inyectamos el servicio HTTP
  private http: HttpClient = inject(HttpClient);
  //inyectamos baseservice para utilizar como padre, de forma mas "angular" en vez de extender la clase con herencia
  private baseService: BaseService = inject(BaseService);


  constructor() {
    this.baseService.nombreServicioMensaje = this.nombreSimpleServicio;
  }


  /**
   * Interfaz de invocación del servicio rest para obtener colores generados aleatoriamente.
   * Interfaz: GET /color/color?results=10
   * @returns Lista de colores generados aleatoriamente
   */
  getColor(resultados: number = 1): Observable<Color[]> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();
    return this.http.get<Color[]>(this.urlJsonServer + this.interfaz + '/color?results=' + resultados, {
      headers: this.baseService.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Cuentas recuperados')),
        catchError(this.baseService.handleError<Color[]>('getColor', []))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para convertir hexadecimal a RGB
   * Interfaz: GET /color/hexToRgb
   * @returns Color en rgb
   */
  getHexToRgb(hexadecimal: string): Observable<string> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    //el # da problemas en la URL, podriamos reemplazarlo por %23 como ahce postman
    //pero como el servicio responde sin necesidad de llevar el #, lo eliminamos
    if (hexadecimal.indexOf('#') === 0) {
      hexadecimal = hexadecimal.substring(1);
    }

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/hexToRgb?hexa=' + hexadecimal;

    return this.http.get(urlfinal, {
      headers: this.baseService.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.baseService.handleError<string>('getHexToRgb', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para convertir hexadecimal a RGB
   * Interfaz: GET /color/rgbToHex
   * @returns Color en rgb
   */
  getRgbToHex(red: number, green: number, blue: number): Observable<string> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/rgbToHex';

    urlfinal = urlfinal + '?red=' + red + '&green=' + green + '&blue=' + blue;

    return this.http.get(urlfinal, {
      headers: this.baseService.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.baseService.handleError<string>('getRgbToHex', ''))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para aclarar color
   * Interfaz: GET /color/lighten
   * @returns Color en hexadecimal aclarado
   */
  getLighten(hexadecimal: string, cantidad: number = 0): Observable<string> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    //el # da problemas en la URL, podriamos reemplazarlo por %23 como ahce postman
    //pero como el servicio responde sin necesidad de llevar el #, lo eliminamos
    if (hexadecimal.indexOf('#') === 0) {
      hexadecimal = hexadecimal.substring(1);
    }

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/lighten?hexa=' + hexadecimal;

    urlfinal = urlfinal + '&amount=' + cantidad;

    return this.http.get(urlfinal, {
      headers: this.baseService.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.baseService.handleError<string>('getLighten', ''))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para oscurecer color
   * Interfaz: GET /color/darken
   * @returns Color en hexadecimal oscurecido
   */
  getDarken(hexadecimal: string, cantidad: number = 0): Observable<string> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    //el # da problemas en la URL, podriamos reemplazarlo por %23 como ahce postman
    //pero como el servicio responde sin necesidad de llevar el #, lo eliminamos
    if (hexadecimal.indexOf('#') === 0) {
      hexadecimal = hexadecimal.substring(1);
    }

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/darken?hexa=' + hexadecimal;

    urlfinal = urlfinal + '&amount=' + cantidad;

    return this.http.get(urlfinal, {
      headers: this.baseService.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.baseService.handleError<string>('getDarken', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para saturar un color
   * Interfaz: GET /color/saturate
   * @returns Color en hexadecimal saturado
   */
  getSaturate(hexadecimal: string, cantidad: number = 0): Observable<string> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    //el # da problemas en la URL, podriamos reemplazarlo por %23 como ahce postman
    //pero como el servicio responde sin necesidad de llevar el #, lo eliminamos
    if (hexadecimal.indexOf('#') === 0) {
      hexadecimal = hexadecimal.substring(1);
    }

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/saturate?hexa=' + hexadecimal;

    urlfinal = urlfinal + '&amount=' + cantidad;

    return this.http.get(urlfinal, {
      headers: this.baseService.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.baseService.handleError<string>('getSaturate', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para matizar un color
   * Interfaz: GET /color/hue
   * @returns Color en hexadecimal matizado
   */
  getHue(hexadecimal: string, cantidad: number = 0): Observable<string> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    //el # da problemas en la URL, podriamos reemplazarlo por %23 como ahce postman
    //pero como el servicio responde sin necesidad de llevar el #, lo eliminamos
    if (hexadecimal.indexOf('#') === 0) {
      hexadecimal = hexadecimal.substring(1);
    }

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/hue?hexa=' + hexadecimal;

    urlfinal = urlfinal + '&amount=' + cantidad;

    return this.http.get(urlfinal, {
      headers: this.baseService.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.baseService.handleError<string>('getHue', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para aplicar brillo un color
   * Interfaz: GET /color/brightness
   * @returns Color en hexadecimal aplicado brillo
   */
  getBrightness(hexadecimal: string, cantidad: number = 0): Observable<string> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    //el # da problemas en la URL, podriamos reemplazarlo por %23 como ahce postman
    //pero como el servicio responde sin necesidad de llevar el #, lo eliminamos
    if (hexadecimal.indexOf('#') === 0) {
      hexadecimal = hexadecimal.substring(1);
    }

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/brightness?hexa=' + hexadecimal;

    urlfinal = urlfinal + '&amount=' + cantidad;

    return this.http.get(urlfinal, {
      headers: this.baseService.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.baseService.handleError<string>('getBrightness', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para invertir un color
   * Interfaz: GET /color/invert
   * @returns Color en hexadecimal invertido
   */
  getInvert(hexadecimal: string): Observable<string> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    //el # da problemas en la URL, podriamos reemplazarlo por %23 como ahce postman
    //pero como el servicio responde sin necesidad de llevar el #, lo eliminamos
    if (hexadecimal.indexOf('#') === 0) {
      hexadecimal = hexadecimal.substring(1);
    }

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/invert?hexa=' + hexadecimal;


    return this.http.get(urlfinal, {
      headers: this.baseService.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.baseService.handleError<string>('getInvert', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener colores generados aleatoriamente.
   * Interfaz: GET /color/alpha
   * @returns Lista de colores generados aleatoriamente
   */
  getAlpha(hexadecimal: string, alpha: number): Observable<Color> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    //el # da problemas en la URL, podriamos reemplazarlo por %23 como ahce postman
    //pero como el servicio responde sin necesidad de llevar el #, lo eliminamos
    if (hexadecimal.indexOf('#') === 0) {
      hexadecimal = hexadecimal.substring(1);
    }

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/alpha?hexa=' + hexadecimal;

    urlfinal = urlfinal + '&alpha=' + alpha;

    return this.http.get<Color>(urlfinal, {
      headers: this.baseService.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Cuentas recuperados')),
        catchError(this.baseService.handleError<Color>('getAlpha', undefined))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para mezclar dos colores
   * Interfaz: GET /color/mix
   * @returns Color en hexadecimal mezclado
   */
  getMix(hexadecimal1: string, hexadecimal2: string, porcentaje: number): Observable<string> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    //el # da problemas en la URL, podriamos reemplazarlo por %23 como ahce postman
    //pero como el servicio responde sin necesidad de llevar el #, lo eliminamos
    if (hexadecimal1.indexOf('#') === 0) {
      hexadecimal1 = hexadecimal1.substring(1);
    }
    if (hexadecimal2.indexOf('#') === 0) {
      hexadecimal2 = hexadecimal2.substring(1);
    }

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/mix?hexa1=' + hexadecimal1;
    urlfinal = urlfinal + '&hexa2=' + hexadecimal2;
    urlfinal = urlfinal + '&amount=' + porcentaje;

    return this.http.get(urlfinal, {
      headers: this.baseService.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.baseService.handleError<string>('getMix', ''))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para obtener lsita de gradiantes
   * Interfaz: GET /color/gradient
   * @returns Lista de gradiantes
   */
  getGradient(hexadecimal1: string, hexadecimal2: string, numberOfGradients: number): Observable<Color[]> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    //el # da problemas en la URL, podriamos reemplazarlo por %23 como ahce postman
    //pero como el servicio responde sin necesidad de llevar el #, lo eliminamos
    if (hexadecimal1.indexOf('#') === 0) {
      hexadecimal1 = hexadecimal1.substring(1);
    }
    if (hexadecimal2.indexOf('#') === 0) {
      hexadecimal2 = hexadecimal2.substring(1);
    }

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/gradient?hexa1=' + hexadecimal1;
    urlfinal = urlfinal + '&hexa2=' + hexadecimal2;
    urlfinal = urlfinal + '&numberOfGradients=' + numberOfGradients;

    return this.http.get<Color[]>(urlfinal, {
      headers: this.baseService.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Cuentas recuperados')),
        catchError(this.baseService.handleError<Color[]>('getGradient', []))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para obtener lsita de monocromos
   * Interfaz: GET /color/monochrome
   * @returns Lista de monocromos
   */
  getMonochrome(hexadecimal: string, numberOfColors: number): Observable<Color[]> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    //el # da problemas en la URL, podriamos reemplazarlo por %23 como ahce postman
    //pero como el servicio responde sin necesidad de llevar el #, lo eliminamos
    if (hexadecimal.indexOf('#') === 0) {
      hexadecimal = hexadecimal.substring(1);
    }

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/monochrome?hexa=' + hexadecimal;
    urlfinal = urlfinal + '&numberOfColors=' + numberOfColors;

    return this.http.get<Color[]>(urlfinal, {
      headers: this.baseService.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Cuentas recuperados')),
        catchError(this.baseService.handleError<Color[]>('getMonochrome', []))
      );
  }


}
