import { Component, inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {NgFor,NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgClass} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CaseTransformerPipe } from '../shared/pipes/case-transformer.pipe';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {BaseGeneraComponent} from '../shared/components/base-genera/base-genera.component';
import {Sort} from '@angular/material/sort';
import {CdkDragDrop,CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { ChangeDetectorRef } from '@angular/core';
import { MiscService } from '../core/services/misc.service';
import { Ccaa } from '../core/models/ccaa';
import { Provincia } from '../core/models/provincia';
import { Municipio } from '../core/models/municipio';
import { DireccionCompleta } from '../core/models/direccion-completa';
import { TranslateModule } from '@ngx-translate/core';
import { marker} from '@colsen1991/ngx-translate-extract-marker';


@Component({
  selector: 'app-genera-localizacion',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, MatButtonToggleModule,MatIconModule,MatButtonModule,MatTooltipModule, CaseTransformerPipe,
    MatFormFieldModule,MatInputModule,MatSelectModule,MatListModule,MatCardModule,MatCheckboxModule,
    MatTableModule, MatPaginatorModule,MatSortModule,NgSwitch,NgSwitchCase,NgSwitchDefault,NgClass,
    CdkDropList, CdkDrag, TranslateModule],
  templateUrl: './genera-localizacion.component.html',
  styleUrl: './genera-localizacion.component.scss'
})
export class GeneraLocalizacionComponent extends BaseGeneraComponent implements OnInit, AfterViewInit {


  //Definicion del mostrado de columnas para tabla CCAA, personalizado opciones
  //para mostrar filas por plantillas
  static COLUMNS_SCHEMA_CCAA = [
    {
      key: "id",
      columna: "id",
      type: "button",
      label: "generadores.jpromocion.localizacion.salida.ccaa.codigo.label"
    },
    {
      key: "nombre",
      columna: "nombre",
      type: "button",
      label: "generadores.jpromocion.localizacion.salida.ccaa.nombre.label"
    }
  ];


  //Definicion del mostrado de columnas para tabla provincias, personalizado opciones
  //para mostrar filas por plantillas
  static COLUMNS_SCHEMA_PROVIN = [
    {
      key: "id",
      columna: "id",
      type: "button",
      label: "generadores.jpromocion.localizacion.salida.provincia.codigo.label"
    },
    {
      key: "nombre",
      columna: "nombre",
      type: "button",
      label: "generadores.jpromocion.localizacion.salida.provincia.nombre.label"
    }
  ];

  //Definicion del mostrado de columnas para tabla provincias, personalizado opciones
  //para mostrar filas por plantillas
  static COLUMNS_SCHEMA_MUNI = [
    {
      key: "id",
      columna: "id",
      type: "button",
      label: "generadores.jpromocion.localizacion.salida.municipio.codigo.label"
    },
    {
      key: "nombre",
      columna: "nombre",
      type: "button",
      label: "generadores.jpromocion.localizacion.salida.municipio.nombre.label"
    }
  ];

  //Definicion del mostrado de columnas para tabla domicilios, personalizado opciones
  //para mostrar filas por plantillas
  static COLUMNS_SCHEMA_DOMICILIO = [
    {
      key: "Dirección completa",
      columna: "direccionCompleta",
      type: "button",
      caseSensitive: true,
      clase: "botonFlatGrande",
      label: "generadores.jpromocion.localizacion.salida.direccion.completa.label"
    },
    {
      key: "Dirección",
      columna: "direccion",
      type: "button",
      caseSensitive: true,
      clase: "botonFlatGrande",
      label: "generadores.jpromocion.localizacion.salida.direccion.direccion.label"
    },
    {
      key: "Número",
      columna: "numVia",
      type: "button",
      label: "generadores.jpromocion.localizacion.salida.direccion.numero.label"
    },
    {
      key: "Km",
      columna: "kilometro",
      type: "button",
      label: "generadores.jpromocion.localizacion.salida.direccion.km.label"
    },
    {
      key: "Bloque",
      columna: "bloque",
      type: "button",
      label: "generadores.jpromocion.localizacion.salida.direccion.bloque.label"
    },
    {
      key: "Portal",
      columna: "portal",
      type: "button",
      label: "generadores.jpromocion.localizacion.salida.direccion.portal.label"
    },
    {
      key: "Escalera",
      columna: "escalera",
      type: "button",
      label: "generadores.jpromocion.localizacion.salida.direccion.escalera.label"
    },
    {
      key: "Planta",
      columna: "planta",
      type: "button",
      caseSensitive: true,
      label: "generadores.jpromocion.localizacion.salida.direccion.planta.label"
    },
    {
      key: "Puerta",
      columna: "puerta",
      type: "button",
      caseSensitive: true,
      label: "generadores.jpromocion.localizacion.salida.direccion.puerta.label"
    },
    {
      key: "CP",
      columna: "codPostal",
      type: "button",
      caseSensitive: true,
      label: "generadores.jpromocion.localizacion.salida.direccion.cp.label"
    },
    {
      key: "Municipio",
      columna: "ineMunicipio",
      clase: "botonFlatReducido",
      type: "button",
      caseSensitive: true,
      label: "generadores.jpromocion.localizacion.salida.direccion.municipio.label",
      columna2: "municipio",
    },
    {
      key: "Provincia",
      columna: "ineProvincia",
      clase: "botonFlatReducido",
      type: "button",
      caseSensitive: true,
      label: "generadores.jpromocion.localizacion.salida.direccion.provincia.label",
      columna2: "provincia",
    },
    {
      key: "CCAA",
      columna: "ineCcaa",
      clase: "botonFlatReducido",
      type: "button",
      caseSensitive: true,
      label: "generadores.jpromocion.localizacion.salida.direccion.ccaa.label",
      columna2: "ccaa",
    },
    {
      key: "Ref. catastral",
      columna: "referenciaCatastral",
      type: "button",
      caseSensitive: true,
      label: "generadores.jpromocion.localizacion.salida.direccion.refcatastral.label"
    },
  ];


