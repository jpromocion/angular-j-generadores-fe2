/**
 * La clase que actuara coimo servicio para acceder a nuestra itnerfaz
 * API rest "profiles/"
 */
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { MessageService } from './message.service';
import { Persona } from './persona';
import { Empresa } from './empresa';
import { DatosConexionService } from './datos-conexion.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  //La URL de la API rest
  private urlJsonServer = environment.apiUrl;
  private interfazProfiles = '/profiles';

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
    console.info(`ProfilesService: ${message}`);
    if (error) {
      this.messageService.addError(`ProfilesService: ${message}`);
    } else {
      this.messageService.add(`ProfilesService: ${message}`);
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
   * Interfaz de invocación del servicio rest para obtener personas generados aleatoriamente.
   * Interfaz: GET /profiles/person?results=10
   * @returns Lista de personas generadas aleatoriamente
   */
  getPerson(resultados: number = 1, genero: string = ''): Observable<Persona[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string;
    if (genero === '') {
      urlfinal = this.urlJsonServer + this.interfazProfiles + '/person?results=' + resultados;
    } else{
      urlfinal = this.urlJsonServer + this.interfazProfiles + '/person?results=' + resultados + '&gender=' + genero;
    }

    return this.http.get<Persona[]>(urlfinal, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.handleError<Persona[]>('getPerson', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener empresas generadas aleatoriamente.
   * Interfaz: GET /profiles/company?results=10
   * @returns Lista de empresas generadas aleatoriamente
   */
  getCompany(resultados: number = 1): Observable<Empresa[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal = this.urlJsonServer + this.interfazProfiles + '/company?results=' + resultados;

    return this.http.get<Empresa[]>(urlfinal, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Empresas recuperadas')),
        catchError(this.handleError<Empresa[]>('getCompany', []))
      );
  }


}
