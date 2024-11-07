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

@Component({
  selector: 'app-base-genera',
  standalone: true,
  imports: [CaseTransformerPipe],
  //templateUrl: './base-genera.component.html',
  //styleUrl: './base-genera.component.scss'
  template: ''
})
export class BaseGeneraComponent implements OnInit  {

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
    paginator._intl.itemsPerPageLabel = 'Elementos por página';
    paginator._intl.firstPageLabel = 'Primera página';
    paginator._intl.lastPageLabel = 'Última página';
    paginator._intl.nextPageLabel = 'Siguiente página';
    paginator._intl.previousPageLabel = 'Página anterior';
    paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} de ${length}`;
    }
  }

  /** Announce the change in sort state for assistive technology. */
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



}
