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
      //Modificamos devolver el title por devolverlo dentro de un data ¿por?
      //al devolver el title, se sobreescribia la propieda title del head de html, con el valor
      //aqui cargado... y como ahora es una key para buscar traduccion... la key se veia como
      //titulo de la pestaña en el navegador.
      //De esta forma lo devolvemos como un valor dentro de "data" y lo utilizaremos en menu.component.html
      //para coger los nombres de cada opcion de menu.
      //El title del head de html no se sobreescribira, y se mantendra el valor generico que tiene en el index.html
      //title: 'generadores.jpromocion.menu.principal'
      data: { title: 'generadores.jpromocion.menu.principal' }
  },
  {
    path: 'genera-documentos',
    loadComponent: () =>
      import('./genera-documentos/genera-documentos.component').then(
        (c) => c.GeneraDocumentosComponent
      ),
      data: { title: 'generadores.jpromocion.menu.documentos' }
  },
  {
    path: 'genera-cuentas',
    loadComponent: () =>
      import('./genera-cuentas/genera-cuentas.component').then(
        (c) => c.GeneraCuentasComponent
      ),
      data: { title: 'generadores.jpromocion.menu.bancario' }
  },
  {
    path: 'genera-perfiles',
    loadComponent: () =>
      import('./genera-perfiles/genera-perfiles.component').then(
        (c) => c.GeneraPerfilesComponent
      ),
      data: { title: 'generadores.jpromocion.menu.perfiles' }
  },
  {
    path: 'genera-textos',
    loadComponent: () =>
      import('./genera-textos/genera-textos.component').then(
        (c) => c.GeneraTextosComponent
      ),
      data: { title: 'generadores.jpromocion.menu.textos' }
  },
  {
    path: 'genera-numeros',
    loadComponent: () =>
      import('./genera-numeros/genera-numeros.component').then(
        (c) => c.GeneraNumerosComponent
      ),
      data: { title: 'generadores.jpromocion.menu.numeros' }
  },
  {
    path: 'genera-fechas',
    loadComponent: () =>
      import('./genera-fechas/genera-fechas.component').then(
        (c) => c.GeneraFechasComponent
      ),
      data: { title: 'generadores.jpromocion.menu.fechas' }
  },
  {
    path: 'genera-coches',
    loadComponent: () =>
      import('./genera-coches/genera-coches.component').then(
        (c) => c.GeneraCochesComponent
      ),
      data: { title: 'generadores.jpromocion.menu.vehiculos' }
  },
  {
    path: 'genera-localizacion',
    loadComponent: () =>
      import('./genera-localizacion/genera-localizacion.component').then(
        (c) => c.GeneraLocalizacionComponent
      ),
      data: { title: 'generadores.jpromocion.menu.localizacion' }
  },
  {
    path: 'genera-barras',
    loadComponent: () =>
      import('./genera-barras/genera-barras.component').then(
        (c) => c.GeneraBarrasComponent
      ),
      data: { title: 'generadores.jpromocion.menu.codbarras' }
  },
  {
    path: 'genera-archivos',
    loadComponent: () =>
      import('./genera-archivos/genera-archivos.component').then(
        (c) => c.GeneraArchivosComponent
      ),
      data: { title: 'generadores.jpromocion.menu.archivos' }
  },
  {
    path: 'genera-colores',
    loadComponent: () =>
      import('./genera-colores/genera-colores.component').then(
        (c) => c.GeneraColoresComponent
      ),
      data: { title: 'generadores.jpromocion.menu.colores' }
  },
  {
    path: 'genera-variados',
    loadComponent: () =>
      import('./genera-variados/genera-variados.component').then(
        (c) => c.GeneraVariadosComponent
      ),
      data: { title: 'generadores.jpromocion.menu.variados' }
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./about/about.component').then(
        (c) => c.AboutComponent
      ),
      data: { title: 'generadores.jpromocion.menu.acercade' }
  },
];
