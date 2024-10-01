/**
 * La clase que actuara coimo servicio para acceder a nuestra itnerfaz
 * API rest "doi/"
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
export class DoiService {

  //La URL de la API rest
  private urlJsonServer = environment.apiUrl;
  private interfazDoi = '/doi';

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
    console.info(`DoiService: ${message}`);
    if (error) {
      this.messageService.addError(`DoiService: ${message}`);
    } else {
      this.messageService.add(`DoiService: ${message}`);
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
   * Interfaz de invocación del servicio rest para obtener nifs generados aleatoriamente.
   * Interfaz: GET /doi/nif?results=10
   * @returns Lista de NIFS generados aleatoriamente
   */
  getNif(resultados: number = 1): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();
    //const baseHeaders = new HttpHeaders().set('X-API-KEY', 'jortri0105');
    //return this.http.get<string[]>(this.urlJsonServer + this.interfazDoi + '/nif?results=10', this.requestOptions)
    return this.http.get<string[]>(this.urlJsonServer + this.interfazDoi + '/nif?results=' + resultados, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Nifs recuperados')),
        catchError(this.handleError<string[]>('getNif', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener nies generados aleatoriamente.
   * Interfaz: GET /doi/nie?results=10
   * @returns Lista de NIEs generados aleatoriamente
   */
  getNie(resultados: number = 1): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();
    return this.http.get<string[]>(this.urlJsonServer + this.interfazDoi + '/nie?results=' + resultados, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Nies recuperados')),
        catchError(this.handleError<string[]>('getNie', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener cifs generados aleatoriamente.
   * Interfaz: GET /doi/cif?results=10
   * @returns Lista de CIFs generados aleatoriamente
   */
  getCif(resultados: number = 1, letra: string = ''): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();
    return this.http.get<string[]>(this.urlJsonServer + this.interfazDoi + '/cif?results=' + resultados + "&custom_letter=" + letra, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Nifs recuperados')),
        catchError(this.handleError<string[]>('getCif', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para validar un nif
   * Interfaz: GET /doi/validatenif?nif=12345678Z
   * @returns devuelve OK si correcto o ERROR sino correcto
   */
  validateNif(nif: string): Observable<string>  {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();
    return this.http.get(this.urlJsonServer + this.interfazDoi + '/validatenif?nif=' + nif, {
      headers: this.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Nifs recuperados')),
        catchError(this.handleError<string>('validateNif', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para validar un nie
   * Interfaz: GET /doi/validatenie?nie=12345678Z
   * @returns devuelve OK si correcto o ERROR sino correcto
   */
  validateNie(nie: string): Observable<string>  {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();
    return this.http.get(this.urlJsonServer + this.interfazDoi + '/validatenie?nie=' + nie, {
      headers: this.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Nifs recuperados')),
        catchError(this.handleError<string>('validateNie', ''))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para validar un cif
   * Interfaz: GET /doi/validatecif?cif=12345678Z
   * @returns devuelve OK si correcto o ERROR sino correcto
   */
  validateCif(cif: string): Observable<string>  {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();
    return this.http.get(this.urlJsonServer + this.interfazDoi + '/validatecif?cif=' + cif, {
      headers: this.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Nifs recuperados')),
        catchError(this.handleError<string>('validateCif', ''))
      );
  }


}
