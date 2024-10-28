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
      title: 'Principal'
  },
  {
    path: 'genera-documentos',
    loadComponent: () =>
      import('./genera-documentos/genera-documentos.component').then(
        (c) => c.GeneraDocumentosComponent
      ),
      title: 'Documentos'
  },
  {
    path: 'genera-cuentas',
    loadComponent: () =>
      import('./genera-cuentas/genera-cuentas.component').then(
        (c) => c.GeneraCuentasComponent
      ),
      title: 'Bancario'
  },
  {
    path: 'genera-perfiles',
    loadComponent: () =>
      import('./genera-perfiles/genera-perfiles.component').then(
        (c) => c.GeneraPerfilesComponent
      ),
      title: 'Perfiles'
  },
  {
    path: 'genera-textos',
    loadComponent: () =>
      import('./genera-textos/genera-textos.component').then(
        (c) => c.GeneraTextosComponent
      ),
      title: 'Textos'
  },
  {
    path: 'genera-numeros',
    loadComponent: () =>
      import('./genera-numeros/genera-numeros.component').then(
        (c) => c.GeneraNumerosComponent
      ),
      title: 'Números'
  },
  {
    path: 'genera-fechas',
    loadComponent: () =>
      import('./genera-fechas/genera-fechas.component').then(
        (c) => c.GeneraFechasComponent
      ),
      title: 'Fechas'
  },
  {
    path: 'genera-coches',
    loadComponent: () =>
      import('./genera-coches/genera-coches.component').then(
        (c) => c.GeneraCochesComponent
      ),
      title: 'Vehículos'
  },
  {
    path: 'genera-localizacion',
    loadComponent: () =>
      import('./genera-localizacion/genera-localizacion.component').then(
        (c) => c.GeneraLocalizacionComponent
      ),
      title: 'Localización'
  },
  {
    path: 'genera-barras',
    loadComponent: () =>
      import('./genera-barras/genera-barras.component').then(
        (c) => c.GeneraBarrasComponent
      ),
      title: 'Cod. Barras'
  },
  {
    path: 'genera-archivos',
    loadComponent: () =>
      import('./genera-archivos/genera-archivos.component').then(
        (c) => c.GeneraArchivosComponent
      ),
      title: 'Archivos'
  },
  {
    path: 'genera-colores',
    loadComponent: () =>
      import('./genera-colores/genera-colores.component').then(
        (c) => c.GeneraColoresComponent
      ),
      title: 'Colores'
  },
  {
    path: 'genera-variados',
    loadComponent: () =>
      import('./genera-variados/genera-variados.component').then(
        (c) => c.GeneraVariadosComponent
      ),
      title: 'Variados'
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./about/about.component').then(
        (c) => c.AboutComponent
      ),
      title: 'Acerca de'
  },
];
