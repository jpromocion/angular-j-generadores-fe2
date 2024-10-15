/**
 * La clase que actuara coimo servicio para acceder a nuestra itnerfaz
 * API rest "number/"
 */
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { MessageService } from './message.service';
import { DatosConexionService } from './datos-conexion.service';

@Injectable({
  providedIn: 'root'
})
export class NumberService {


  //La URL de la API rest
  private urlJsonServer = environment.apiUrl;
  private interfaz = '/number';

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
    console.info(`NumberService: ${message}`);
    if (error) {
      this.messageService.addError(`NumberService: ${message}`);
    } else {
      this.messageService.add(`NumberService: ${message}`);
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

      console.error(error); // log to console instead

      this.log(`${operation} fallo: ${error.message} - Error adicional: ${error.error}`, true);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * Interfaz de invocación del servicio rest para obtener numeros aleatorios.
   * Interfaz: GET /number/random
   * @returns Lista de numeros aleatorios
   */
  getRandom(resultados: number = 1, minimo: number = 0, maximo: number = 0, decimales: String = 'n', repetidos: String = 'y'): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/random?results=' + resultados;

    urlfinal = urlfinal + '&minimum=' + minimo;

    urlfinal = urlfinal + '&maximum=' + maximo;

    if (decimales != '') {
      urlfinal = urlfinal + '&decimals=' + decimales;
    }

    if (repetidos != '') {
      urlfinal = urlfinal + '&repeated=' + repetidos;
    }

    return this.http.get<string[]>(urlfinal, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Num aleatorios recuperados')),
        catchError(this.handleError<string[]>('getRandom', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener secuencia cara/cruz de moneda.
   * Interfaz: GET /number/coin
   * @returns Lista de valores cara/cruz de moneda
   */
  getCoin(resultados: number = 1, simboloCara: String = '', simboloCruz: String = ''): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/coin?results=' + resultados;

    if (simboloCara != '') {
      urlfinal = urlfinal + '&faceSymbol=' + simboloCara;
    }

    if (simboloCruz != '') {
      urlfinal = urlfinal + '&crossSymbol=' + simboloCruz;
    }

    return this.http.get<string[]>(urlfinal, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Tiradas de moneda recuperadas')),
        catchError(this.handleError<string[]>('getCoin', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener secuencia de tiradas de dado
   * Interfaz: GET /number/dice
   * @returns Lista de valores resultado de tiradas de dado
   */
  getDice(resultados: number = 1): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/dice?results=' + resultados;

    return this.http.get<string[]>(urlfinal, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Tiradas de dado recuperadas')),
        catchError(this.handleError<string[]>('getDice', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener numeros aleatorios por gauss.
   * Interfaz: GET /number/gauss
   * @returns Lista de numeros aleatorios por gauss
   */
  getGauss(resultados: number = 1, media: number = 0, desviacion: number = 1, decimales: number = 5): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/gauss?results=' + resultados;

    urlfinal = urlfinal + '&mean=' + media;

    urlfinal = urlfinal + '&standardDeviation=' + desviacion;

    if (decimales >= 0) {
      urlfinal = urlfinal + '&decimals=' + decimales;
    }


    return this.http.get<string[]>(urlfinal, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Num aleatorios por gauss recuperados')),
        catchError(this.handleError<string[]>('getGauss', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para hacer una operacion de calculadora
   * Interfaz: GET /number/calculator
   * @returns Cadena con resultado de la operacion
   */
  getCalculator(operando: string, numero1: number = 0, numero2: number = 0, decimales: number = 2): Observable<string>  {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/calculator?operand=' + operando;

    urlfinal = urlfinal + '&number1=' + numero1;

    urlfinal = urlfinal + '&number2=' + numero2;

    if (decimales >= 0) {
      urlfinal = urlfinal + '&decimals=' + decimales;
    }

    return this.http.get(urlfinal, {
      headers: this.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Resultado operación recuperado')),
        catchError(this.handleError<string>('getCalculator', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para hacer una regla de 3 directa o inversa
   * Interfaz: GET /number/proportion
   * @returns Cadena con resultado de la operacion
   */
  getProportion(numeroA: number = 0, numeroB: number = 0, numeroC: number = 0, directa: String = 'y', decimales: number = 2): Observable<string>  {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/proportion?numberA=' + numeroA;

    urlfinal = urlfinal + '&numberB=' + numeroB;
    urlfinal = urlfinal + '&numberC=' + numeroC;

    if (directa != '') {
      urlfinal = urlfinal + '&direct=' + directa;
    }

    if (decimales >= 0) {
      urlfinal = urlfinal + '&decimals=' + decimales;
    }

    return this.http.get(urlfinal, {
      headers: this.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Resultado proporción recuperado')),
        catchError(this.handleError<string>('getProportion', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para hacer un calculo de area
   * Interfaz: GET /number/area
   * @returns Cadena con resultado de la operacion
   */
  getArea(tipo: String = 'cuadrado', numeroA: number = 0, numeroB: number = 0, numeroC: number = 0, decimales: number = 2): Observable<string>  {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/area?type=' + tipo;

    urlfinal = urlfinal + '&numberA=' + numeroA;

    urlfinal = urlfinal + '&numberB=' + numeroB;

    urlfinal = urlfinal + '&numberC=' + numeroC;


    if (decimales >= 0) {
      urlfinal = urlfinal + '&decimals=' + decimales;
    }

    return this.http.get(urlfinal, {
      headers: this.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Area recuperada')),
        catchError(this.handleError<string>('getArea', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para convertir grados en radianes
   * Interfaz: GET /number/degreesToRadians
   * @returns Cadena con resultado de la operacion
   */
  getDegreesToRadians(grados: number = 0, decimales: number = 2): Observable<string>  {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/degreesToRadians?degrees=' + grados;

    if (decimales >= 0) {
      urlfinal = urlfinal + '&decimals=' + decimales;
    }

    return this.http.get(urlfinal, {
      headers: this.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Radianes recuperada')),
        catchError(this.handleError<string>('getDegreesToRadians', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para convertir radianes en grados
   * Interfaz: GET /number/radiansToDegrees
   * @returns Cadena con resultado de la operacion
   */
  getRadiansToDegrees(radianes: number = 0, decimales: number = 2): Observable<string>  {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/radiansToDegrees?radians=' + radianes;

    if (decimales >= 0) {
      urlfinal = urlfinal + '&decimals=' + decimales;
    }

    return this.http.get(urlfinal, {
      headers: this.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Grados recuperada')),
        catchError(this.handleError<string>('getRadiansToDegrees', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para hacer un calculo trigonometrico
   * Interfaz: GET /number/trigonometric
   * @returns Cadena con resultado de la operacion
   */
  getTrigonometric(tipo: String = 'seno', numero: number = 0, tipoNumero: String = 'radianes', decimales: number = 2): Observable<string>  {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/trigonometric?type=' + tipo;

    urlfinal = urlfinal + '&number=' + numero;

    if (tipoNumero != '') {
      urlfinal = urlfinal + '&typeNumber=' + tipoNumero;
    }

    if (decimales >= 0) {
      urlfinal = urlfinal + '&decimals=' + decimales;
    }

    return this.http.get(urlfinal, {
      headers: this.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Cálculo trigonometrico recuperado')),
        catchError(this.handleError<string>('getTrigonometric', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para hacer un cambio de base númerica
   * Interfaz: GET /number/baseConverter
   * @returns Cadena con resultado de la operacion
   */
  getBaseConverter(numero: String = '', baseOrigen: number = 10, baseDestino: number = 10): Observable<string>  {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/baseConverter?number=' + numero;

    urlfinal = urlfinal + '&baseFrom=' + baseOrigen;

    urlfinal = urlfinal + '&baseTo=' + baseDestino;

    return this.http.get(urlfinal, {
      headers: this.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Cambio base recuperado')),
        catchError(this.handleError<string>('getBaseConverter', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para convertir numeros arabigos en romanos
   * Interfaz: GET /number/arabicToRoman
   * @returns Cadena con resultado de la operacion
   */
  getArabicToRoman(numero: number = 0): Observable<string>  {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/arabicToRoman?number=' + numero;

    return this.http.get(urlfinal, {
      headers: this.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Romano recuperado')),
        catchError(this.handleError<string>('getArabicToRoman', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para convertir numeros romanos en arabigos
   * Interfaz: GET /number/romanToArabic
   * @returns Cadena con resultado de la operacion
   */
  getRomanToArabic(numero: String = 'I'): Observable<string>  {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/romanToArabic?number=' + numero;

    return this.http.get(urlfinal, {
      headers: this.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Arabigo recuperado')),
        catchError(this.handleError<string>('getRomanToArabic', ''))
      );
  }



}
