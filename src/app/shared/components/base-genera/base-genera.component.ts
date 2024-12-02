/**
 * Componente base para que hereden todos los componbentes que generar datos
 * Contiene comun: los servicios de clipboard, excel y barra de notificaciones.
 * NOTA: No tiene parte visual, es solo para heredar funcionalidad en el Typescript de respaldo
 */
import { Component, inject, OnInit} from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { ExcelService } from '../../../core/services/excel.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {Sort} from '@angular/material/sort';
import { CaseTransformerPipe } from '../../pipes/case-transformer.pipe';
import {trigger, style,  animate,  transition} from '@angular/animations';
import {TranslateService} from "@ngx-translate/core";
import { marker} from '@colsen1991/ngx-translate-extract-marker';

@Component({
  selector: 'app-base-genera',
  standalone: true,
  imports: [],
  //templateUrl: './base-genera.component.html',
  //styleUrl: './base-genera.component.scss'
  template: '',
  animations: [
    trigger(
      'entradaLateralAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('1s', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('1s', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    ),
    trigger(
      'encogimientoAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: '0', opacity: 0 }),
            animate('1s ease-out',
                    style({ height: '*', opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: '*', opacity: 1 }),
            animate('1s ease-in',
                    style({ height: '0', opacity: 0 }))
          ]
        )
      ]
    )
  ],
})
export abstract class BaseGeneraComponent implements OnInit  {

  //Opcion fija "Seleccionar todas" para los combos de columnas a mostrar en tablas
  static columSeleccionarTodas = 'Seleccionar todas';

  //tipo de letra para transformaciones masyucula, minuscula, capitaliza
  tipoLetra: string = 'M';

  //inyeccion de dependencia para utilizar el servicio de clipboard
  clipboard: Clipboard = inject(Clipboard);

  //inyeccion del servicio para generar excel
  excelService: ExcelService = inject(ExcelService);

  //mensajes notificaciones
  _snackBar = inject(MatSnackBar);

  //inyeccion de dependencia para utilizar el servicio de liveAnnouncer para ordenar
  _liveAnnouncer = inject(LiveAnnouncer);

  translate = inject(TranslateService);

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
   * Devuelve el si del lenguaje activo
   * @returns
   */
  dameSiInternacionalizado(): string {
    return this.translate.instant(marker('generadores.jpromocion.generarcomunes.boton.validadook.label'));
  }

  /**
   * Devuelve el no del lenguaje activo
   * @returns
   */
  dameNoInternacionalizado(): string {
    return this.translate.instant(marker('generadores.jpromocion.generarcomunes.boton.validadoko.label'));
  }

  /**
   *
   * @param fecha Coge la fecha y la formatea a un string dd/MM/yyyy
   */
  fechaFormateada(fecha: Date): string {
    return fecha.toLocaleDateString('es-ES');
  }

  /**
  * Inicializamos los labels del paginador para tablas
  */
  inicializarLabelsPaginador(paginator:MatPaginator): void {

    this.translate.instant(marker('generadores.jpromocion.generarcomunes.paginador.label'));


    paginator._intl.itemsPerPageLabel = this.translate.instant(marker('generadores.jpromocion.generarcomunes.paginador.elementos'));
    paginator._intl.firstPageLabel = this.translate.instant(marker('generadores.jpromocion.generarcomunes.paginador.primera'));
    paginator._intl.lastPageLabel = this.translate.instant(marker('generadores.jpromocion.generarcomunes.paginador.ultima'));
    paginator._intl.nextPageLabel = this.translate.instant(marker('generadores.jpromocion.generarcomunes.paginador.siguiente'));
    paginator._intl.previousPageLabel = this.translate.instant(marker('generadores.jpromocion.generarcomunes.paginador.anterior'));
    let palabrade = this.translate.instant(marker('generadores.jpromocion.generarcomunes.paginador.de'));
    paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        //return `0 de ${length}`;
        return `0 ${palabrade} ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      //return `${startIndex + 1} - ${endIndex} de ${length}`;
      return `${startIndex + 1} - ${endIndex} ${palabrade} ${length}`;
    }
  }

  /** Announce the change in sort state for assistive technology.
   * NOTA: solo funciona, si el matColumnDef de la columna coincide con el mismo nombre en el campo
   * de los datos que filtramos.... sino, es necesario crearse una funcion de sort personalizada
  */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  /**
   * Dado un texto, lo transformamos segun el tipo de letra seleccionado con el pipe CaseTransformerPipe
   */
  transformaTexto(texto: string, sensitivo: boolean = true): string {
    if (sensitivo) {
      return new CaseTransformerPipe().transform(texto, this.tipoLetra);
    }
    return texto;
  }


  /**
   * activa la pantalla de carga bloqueante
   */
  activarPantallaCarga(): void {
    const cargando = document.getElementById('cargando');
    const cargandoBurbuja = document.getElementById('cargando-burbuja');
    if (cargando) {
      cargando.classList.add('blub-overlay');
    }
    if (cargandoBurbuja){
      cargandoBurbuja.classList.add('blub');
    }
  }

  /**
    * desactiva la pantalla de carga bloqueante
   */
  desactivarPantallaCarga(): void {
    const cargando = document.getElementById('cargando');
    const cargandoBurbuja = document.getElementById('cargando-burbuja');
    if (cargando) {
      cargando.classList.remove('blub-overlay');
    }
    if (cargandoBurbuja){
      cargandoBurbuja.classList.remove('blub');
    }

  }

}
