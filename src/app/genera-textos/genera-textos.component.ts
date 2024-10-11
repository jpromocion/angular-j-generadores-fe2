import { Component, OnInit, inject, AfterViewInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import {NgFor,NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import {MatButtonToggleModule, MatButtonToggleChange} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CaseTransformerPipe } from '../case-transformer.pipe';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatSnackBar} from '@angular/material/snack-bar';
import { TextosService } from '../textos.service';
import { ExcelService } from '../excel.service';


@Component({
  selector: 'app-genera-textos',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, MatButtonToggleModule,MatIconModule,MatButtonModule,MatTooltipModule, CaseTransformerPipe,
    MatFormFieldModule,MatInputModule],
  templateUrl: './genera-textos.component.html',
  styleUrl: './genera-textos.component.scss'
})
export class GeneraTextosComponent {

  //filtros
  idioma: string = 'spanish';
  tipoGeneracion: string = 'c';
  cantidad: number = 100;
  tipoLetra: string = 's';

  textoGenerado: string = '';

  //inyeccion de dependencia para utilizar el servicio de clipboard
  private clipboard: Clipboard = inject(Clipboard);

  //inyeccion de dependencia para utilizar el servicio de generacion de nifs
  private textosService: TextosService = inject(TextosService);

  //inyeccion del servicio para generar excel
  private excelService: ExcelService = inject(ExcelService);

  //mensajes notificaciones
  private _snackBar = inject(MatSnackBar);


  constructor() { }

  ngOnInit(): void {

  }

  /**
  * Mensaje de notificacion
  * @param message Mensaje
  * @param action
  */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  /**
   * Capturamos el seleccionar un item generado para copiarlo al portapapeles
   * @param dato
   */
  onSelectDato(dato: string | undefined): void {
    if (dato) {
      this.clipboard.copy(dato);
      this.openSnackBar('Dato copiado al portapapeles', 'CopiaPortapapeles');
    }
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
          this.openSnackBar('Texto generado', 'GenerarTextoCaracteres');
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
          this.openSnackBar('Texto generado', 'GenerarTextoPalabras');
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
          this.openSnackBar('Texto generado', 'GenerarTextoParrafos');
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
    this.openSnackBar('Texto limpiado', 'LimpiarTexto');
  }



  /**
   * Dado un texto, lo transformamos segun el tipo de letra seleccionado con el pipe CaseTransformerPipe
   */
  transformaTexto(texto: string): string {
    return new CaseTransformerPipe().transform(texto, this.tipoLetra);
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