  //ccaa
  ccaaGenerado = new MatTableDataSource<Ccaa>();
  ccaaGeneradoOriginal: Ccaa[] = [];
  displayedColumnsCcaaGenerado: string[] = GeneraLocalizacionComponent.COLUMNS_SCHEMA_CCAA.map((col) => col.key)
  columnsSchemaCcaaGenerado: any = GeneraLocalizacionComponent.COLUMNS_SCHEMA_CCAA;
  @ViewChild('paginatorCcaaGenerado') paginatorCcaaGenerado!: MatPaginator;
  @ViewChild('sortCcaaGenerado') sortCcaaGenerado!: MatSort;

  //provincias
  provinCodCCAA: string = '';
  provinGenerado = new MatTableDataSource<Provincia>();
  provinGeneradoOriginal: Provincia[] = [];
  displayedColumnsProvinGenerado: string[] =  GeneraLocalizacionComponent.COLUMNS_SCHEMA_PROVIN.map((col) => col.key)
  columnsSchemaProvinGenerado: any = GeneraLocalizacionComponent.COLUMNS_SCHEMA_PROVIN;


  @ViewChild('paginatorProvinGenerado') paginatorProvinGenerado!: MatPaginator;
  @ViewChild('sortProvinGenerado') sortProvinGenerado!: MatSort;

  //municipios
  muniCodProvin: string = '';
  muniGenerado = new MatTableDataSource<Municipio>();
  muniGeneradoOriginal: Municipio[] = [];
  displayedColumnsMuniGenerado: string[] =  GeneraLocalizacionComponent.COLUMNS_SCHEMA_MUNI.map((col) => col.key)
  columnsSchemaMuniGenerado: any = GeneraLocalizacionComponent.COLUMNS_SCHEMA_MUNI;

  @ViewChild('paginatorMuniGenerado') paginatorMuniGenerado!: MatPaginator;
  @ViewChild('sortMuniGenerado') sortMuniGenerado!: MatSort;

  //direccion completa
  direccionParamCodMuni: string = '';
  direccionParamNumGenerar: number = 5;
  direccionParamKm: string = '';
  direccionParamBloque: string = '';
  direccionParamPortal: string = '';
  direccionParamEscalera: string = '';
  direccionParamPlanta: string = 'y';
  direccionParamPuerta: string = 'y';
  // - direccionGenerado: va a contener los datos visibles en la tabla, de forma que se actualiza al aplicar filtros por columna.
  // - direccionGeneradoOriginal: va a contener los datos originales de la ultima vez que se accedio a la API rest,
  //   de forma que no se modifica por la aplicacion de filtros por columna, y permite restablecer los datos al quitar
  //   o revisar los filtros.
  direccionGenerado = new MatTableDataSource<DireccionCompleta>();
  direccionGeneradoOriginal: DireccionCompleta[] = [];
  displayedColumnsDireccionGenerado: string[] =  GeneraLocalizacionComponent.COLUMNS_SCHEMA_DOMICILIO.map((col) => col.key)
  columnsSchemaDireccionGenerado: any = GeneraLocalizacionComponent.COLUMNS_SCHEMA_DOMICILIO;
  @ViewChild('paginatorDireccionGenerado') paginatorDireccionGenerado!: MatPaginator;
  @ViewChild('sortDireccionGenerado') sortDireccionGenerado!: MatSort;

