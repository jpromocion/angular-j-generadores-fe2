import { Component, inject, OnInit, ViewChild  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TranslateModule} from "@ngx-translate/core";
import {MenuComponent}  from './shared/components/menu/menu.component';
import { DatosConexionService } from './core/services/datos-conexion.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angular-j-generadores-fe2';

  //inyectamos el servicio de datos conexion, para fijar la api-key cuando la rellenen
  private datosConexionService: DatosConexionService = inject(DatosConexionService);

  constructor(public translate: TranslateService) {
    this.translate.addLangs(['es', 'en']);
    //lenguaje por defecto cuando no encuentra sino localiza un lenguaje
    this.translate.setDefaultLang('en');
    //lenguaje actual
    //this.translate.use('es');
    const browserLang = translate.getBrowserLang() || 'en';
    this.translate.use(browserLang.match(/en|es/) ? browserLang : 'en');
  }


  ngOnInit(): void {

  }

  /**
   * Cambia el idioma al pipe translate por el indicado como paramtro
   * @param language
   */
  /*
  useLanguage(language: string) {
    this.translate.use(language);
  }
     */

  parentFun(name: string){
    //alert("parent component function: " + name);
    this.translate.use(name);
  }

  useLanguage(name: string){
    this.translate.use(name);
  }

}
