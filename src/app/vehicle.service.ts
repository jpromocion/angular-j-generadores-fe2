/**
 * La clase que actuara coimo servicio para acceder a nuestra itnerfaz
 * API rest "vehicle/"
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
export class VehicleService {

  //La URL de la API rest
  private urlJsonServer = environment.apiUrl;
  private interfaz = '/vehicle';

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
    console.info(`VehicleService: ${message}`);
    if (error) {
      this.messageService.addError(`VehicleService: ${message}`);
    } else {
      this.messageService.add(`VehicleService: ${message}`);
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
   * Interfaz de invocación del servicio rest para obtener matriculas generadas aleatoriamente.
   * Interfaz: GET /vehicle/platenumber?results=10
   * @returns Lista de matriculas generadas aleatoriamente
   */
  getPlatenumber(resultados: number = 1, tipo: string = ''): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/platenumber?results=' + resultados;

    if (tipo !== '') {
      urlfinal = urlfinal + '&type=' + tipo;
    }


    return this.http.get<string[]>(urlfinal, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.handleError<string[]>('getPlatenumber', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener num bastidor generadas aleatoriamente.
   * Interfaz: GET /vin/platenumber?results=10
   * @returns Lista de num bastidor generadas aleatoriamente
   */
  getVin(resultados: number = 1): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/vin?results=' + resultados;

    return this.http.get<string[]>(urlfinal, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.handleError<string[]>('getVin', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para validar un numero de bastidor
   * Interfaz: GET /vin/validatevin?vin=12345678Z
   * @returns devuelve OK si correcto o ERROR sino correcto
   */
  validateVin(vin: string): Observable<string>  {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();
    return this.http.get(this.urlJsonServer + this.interfaz + '/validatevin?vin=' + vin, {
      headers: this.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Nifs recuperados')),
        catchError(this.handleError<string>('validateVin', ''))
      );
  }



}
