import { DireccionCompleta } from './direccion-completa';

export interface Persona {
	nif: string;
	nie: string;
	nombre: string;
	apellido1: string;
	apellido2: string;
	genero: string;
	nombreCompleto: string;
	fechaNacimiento: string;
	edad: string;
	telefonoMovil: string;
	telefonoFijo: string;
	login: string;
	email: string;
	password: string;
  direccion: DireccionCompleta;
	iban: string;
	bic: string;
	tarjetaCredito: string;
	cvc: string;
	expiracionCredito: string;
	tipoTarjeta: string;
  nss: string;
  pasaporte: string;

}
