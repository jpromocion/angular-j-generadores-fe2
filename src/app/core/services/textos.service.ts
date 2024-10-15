/**
 * La clase que actuara coimo servicio para acceder a nuestra itnerfaz
 * API rest "text/"
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
export class TextosService {

  //La URL de la API rest
  private urlJsonServer = environment.apiUrl;
  private interfaz = '/text';

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
    console.info(`TextosService: ${message}`);
    if (error) {
      this.messageService.addError(`TextosService: ${message}`);
    } else {
      this.messageService.add(`TextosService: ${message}`);
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
   * Interfaz de invocación del servicio rest para obtener palabras generadas aleatoriamente.
   * Interfaz: GET /text/words?results=10
   * @returns Lista de palabras generadas aleatoriamente
   */
  getWords(resultados: number = 1, palabras: string = '', lenguaje: string = ''): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/words?results=' + resultados;

    if (palabras !== '') {
      urlfinal = urlfinal + '&words=' + palabras;
    }

    if (lenguaje !== '') {
      urlfinal = urlfinal + '&language=' + lenguaje;
    }

    return this.http.get<string[]>(urlfinal, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.handleError<string[]>('getWords', []))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para obtener caracteres generadas aleatoriamente.
   * Interfaz: GET /text/characters?results=10
   * @returns Lista de caracteres generadas aleatoriamente
   */
  getCharacters(resultados: number = 1, caracteres: string = '', lenguaje: string = ''): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/characters?results=' + resultados;

    if (caracteres !== '') {
      urlfinal = urlfinal + '&characters=' + caracteres;
    }

    if (lenguaje !== '') {
      urlfinal = urlfinal + '&language=' + lenguaje;
    }

    return this.http.get<string[]>(urlfinal, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.handleError<string[]>('getCharacters', []))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para obtener parrafos generadas aleatoriamente.
   * Interfaz: GET /text/paragraphs?results=10
   * @returns Lista de parrafos generadas aleatoriamente
   */
  getParagraphs(resultados: number = 1, parrafos: string = '', lenguaje: string = ''): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/paragraphs?results=' + resultados;

    if (parrafos !== '') {
      urlfinal = urlfinal + '&paragraphs=' + parrafos;
    }

    if (lenguaje !== '') {
      urlfinal = urlfinal + '&language=' + lenguaje;
    }

    return this.http.get<string[]>(urlfinal, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.handleError<string[]>('getParagraphs', []))
      );
  }


}
