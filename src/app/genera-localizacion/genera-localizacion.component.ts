import { Component, inject, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {NgFor,NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CaseTransformerPipe } from '../shared/pipes/case-transformer.pipe';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MiscService } from '../core/services/misc.service';
import { ExcelService } from '../core/services/excel.service';
import { Ccaa } from '../core/models/ccaa';
import { Provincia } from '../core/models/provincia';
import { Municipio } from '../core/models/municipio';

@Component({
  selector: 'app-genera-localizacion',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, MatButtonToggleModule,MatIconModule,MatButtonModule,MatTooltipModule, CaseTransformerPipe,
    MatFormFieldModule,MatInputModule,MatSelectModule,MatListModule,MatCardModule,MatCheckboxModule,
    MatTableModule, MatPaginatorModule,MatSortModule],
  templateUrl: './genera-localizacion.component.html',
  styleUrl: './genera-localizacion.component.scss'
})
export class GeneraLocalizacionComponent implements OnInit, AfterViewInit {

  //ccaa
  //ccaaGenerado: Ccaa[] = [];
  ccaaGenerado = new MatTableDataSource<Ccaa>();
  displayedColumnsCcaaGenerado: string[] = ['id', 'nombre'];
  @ViewChild('paginatorCcaaGenerado') paginatorCcaaGenerado!: MatPaginator;
  @ViewChild('sortCcaaGenerado') sortCcaaGenerado!: MatSort;

  //provincias
  provinCodCCAA: string = '';
  //provinGenerado: Provincia[] = [];
  provinGenerado = new MatTableDataSource<Provincia>();
  displayedColumnsProvinGenerado: string[] = ['id', 'nombre'];
  @ViewChild('paginatorProvinGenerado') paginatorProvinGenerado!: MatPaginator;
  @ViewChild('sortProvinGenerado') sortProvinGenerado!: MatSort;

  //municipios
  muniCodProvin: string = '';
  //muniGenerado: Municipio[] = [];
  muniGenerado = new MatTableDataSource<Provincia>();
  displayedColumnsMuniGenerado: string[] = ['id', 'nombre'];
  @ViewChild('paginatorMuniGenerado') paginatorMuniGenerado!: MatPaginator;
  @ViewChild('sortMuniGenerado') sortMuniGenerado!: MatSort;



  //inyeccion de dependencia para utilizar el servicio de clipboard
  private clipboard: Clipboard = inject(Clipboard);

  //inyeccion de dependencia para utilizar el servicio de generacion de miscelanea
  private miscService: MiscService = inject(MiscService);

  //inyeccion del servicio para generar excel
  private excelService: ExcelService = inject(ExcelService);

  //mensajes notificaciones
  private _snackBar = inject(MatSnackBar);

  //inyeccion de dependencia para utilizar el servicio de liveAnnouncer para ordenar
  private _liveAnnouncer = inject(LiveAnnouncer);


  constructor() { }

  ngOnInit(): void {

  }

