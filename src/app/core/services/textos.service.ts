/**
 * La clase que actuara coimo servicio para acceder a nuestra itnerfaz
 * API rest "text/"
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
export class TextosService {
  nombreSimpleServicio: string = 'TextosService';

  //La URL de la API rest
  private urlJsonServer = environment.apiUrl;
  private interfaz = '/text';

  //inyectamos el servicio HTTP
  private http: HttpClient = inject(HttpClient);
  //inyectamos baseservice para utilizar como padre, de forma mas "angular" en vez de extender la clase con herencia
  private baseService: BaseService = inject(BaseService);


  constructor() {
    this.baseService.nombreServicioMensaje = this.nombreSimpleServicio;
  }


  /**
   * Interfaz de invocación del servicio rest para obtener palabras generadas aleatoriamente.
   * Interfaz: GET /text/words?results=10
   * @returns Lista de palabras generadas aleatoriamente
   */
  getWords(resultados: number = 1, palabras: string = '', lenguaje: string = ''): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/words?results=' + resultados;

    if (palabras !== '') {
      urlfinal = urlfinal + '&words=' + palabras;
    }

    if (lenguaje !== '') {
      urlfinal = urlfinal + '&language=' + lenguaje;
    }

    return this.http.get<string[]>(urlfinal, {
      headers: this.baseService.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.baseService.handleError<string[]>('getWords', []))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para obtener caracteres generadas aleatoriamente.
   * Interfaz: GET /text/characters?results=10
   * @returns Lista de caracteres generadas aleatoriamente
   */
  getCharacters(resultados: number = 1, caracteres: string = '', lenguaje: string = ''): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/characters?results=' + resultados;

    if (caracteres !== '') {
      urlfinal = urlfinal + '&characters=' + caracteres;
    }

    if (lenguaje !== '') {
      urlfinal = urlfinal + '&language=' + lenguaje;
    }

    return this.http.get<string[]>(urlfinal, {
      headers: this.baseService.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.baseService.handleError<string[]>('getCharacters', []))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para obtener parrafos generadas aleatoriamente.
   * Interfaz: GET /text/paragraphs?results=10
   * @returns Lista de parrafos generadas aleatoriamente
   */
  getParagraphs(resultados: number = 1, parrafos: string = '', lenguaje: string = ''): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/paragraphs?results=' + resultados;

    if (parrafos !== '') {
      urlfinal = urlfinal + '&paragraphs=' + parrafos;
    }

    if (lenguaje !== '') {
      urlfinal = urlfinal + '&language=' + lenguaje;
    }

    return this.http.get<string[]>(urlfinal, {
      headers: this.baseService.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.baseService.handleError<string[]>('getParagraphs', []))
      );
  }


}
