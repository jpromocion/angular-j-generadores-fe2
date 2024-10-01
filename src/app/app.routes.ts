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
];
