import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { routes } from '../app.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive
  ]
})
export class MenuComponent {
  title = 'Generadores de';

  private breakpointObserver = inject(BreakpointObserver);
  rootRoutes = routes.filter(r=>r.path);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  iconosRuta = [
    { path: 'dashboard', icon: 'dashboard' },
    { path: 'genera-documentos', icon: 'badge' },
    { path: 'genera-cuentas', icon: 'account_balance' },
    { path: 'genera-perfiles', icon: 'person' },
    { path: 'genera-textos', icon: 'edit_note' },
    { path: 'genera-coches', icon: 'directions_car' },
    { path: 'genera-localizacion', icon: 'travel_explore' },
    { path: 'genera-variados', icon: 'more_horiz' },
    { path: 'about', icon: 'info' },
    { path: 'genera-numeros', icon: '123' },
    { path: 'genera-barras', icon: 'qr_code_2' },
  ];

  constructor() {}

  getIconoRuta(ruta: string): string {
    const icono = this.iconosRuta.find(i => i.path === ruta);
    return icono ? icono.icon : '';
  }

}
