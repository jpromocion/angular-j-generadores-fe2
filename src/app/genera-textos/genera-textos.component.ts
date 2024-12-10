import { Component, OnInit, inject, AfterViewInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatButtonToggleModule, MatButtonToggleChange} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CaseTransformerPipe } from '../shared/pipes/case-transformer.pipe';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import {BaseGeneraComponent} from '../shared/components/base-genera/base-genera.component';
import { TextosService } from '../core/services/textos.service';
import { TranslateModule } from '@ngx-translate/core';
import { marker} from '@colsen1991/ngx-translate-extract-marker';

@Component({
    selector: 'app-genera-textos',
    imports: [FormsModule, NgIf, MatButtonToggleModule, MatIconModule, MatButtonModule, MatTooltipModule, CaseTransformerPipe,
        MatFormFieldModule, MatInputModule, TranslateModule],
    templateUrl: './genera-textos.component.html',
    styleUrl: './genera-textos.component.scss'
})
export class GeneraTextosComponent extends BaseGeneraComponent implements OnInit {

  //filtros
  idioma: string = 'spanish';
  tipoGeneracion: string = 'c';
  cantidad: number = 100;


  textoGenerado: string = '';

  //inyeccion de dependencia para utilizar el servicio de generacion de nifs
  private textosService: TextosService = inject(TextosService);



  constructor() {
    super();
  }

  override ngOnInit(): void {
    this.tipoLetra = 's';
  }

  /**
   * Invocamos la operacion del servicio para obtener una lista de caracteres aleatorios
   */
  getCaracteres(resultados: number): void {
    if (resultados == 1) {
      this.textosService.getCharacters(resultados, this.cantidad.toString(), this.idioma)
      .subscribe(cadena => {
        this.textoGenerado = cadena[0];
        if (this.textoGenerado && this.textoGenerado != ''){
          this.openSnackBar(
            this.translate.instant(marker('generadores.jpromocion.texto.mensajes.generadocara.mensaje')),
            this.translate.instant(marker('generadores.jpromocion.texto.mensajes.generadocara.titulo')));
        }
      });
    }
    // } else{
    //   this.doiService.getCif(resultados, this.selectedSociedad)
    //   .subscribe(cifs => this.listaCifs = cifs);
    // }
  }

  /**
   * Invocamos la operacion del servicio para obtener una lista de palabras aleatorios
   */
  getPalabras(resultados: number): void {
    if (resultados == 1) {
      this.textosService.getWords(resultados, this.cantidad.toString(), this.idioma)
      .subscribe(cadena => {
        this.textoGenerado = cadena[0];
        if (this.textoGenerado && this.textoGenerado != ''){
          this.openSnackBar(
            this.translate.instant(marker('generadores.jpromocion.texto.mensajes.generadopala.mensaje')),
            this.translate.instant(marker('generadores.jpromocion.texto.mensajes.generadopala.titulo')));
        }
      });
    }
    // } else{
    //   this.doiService.getCif(resultados, this.selectedSociedad)
    //   .subscribe(cifs => this.listaCifs = cifs);
    // }
  }

  /**
   * Invocamos la operacion del servicio para obtener una lista de parrafos aleatorios
   */
  getParrafos(resultados: number): void {
    if (resultados == 1) {
      this.textosService.getParagraphs(resultados, this.cantidad.toString(), this.idioma)
      .subscribe(cadena => {
        this.textoGenerado = cadena[0];
        if (this.textoGenerado && this.textoGenerado != ''){
          this.openSnackBar(
            this.translate.instant(marker('generadores.jpromocion.texto.mensajes.generadoparra.mensaje')),
            this.translate.instant(marker('generadores.jpromocion.texto.mensajes.generadoparra.titulo')));
        }
      });
    }
    // } else{
    //   this.doiService.getCif(resultados, this.selectedSociedad)
    //   .subscribe(cifs => this.listaCifs = cifs);
    // }
  }


  /**
  * Generamos un nuevo cif aleatorio
  */
  onClickBotonGenerarTexto(): void {
    this.textoGenerado = '';
    if (this.tipoGeneracion === 'c') {
      this.getCaracteres(1);
    } else if (this.tipoGeneracion === 'w') {
      this.getPalabras(1);
    } else if (this.tipoGeneracion === 'p') {
      this.getParrafos(1);
    }

  }

  /**
    * Limpiar el campo de cif generado
    */
  onClickLimpiarTexto(): void {
    this.textoGenerado = '';
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.texto.mensajes.limpiartexto.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.texto.mensajes.limpiartexto.titulo')));
  }



  /**
   * Evento de cambio del button toggle de tipo de generacion
   */
  onChangeTipoGeneracion(event: MatButtonToggleChange): void {
    if (event.value == 'c') {
      this.cantidad = 100;
    } else if (event.value == 'w') {
      this.cantidad = 20;
    } else if (event.value == 'p') {
      this.cantidad = 3;
    }

  }

}
