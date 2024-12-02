/**
 * La clase que actuara coimo servicio para acceder a nuestra itnerfaz
 * API rest "bank/"
 */
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Cuenta } from '../models/cuenta';
import { Tarjeta } from '../models/tarjeta';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  nombreSimpleServicio: string = 'BankService';

  //La URL de la API rest
  private urlJsonServer = environment.apiUrl;
  private interfazBank = '/bank';

  //inyectamos el servicio HTTP
  private http: HttpClient = inject(HttpClient);
  //inyectamos baseservice para utilizar como padre, de forma mas "angular" en vez de extender la clase con herencia
  private baseService: BaseService = inject(BaseService);


  constructor() {
    this.baseService.nombreServicioMensaje = this.nombreSimpleServicio;
  }


  /**
   * Interfaz de invocación del servicio rest para obtener cuentas generados aleatoriamente.
   * Interfaz: GET /bank/account?results=10
   * @returns Lista de cuentas generados aleatoriamente
   */
  getAccount(resultados: number = 1): Observable<Cuenta[]> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();
    return this.http.get<Cuenta[]>(this.urlJsonServer + this.interfazBank + '/account?results=' + resultados, {
      headers: this.baseService.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Cuentas recuperados')),
        catchError(this.baseService.handleError<Cuenta[]>('getAccount', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener tarjetas generados aleatoriamente.
   * Interfaz: GET /bank/card?results=10
   * @returns Lista de tarjetas generados aleatoriamente
   */
  getCard(resultados: number = 1, tipoTarjeta: string): Observable<Tarjeta[]> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    let urlfinal: string;
    if (tipoTarjeta === '') {
      urlfinal = this.urlJsonServer + this.interfazBank + '/card?results=' + resultados;
    } else{
      urlfinal = this.urlJsonServer + this.interfazBank + '/card?results=' + resultados + '&type=' + tipoTarjeta;
    }

    return this.http.get<Tarjeta[]>(urlfinal, {
      headers: this.baseService.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Tarjetas recuperados')),
        catchError(this.baseService.handleError<Tarjeta[]>('getCard', []))
      );
  }


  /**
   * Interfaz de invocación del servicio rest para validar un iban
   * Interfaz: GET /bank/validateiban?nif=12345678Z
   * @returns devuelve OK si correcto o ERROR sino correcto
   */
  validateIban(iban: string): Observable<string>  {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    return this.http.get(this.urlJsonServer + this.interfazBank + '/validateiban?iban=' + iban, {
      headers: this.baseService.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('IBAN validado')),
        catchError(this.baseService.handleError<string>('validateIban', ''))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para validar un numero tarjeta
   * Interfaz: GET /bank/validatecard?nie=12345678Z
   * @returns devuelve OK si correcto o ERROR sino correcto
   */
  validateCard(card: string): Observable<string>  {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    return this.http.get(this.urlJsonServer + this.interfazBank + '/validatecard?card=' + card, {
      headers: this.baseService.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Tarjeta validada')),
        catchError(this.baseService.handleError<string>('validateCard', ''))
      );
  }



}