  //seleccionar columnas a mostrar en tabla direcciones:
  //-Lista de todas las opciones posibles para el combo.
  //NOTA: utilizamos las columnas originales... a las que se añade la opcion especial Seleccionar Todos
  listaColumnasDirecciones: string[] = GeneraLocalizacionComponent.COLUMNS_SCHEMA_DOMICILIO.map((col) => col.key).concat([BaseGeneraComponent.columSeleccionarTodas]);
  //-Lista que controla que opciones de las anteriores están marcadas (ngModel del mat-select)
  //NOTA: de inicio se marcaran todas, incluyendo la de Seleccionar Todos tambien
  selectColumnasDirecciones: string[] = this.listaColumnasDirecciones;

  //inyeccion de dependencia para utilizar el servicio de generacion de miscelanea
  private miscService: MiscService = inject(MiscService);

  //Referencia: https://codehandbook.org/mat-paginator-not-working-inside-ngif/
  // Se utiliza el ChangeDetectorRef para forzar la actualizacion del DOM y que el paginator y sort
  // se vean actualizados.
  changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor() {
    super();
  }

  override ngOnInit(): void {
    this.tipoLetra = 's';

  }

  inicializarPaginadoresSortsCcaa(): void {
    this.inicializarLabelsPaginador(this.paginatorCcaaGenerado);
    this.ccaaGenerado.paginator = this.paginatorCcaaGenerado;
    this.ccaaGenerado.sort = this.sortCcaaGenerado;
  }

  inicializarPaginadoresSortsProvincias(): void {
    this.inicializarLabelsPaginador(this.paginatorProvinGenerado);
    this.provinGenerado.paginator = this.paginatorProvinGenerado;
    this.provinGenerado.sort = this.sortProvinGenerado;
  }

  inicializarPaginadoresSortsMunicipios(): void {
    this.inicializarLabelsPaginador(this.paginatorMuniGenerado);
    this.muniGenerado.paginator = this.paginatorMuniGenerado;
    this.muniGenerado.sort = this.sortMuniGenerado;
  }

  inicializarPaginadoresSortsDirecciones(): void {
    this.inicializarLabelsPaginador(this.paginatorDireccionGenerado);
    this.direccionGenerado.paginator = this.paginatorDireccionGenerado;
    this.direccionGenerado.sort = this.sortDireccionGenerado;
  }



  inicializarPaginadoresSortsTablas(): void {
    this.inicializarPaginadoresSortsCcaa();

    this.inicializarPaginadoresSortsProvincias();

    this.inicializarPaginadoresSortsMunicipios();

    this.inicializarPaginadoresSortsDirecciones();
  }


