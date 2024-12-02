/**
 * La clase que actuara coimo servicio para acceder a nuestra itnerfaz
 * API rest "doi/"
 */
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class DoiService {
  nombreSimpleServicio: string = 'DoiService';

  //La URL de la API rest
  private urlJsonServer = environment.apiUrl;
  private interfazDoi = '/doi';

  //inyectamos el servicio HTTP
  private http: HttpClient = inject(HttpClient);
  //inyectamos baseservice para utilizar como padre, de forma mas "angular" en vez de extender la clase con herencia
  private baseService: BaseService = inject(BaseService);


  constructor() {
    this.baseService.nombreServicioMensaje = this.nombreSimpleServicio;
  }



  /**
   * Interfaz de invocación del servicio rest para obtener nifs generados aleatoriamente.
   * Interfaz: GET /doi/nif?results=10
   * @returns Lista de NIFS generados aleatoriamente
   */
  getNif(resultados: number = 1): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();
    //const baseHeaders = new HttpHeaders().set('X-API-KEY', 'jortri0105');
    //return this.http.get<string[]>(this.urlJsonServer + this.interfazDoi + '/nif?results=10', this.requestOptions)
    return this.http.get<string[]>(this.urlJsonServer + this.interfazDoi + '/nif?results=' + resultados, {
      headers: this.baseService.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Nifs recuperados')),
        catchError(this.baseService.handleError<string[]>('getNif', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener nies generados aleatoriamente.
   * Interfaz: GET /doi/nie?results=10
   * @returns Lista de NIEs generados aleatoriamente
   */
  getNie(resultados: number = 1): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();
    return this.http.get<string[]>(this.urlJsonServer + this.interfazDoi + '/nie?results=' + resultados, {
      headers: this.baseService.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Nies recuperados')),
        catchError(this.baseService.handleError<string[]>('getNie', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener cifs generados aleatoriamente.
   * Interfaz: GET /doi/cif?results=10
   * @returns Lista de CIFs generados aleatoriamente
   */
  getCif(resultados: number = 1, letra: string = ''): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();
    return this.http.get<string[]>(this.urlJsonServer + this.interfazDoi + '/cif?results=' + resultados + "&custom_letter=" + letra, {
      headers: this.baseService.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Nifs recuperados')),
        catchError(this.baseService.handleError<string[]>('getCif', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para validar un nif
   * Interfaz: GET /doi/validatenif?nif=12345678Z
   * @returns devuelve OK si correcto o ERROR sino correcto
   */
  validateNif(nif: string): Observable<string>  {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();
    return this.http.get(this.urlJsonServer + this.interfazDoi + '/validatenif?nif=' + nif, {
      headers: this.baseService.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Nifs recuperados')),
        catchError(this.baseService.handleError<string>('validateNif', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para validar un nie
   * Interfaz: GET /doi/validatenie?nie=12345678Z
   * @returns devuelve OK si correcto o ERROR sino correcto
   */
  validateNie(nie: string): Observable<string>  {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();
    return this.http.get(this.urlJsonServer + this.interfazDoi + '/validatenie?nie=' + nie, {
      headers: this.baseService.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Nifs recuperados')),
        catchError(this.baseService.handleError<string>('validateNie', ''))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para validar un cif
   * Interfaz: GET /doi/validatecif?cif=12345678Z
   * @returns devuelve OK si correcto o ERROR sino correcto
   */
  validateCif(cif: string): Observable<string>  {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();
    return this.http.get(this.urlJsonServer + this.interfazDoi + '/validatecif?cif=' + cif, {
      headers: this.baseService.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Nifs recuperados')),
        catchError(this.baseService.handleError<string>('validateCif', ''))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para obtener pasaportes generados aleatoriamente.
   * Interfaz: GET /doi/passport
   * @returns Lista de pasaportes generados aleatoriamente
   */
  getPassport(resultados: number = 1): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();
    return this.http.get<string[]>(this.urlJsonServer + this.interfazDoi + '/passport?results=' + resultados, {
      headers: this.baseService.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Nies recuperados')),
        catchError(this.baseService.handleError<string[]>('getPassport', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para validar un pasaporte
   * Interfaz: GET /doi/validatepassport
   * @returns devuelve OK si correcto o ERROR sino correcto
   */
  getValidatepassport(passport: string): Observable<string>  {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();
    return this.http.get(this.urlJsonServer + this.interfazDoi + '/validatepassport?passport=' + passport, {
      headers: this.baseService.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Nifs recuperados')),
        catchError(this.baseService.handleError<string>('getValidatepassport', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para validar un nie
   * Interfaz: GET /doi/calculatepassportdc
   * @returns devuelve OK si correcto o ERROR sino correcto
   */
  getCalculatepassportdc(passport: string): Observable<string>  {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();
    return this.http.get(this.urlJsonServer + this.interfazDoi + '/calculatepassportdc?passport=' + passport, {
      headers: this.baseService.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Nifs recuperados')),
        catchError(this.baseService.handleError<string>('getCalculatepassportdc', ''))
      );
  }


}
