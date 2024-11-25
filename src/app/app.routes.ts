import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
      title: 'generadores.jpromocion.menu.principal'
  },
  {
    path: 'genera-documentos',
    loadComponent: () =>
      import('./genera-documentos/genera-documentos.component').then(
        (c) => c.GeneraDocumentosComponent
      ),
      title: 'generadores.jpromocion.menu.documentos'
  },
  {
    path: 'genera-cuentas',
    loadComponent: () =>
      import('./genera-cuentas/genera-cuentas.component').then(
        (c) => c.GeneraCuentasComponent
      ),
      title: 'generadores.jpromocion.menu.bancario'
  },
  {
    path: 'genera-perfiles',
    loadComponent: () =>
      import('./genera-perfiles/genera-perfiles.component').then(
        (c) => c.GeneraPerfilesComponent
      ),
      title: 'generadores.jpromocion.menu.perfiles'
  },
  {
    path: 'genera-textos',
    loadComponent: () =>
      import('./genera-textos/genera-textos.component').then(
        (c) => c.GeneraTextosComponent
      ),
      title: 'generadores.jpromocion.menu.textos'
  },
  {
    path: 'genera-numeros',
    loadComponent: () =>
      import('./genera-numeros/genera-numeros.component').then(
        (c) => c.GeneraNumerosComponent
      ),
      title: 'generadores.jpromocion.menu.numeros'
  },
  {
    path: 'genera-fechas',
    loadComponent: () =>
      import('./genera-fechas/genera-fechas.component').then(
        (c) => c.GeneraFechasComponent
      ),
      title: 'generadores.jpromocion.menu.fechas'
  },
  {
    path: 'genera-coches',
    loadComponent: () =>
      import('./genera-coches/genera-coches.component').then(
        (c) => c.GeneraCochesComponent
      ),
      title: 'generadores.jpromocion.menu.vehiculos'
  },
  {
    path: 'genera-localizacion',
    loadComponent: () =>
      import('./genera-localizacion/genera-localizacion.component').then(
        (c) => c.GeneraLocalizacionComponent
      ),
      title: 'generadores.jpromocion.menu.localizacion'
  },
  {
    path: 'genera-barras',
    loadComponent: () =>
      import('./genera-barras/genera-barras.component').then(
        (c) => c.GeneraBarrasComponent
      ),
      title: 'generadores.jpromocion.menu.codbarras'
  },
  {
    path: 'genera-archivos',
    loadComponent: () =>
      import('./genera-archivos/genera-archivos.component').then(
        (c) => c.GeneraArchivosComponent
      ),
      title: 'generadores.jpromocion.menu.archivos'
  },
  {
    path: 'genera-colores',
    loadComponent: () =>
      import('./genera-colores/genera-colores.component').then(
        (c) => c.GeneraColoresComponent
      ),
      title: 'generadores.jpromocion.menu.colores'
  },
  {
    path: 'genera-variados',
    loadComponent: () =>
      import('./genera-variados/genera-variados.component').then(
        (c) => c.GeneraVariadosComponent
      ),
      title: 'generadores.jpromocion.menu.variados'
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./about/about.component').then(
        (c) => c.AboutComponent
      ),
      title: 'generadores.jpromocion.menu.acercade'
  },
];
