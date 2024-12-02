/**
 * La clase que actuara coimo servicio para acceder a nuestra itnerfaz
 * API rest "date/"
 */
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Edad } from '../models/edad';
import { Tiempounix } from '../models/tiempounix';
import { Pascua } from '../models/pascua';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  nombreSimpleServicio: string = 'DateService';

  //La URL de la API rest
  private urlJsonServer = environment.apiUrl;
  private interfaz = '/date';

  //inyectamos el servicio HTTP
  private http: HttpClient = inject(HttpClient);
  //inyectamos baseservice para utilizar como padre, de forma mas "angular" en vez de extender la clase con herencia
  private baseService: BaseService = inject(BaseService);


  constructor() {
    this.baseService.nombreServicioMensaje = this.nombreSimpleServicio;
  }



  /**
   * Interfaz de invocación del servicio rest para obtener Fec. nacimiento generados aleatoriamente.
   * Interfaz: GET /date/birthdate?results=10
   * @returns Lista de Fec. nacimiento generados aleatoriamente
   */
  getBirthDate(resultados: number = 1): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/birthdate?results=' + resultados;

    return this.http.get<string[]>(urlfinal, {
      headers: this.baseService.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Fec. nacimiento recuperados')),
        catchError(this.baseService.handleError<string[]>('getBirthDate', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener Fec. futuras generados aleatoriamente.
   * Interfaz: GET /date/futuredate?results=10
   * @returns Lista de Fec. futuras generados aleatoriamente
   */
  getFutureDate(resultados: number = 1): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/futuredate?results=' + resultados;

    return this.http.get<string[]>(urlfinal, {
      headers: this.baseService.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Fec. futuras recuperados')),
        catchError(this.baseService.handleError<string[]>('getFutureDate', []))
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
    this.baseService.fijarApiKeyServicio();

    //formatear a dd/MM/yyyy HH:mm:ss asignando a una cadena
    let fechaNacimientoCad = this.formatearFecha(fechaNacimiento);

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/age?birthDate=' + fechaNacimientoCad;

    return this.http.get<Edad>(urlfinal, {
      headers: this.baseService.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Fec. futuras recuperados')),
        catchError(this.baseService.handleError<Edad>('getAge', undefined))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener la diferencia entre dos fechas
   * Interfaz: GET /date/datediff
   * @returns Objeto edad con los datos de diferencia entre dos fechas
   */
  getDateDiff(startDate: Date, endDate: Date): Observable<Edad> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    //formatear a dd/MM/yyyy HH:mm:ss asignando a una cadena
    let startDateCad = this.formatearFecha(startDate);
    let endDateCad = this.formatearFecha(endDate);

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/datediff?startDate=' + startDateCad + '&endDate=' + endDateCad;

    return this.http.get<Edad>(urlfinal, {
      headers: this.baseService.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Fec. futuras recuperados')),
        catchError(this.baseService.handleError<Edad>('getDateDiff', undefined))
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
    this.baseService.fijarApiKeyServicio();

    //formatear a dd/MM/yyyy HH:mm:ss asignando a una cadena
    let dateCad = this.formatearFecha(date);

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/dateoperation?date=' + dateCad +
      '&operation=' + operation + '&years=' + years + '&months=' + months + '&days=' + days +
      '&hours=' + hours + '&minutes=' + minutes + '&seconds=' + seconds;

    return this.http.get(urlfinal, {
      headers: this.baseService.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Fec. futuras recuperados')),
        catchError(this.baseService.handleError<String>('getDateoperation', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener el dia de la semana
   * Interfaz: GET /date/dayofweek
   * @returns Dia de la semana
   */
  getDayofweek(date: Date): Observable<string> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    //formatear a dd/MM/yyyy HH:mm:ss asignando a una cadena
    let dateCad = this.formatearFecha(date);

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/dayofweek?date=' + dateCad;

    return this.http.get(urlfinal, {
      headers: this.baseService.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Fec. futuras recuperados')),
        catchError(this.baseService.handleError<string>('getDayofweek', ''))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para obtener edad
   * Interfaz: GET /date/unixtimeToTime
   * @returns Objeto con los datos de edad
   */
  getUnixtimeToTime(unixTime: number): Observable<Tiempounix> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/unixtimeToTime?unixTime=' + unixTime;

    return this.http.get<Tiempounix>(urlfinal, {
      headers: this.baseService.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Fec. futuras recuperados')),
        catchError(this.baseService.handleError<Tiempounix>('getUnixtimeToTime', undefined))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para obtener edad
   * Interfaz: GET /date/timeToUnixtime
   * @returns Objeto con los datos de edad
   */
  getTimeToUnixtime(date: Date): Observable<Tiempounix> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    //formatear a dd/MM/yyyy HH:mm:ss asignando a una cadena
    let dateCad = this.formatearFecha(date);

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/timeToUnixtime?date=' + dateCad;

    return this.http.get<Tiempounix>(urlfinal, {
      headers: this.baseService.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Fec. futuras recuperados')),
        catchError(this.baseService.handleError<Tiempounix>('getTimeToUnixtime', undefined))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para obtener la pascua
   * Interfaz: GET /date/holyWeek
   * @returns Objeto con los datos de pascua
   */
  getHolyWeek(year: number): Observable<Pascua> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/holyWeek?year=' + year;

    return this.http.get<Pascua>(urlfinal, {
      headers: this.baseService.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Fec. futuras recuperados')),
        catchError(this.baseService.handleError<Pascua>('getHolyWeek', undefined))
      );
  }


}