  /**
  * Inicializamos los labels del paginador
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


  ngAfterViewInit() {
    this.inicializarLabelsPaginador(this.paginatorCcaaGenerado);
    this.ccaaGenerado.paginator = this.paginatorCcaaGenerado;
    this.ccaaGenerado.sort = this.sortCcaaGenerado;

    this.inicializarLabelsPaginador(this.paginatorProvinGenerado);
    this.provinGenerado.paginator = this.paginatorProvinGenerado;
    this.provinGenerado.sort = this.sortProvinGenerado;

    this.inicializarLabelsPaginador(this.paginatorMuniGenerado);
    this.muniGenerado.paginator = this.paginatorMuniGenerado;
    this.muniGenerado.sort = this.sortMuniGenerado;
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
   * Invocamos la operacion del servicio para obtener una lista de CAAA
   */
  getCCAA(): void {
    // this.miscService.getCcaa()
    // .subscribe(ccaa => {
    //   this.ccaaGenerado = ccaa;
    //   if (this.ccaaGenerado && this.ccaaGenerado.length > 0) {
    //     this.openSnackBar('Lista CCAA', 'GenerarCCAA');
    //   }
    // });
    this.miscService.getCcaa()
    .subscribe(ccaa => {
      this.ccaaGenerado.data = ccaa;
      this.ccaaGenerado.paginator = this.paginatorCcaaGenerado;
      this.ccaaGenerado.sort = this.sortCcaaGenerado;
      if (this.ccaaGenerado && this.ccaaGenerado.data.length > 0) {
        this.openSnackBar('Lista CCAA', 'GenerarCCAA');
      }
    });
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGenerarCCAA(): void {
    //this.ccaaGenerado = [];
    this.ccaaGenerado = new MatTableDataSource<Ccaa>();
    this.getCCAA();

  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarCCAA(): void {
    //this.ccaaGenerado = [];
    this.ccaaGenerado = new MatTableDataSource<Ccaa>();
    this.openSnackBar('CCAA limpiados', 'LimpiarCCAA');
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonCCAA(): void {
    //const formatted = this.ccaaGenerado.map(dato => ({ Codigo: dato.id, Nombre: dato.nombre }));
    const formatted = this.ccaaGenerado.data.map(dato => ({ Codigo: dato.id, Nombre: dato.nombre }));
    this.excelService.exportAsExcelFile(formatted, 'Lista_CCAA');
    this.openSnackBar('Excel generado','ExcelCCAA');
  }



  /**
   * Invocamos la operacion del servicio para obtener una lista de provicnias
   */
  getProvincias(idccaa: string): void {
    // this.miscService.getProvincias(idccaa)
    // .subscribe(provin => {
    //   this.provinGenerado = provin;
    //   if (this.provinGenerado && this.provinGenerado.length > 0) {
    //     this.openSnackBar('Lista Provincias', 'GenerarProvincias');
    //   }
    // });
    this.miscService.getProvincias(idccaa)
    .subscribe(provin => {
      this.provinGenerado.data = provin;
      this.provinGenerado.paginator = this.paginatorProvinGenerado;
      this.provinGenerado.sort = this.sortProvinGenerado;
      if (this.provinGenerado && this.provinGenerado.data.length > 0) {
        this.openSnackBar('Lista Provincias', 'GenerarProvincias');
      }
    });
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGeneraProvincias(): void {
    //this.provinGenerado = [];
    this.provinGenerado = new MatTableDataSource<Provincia>();
    if (this.provinCodCCAA == '') {
      this.openSnackBar('Debe seleccionar una CCAA.','Cerrar');
    } else{
      this.getProvincias(this.provinCodCCAA);
    }

  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarProvincias(): void {
    //this.provinGenerado = [];
    this.provinGenerado = new MatTableDataSource<Provincia>();
    this.openSnackBar('Provincias limpiados', 'LimpiarProvincias');
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonProvincias(): void {
    //const formatted = this.provinGenerado.map(dato => ({ Codigo: dato.id, Nombre: dato.nombre }));
    const formatted = this.provinGenerado.data.map(dato => ({ Codigo: dato.id, Nombre: dato.nombre }));
    this.excelService.exportAsExcelFile(formatted, 'Lista_Provincias');
    this.openSnackBar('Excel generado','ExcelProvincias');
  }



  /**
   * Invocamos la operacion del servicio para obtener una lista de provicnias
   */
  getMunicipios(idprovin: string): void {
    // this.miscService.getMunicipios(idprovin)
    // .subscribe(muni => {
    //   this.muniGenerado = muni;
    //   if (this.muniGenerado && this.muniGenerado.length > 0) {
    //     this.openSnackBar('Lista Municipios', 'GenerarMunicipios');
    //   }
    // });
    this.miscService.getMunicipios(idprovin)
    .subscribe(muni => {
      this.muniGenerado.data = muni;
      this.muniGenerado.paginator = this.paginatorMuniGenerado;
      this.muniGenerado.sort = this.sortMuniGenerado;
      if (this.muniGenerado && this.muniGenerado.data.length > 0) {
        this.openSnackBar('Lista Municipios', 'GenerarMunicipios');
      }
    });
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGeneraMunicipios(): void {
    //this.muniGenerado = [];
    this.muniGenerado = new MatTableDataSource<Municipio>();
    if (this.provinCodCCAA == '') {
      this.openSnackBar('Debe seleccionar una Provincia.','Cerrar');
    } else{
      this.getMunicipios(this.muniCodProvin);
    }

  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarMunicipios(): void {
    //this.muniGenerado = [];
    this.muniGenerado = new MatTableDataSource<Municipio>();
    this.openSnackBar('Municipios limpiados', 'LimpiarMunicipios');
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonMunicipios(): void {
    //const formatted = this.muniGenerado.map(dato => ({ Codigo: dato.id, Nombre: dato.nombre }));
    const formatted = this.muniGenerado.data.map(dato => ({ Codigo: dato.id, Nombre: dato.nombre }));
    this.excelService.exportAsExcelFile(formatted, 'Lista_Municipios');
    this.openSnackBar('Excel generado','ExcelMunicipios');
  }


}
