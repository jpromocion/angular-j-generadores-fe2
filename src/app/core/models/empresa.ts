import { DireccionCompleta } from './direccion-completa';

export interface Empresa {
  cif: string;
	nombre: string;
	fechaCreacion: string;
	telefono: string;
	fax: string;
	email: string;
  direccion: DireccionCompleta;
	cnae: string;
	actividad: string;
  paginaWeb: string;
}
