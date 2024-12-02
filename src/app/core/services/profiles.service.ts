/**
 * La clase que actuara coimo servicio para acceder a nuestra itnerfaz
 * API rest "profiles/"
 */
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Persona } from '../models/persona';
import { Empresa } from '../models/empresa';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  nombreSimpleServicio: string = 'ProfilesService';

  //La URL de la API rest
  private urlJsonServer = environment.apiUrl;
  private interfazProfiles = '/profiles';

  //inyectamos el servicio HTTP
  private http: HttpClient = inject(HttpClient);
  //inyectamos baseservice para utilizar como padre, de forma mas "angular" en vez de extender la clase con herencia
  private baseService: BaseService = inject(BaseService);


  constructor() {
    this.baseService.nombreServicioMensaje = this.nombreSimpleServicio;
  }



  /**
   * Interfaz de invocación del servicio rest para obtener personas generados aleatoriamente.
   * Interfaz: GET /profiles/person?results=10
   * @returns Lista de personas generadas aleatoriamente
   */
  getPerson(resultados: number = 1, genero: string = ''): Observable<Persona[]> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    let urlfinal: string;
    if (genero === '') {
      urlfinal = this.urlJsonServer + this.interfazProfiles + '/person?results=' + resultados;
    } else{
      urlfinal = this.urlJsonServer + this.interfazProfiles + '/person?results=' + resultados + '&gender=' + genero;
    }

    return this.http.get<Persona[]>(urlfinal, {
      headers: this.baseService.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Personas recuperadas')),
        catchError(this.baseService.handleError<Persona[]>('getPerson', []))
      );
  }

  /**
   * Interfaz de invocación del servicio rest para obtener empresas generadas aleatoriamente.
   * Interfaz: GET /profiles/company?results=10
   * @returns Lista de empresas generadas aleatoriamente
   */
  getCompany(resultados: number = 1): Observable<Empresa[]> {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();

    let urlfinal = this.urlJsonServer + this.interfazProfiles + '/company?results=' + resultados;

    return this.http.get<Empresa[]>(urlfinal, {
      headers: this.baseService.baseHeaders,
    })
      .pipe(
        //tap(_ => this.log('Empresas recuperadas')),
        catchError(this.baseService.handleError<Empresa[]>('getCompany', []))
      );
  }


}
