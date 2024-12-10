import { Component, inject, EventEmitter, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { routes } from '../../../app.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ComprameCafeComponent } from '../comprame-cafe/comprame-cafe.component';
import { TranslateModule } from '@ngx-translate/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss',
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        AsyncPipe,
        RouterLink,
        RouterLinkActive,
        ComprameCafeComponent,
        TranslateModule
    ]
})
export class MenuComponent {

  //Para poder invocar la funcion useLanguage del componente padre app
  @Output("useLanguagePadre") useLanguagePadre: EventEmitter<any> = new EventEmitter();

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
    { path: 'genera-archivos', icon: 'folder_copy' },
    { path: 'genera-colores', icon: 'palette' },
    { path: 'genera-fechas', icon: 'calendar_month' },
  ];

  constructor(private translate: TranslateService) {
    //inyectamos el TranslateService, porque necesitaremos saber en getBanderaClass el lenguaje actual

  }

  /**
   *
   * @param ruta Recuperar el icono que corresponde segun la página centra situada
   * @returns
   */
  getIconoRuta(ruta: string): string {
    const icono = this.iconosRuta.find(i => i.path === ruta);
    return icono ? icono.icon : '';
  }

  /**
   * Recuperar la clase de icono que aplicar al icono asociado a la opcion de menu
   * buscando hacer la rotacion del icono si la ruta esta activa
   * @param ruta
   * @returns
   */
  getIconClass(ruta: string): string {
    const isActive = window.location.pathname.includes(ruta);
    return isActive ? 'iconmenu rotado' : 'iconmenu';
  }

  getMenuSeleClass(ruta: string): string {
    const isActive = window.location.pathname.includes(ruta);
    return isActive ? 'opcionmenuactiva' : '';
  }

  /**
   * Invocaremos al procedimiento padre de app-component que cambnia el idioma
   * @param idioma
   */
  cambiarIdioma(idioma: string){
    this.useLanguagePadre.emit(idioma);
  }

  getBanderaClass(lenguaje: string): string {
    return this.translate.currentLang != lenguaje ? 'idiomaNoSele' : 'idiomaSele';
  }

}
