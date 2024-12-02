/**
 * Las operaciones comunes que tienen todos los servicios de la API REST la metemos aqui.
 * Siguiendo los patrones de diseño mas propios de angular, en vez de que los demas
 * servcios tengan un extends para ser una clase hija de este servicio...
 * lo que haremos será utilizar este servicio como un inject en los demas servicios
 */
import { Injectable, inject } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { MessageService } from './message.service';
import { DatosConexionService } from './datos-conexion.service';
import { marker} from '@colsen1991/ngx-translate-extract-marker';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class BaseService {


  nombreServicioMensaje: string = 'BaseService';

  baseHeaders = new HttpHeaders().set('X-API-KEY', '');

  //inyeccion de dependencias para que a su vez pueda hacer uso del servicio de mensajes
  messageService: MessageService = inject(MessageService);

  translate = inject(TranslateService);

  //inyectamos el servicio de datos conexion, para obtener la api-key que fija el componente padre
  //de todo app
  private datosConexionService: DatosConexionService = inject(DatosConexionService);


  constructor() { }


  /**
   * Fijar la apyKey
   * @param apiKeyIn
   */
  public setApiKey(apiKeyIn: string) {
    this.baseHeaders = new HttpHeaders().set('X-API-KEY', apiKeyIn);
  }

  /**
   * Fijar la api-key del servicio de datos conexion
   */
  public fijarApiKeyServicio() {
    this.setApiKey(this.datosConexionService.getApiKey());
  }


  /**
   * Loguear un mensaje en el servicio de mensajes
   * @param message
   */
  public log(message: string, error: boolean = false) {
    console.info(`${this.nombreServicioMensaje}: ${message}`);
    if (error) {
      this.messageService.addError(`${this.nombreServicioMensaje}: ${message}`);
    } else {
      this.messageService.add(`${this.nombreServicioMensaje}: ${message}`);
    }
  }

  /**
  * Manjear fallo en operación Http
  * Mantiene la app en funcionamiento.
  *
  * @param operation - nombre de la operación fallada
  * @param result - valor opcional a retornar como resultado observable
  */
  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      //this.log(`${operation} fallo: ${error.message} - Error adicional: ${error.error}`, true);
      this.log(this.translate.instant(marker('generadores.jpromocion.generarcomunes.mensajes.errorservicio'), {operacion: operation, mensaje: error.message, erroradicional: error.error}), true);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}