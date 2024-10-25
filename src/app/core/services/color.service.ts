/**
 * La clase que actuara coimo servicio para acceder a nuestra itnerfaz
 * API rest "coolor/"
 */
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { MessageService } from './message.service';
import { Color } from '../models/color';
import { DatosConexionService } from './datos-conexion.service';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  //La URL de la API rest
  private urlJsonServer = environment.apiUrl;
  private interfaz = '/color';

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
    //TODO: pendiente ver como gestionar mensajes
    console.info(`ColorService: ${message}`);
    if (error) {
      this.messageService.addError(`ColorService: ${message}`);
    } else {
      this.messageService.add(`ColorService: ${message}`);
    }
  }

  /**
  * Manjear fallo en operación Http
  * Mantiene la app en funcionamiento.
  *
  * @param operation - nombre de la operación fallada
  * @param result - valor opcional a retornar como resultado observable
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} fallo: ${error.message} - Error adicional: ${error.error}`, true);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * Interfaz de invocación del servicio rest para obtener colores generados aleatoriamente.
   * Interfaz: GET /color/color?results=10
   * @returns Lista de colores generados aleatoriamente
   */
  getColor(resultados: number = 1): Observable<Color[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();
    return this.http.get<Color[]>(this.urlJsonServer + this.interfaz + '/color?results=' + resultados, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Cuentas recuperados')),
        catchError(this.handleError<Color[]>('getColor', []))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para convertir hexadecimal a RGB
   * Interfaz: GET /color/hexToRgb
   * @returns Color en rgb
   */
  getHexToRgb(hexadecimal: string): Observable<string> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    //el # da problemas en la URL, podriamos reemplazarlo por %23 como ahce postman
    //pero como el servicio responde sin necesidad de llevar el #, lo eliminamos
    if (hexadecimal.indexOf('#') === 0) {
      hexadecimal = hexadecimal.substring(1);
    }

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/hexToRgb?hexa=' + hexadecimal;

    return this.http.get(urlfinal, {
      headers: this.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.handleError<string>('getHexToRgb', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para convertir hexadecimal a RGB
   * Interfaz: GET /color/rgbToHex
   * @returns Color en rgb
   */
  getRgbToHex(red: number, green: number, blue: number): Observable<string> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/rgbToHex';

    urlfinal = urlfinal + '?red=' + red + '&green=' + green + '&blue=' + blue;

    return this.http.get(urlfinal, {
      headers: this.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.handleError<string>('getRgbToHex', ''))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para aclarar color
   * Interfaz: GET /color/lighten
   * @returns Color en hexadecimal aclarado
   */
  getLighten(hexadecimal: string, cantidad: number = 0): Observable<string> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    //el # da problemas en la URL, podriamos reemplazarlo por %23 como ahce postman
    //pero como el servicio responde sin necesidad de llevar el #, lo eliminamos
    if (hexadecimal.indexOf('#') === 0) {
      hexadecimal = hexadecimal.substring(1);
    }

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/lighten?hexa=' + hexadecimal;

    urlfinal = urlfinal + '&amount=' + cantidad;

    return this.http.get(urlfinal, {
      headers: this.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.handleError<string>('getLighten', ''))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para oscurecer color
   * Interfaz: GET /color/darken
   * @returns Color en hexadecimal oscurecido
   */
  getDarken(hexadecimal: string, cantidad: number = 0): Observable<string> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    //el # da problemas en la URL, podriamos reemplazarlo por %23 como ahce postman
    //pero como el servicio responde sin necesidad de llevar el #, lo eliminamos
    if (hexadecimal.indexOf('#') === 0) {
      hexadecimal = hexadecimal.substring(1);
    }

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/darken?hexa=' + hexadecimal;

    urlfinal = urlfinal + '&amount=' + cantidad;

    return this.http.get(urlfinal, {
      headers: this.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.handleError<string>('getDarken', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para saturar un color
   * Interfaz: GET /color/saturate
   * @returns Color en hexadecimal saturado
   */
  getSaturate(hexadecimal: string, cantidad: number = 0): Observable<string> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    //el # da problemas en la URL, podriamos reemplazarlo por %23 como ahce postman
    //pero como el servicio responde sin necesidad de llevar el #, lo eliminamos
    if (hexadecimal.indexOf('#') === 0) {
      hexadecimal = hexadecimal.substring(1);
    }

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/saturate?hexa=' + hexadecimal;

    urlfinal = urlfinal + '&amount=' + cantidad;

    return this.http.get(urlfinal, {
      headers: this.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.handleError<string>('getSaturate', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para matizar un color
   * Interfaz: GET /color/hue
   * @returns Color en hexadecimal matizado
   */
  getHue(hexadecimal: string, cantidad: number = 0): Observable<string> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    //el # da problemas en la URL, podriamos reemplazarlo por %23 como ahce postman
    //pero como el servicio responde sin necesidad de llevar el #, lo eliminamos
    if (hexadecimal.indexOf('#') === 0) {
      hexadecimal = hexadecimal.substring(1);
    }

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/hue?hexa=' + hexadecimal;

    urlfinal = urlfinal + '&amount=' + cantidad;

    return this.http.get(urlfinal, {
      headers: this.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.handleError<string>('getHue', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para aplicar brillo un color
   * Interfaz: GET /color/brightness
   * @returns Color en hexadecimal aplicado brillo
   */
  getBrightness(hexadecimal: string, cantidad: number = 0): Observable<string> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    //el # da problemas en la URL, podriamos reemplazarlo por %23 como ahce postman
    //pero como el servicio responde sin necesidad de llevar el #, lo eliminamos
    if (hexadecimal.indexOf('#') === 0) {
      hexadecimal = hexadecimal.substring(1);
    }

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/brightness?hexa=' + hexadecimal;

    urlfinal = urlfinal + '&amount=' + cantidad;

    return this.http.get(urlfinal, {
      headers: this.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.handleError<string>('getBrightness', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para invertir un color
   * Interfaz: GET /color/invert
   * @returns Color en hexadecimal invertido
   */
  getInvert(hexadecimal: string): Observable<string> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    //el # da problemas en la URL, podriamos reemplazarlo por %23 como ahce postman
    //pero como el servicio responde sin necesidad de llevar el #, lo eliminamos
    if (hexadecimal.indexOf('#') === 0) {
      hexadecimal = hexadecimal.substring(1);
    }

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/invert?hexa=' + hexadecimal;


    return this.http.get(urlfinal, {
      headers: this.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.handleError<string>('getInvert', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener colores generados aleatoriamente.
   * Interfaz: GET /color/alpha
   * @returns Lista de colores generados aleatoriamente
   */
  getAlpha(hexadecimal: string, alpha: number): Observable<Color> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    //el # da problemas en la URL, podriamos reemplazarlo por %23 como ahce postman
    //pero como el servicio responde sin necesidad de llevar el #, lo eliminamos
    if (hexadecimal.indexOf('#') === 0) {
      hexadecimal = hexadecimal.substring(1);
    }

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/alpha?hexa=' + hexadecimal;

    urlfinal = urlfinal + '&alpha=' + alpha;

    return this.http.get<Color>(urlfinal, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Cuentas recuperados')),
        catchError(this.handleError<Color>('getAlpha', undefined))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para mezclar dos colores
   * Interfaz: GET /color/mix
   * @returns Color en hexadecimal mezclado
   */
  getMix(hexadecimal1: string, hexadecimal2: string, porcentaje: number): Observable<string> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

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
      headers: this.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.handleError<string>('getMix', ''))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para obtener lsita de gradiantes
   * Interfaz: GET /color/gradient
   * @returns Lista de gradiantes
   */
  getGradient(hexadecimal1: string, hexadecimal2: string, numberOfGradients: number): Observable<Color[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

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
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Cuentas recuperados')),
        catchError(this.handleError<Color[]>('getGradient', []))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para obtener lsita de monocromos
   * Interfaz: GET /color/monochrome
   * @returns Lista de monocromos
   */
  getMonochrome(hexadecimal: string, numberOfColors: number): Observable<Color[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    //el # da problemas en la URL, podriamos reemplazarlo por %23 como ahce postman
    //pero como el servicio responde sin necesidad de llevar el #, lo eliminamos
    if (hexadecimal.indexOf('#') === 0) {
      hexadecimal = hexadecimal.substring(1);
    }

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/monochrome?hexa=' + hexadecimal;
    urlfinal = urlfinal + '&numberOfColors=' + numberOfColors;

    return this.http.get<Color[]>(urlfinal, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Cuentas recuperados')),
        catchError(this.handleError<Color[]>('getMonochrome', []))
      );
  }


}
