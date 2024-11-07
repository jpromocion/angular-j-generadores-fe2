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
import { MatOption } from '@angular/material/core';
import { MiscService } from '../core/services/misc.service';
import { Ccaa } from '../core/models/ccaa';
import { Provincia } from '../core/models/provincia';
import { Municipio } from '../core/models/municipio';
import { DireccionCompleta } from '../core/models/direccion-completa';



//displayedColumnsDireccionGenerado: string[] = ['direccionCompleta', 'direccion', 'numVia', 'kilometro', 'bloque', 'portal', 'escalera', 'planta', 'puerta' , 'codpostal', 'municipio', 'provincia', 'ccaa', 'referenciaCatastral'];


@Component({
  selector: 'app-genera-localizacion',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, MatButtonToggleModule,MatIconModule,MatButtonModule,MatTooltipModule, CaseTransformerPipe,
    MatFormFieldModule,MatInputModule,MatSelectModule,MatListModule,MatCardModule,MatCheckboxModule,
    MatTableModule, MatPaginatorModule,MatSortModule,NgSwitch,NgSwitchCase,NgSwitchDefault,NgClass],
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
      label: "Código"
    },
    {
      key: "nombre",
      columna: "nombre",
      type: "button",
      label: "Nombre"
    }
  ];


  //Definicion del mostrado de columnas para tabla provincias, personalizado opciones
  //para mostrar filas por plantillas
  static COLUMNS_SCHEMA_PROVIN = [
    {
      key: "id",
      columna: "id",
      type: "button",
      label: "Código"
    },
    {
      key: "nombre",
      columna: "nombre",
      type: "button",
      label: "Nombre"
    }
  ];

  //Definicion del mostrado de columnas para tabla provincias, personalizado opciones
  //para mostrar filas por plantillas
  static COLUMNS_SCHEMA_MUNI = [
    {
      key: "id",
      columna: "id",
      type: "button",
      label: "Código"
    },
    {
      key: "nombre",
      columna: "nombre",
      type: "button",
      label: "Nombre"
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
      label: "Completa"
    },
    {
      key: "Dirección",
      columna: "direccion",
      type: "button",
      caseSensitive: true,
      clase: "botonFlatGrande",
      label: "Dirección"
    },
    {
      key: "Número",
      columna: "numVia",
      type: "button",
      label: "Número"
    },
    {
      key: "Km",
      columna: "kilometro",
      type: "button",
      label: "Km"
    },
    {
      key: "Bloque",
      columna: "bloque",
      type: "button",
      label: "Bloque"
    },
    {
      key: "Portal",
      columna: "portal",
      type: "button",
      label: "Portal"
    },
    {
      key: "Escalera",
      columna: "escalera",
      type: "button",
      label: "Escalera"
    },
    {
      key: "Planta",
      columna: "planta",
      type: "button",
      caseSensitive: true,
      label: "Planta"
    },
    {
      key: "Puerta",
      columna: "puerta",
      type: "button",
      caseSensitive: true,
      label: "Puerta"
    },
    {
      key: "CP",
      columna: "codPostal",
      type: "button",
      caseSensitive: true,
      label: "Cod. Postal"
    },
    {
      key: "Municipio",
      columna: "ineMunicipio",
      clase: "botonFlatReducido",
      type: "button",
      caseSensitive: true,
      label: "Municipio",
      columna2: "municipio",
    },
    {
      key: "Provincia",
      columna: "ineProvincia",
      clase: "botonFlatReducido",
      type: "button",
      caseSensitive: true,
      label: "Provincia",
      columna2: "provincia",
    },
    {
      key: "CCAA",
      columna: "ineCcaa",
      clase: "botonFlatReducido",
      type: "button",
      caseSensitive: true,
      label: "CCAA",
      columna2: "ccaa",
    },
    {
      key: "Ref. catastral",
      columna: "referenciaCatastral",
      type: "button",
      caseSensitive: true,
      label: "Ref. catastral"
    },
  ];


  //ccaa
  //ccaaGenerado: Ccaa[] = [];
  ccaaGenerado = new MatTableDataSource<Ccaa>();
  displayedColumnsCcaaGenerado: string[] = GeneraLocalizacionComponent.COLUMNS_SCHEMA_CCAA.map((col) => col.key)
  columnsSchemaCcaaGenerado: any = GeneraLocalizacionComponent.COLUMNS_SCHEMA_CCAA;
  @ViewChild('paginatorCcaaGenerado') paginatorCcaaGenerado!: MatPaginator;
  @ViewChild('sortCcaaGenerado') sortCcaaGenerado!: MatSort;

  //provincias
  provinCodCCAA: string = '';
  //provinGenerado: Provincia[] = [];
  provinGenerado = new MatTableDataSource<Provincia>();
  displayedColumnsProvinGenerado: string[] =  GeneraLocalizacionComponent.COLUMNS_SCHEMA_PROVIN.map((col) => col.key)
  columnsSchemaProvinGenerado: any = GeneraLocalizacionComponent.COLUMNS_SCHEMA_PROVIN;


  @ViewChild('paginatorProvinGenerado') paginatorProvinGenerado!: MatPaginator;
  @ViewChild('sortProvinGenerado') sortProvinGenerado!: MatSort;

  //municipios
  muniCodProvin: string = '';
  //muniGenerado: Municipio[] = [];
  muniGenerado = new MatTableDataSource<Provincia>();
  displayedColumnsMuniGenerado: string[] =  GeneraLocalizacionComponent.COLUMNS_SCHEMA_MUNI.map((col) => col.key)
  columnsSchemaMuniGenerado: any = GeneraLocalizacionComponent.COLUMNS_SCHEMA_MUNI;

  @ViewChild('paginatorMuniGenerado') paginatorMuniGenerado!: MatPaginator;
  @ViewChild('sortMuniGenerado') sortMuniGenerado!: MatSort;

  //direccion completa
  direccionParamCodMuni: string = '';
  direccionParamNumGenerar: number = 10;
  direccionGenerado = new MatTableDataSource<DireccionCompleta>();
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
  selectColumnasDirecciones: string[] = this.listaColumnasDirecciones.concat([BaseGeneraComponent.columSeleccionarTodas]);

  //inyeccion de dependencia para utilizar el servicio de generacion de miscelanea
  private miscService: MiscService = inject(MiscService);

  constructor() {
    super();
  }

  override ngOnInit(): void {
    this.tipoLetra = 's';

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

    this.inicializarLabelsPaginador(this.paginatorDireccionGenerado);
    this.direccionGenerado.paginator = this.paginatorDireccionGenerado;
    this.direccionGenerado.sort = this.sortDireccionGenerado;
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







  /**
   * Invocamos la operacion del servicio para obtener una lista de direciciones
   */
  getDirecciones(resultados: number = 1, ineccaa: string = '', ineprovincia: string = '', inemunicipio: string = ''): void {
    this.miscService.getAddress(resultados, ineccaa, ineprovincia, inemunicipio)
    .subscribe(direccion => {
      if (direccion){
        this.direccionGenerado.data = direccion;
        this.direccionGenerado.paginator = this.paginatorDireccionGenerado;
        this.direccionGenerado.sort = this.sortDireccionGenerado;
        if (this.direccionGenerado && this.direccionGenerado.data.length > 0) {
          this.openSnackBar('Lista domicilios generados', 'GenerarDomicilios');
        }
      }

    });
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGeneraDomicilios(): void {
    this.direccionGenerado = new MatTableDataSource<DireccionCompleta>();
    if (this.direccionParamCodMuni != '' && this.muniCodProvin == '') {
      this.openSnackBar('El municipio debe seleccionarse con un código de provincia.','ErrorDomicilios');
    } else{
      this.getDirecciones(this.direccionParamNumGenerar, this.provinCodCCAA, this.muniCodProvin, this.direccionParamCodMuni);
    }

  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarDomicilios(): void {
    this.direccionGenerado = new MatTableDataSource<DireccionCompleta>();
    this.openSnackBar('Domicilios limpiados', 'LimpiarDomicilios');
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonDomicilios(): void {
    const formatted = this.direccionGenerado.data.map(dato => ({
      DirecciónCompleta: this.transformaTexto(dato.direccionCompleta) ,
      Direccion: this.transformaTexto(dato.direccion),
      NumVia: dato.numVia,
      Kilometro: dato.kilometro,
      Bloque: dato.bloque,
      Portal: dato.portal,
      Escalera: dato.escalera,
      Planta: this.transformaTexto(dato.planta),
      Puerta: this.transformaTexto(dato.puerta),
      CodigoPostal: dato.codPostal,
      Municipio: this.transformaTexto(dato.ineMunicipio + ' - ' + dato.municipio),
      Provincia: this.transformaTexto(dato.ineProvincia + ' - ' + dato.provincia),
      CCAA: this.transformaTexto(dato.ineCcaa + ' - ' + dato.ccaa),
      ReferenciaCatastral: this.transformaTexto(dato.referenciaCatastral)}));
    this.excelService.exportAsExcelFile(formatted, 'Lista_Domicilios');
    this.openSnackBar('Excel generado','ExcelDomicilios');
  }

  /**
   * Devolver las columnas que en cada momento se mostraran en tabla direcciones al cambiar con el selector de columnas visibles
   * @returns
   */
  getDisplayedColumnsDireccionGenerado(): string[] {
    //la opcion Seleccionar Todos, nunca se devuelve, dado que no es una columan existente y daria error
    this.displayedColumnsDireccionGenerado = this.selectColumnasDirecciones.filter((col) => col != BaseGeneraComponent.columSeleccionarTodas);
    return this.displayedColumnsDireccionGenerado;
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
      //aqui con dicha columna real marcada/desmarcada según se realizo. Por tanto "getDisplayedColumnsDireccionGenerado"
      //actualizara la tabla automaticamente al coger las nueva columnas.

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

  }

}
