/**
 * La clase que actuara coimo servicio para acceder a nuestra itnerfaz
 * API rest "bank/"
 */
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { MessageService } from './message.service';
import { Cuenta } from './cuenta';
import { Tarjeta } from './tarjeta';
import { DatosConexionService } from './datos-conexion.service';

@Injectable({
  providedIn: 'root'
})
export class BankService {


  //La URL de la API rest
  private urlJsonServer = environment.apiUrl;
  private interfazBank = '/bank';

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
    //TODO: pendiente ver como gestionar mensajes
    console.info(`BankService: ${message}`);
    if (error) {
      this.messageService.addError(`BankService: ${message}`);
    } else {
      this.messageService.add(`BankService: ${message}`);
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
   * Interfaz de invocación del servicio rest para obtener cuentas generados aleatoriamente.
   * Interfaz: GET /bank/account?results=10
   * @returns Lista de cuentas generados aleatoriamente
   */
  getAccount(resultados: number = 1): Observable<Cuenta[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();
    return this.http.get<Cuenta[]>(this.urlJsonServer + this.interfazBank + '/account?results=' + resultados, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Cuentas recuperados')),
        catchError(this.handleError<Cuenta[]>('getAccount', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener tarjetas generados aleatoriamente.
   * Interfaz: GET /bank/card?results=10
   * @returns Lista de tarjetas generados aleatoriamente
   */
  getCard(resultados: number = 1, tipoTarjeta: string): Observable<Tarjeta[]> {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    let urlfinal: string;
    if (tipoTarjeta === '') {
      urlfinal = this.urlJsonServer + this.interfazBank + '/card?results=' + resultados;
    } else{
      urlfinal = this.urlJsonServer + this.interfazBank + '/card?results=' + resultados + '&type=' + tipoTarjeta;
    }

    return this.http.get<Tarjeta[]>(urlfinal, {
      headers: this.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Tarjetas recuperados')),
        catchError(this.handleError<Tarjeta[]>('getCard', []))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para validar un iban
   * Interfaz: GET /bank/validateiban?nif=12345678Z
   * @returns devuelve OK si correcto o ERROR sino correcto
   */
  validateIban(iban: string): Observable<string>  {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    return this.http.get(this.urlJsonServer + this.interfazBank + '/validateiban?iban=' + iban, {
      headers: this.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('IBAN validado')),
        catchError(this.handleError<string>('validateIban', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para validar un numero tarjeta
   * Interfaz: GET /bank/validatecard?nie=12345678Z
   * @returns devuelve OK si correcto o ERROR sino correcto
   */
  validateCard(card: string): Observable<string>  {
    //fijamos la api-key del servicio de datos conexion
    this.fijarApiKeyServicio();

    return this.http.get(this.urlJsonServer + this.interfazBank + '/validatecard?card=' + card, {
      headers: this.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Tarjeta validada')),
        catchError(this.handleError<string>('validateCard', ''))
      );
  }



}
