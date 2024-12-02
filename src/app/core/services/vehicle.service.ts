/**
 * La clase que actuara coimo servicio para acceder a nuestra itnerfaz
 * API rest "vehicle/"
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
export class VehicleService {
  nombreSimpleServicio: string = 'VehicleService';

  //La URL de la API rest
  private urlJsonServer = environment.apiUrl;
  private interfaz = '/vehicle';

  //inyectamos el servicio HTTP
  private http: HttpClient = inject(HttpClient);
  //inyectamos baseservice para utilizar como padre, de forma mas "angular" en vez de extender la clase con herencia
  private baseService: BaseService = inject(BaseService);


  constructor() {
    this.baseService.nombreServicioMensaje = this.nombreSimpleServicio;
  }


  /**
   * Interfaz de invocación del servicio rest para obtener matriculas generadas aleatoriamente.
   * Interfaz: GET /vehicle/platenumber?results=10
   * @returns Lista de matriculas generadas aleatoriamente
   */
  getPlatenumber(resultados: number = 1, tipo: string = ''): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/platenumber?results=' + resultados;

    if (tipo !== '') {
      urlfinal = urlfinal + '&type=' + tipo;
    }


    return this.http.get<string[]>(urlfinal, {
      headers: this.baseService.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.baseService.handleError<string[]>('getPlatenumber', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener num bastidor generadas aleatoriamente.
   * Interfaz: GET /vin/platenumber?results=10
   * @returns Lista de num bastidor generadas aleatoriamente
   */
  getVin(resultados: number = 1): Observable<string[]> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    let urlfinal: string = this.urlJsonServer + this.interfaz + '/vin?results=' + resultados;

    return this.http.get<string[]>(urlfinal, {
      headers: this.baseService.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.baseService.handleError<string[]>('getVin', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para validar un numero de bastidor
   * Interfaz: GET /vin/validatevin?vin=12345678Z
   * @returns devuelve OK si correcto o ERROR sino correcto
   */
  validateVin(vin: string): Observable<string>  {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();
    return this.http.get(this.urlJsonServer + this.interfaz + '/validatevin?vin=' + vin, {
      headers: this.baseService.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Nifs recuperados')),
        catchError(this.baseService.handleError<string>('validateVin', ''))
      );
  }



}
