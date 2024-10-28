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



}
