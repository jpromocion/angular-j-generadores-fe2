/**
 * Para pasar datos entre el app componente y los hijos... que al estar metidos los hijos
 * por enrutamiento no se pueden pasar como @Input.
 * Decidimos crear un servicio para fijar los datos
 * cuando en el app component se modifique el input... y luego con el servicio recuperamos
 * el valor en los component hijos
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosConexionService {

  private apiKey: string = 'test189752';

  constructor() { }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }
  getApiKey(): string {
    return this.apiKey;
  }

}
