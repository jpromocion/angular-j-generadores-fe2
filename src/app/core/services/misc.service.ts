/**
 * La clase que actuara coimo servicio para acceder a nuestra itnerfaz
 * API rest "misc/"
 */
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { MessageService } from './message.service';
import { DatosConexionService } from './datos-conexion.service';
import { Ccaa } from '../models/ccaa';
import { Provincia } from '../models/provincia';
import { Municipio } from '../models/municipio';

@Injectable({
  providedIn: 'root'
})
export class MiscService {


  //La URL de la API rest
  private urlJsonServer = environment.apiUrl;
  private interfaz = '/misc';

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
    console.info(`MiscService: ${message}`);
    if (error) {
      this.messageService.addError(`MiscService: ${message}`);
    } else {
      this.messageService.add(`MiscService: ${message}`);
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
   * Interfaz de invocación del servicio rest para obtener emails generados aleatoriamente.
   * Interfaz: GET /misc/email?results=10
   * @returns Lista de emails generados aleatoriamente
   */
  getEmail(resultados: number = 1): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    return this.http.get<string[]>(this.urlJsonServer + this.interfaz + '/email?results=' + resultados, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Emails recuperados')),
        catchError(this.handleError<string[]>('getEmail', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener passwords generados aleatoriamente.
   * Interfaz: GET /misc/password?results=10
   * @returns Lista de passwords generados aleatoriamente
   */
  getPassword(resultados: number = 1, longitud: number = -1, mayusMinus: string = '',
    numeros: string = '', especial: string = ''): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/password?results=' + resultados;
    if (longitud != -1) {
      urlfinal = urlfinal + '&length=' + longitud;
    }
    if (mayusMinus != '') {
      urlfinal = urlfinal + '&cases=' + mayusMinus;
    }
    if (numeros != '') {
      urlfinal = urlfinal + '&number=' + numeros;
    }
    if (especial != '') {
      urlfinal = urlfinal + '&special=' + especial;
    }

    return this.http.get<string[]>(urlfinal, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Passwords recuperados')),
        catchError(this.handleError<string[]>('getPassword', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener Telefonos generados aleatoriamente.
   * Interfaz: GET /misc/phonenumber?results=10
   * @returns Lista de Telefonos generados aleatoriamente
   */
  getPhonenumber(resultados: number = 1, tipo: string = ''): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/phonenumber?results=' + resultados;
    if (tipo != '') {
      urlfinal = urlfinal + '&type=' + tipo;
    }

    return this.http.get<string[]>(urlfinal, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Telefonos recuperados')),
        catchError(this.handleError<string[]>('getPhonenumber', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener Ciudades generados aleatoriamente.
   * Interfaz: GET /misc/city?results=10
   * @returns Lista de Ciudades generados aleatoriamente
   */
  getCity(resultados: number = 1): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    return this.http.get<string[]>(this.urlJsonServer + this.interfaz + '/city?results=' + resultados, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Ciudades recuperados')),
        catchError(this.handleError<string[]>('getCity', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener Cod. Postales aleatoriamente.
   * Interfaz: GET /misc/zipcode?results=10
   * @returns Lista de Cod. Postales generados aleatoriamente
   */
  getZipCode(resultados: number = 1): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    return this.http.get<string[]>(this.urlJsonServer + this.interfaz + '/zipcode?results=' + resultados, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Cod. Postales recuperados')),
        catchError(this.handleError<string[]>('getZipCode', []))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para obtener IMEIs generados aleatoriamente.
   * Interfaz: GET /misc/imei?results=10
   * @returns Lista de IMEIs generados aleatoriamente
   */
  getImei(resultados: number = 1): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    return this.http.get<string[]>(this.urlJsonServer + this.interfaz + '/imei?results=' + resultados, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('IMEIs recuperados')),
        catchError(this.handleError<string[]>('getImei', []))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para obtener passwords generados aleatoriamente.
   * Interfaz: GET /misc/voucher?results=10
   * @returns Lista de passwords generados aleatoriamente
   */
  getVoucher(resultados: number = 1, charset: string = '', length: number = -1,
    pattern: string = '', prefix: string = '', suffix: string = ''): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/voucher?results=' + resultados;
    if (charset != '') {
      urlfinal = urlfinal + '&charset=' + charset;
    }
    if (length != -1) {
      urlfinal = urlfinal + '&length=' + length;
    }
    if (pattern != '') {
      urlfinal = urlfinal + '&pattern=' + pattern;
    }
    if (prefix != '') {
      urlfinal = urlfinal + '&prefix=' + prefix;
    }
    if (suffix != '') {
      urlfinal = urlfinal + '&suffix=' + suffix;
    }

    return this.http.get<string[]>(urlfinal, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Passwords recuperados')),
        catchError(this.handleError<string[]>('getVoucher', []))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para obtener CCAAs
   * Interfaz: GET /misc/ccaa
   * @returns Lista de CCAAs
   */
  getCcaa(): Observable<Ccaa[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();
    return this.http.get<Ccaa[]>(this.urlJsonServer + this.interfaz + '/ccaa', {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('CCAAs recuperados')),
        catchError(this.handleError<Ccaa[]>('getCcaa', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener provincias de una CCAA
   * Interfaz: GET /misc/provincias?results=10
   * @returns Lista de provincias de una CCAA
   */
  getProvincias(idccaa: string): Observable<Provincia[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/provincias?idccaa=' + idccaa;

    return this.http.get<Provincia[]>(urlfinal, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('provincias de una CCAA recuperados')),
        catchError(this.handleError<Provincia[]>('getProvincias', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener municipios de una provincia
   * Interfaz: GET /misc/municipios?results=10
   * @returns Lista de municipios de una provincia
   */
  getMunicipios(idprovincia: string): Observable<Municipio[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/municipios?idprovincia=' + idprovincia;

    return this.http.get<Municipio[]>(urlfinal, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('municipios de una provincia recuperados')),
        catchError(this.handleError<Municipio[]>('getMunicipios', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener UUIDS generados aleatoriamente.
   * Interfaz: GET /misc/uuid?results=10
   * @returns Lista de UUIDS generados aleatoriamente
   */
  getUuid(resultados: number = 1): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    return this.http.get<string[]>(this.urlJsonServer + this.interfaz + '/uuid?results=' + resultados, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Emails recuperados')),
        catchError(this.handleError<string[]>('getUuid', []))
      );
  }

}
