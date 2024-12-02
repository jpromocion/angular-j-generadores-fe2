/**
 * La clase que actuara coimo servicio para acceder a nuestra itnerfaz
 * API rest "demo/"
 */
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  nombreSimpleServicio: string = 'DemoService';

  //La URL de la API rest
  private urlJsonServer = environment.apiUrl;
  private interfaz = '/demo';

  //inyectamos el servicio HTTP
  private http: HttpClient = inject(HttpClient);
  //inyectamos baseservice para utilizar como padre, de forma mas "angular" en vez de extender la clase con herencia
  private baseService: BaseService = inject(BaseService);


  constructor() {
    this.baseService.nombreServicioMensaje = this.nombreSimpleServicio;
  }

  /**
   * Interfaz de invocación del servicio rest para obtener la version
   * Interfaz: GET /demo/version
   * @returns Lista de NIFS generados aleatoriamente
   */
  getVersion(): Observable<string>  {
    //fijamos la api-key del servicio de datos conexion
    this.baseService.fijarApiKeyServicio();
    return this.http.get(this.urlJsonServer + this.interfaz + '/version', {
      headers: this.baseService.baseHeaders, responseType: 'text'
    })
      .pipe(
        //tap(_ => this.log('Nifs recuperados')),
        catchError(this.baseService.handleError<string>('getVersion', ''))
      );
  }


}