  ngAfterViewInit() {
    //con el hidden valia con inializar todas aqui... pero con el ngIf es necesario
    //incilizar cada elemento cuando se genera la tabla, dado que ngIf saca/mete del DOM
    //los objetos.
    this.inicializarPaginadoresSortsTablas();
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
      //this.ccaaGenerado.data = ccaa;
      this.ccaaGenerado = new MatTableDataSource(ccaa);
      this.ccaaGeneradoOriginal = ccaa;

      //cuando se utilizaba hidden para ocultar la tabla, el paginator y sort funcionan
      //sin problema.
      //Al cambiar a ngIf... esta directiva quita/pone en el DOM el objeto, y el paginator y sort
      //dejan de funcionar.
      //Referencia: https://codehandbook.org/mat-paginator-not-working-inside-ngif/
      // Se utiliza el ChangeDetectorRef para forzar la actualizacion del DOM y que el paginator y sort
      // se vean actualizados.
      this.changeDetectorRef.detectChanges();

      //this.ccaaGenerado.paginator = this.paginatorCcaaGenerado;
      //this.ccaaGenerado.sort = this.sortCcaaGenerado;
      //como quita/pone pom es necesario inicializarlo todo de nuevo
      this.inicializarPaginadoresSortsCcaa();
      if (this.ccaaGenerado && this.ccaaGenerado.data.length > 0) {
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.generadoccaa.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.generadoccaa.titulo')));
      }
    });
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGenerarCCAA(): void {
    //this.ccaaGenerado = [];
    this.ccaaGenerado = new MatTableDataSource<Ccaa>();
    this.ccaaGeneradoOriginal = [];
    this.getCCAA();

  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarCCAA(): void {
    //this.ccaaGenerado = [];
    this.ccaaGenerado = new MatTableDataSource<Ccaa>();
    this.ccaaGeneradoOriginal = [];
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.limpiadoccaa.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.limpiadoccaa.titulo')));
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonCCAA(): void {
    //NOTA: si bien en CCAA no tenemos mostrado/ocuiltado columnas... si reordeacion... por ello
    //hacemos un mapeo de las columnas mostradas en la tabla para generar el excel
    const displayedColumns = this.displayedColumnsCcaaGenerado;
    const formatted = this.ccaaGenerado.data.map(ccaa => {
      const result: any = {};
      displayedColumns.forEach(col => {
        switch (col) {
          case 'id':
          result.Codigo = ccaa.id;
          break;
          case 'nombre':
          result.Nombre = ccaa.nombre;
          break;
        }
      });
      return result;
    });

    this.excelService.exportAsExcelFile(formatted, 'Lista_CCAA');
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.excelccaa.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.excelccaa.titulo')));
  }

  /**
   * Evento de drag&drop para reordenar las columnas visibles de la tabla de CCAA
   * @param event
   */
  dropColumnsCCAA(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumnsCcaaGenerado, event.previousIndex, event.currentIndex);
  }

  /**
   * Des-oculta el filtro asociado a una columna de la cabecera de la tabla de CCAA
   * @param col
   */
  openFilterCCAA(col: string) {
    const filterElement = document.getElementById(col + '-filterCCAA');
    if (filterElement) {
      filterElement.removeAttribute('hidden');
    }
  }

  /**
   * Oculta el filtro asociado a una columna de la cabecera de la tabla de CCAA
   * @param col
   */
  closeFilterCCAA(col: string) {
    const filterElement = document.getElementById(col + '-filterCCAA');
    if (filterElement) {
      filterElement.setAttribute('hidden', 'true');
    }
  }

  /**
   * Aplica el filtro de texto (sin distincion mayusculars/minusculas) en la tabla
   * de CCAA.
   * @param col Nombre de la columna en la tabla sobre la que se filtra
   * @param filtertext Entrada del texto a filtrar
   */
  filterDataCCAA(col: string, filtertext: string) {
    if (filtertext.trim() != '') {
      this.ccaaGenerado.data = this.ccaaGeneradoOriginal.slice().filter(
        (element) => JSON.stringify(element[col as keyof Ccaa]).toLowerCase().indexOf(filtertext.toLowerCase()) > -1
      );
    } else{
      //si hubieramos filtrado antes, ahora limpiamos
      if (this.ccaaGenerado.data.length != this.ccaaGeneradoOriginal.length) {
        this.ccaaGenerado.data = this.ccaaGeneradoOriginal;
      }
    }
  }

  /**
   * Accion boton para limpiar la aplicacion de filtrar en la tabla CCAA, y volver al estado original
   */
  onClickLimpiarFiltrosCCAA(): void {
    this.ccaaGenerado.data = this.ccaaGeneradoOriginal;
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.limpiadofiltrosccaa.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.limpiadofiltrosccaa.titulo')));
  }



  /**
   * Invocamos la operacion del servicio para obtener una lista de provicnias
   */
  getProvincias(idccaa: string): void {
    this.miscService.getProvincias(idccaa)
    .subscribe(provin => {
      //this.provinGenerado.data = provin;
      this.provinGenerado = new MatTableDataSource(provin);
      this.provinGeneradoOriginal = provin;

      //cuando se utilizaba hidden para ocultar la tabla, el paginator y sort funcionan
      //sin problema.
      //Al cambiar a ngIf... esta directiva quita/pone en el DOM el objeto, y el paginator y sort
      //dejan de funcionar.
      //Referencia: https://codehandbook.org/mat-paginator-not-working-inside-ngif/
      // Se utiliza el ChangeDetectorRef para forzar la actualizacion del DOM y que el paginator y sort
      // se vean actualizados.
      this.changeDetectorRef.detectChanges();

      //this.provinGenerado.paginator = this.paginatorProvinGenerado;
      //this.provinGenerado.sort = this.sortProvinGenerado;
      //como quita/pone pom es necesario inicializarlo todo de nuevo
      this.inicializarPaginadoresSortsProvincias();
      if (this.provinGenerado && this.provinGenerado.data.length > 0) {
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.generadoprovincia.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.generadoprovincia.titulo')));
      }
    });
  }



  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGeneraProvincias(): void {
    //this.provinGenerado = [];
    this.provinGenerado = new MatTableDataSource<Provincia>();
    this.provinGeneradoOriginal = [];
    if (this.provinCodCCAA == '') {
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.errorprovincia.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.errorprovincia.titulo')));
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
    this.provinGeneradoOriginal = [];
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.limpiadoprovincia.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.limpiadoprovincia.titulo')));
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonProvincias(): void {
    //const formatted = this.provinGenerado.map(dato => ({ Codigo: dato.id, Nombre: dato.nombre }));
    //const formatted = this.provinGenerado.data.map(dato => ({ Codigo: dato.id, Nombre: dato.nombre }));

    //NOTA: si bien en provincias no tenemos mostrado/ocuiltado columnas... si reordeacion... por ello
    //hacemos un mapeo de las columnas mostradas en la tabla para generar el excel
    const displayedColumns = this.displayedColumnsProvinGenerado;
    const formatted = this.provinGenerado.data.map(provin => {
      const result: any = {};
      displayedColumns.forEach(col => {
        switch (col) {
          case 'id':
          result.Codigo = provin.id;
          break;
          case 'nombre':
          result.Nombre = provin.nombre;
          break;
        }
      });
      return result;
    });

    this.excelService.exportAsExcelFile(formatted, 'Lista_Provincias');
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.excelprovincia.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.excelprovincia.titulo')));
  }


  /**
   * Evento de drag&drop para reordenar las columnas visibles de la tabla de provincias
   * @param event
   */
  dropColumnsProvincia(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumnsProvinGenerado, event.previousIndex, event.currentIndex);
  }

  /**
   * Des-oculta el filtro asociado a una columna de la cabecera de la tabla de Provincia
   * @param col
   */
  openFilterProvincia(col: string) {
    const filterElement = document.getElementById(col + '-filterProvincia');
    if (filterElement) {
      filterElement.removeAttribute('hidden');
    }
  }

  /**
   * Oculta el filtro asociado a una columna de la cabecera de la tabla de Provincia
   * @param col
   */
  closeFilterProvincia(col: string) {
    const filterElement = document.getElementById(col + '-filterProvincia');
    if (filterElement) {
      filterElement.setAttribute('hidden', 'true');
    }
  }

  /**
   * Aplica el filtro de texto (sin distincion mayusculars/minusculas) en la tabla
   * de Provincia.
   * @param col Nombre de la columna en la tabla sobre la que se filtra
   * @param filtertext Entrada del texto a filtrar
   */
  filterDataProvincia(col: string, filtertext: string) {
    if (filtertext.trim() != '') {
      this.provinGenerado.data = this.provinGeneradoOriginal.slice().filter(
        (element) => JSON.stringify(element[col as keyof Ccaa]).toLowerCase().indexOf(filtertext.toLowerCase()) > -1
      );
    } else{
      //si hubieramos filtrado antes, ahora limpiamos
      if (this.provinGenerado.data.length != this.provinGeneradoOriginal.length) {
        this.provinGenerado.data = this.provinGeneradoOriginal;
      }
    }
  }

  /**
   * Accion boton para limpiar la aplicacion de filtrar en la tabla Provincia, y volver al estado original
   */
  onClickLimpiarFiltrosProvincia(): void {
    this.provinGenerado.data = this.provinGeneradoOriginal;
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.limpiadofiltrosprovincia.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.limpiadofiltrosprovincia.titulo')));
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
      //this.muniGenerado.data = muni;
      this.muniGenerado = new MatTableDataSource(muni);
      this.muniGeneradoOriginal = muni;

      //cuando se utilizaba hidden para ocultar la tabla, el paginator y sort funcionan
      //sin problema.
      //Al cambiar a ngIf... esta directiva quita/pone en el DOM el objeto, y el paginator y sort
      //dejan de funcionar.
      //Referencia: https://codehandbook.org/mat-paginator-not-working-inside-ngif/
      // Se utiliza el ChangeDetectorRef para forzar la actualizacion del DOM y que el paginator y sort
      // se vean actualizados.
      this.changeDetectorRef.detectChanges();

      // this.muniGenerado.paginator = this.paginatorMuniGenerado;
      // this.muniGenerado.sort = this.sortMuniGenerado;
      //como quita/pone pom es necesario inicializarlo todo de nuevo
      this.inicializarPaginadoresSortsMunicipios();
      if (this.muniGenerado && this.muniGenerado.data.length > 0) {
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.generadomunicipio.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.generadomunicipio.titulo')));
      }
    });
  }




  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGeneraMunicipios(): void {
    //this.muniGenerado = [];
    this.muniGenerado = new MatTableDataSource<Municipio>();
    this.muniGeneradoOriginal = [];
    if (this.provinCodCCAA == '') {
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.errormunicipio.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.errormunicipio.titulo')));
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
    this.muniGeneradoOriginal = [];
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.limpiadomunicipio.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.limpiadomunicipio.titulo')));
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonMunicipios(): void {
    //NOTA: si bien en provincias no tenemos mostrado/ocuiltado columnas... si reordeacion... por ello
    //hacemos un mapeo de las columnas mostradas en la tabla para generar el excel
    const displayedColumns = this.displayedColumnsMuniGenerado;
    const formatted = this.muniGenerado.data.map(muni => {
      const result: any = {};
      displayedColumns.forEach(col => {
        switch (col) {
          case 'id':
          result.Codigo = muni.id;
          break;
          case 'nombre':
          result.Nombre = muni.nombre;
          break;
        }
      });
      return result;
    });

    this.excelService.exportAsExcelFile(formatted, 'Lista_Municipios');
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.excelmunicipio.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.excelmunicipio.titulo')));
  }

  /**
   * Evento de drag&drop para reordenar las columnas visibles de la tabla de municipios
   * @param event
   */
  dropColumnsMunicipio(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumnsMuniGenerado, event.previousIndex, event.currentIndex);
  }

  /**
   * Des-oculta el filtro asociado a una columna de la cabecera de la tabla de Municipio
   * @param col
   */
  openFilterMunicipio(col: string) {
    const filterElement = document.getElementById(col + '-filterMunicipio');
    if (filterElement) {
      filterElement.removeAttribute('hidden');
    }
  }

  /**
   * Oculta el filtro asociado a una columna de la cabecera de la tabla de Municipio
   * @param col
   */
  closeFilterMunicipio(col: string) {
    const filterElement = document.getElementById(col + '-filterMunicipio');
    if (filterElement) {
      filterElement.setAttribute('hidden', 'true');
    }
  }

  /**
   * Aplica el filtro de texto (sin distincion mayusculars/minusculas) en la tabla
   * de Municipio.
   * @param col Nombre de la columna en la tabla sobre la que se filtra
   * @param filtertext Entrada del texto a filtrar
   */
  filterDataMunicipio(col: string, filtertext: string) {
    if (filtertext.trim() != '') {
      this.muniGenerado.data = this.muniGeneradoOriginal.slice().filter(
        (element) => JSON.stringify(element[col as keyof Ccaa]).toLowerCase().indexOf(filtertext.toLowerCase()) > -1
      );
    } else{
      //si hubieramos filtrado antes, ahora limpiamos
      if (this.muniGenerado.data.length != this.muniGeneradoOriginal.length) {
        this.muniGenerado.data = this.muniGeneradoOriginal;
      }
    }
  }

  /**
   * Accion boton para limpiar la aplicacion de filtrar en la tabla Municipio, y volver al estado original
   */
  onClickLimpiarFiltrosMunicipio(): void {
    this.muniGenerado.data = this.muniGeneradoOriginal;
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.limpiadofiltrosmunicipio.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.limpiadofiltrosmunicipio.titulo')));
  }






  /**
   * Invocamos la operacion del servicio para obtener una lista de direciciones
   */
  getDirecciones(resultados: number = 1, ineccaa: string = '', ineprovincia: string = '', inemunicipio: string = '',
    km: string = '', bloque: string = '', portal: string = '', escalera: string = '',
		planta: string = '', puerta: string = ''): void {
    this.miscService.getAddress(resultados, ineccaa, ineprovincia, inemunicipio, km, bloque, portal, escalera, planta, puerta)
    .subscribe(direccion => {
      if (direccion){
        //this.direccionGenerado.data = direccion;
        this.direccionGenerado = new MatTableDataSource(direccion);
        this.direccionGeneradoOriginal = direccion;

        //cuando se utilizaba hidden para ocultar la tabla, el paginator y sort funcionan
        //sin problema.
        //Al cambiar a ngIf... esta directiva quita/pone en el DOM el objeto, y el paginator y sort
        //dejan de funcionar.
        //Referencia: https://codehandbook.org/mat-paginator-not-working-inside-ngif/
        // Se utiliza el ChangeDetectorRef para forzar la actualizacion del DOM y que el paginator y sort
        // se vean actualizados.
        this.changeDetectorRef.detectChanges();

        // this.direccionGenerado.paginator = this.paginatorDireccionGenerado;
        // this.direccionGenerado.sort = this.sortDireccionGenerado;
      //como quita/pone pom es necesario inicializarlo todo de nuevo
      this.inicializarPaginadoresSortsDirecciones();
        if (this.direccionGenerado && this.direccionGenerado.data.length > 0) {
          this.openSnackBar(
            this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.generadodomicilio.mensaje')),
            this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.generadodomicilio.titulo')));
        }
      }

    });
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGeneraDomicilios(): void {
    this.direccionGenerado = new MatTableDataSource<DireccionCompleta>();
    this.direccionGeneradoOriginal = [];
    if (this.direccionParamCodMuni != '' && this.muniCodProvin == '') {
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.errordomicilio.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.errordomicilio.titulo')));
    } else{
      this.getDirecciones(this.direccionParamNumGenerar, this.provinCodCCAA, this.muniCodProvin, this.direccionParamCodMuni,
        this.direccionParamKm, this.direccionParamBloque, this.direccionParamPortal, this.direccionParamEscalera,
        this.direccionParamPlanta, this.direccionParamPuerta);
    }

  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarDomicilios(): void {
    this.direccionGenerado = new MatTableDataSource<DireccionCompleta>();
    this.direccionGeneradoOriginal = [];
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.limpiadodomicilio.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.limpiadodomicilio.titulo')));
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonDomicilios(): void {
    //DEPRECATED: Cuadno la tabla tenia siempre las mismas columnas y en el mismo orden, se podia hacer un mapeo directo
    // const formatted = this.direccionGenerado.data.map(dato => ({
    //   DirecciónCompleta: this.transformaTexto(dato.direccionCompleta) ,
    //   Direccion: this.transformaTexto(dato.direccion),
    //   NumVia: dato.numVia,
    //   Kilometro: dato.kilometro,
    //   Bloque: dato.bloque,
    //   Portal: dato.portal,
    //   Escalera: dato.escalera,
    //   Planta: this.transformaTexto(dato.planta),
    //   Puerta: this.transformaTexto(dato.puerta),
    //   CodigoPostal: dato.codPostal,
    //   Municipio: this.transformaTexto(dato.ineMunicipio + ' - ' + dato.municipio),
    //   Provincia: this.transformaTexto(dato.ineProvincia + ' - ' + dato.provincia),
    //   CCAA: this.transformaTexto(dato.ineCcaa + ' - ' + dato.ccaa),
    //   ReferenciaCatastral: this.transformaTexto(dato.referenciaCatastral)}));

    //lo basamso en las columnas mostradas para coger los cambios de columnas visibles o no, y el orden de las mismas
    const displayedColumns = this.displayedColumnsDireccionGenerado;
    const formatted = this.direccionGenerado.data.map(direccion => {
      const result: any = {};
      displayedColumns.forEach(col => {
        switch (col) {
          case 'Dirección completa':
          result.DireccionCompleta = direccion.direccionCompleta;
          break;
          case 'Dirección':
          result.Direccion = direccion.direccion;
          break;
          case 'Número':
          result.NumVia = direccion.numVia;
          break;
          case 'Km':
          result.Kilometro = direccion.kilometro;
          break;
          case 'Bloque':
          result.Bloque = direccion.bloque;
          break;
          case 'Portal':
          result.Portal = direccion.portal;
          break;
          case 'Escalera':
          result.Escalera = direccion.escalera;
          break;
          case 'Planta':
          result.Planta = direccion.planta;
          break;
          case 'Puerta':
          result.Puerta = direccion.puerta;
          break;
          case 'CP':
          result.CodigoPostal = direccion.codPostal;
          break;
          case 'Municipio':
          result.Municipio = direccion.ineMunicipio + ' - ' + direccion.municipio;
          break;
          case 'Provincia':
          result.Provincia = direccion.ineProvincia + ' - ' + direccion.provincia;
          break;
          case 'CCAA':
          result.CCAA = direccion.ineCcaa + ' - ' + direccion.ccaa;
          break;
          case 'Ref. catastral':
          result.ReferenciaCatastral = direccion.referenciaCatastral;
          break
        }
      });
      return result;
    });

    this.excelService.exportAsExcelFile(formatted, 'Lista_Domicilios');
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.exceldomicilio.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.exceldomicilio.titulo')));
  }




  /**
   * Evento ante las seleccion/deseleccion de una columna visible del combo de columnas de direcciones
   * NOTA: "selectColumnasDirecciones" ya llega con el nuevo valor actualizado, llevando el string[] de las columnas
   * seleccionadas tras el cambio efectuado.
   * @param selected true si el cambio a sido a marcado, false en otro caso
   * @param value Columna cambiada en el combo
   */
  togglePerOneColumnasDireccion(selected: boolean, value: string): void {
    //Tratamos como caso especial el Seleccionar Todas... para marcar o desmarcar directamente las columnas reales
    if (value == BaseGeneraComponent.columSeleccionarTodas && selected) {
      this.selectColumnasDirecciones = this.listaColumnasDirecciones;
    } else if (value == BaseGeneraComponent.columSeleccionarTodas && !selected){
      this.selectColumnasDirecciones = [];
    } else {
      //otro caso implica que se ha marcado o desmarcado una columna real
      //NOTA: en lo que respecta a la aplicacion del marcado/desmarcado de una columna real, no hay que
      //hacer nada especial, dado que el model asociado al mat-select "selectColumnasDirecciones" ya llega
      //aqui con dicha columna real marcada/desmarcada según se realizo. Al final
      //soincronizaremos displayedColumnsDireccionGenerado.

      //Eso si, comparamos si estan todas o no, dado que de ello dependerera el automarcar o autodesmarcar la opcion
      //especial "Seleccionar Todas..."
      let seleccionesMenosTodos = this.selectColumnasDirecciones.filter((col) => col != BaseGeneraComponent.columSeleccionarTodas);
      let todasMenosTodos = this.listaColumnasDirecciones.filter((col) => col != BaseGeneraComponent.columSeleccionarTodas);
      if (seleccionesMenosTodos.length == todasMenosTodos.length) {
        //marcamos seleccionar todo si no lo esta ya
        if (!this.selectColumnasDirecciones.includes(BaseGeneraComponent.columSeleccionarTodas)) {
          this.selectColumnasDirecciones = this.selectColumnasDirecciones.concat([BaseGeneraComponent.columSeleccionarTodas])
        }
      } else{
        //si estuviera marcado seleccionadr todo, lo quitamos
        if (this.selectColumnasDirecciones.includes(BaseGeneraComponent.columSeleccionarTodas)) {
          this.selectColumnasDirecciones = this.selectColumnasDirecciones.filter((col) => col != BaseGeneraComponent.columSeleccionarTodas);
        }
      }
    }

    //Sincronizamos a la lista de columnas visibles de la tabla
    this.sincronizarListaColumVisiblesDirecciones();
  }

  /**
   * Sincroniza las columnas visibles modificadas por el combo de columnas de direcciones a mostrar
   * sobre la lista de columnas mostradas asociadas a la tabla.
   */
  sincronizarListaColumVisiblesDirecciones(): void {
    this.displayedColumnsDireccionGenerado = this.selectColumnasDirecciones.filter((col) => col != BaseGeneraComponent.columSeleccionarTodas);
  }

  /**
   * Evento de drag&drop para reordenar las columnas visibles de la tabla de direcciones
   * @param event
   */
  dropColumnsDirecciones(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumnsDireccionGenerado, event.previousIndex, event.currentIndex);
  }

  /**
   * Des-oculta el filtro asociado a una columna de la cabecera de la tabla de direcciones
   * @param col
   */
  openFilterDirecciones(col: string) {
    const filterElement = document.getElementById(col + '-filterDireccion');
    if (filterElement) {
      filterElement.removeAttribute('hidden');
    }
  }

  /**
   * Oculta el filtro asociado a una columna de la cabecera de la tabla de direcciones
   * @param col
   */
  closeFilterDirecciones(col: string) {
    const filterElement = document.getElementById(col + '-filterDireccion');
    if (filterElement) {
      filterElement.setAttribute('hidden', 'true');
    }
  }

  /**
   * Aplica el filtro de texto (sin distincion mayusculars/minusculas) en la tabla
   * de direcciones.
   * @param col Nombre de la columna en la tabla sobre la que se filtra
   * @param filtertext Entrada del texto a filtrar
   */
  filterDataDirecciones(col: string, filtertext: string) {
    if (filtertext.trim() != '') {
      this.direccionGenerado.data = this.direccionGeneradoOriginal.slice().filter(
        (element) => JSON.stringify(element[col as keyof DireccionCompleta]).toLowerCase().indexOf(filtertext.toLowerCase()) > -1
      );
    } else{
      //si hubieramos filtrado antes, ahora limpiamos
      if (this.direccionGenerado.data.length != this.direccionGeneradoOriginal.length) {
        this.direccionGenerado.data = this.direccionGeneradoOriginal;
      }
    }
  }

  /**
   * Accion boton para limpiar la aplicacion de filtrar en la tabla direcciones, y volver al estado original
   */
  onClickLimpiarFiltrosDomicilios(): void {
    this.direccionGenerado.data = this.direccionGeneradoOriginal;
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.limpiadofiltrosdomicilio.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.localizacion.mensajes.limpiadofiltrosdomicilio.titulo')));
  }


  /**
   * Necesitamos una funcion concreta de ordenacion para tabla direcciones.
   * No nos sirve announceSortChange porque para eso los key que se asocia a matColumnDef
   * deberia tener el mismo valor que en la propiedad de los datos que se filtran, y no es asi,
   * porque los modificamos porque son los que se utilizan en el combo de columnas visibles.
   * Referencia: https://medium.com/@srik913/angular-material-table-complete-example-bb5726b96c5e
   * @param $event
   */
  sortDataDirecciones($event: Sort) {
    const sortId = $event.active;
    const sortDirection = $event.direction;

    //sortId recibe el col.key... y debemos sacar de COLUMNS_SCHEMA_DOMICILIO, el valor de col.columna que corresponde a esa key
    //para poder ordenar correctamente. En caso de no encontrarlo, no se ordena.
    let columnaOrdenar = GeneraLocalizacionComponent.COLUMNS_SCHEMA_DOMICILIO.find((col) => col.key == sortId);
    let columnaOrdenarReal = columnaOrdenar ? columnaOrdenar.columna : '';

    if ('asc' == sortDirection) {
      this.direccionGenerado.data = this.direccionGenerado.data.slice().sort(
        (a, b) => a[columnaOrdenarReal as keyof DireccionCompleta] > b[columnaOrdenarReal as keyof DireccionCompleta] ? -1 : a[columnaOrdenarReal as keyof DireccionCompleta] < b[columnaOrdenarReal as keyof DireccionCompleta] ? 1 : 0
      );
    } else {
      this.direccionGenerado.data = this.direccionGenerado.data.slice().sort(
        (a, b) => a[columnaOrdenarReal as keyof DireccionCompleta] < b[columnaOrdenarReal as keyof DireccionCompleta] ? -1 : a[columnaOrdenarReal as keyof DireccionCompleta] > b[columnaOrdenarReal as keyof DireccionCompleta] ? 1 : 0
      );
    }
  }








}
