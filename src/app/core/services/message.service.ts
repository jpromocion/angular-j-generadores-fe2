/**
 * Va  a ser un servicio especial para mostrar mensjaes generrales de la aplicacion
 */
import { Injectable } from '@angular/core';
import { Mensajelog } from '../models/mensajelog';
import {MatSnackBar} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Mensajelog[] = [];

  add(message: string) {
    let mensaje: Mensajelog = {mensaje: message, tipo: 'info'};
    this.messages.push(mensaje);
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }

  addAviso(message: string) {
    let mensaje: Mensajelog = {mensaje: message, tipo: 'warning'};
    this.messages.push(mensaje);
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }

  addError(message: string) {
    let mensaje: Mensajelog = {mensaje: message, tipo: 'error'};
    this.messages.push(mensaje);
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }

  addOk(message: string) {
    let mensaje: Mensajelog = {mensaje: message, tipo: 'ok'};
    this.messages.push(mensaje);
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }


  clear() {
    this.messages = [];
  }

  constructor(private snackBar: MatSnackBar) { }
}
