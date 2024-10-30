/**
 * La clase que actuara coimo servicio para acceder a nuestra itnerfaz
 * API rest "date/"
 */
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { MessageService } from './message.service';
import { DatosConexionService } from './datos-conexion.service';
import { Edad } from '../models/edad';
import { Tiempounix } from '../models/tiempounix';
import { Pascua } from '../models/pascua';


@Injectable({
  providedIn: 'root'
})
export class DateService {



  //La URL de la API rest
  private urlJsonServer = environment.apiUrl;
  private interfaz = '/date';

  baseHeaders = new HttpHeaders().set('X-API-KEY', '');

  //inyectamos el servicio HTTP
  private http: HttpClient = inject(HttpClient);
  //inyeccion de dependencias para que a su vez pueda hacer uso del servicio de mensajes
  messageService: MessageService = inject(MessageService);

  //inyectamos el servicio de datos conexion, para obtener la api-key que fija el componente padre
  //de todo app
  private datosConexionService: DatosConexionService = inject(DatosConexionService);

  constructor () {
  }

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

  /** Log a HeroService message with the MessageService */
  /**
   * Loguear un mensaje en el servicio de mensajes
   * @param message
   */
  private log(message: string, error: boolean = false) {
    console.info(`DateService: ${message}`);
    if (error) {
      this.messageService.addError(`DateService: ${message}`);
    } else {
      this.messageService.add(`DateService: ${message}`);
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
   * Interfaz de invocación del servicio rest para obtener Fec. nacimiento generados aleatoriamente.
   * Interfaz: GET /date/birthdate?results=10
   * @returns Lista de Fec. nacimiento generados aleatoriamente
   */
  getBirthDate(resultados: number = 1): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/birthdate?results=' + resultados;

    return this.http.get<string[]>(urlfinal, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Fec. nacimiento recuperados')),
        catchError(this.handleError<string[]>('getBirthDate', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener Fec. futuras generados aleatoriamente.
   * Interfaz: GET /date/futuredate?results=10
   * @returns Lista de Fec. futuras generados aleatoriamente
   */
  getFutureDate(resultados: number = 1): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/futuredate?results=' + resultados;

    return this.http.get<string[]>(urlfinal, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Fec. futuras recuperados')),
        catchError(this.handleError<string[]>('getFutureDate', []))
      );
  }


  /**
   * Funcion que recibe un Date y devuelve la fecha en formato dd/MM/yyyy HH:mm:ss
   * que utilizaremos para los servicios
   * @param fecha
   */
  private formatearFecha(fecha: Date): string {
    return ('0' + fecha.getDate()).slice(-2) + '/' +
      ('0' + (fecha.getMonth() + 1)).slice(-2) + '/' +
      fecha.getFullYear() + ' ' +
      ('0' + fecha.getHours()).slice(-2) + ':' +
      ('0' + fecha.getMinutes()).slice(-2) + ':' +
      ('0' + fecha.getSeconds()).slice(-2);
  }

  /**
   * Interfaz de invocación del servicio rest para obtener edad
   * Interfaz: GET /date/age
   * @returns Objeto con los datos de edad
   */
  getAge(fechaNacimiento: Date): Observable<Edad> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    //formatear a dd/MM/yyyy HH:mm:ss asignando a una cadena
    let fechaNacimientoCad = this.formatearFecha(fechaNacimiento);

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/age?birthDate=' + fechaNacimientoCad;

    return this.http.get<Edad>(urlfinal, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Fec. futuras recuperados')),
        catchError(this.handleError<Edad>('getAge', undefined))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener la diferencia entre dos fechas
   * Interfaz: GET /date/datediff
   * @returns Objeto edad con los datos de diferencia entre dos fechas
   */
  getDateDiff(startDate: Date, endDate: Date): Observable<Edad> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    //formatear a dd/MM/yyyy HH:mm:ss asignando a una cadena
    let startDateCad = this.formatearFecha(startDate);
    let endDateCad = this.formatearFecha(endDate);

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/datediff?startDate=' + startDateCad + '&endDate=' + endDateCad;

    return this.http.get<Edad>(urlfinal, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Fec. futuras recuperados')),
        catchError(this.handleError<Edad>('getDateDiff', undefined))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para obtener la diferencia entre dos fechas
   * Interfaz: GET /date/dateoperation
   * @returns Objeto edad con los datos de diferencia entre dos fechas
   */
  getDateoperation(date: Date, operation: String, years: number = 0, months: number = 0, days: number = 0,
    hours: number = 0, minutes: number = 0, seconds: number = 0): Observable<String> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    //formatear a dd/MM/yyyy HH:mm:ss asignando a una cadena
    let dateCad = this.formatearFecha(date);

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/dateoperation?date=' + dateCad +
      '&operation=' + operation + '&years=' + years + '&months=' + months + '&days=' + days +
      '&hours=' + hours + '&minutes=' + minutes + '&seconds=' + seconds;

    return this.http.get(urlfinal, {
      headers: this.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Fec. futuras recuperados')),
        catchError(this.handleError<String>('getDateoperation', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener el dia de la semana
   * Interfaz: GET /date/dayofweek
   * @returns Dia de la semana
   */
  getDayofweek(date: Date): Observable<string> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    //formatear a dd/MM/yyyy HH:mm:ss asignando a una cadena
    let dateCad = this.formatearFecha(date);

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/dayofweek?date=' + dateCad;

    return this.http.get(urlfinal, {
      headers: this.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Fec. futuras recuperados')),
        catchError(this.handleError<string>('getDayofweek', ''))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para obtener edad
   * Interfaz: GET /date/unixtimeToTime
   * @returns Objeto con los datos de edad
   */
  getUnixtimeToTime(unixTime: number): Observable<Tiempounix> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/unixtimeToTime?unixTime=' + unixTime;

    return this.http.get<Tiempounix>(urlfinal, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Fec. futuras recuperados')),
        catchError(this.handleError<Tiempounix>('getUnixtimeToTime', undefined))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para obtener edad
   * Interfaz: GET /date/timeToUnixtime
   * @returns Objeto con los datos de edad
   */
  getTimeToUnixtime(date: Date): Observable<Tiempounix> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    //formatear a dd/MM/yyyy HH:mm:ss asignando a una cadena
    let dateCad = this.formatearFecha(date);

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/timeToUnixtime?date=' + dateCad;

    return this.http.get<Tiempounix>(urlfinal, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Fec. futuras recuperados')),
        catchError(this.handleError<Tiempounix>('getTimeToUnixtime', undefined))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para obtener la pascua
   * Interfaz: GET /date/holyWeek
   * @returns Objeto con los datos de pascua
   */
  getHolyWeek(year: number): Observable<Pascua> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/holyWeek?year=' + year;

    return this.http.get<Pascua>(urlfinal, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Fec. futuras recuperados')),
        catchError(this.handleError<Pascua>('getHolyWeek', undefined))
      );
  }


}
