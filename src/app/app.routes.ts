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
      title: 'Generador documentos'
  },
];
