import { Component, OnInit, inject, AfterViewInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import {NgFor,NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgClass} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatGridListModule} from '@angular/material/grid-list';
import { CaseTransformerPipe } from '../shared/pipes/case-transformer.pipe';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import {Sort} from '@angular/material/sort';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {CdkDragDrop,CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { ChangeDetectorRef } from '@angular/core';
import {MatBadgeModule} from '@angular/material/badge';
import {BaseGeneraComponent} from '../shared/components/base-genera/base-genera.component';
import { ProfilesService } from '../core/services/profiles.service';
import { Persona } from '../core/models/persona';
import { Empresa } from '../core/models/empresa';
import { DireccionCompleta } from '../core/models/direccion-completa';
import { TranslateModule } from '@ngx-translate/core';
import { marker} from '@colsen1991/ngx-translate-extract-marker';



@Component({
    selector: 'app-genera-perfiles',
    imports: [NgFor, FormsModule, NgIf, MatButtonToggleModule, MatIconModule, MatButtonModule, MatTooltipModule, MatGridListModule, CaseTransformerPipe,
        MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSortModule, NgSwitch, NgSwitchCase, NgSwitchDefault, NgClass,
        MatSelectModule, CdkDropList, CdkDrag, MatBadgeModule, TranslateModule],
    templateUrl: './genera-perfiles.component.html',
    styleUrl: './genera-perfiles.component.scss'
})
export class GeneraPerfilesComponent extends BaseGeneraComponent implements OnInit , AfterViewInit  {

  //Definicion del mostrado de columnas para tabla personas, personalizado opciones
  //para mostrar filas por plantillas
  static COLUMNS_SCHEMA_PERSONAS = [
    {
      key: "Nif",
      columna: "nif",
      type: "button",
      label: "generadores.jpromocion.perfil.salida.persona.nif.label"
    },
    {
      key: "Nie",
      columna: "nie",
      type: "button",
      label: "generadores.jpromocion.perfil.salida.persona.nie.label"
    },
    {
      key: "Nss",
      columna: "nss",
      type: "button",
      label: "generadores.jpromocion.perfil.salida.persona.nss.label"
    },
    {
      key: "Pasaporte",
      columna: "pasaporte",
      type: "button",
      label: "generadores.jpromocion.perfil.salida.persona.pasaporte.label"
    },
    {
      key: "Genero",
      columna: "genero",
      type: "button",
      caseSensitive: true,
      label: "generadores.jpromocion.perfil.salida.persona.sexo.label"
    },
    {
      key: "Fecha_Nacimiento",
      columna: "fechaNacimiento",
      type: "button",
      caseSensitive: true,
      clase: "botonFlatReducido",
      label: "generadores.jpromocion.perfil.salida.persona.fechanacimiento.label",
      columna2: "edad",
    },
    {
      key: "Nombre",
      columna: "nombre",
      type: "button",
      caseSensitive: true,
      clase: "botonFlatGrande",
      label: "generadores.jpromocion.perfil.salida.persona.nombre.label"
    },
    {
      key: "Apellido_1",
      columna: "apellido1",
      type: "button",
      caseSensitive: true,
      clase: "botonFlatGrande",
      label: "generadores.jpromocion.perfil.salida.persona.apellido1.label"
    },
    {
      key: "Apellido_2",
      columna: "apellido2",
      type: "button",
      caseSensitive: true,
      clase: "botonFlatGrande",
      label: "generadores.jpromocion.perfil.salida.persona.apellido2.label"
    },
    {
      key: "Nombre_Completo",
      columna: "nombreCompleto",
      type: "button",
      caseSensitive: true,
      clase: "botonFlatGrande",
      label: "generadores.jpromocion.perfil.salida.persona.nombrecompleto.label"
    },
    {
      key: "Telefono_Movil",
      columna: "telefonoMovil",
      type: "button",
      label: "generadores.jpromocion.perfil.salida.persona.telefonomovil.label"
    },
    {
      key: "Telefono_Fijo",
      columna: "telefonoFijo",
      type: "button",
      label: "generadores.jpromocion.perfil.salida.persona.telefonofijo.label"
    },
    {
      key: "Login",
      columna: "login",
      type: "button",
      caseSensitive: true,
      label: "generadores.jpromocion.perfil.salida.persona.login.label"
    },
    {
      key: "Email",
      columna: "email",
      type: "button",
      caseSensitive: true,
      label: "generadores.jpromocion.perfil.salida.persona.email.label"
    },
    {
      key: "Password",
      columna: "password",
      type: "button",
      label: "generadores.jpromocion.perfil.salida.persona.password.label"
    },
    {
      key: "CCAA",
      columna: "direccion",
      subpropiedad: "ineCcaa",
      clase: "botonFlatReducido",
      type: "subobjeto",
      caseSensitive: true,
      label: "generadores.jpromocion.perfil.salida.persona.ccaa.label",
      columna2: "direccion",
      subpropiedad2: "ccaa",
    },
    {
      key: "Provincia",
      columna: "direccion",
      subpropiedad: "ineProvincia",
      clase: "botonFlatReducido",
      type: "subobjeto",
      caseSensitive: true,
      label: "generadores.jpromocion.perfil.salida.persona.provincia.label",
      columna2: "direccion",
      subpropiedad2: "provincia",
    },
    {
      key: "Municipio",
      columna: "direccion",
      subpropiedad: "ineMunicipio",
      clase: "botonFlatReducido",
      type: "subobjeto",
      caseSensitive: true,
      label: "generadores.jpromocion.perfil.salida.persona.municipio.label",
      columna2: "direccion",
      subpropiedad2: "municipio",
    },
    {
      key: "Cod_Postal",
      columna: "direccion",
      subpropiedad: "codPostal",
      type: "subobjeto",
      caseSensitive: true,
      label: "generadores.jpromocion.perfil.salida.persona.cp.label"
    },
    {
      key: "Direccion",
      columna: "direccion",
      subpropiedad: "direccionAMedio",
      clase: "botonFlatGrande",
      type: "subobjeto",
      caseSensitive: true,
      label: "generadores.jpromocion.perfil.salida.persona.direccion.label"
    },
    {
      key: "Dir_Completa",
      columna: "direccion",
      subpropiedad: "direccionCompleta",
      clase: "botonFlatGrande",
      type: "subobjeto",
      caseSensitive: true,
      label: "generadores.jpromocion.perfil.salida.persona.direccioncompleta.label"
    },
    {
      key: "Ref_Catastral",
      columna: "direccion",
      subpropiedad: "referenciaCatastral",
      type: "subobjeto",
      caseSensitive: true,
      label: "generadores.jpromocion.perfil.salida.persona.refcatastral.label"
    },
    {
      key: "Iban",
      columna: "iban",
      type: "button",
      label: "generadores.jpromocion.perfil.salida.persona.iban.label"
    },
    {
      key: "Bic",
      columna: "bic",
      type: "button",
      label: "generadores.jpromocion.perfil.salida.persona.bic.label"
    },
    {
      key: "Tarjeta",
      columna: "tarjetaCredito",
      type: "button",
      label: "generadores.jpromocion.perfil.salida.persona.tarjeta.label"
    },
    {
      key: "Tipo_Tarjeta",
      columna: "tipoTarjeta",
      type: "button",
      caseSensitive: true,
      label: "generadores.jpromocion.perfil.salida.persona.tipotarjeta.label"
    },
    {
      key: "Expiracion",
      columna: "expiracionCredito",
      type: "button",
      label: "generadores.jpromocion.perfil.salida.persona.expiracion.label"
    },
    {
      key: "Cvc",
      columna: "cvc",
      type: "button",
      label: "generadores.jpromocion.perfil.salida.persona.cvc.label"
    }
  ];

  //Definicion del mostrado de columnas para tabla empresas, personalizado opciones
  //para mostrar filas por plantillas
  static COLUMNS_SCHEMA_EMPRESAS = [
    {
      key: "Cif",
      columna: "cif",
      type: "button",
      label: "generadores.jpromocion.perfil.salida.empresa.cif.label"
    },
    {
      key: "Razón",
      columna: "nombre",
      type: "button",
      clase: "botonFlatGrande",
      caseSensitive: true,
      label: "generadores.jpromocion.perfil.salida.empresa.razonsocial.label"
    },
    {
      key: "Fecha_Constitución",
      columna: "fechaCreacion",
      type: "button",
      label: "generadores.jpromocion.perfil.salida.empresa.fechaconstitucion.label"
    },
    {
      key: "Cnae",
      columna: "cnae",
      type: "button",
      label: "generadores.jpromocion.perfil.salida.empresa.cnae.label"
    },
    {
      key: "Actividad",
      columna: "actividad",
      type: "button",
      clase: "botonFlatGrande",
      caseSensitive: true,
      label: "generadores.jpromocion.perfil.salida.empresa.actividad.label"
    },
    {
      key: "Email",
      columna: "email",
      type: "button",
      caseSensitive: true,
      label: "generadores.jpromocion.perfil.salida.empresa.email.label"
    },
    {
      key: "Página_Web",
      columna: "paginaWeb",
      type: "button",
      caseSensitive: true,
      label: "generadores.jpromocion.perfil.salida.empresa.paginaweb.label"
    },
    {
      key: "Telefono",
      columna: "telefono",
      type: "button",
      label: "generadores.jpromocion.perfil.salida.empresa.telefono.label"
    },
    {
      key: "Fax",
      columna: "fax",
      type: "button",
      label: "generadores.jpromocion.perfil.salida.empresa.fax.label"
    },
    {
      key: "CCAA",
      columna: "direccion",
      subpropiedad: "ineCcaa",
      clase: "botonFlatReducido",
      type: "subobjeto",
      caseSensitive: true,
      label: "generadores.jpromocion.perfil.salida.empresa.ccaa.label",
      columna2: "direccion",
      subpropiedad2: "ccaa",
    },
    {
      key: "Provincia",
      columna: "direccion",
      subpropiedad: "ineProvincia",
      clase: "botonFlatReducido",
      type: "subobjeto",
      caseSensitive: true,
      label: "generadores.jpromocion.perfil.salida.empresa.provincia.label",
      columna2: "direccion",
      subpropiedad2: "provincia",
    },
    {
      key: "Municipio",
      columna: "direccion",
      subpropiedad: "ineMunicipio",
      clase: "botonFlatReducido",
      type: "subobjeto",
      caseSensitive: true,
      label: "generadores.jpromocion.perfil.salida.empresa.municipio.label",
      columna2: "direccion",
      subpropiedad2: "municipio",
    },
    {
      key: "Cod_Postal",
      columna: "direccion",
      subpropiedad: "codPostal",
      type: "subobjeto",
      caseSensitive: true,
      label: "generadores.jpromocion.perfil.salida.empresa.cp.label"
    },
    {
      key: "Dirección",
      columna: "direccion",
      subpropiedad: "direccionAMedio",
      clase: "botonFlatGrande",
      type: "subobjeto",
      caseSensitive: true,
      label: "generadores.jpromocion.perfil.salida.empresa.direccion.label"
    },
    {
      key: "Dir_Completa",
      columna: "direccion",
      subpropiedad: "direccionCompleta",
      clase: "botonFlatGrande",
      type: "subobjeto",
      caseSensitive: true,
      label: "generadores.jpromocion.perfil.salida.empresa.direccioncompleta.label"
    },
    {
      key: "Ref_Catastral",
      columna: "direccion",
      subpropiedad: "referenciaCatastral",
      type: "subobjeto",
      caseSensitive: true,
      label: "generadores.jpromocion.perfil.salida.empresa.refcatastral.label"
    }
  ];

  //filstros
  tipoPerfil: string = 'p';
  sexoSeleccionado: string = 'a';


  numGenerar: number = 1;

  personaGenerada: Persona | undefined;
  empresaGenerada: Empresa | undefined;

  //cuando generamos varias personas
  // - listaPersonasGeneradas: va a contener los datos visibles en la tabla, de forma que se actualiza al aplicar filtros por columna.
  // - listaPersonasGeneradasOriginal: va a contener los datos originales de la ultima vez que se accedio a la API rest,
  //   de forma que no se modifica por la aplicacion de filtros por columna, y permite restablecer los datos al quitar
  //   o revisar los filtros.
  listaPersonasGeneradas = new MatTableDataSource<Persona>();
  listaPersonasGeneradasOriginal: Persona	[] = [];
  //DEPRECATED: antiguo sistema donde se defina cada columna en el html individualmente
  // displayedColumnsPersonas: string[] = ['nif', 'nie','nss', 'pasaporte','sexo', 'fechanacimiento', 'nombre', 'apellido1', 'apellido2','nombrecompleto','tlfmovil','tlffijo','login','email',
  //   'password','ccaa','provincia','municipio','codpostal','direccion','direccioncompleta', 'referenciaCatastral','iban','bic', 'tarjeta','tipotarjeta',
  //   'expiracion','cvc'];
  displayedColumnsPersonas: string[] =  GeneraPerfilesComponent.COLUMNS_SCHEMA_PERSONAS.map((col) => col.key)
  columnsSchemaPersonas: any = GeneraPerfilesComponent.COLUMNS_SCHEMA_PERSONAS;
  //OJO!: al tener dos paginadopres en la misma pagina, no se puede usar ViewChild con dos sino ViewChildren
  //que es un array de paginadores, y ya utilizar cada uno por su orden dentro del array.
  //NOTA: https://stackoverflow.com/questions/50428605/multiple-material-pagination-in-one-component-doesnt-work-in-angular
  //O, ponerlo nombre a cada paginador!!!!
  //NOTA: https://es.stackoverflow.com/questions/599131/por-qu%C3%A9-al-usar-dos-o-mas-mat-paginator-en-diferentes-tablas-pero-en-la-misma-p
  //@ViewChild(MatPaginator) paginatorPersonas!: MatPaginator;
  @ViewChild('paginatorPersonas') paginatorPersonas!: MatPaginator;
  //@ViewChildren(MatPaginator) paginatorPagina = new QueryList<MatPaginator>();
  @ViewChild('sortPersonas') sortPersonas!: MatSort;
  badgetPersonasGenradas: number = 0;

  //cuando generamos varias empresas
  listaEmpresasGeneradas = new MatTableDataSource<Empresa>();
  listaEmpresasGeneradasOriginal: Empresa[] = [];
  displayedColumnsEmpresas: string[] =  GeneraPerfilesComponent.COLUMNS_SCHEMA_EMPRESAS.map((col) => col.key)
  columnsSchemaEmpresas: any = GeneraPerfilesComponent.COLUMNS_SCHEMA_EMPRESAS;
  //@ViewChild(MatPaginator) paginatorEmpresas!: MatPaginator;
  @ViewChild('paginatorEmpresas') paginatorEmpresas!: MatPaginator;
  @ViewChild('sortEmpresas') sortEmpresas!: MatSort;
  badgetEmpresasGeneradas: number = 0;


  //seleccionar columnas a mostrar en tabla personas:
  //-Lista de todas las opciones posibles para el combo.
  //NOTA: utilizamos las columnas originales... a las que se añade la opcion especial Seleccionar Todos
  listaColumnasPersonas: string[] = GeneraPerfilesComponent.COLUMNS_SCHEMA_PERSONAS.map((col) => col.key).concat([BaseGeneraComponent.columSeleccionarTodas]);
  //-Lista que controla que opciones de las anteriores están marcadas (ngModel del mat-select)
  //NOTA: de inicio se marcaran todas, incluyendo la de Seleccionar Todos tambien
  selectColumnasPersonas: string[] = this.listaColumnasPersonas;

  //seleccionar columnas a mostrar en tabla empresas:
  //-Lista de todas las opciones posibles para el combo.
  //NOTA: utilizamos las columnas originales... a las que se añade la opcion especial Seleccionar Todos
  listaColumnasEmpresas: string[] = GeneraPerfilesComponent.COLUMNS_SCHEMA_EMPRESAS.map((col) => col.key).concat([BaseGeneraComponent.columSeleccionarTodas]);
  //-Lista que controla que opciones de las anteriores están marcadas (ngModel del mat-select)
  //NOTA: de inicio se marcaran todas, incluyendo la de Seleccionar Todos tambien
  selectColumnasEmpresas: string[] = this.listaColumnasEmpresas;



  //inyeccion de dependencia para utilizar el servicio de generacion de datos bancarios
  private profilesService: ProfilesService = inject(ProfilesService);

  //Referencia: https://codehandbook.org/mat-paginator-not-working-inside-ngif/
  // Se utiliza el ChangeDetectorRef para forzar la actualizacion del DOM y que el paginator y sort
  // se vean actualizados.
  changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);



  constructor() {
    super();
  }

  override ngOnInit(): void {
    console.log("prueba");
  }

  inicializarPaginadoresSortsPersonas(): void {
    this.inicializarLabelsPaginador(this.paginatorPersonas);
    this.listaPersonasGeneradas.paginator = this.paginatorPersonas;
    this.listaPersonasGeneradas.sort = this.sortPersonas;
  }

  inicializarPaginadoresSortsEmpresas(): void {
    this.inicializarLabelsPaginador(this.paginatorEmpresas);
    this.listaEmpresasGeneradas.paginator = this.paginatorEmpresas;
    this.listaEmpresasGeneradas.sort = this.sortEmpresas;
  }

  inicializarPaginadoresSortsTablas(): void {
    this.inicializarPaginadoresSortsPersonas();

    this.inicializarPaginadoresSortsEmpresas();

  }


  ngAfterViewInit() {
    //con el hidden valia con inializar todas aqui... pero con el ngIf es necesario
    //incilizar cada elemento cuando se genera la tabla, dado que ngIf saca/mete del DOM
    //los objetos.
    this.inicializarPaginadoresSortsTablas();

  }


  /**
   * Invocamos la operacion del servicio para obtener una lista de personas aleatorios
   */
  getPersonas(resultados: number): void {
    let sexoparam: string = '';
    if (this.sexoSeleccionado == 'a') {
      sexoparam = '';
    } else if (this.sexoSeleccionado == 'h') {
      sexoparam = 'male';
    } else if (this.sexoSeleccionado == 'm') {
      sexoparam = 'female';
    }

    if (resultados == 1) {
      this.profilesService.getPerson(resultados, sexoparam)
      .subscribe(persona => {
        this.personaGenerada = persona[0];
        if (this.personaGenerada){
          this.openSnackBar(
            this.translate.instant(marker('generadores.jpromocion.perfil.mensajes.generadopersona.mensaje')),
            this.translate.instant(marker('generadores.jpromocion.perfil.mensajes.generadopersona.titulo')));
        }
      });
    } else {
      this.profilesService.getPerson(resultados, sexoparam)
      .subscribe(personas => {
        this.badgetPersonasGenradas = 0;

        //this.listaPersonasGeneradas.data = personas;
        this.listaPersonasGeneradas = new MatTableDataSource(personas);
        this.listaPersonasGeneradasOriginal = personas;

        //cuando se utilizaba hidden para ocultar la tabla, el paginator y sort funcionan
        //sin problema.
        //Al cambiar a ngIf... esta directiva quita/pone en el DOM el objeto, y el paginator y sort
        //dejan de funcionar.
        //Referencia: https://codehandbook.org/mat-paginator-not-working-inside-ngif/
        // Se utiliza el ChangeDetectorRef para forzar la actualizacion del DOM y que el paginator y sort
        // se vean actualizados.
        this.changeDetectorRef.detectChanges();

        // this.listaPersonasGeneradas.paginator = this.paginatorPersonas;
        // this.listaPersonasGeneradas.sort = this.sortPersonas;
        //como quita/pone pom es necesario inicializarlo todo de nuevo
        this.inicializarPaginadoresSortsPersonas();
        if (this.listaPersonasGeneradas && this.listaPersonasGeneradas.data.length > 0) {
          this.badgetPersonasGenradas = this.listaPersonasGeneradas.data.length;
          this.openSnackBar(
            this.translate.instant(marker('generadores.jpromocion.perfil.mensajes.generadopersonas.mensaje')),
            this.translate.instant(marker('generadores.jpromocion.perfil.mensajes.generadopersonas.titulo')));
        }
    });
    }
  }

  /**
   * Invocamos la operacion del servicio para obtener una lista de empresas aleatorios
   */
  getEmpresas(resultados: number): void {
    if (resultados == 1) {
      this.profilesService.getCompany(resultados)
      .subscribe(empresa => {
        this.empresaGenerada = empresa[0];
        if (this.empresaGenerada){
          this.openSnackBar(
            this.translate.instant(marker('generadores.jpromocion.perfil.mensajes.generadoempresa.mensaje')),
            this.translate.instant(marker('generadores.jpromocion.perfil.mensajes.generadoempresa.titulo')));
        }
      });
    } else {
      this.profilesService.getCompany(resultados)
      .subscribe(empresa => {
          this.badgetEmpresasGeneradas = 0;

          //this.listaEmpresasGeneradas.data = empresa;
          this.listaEmpresasGeneradas = new MatTableDataSource(empresa);
          this.listaEmpresasGeneradasOriginal = empresa;

          //cuando se utilizaba hidden para ocultar la tabla, el paginator y sort funcionan
          //sin problema.
          //Al cambiar a ngIf... esta directiva quita/pone en el DOM el objeto, y el paginator y sort
          //dejan de funcionar.
          //Referencia: https://codehandbook.org/mat-paginator-not-working-inside-ngif/
          // Se utiliza el ChangeDetectorRef para forzar la actualizacion del DOM y que el paginator y sort
          // se vean actualizados.
          this.changeDetectorRef.detectChanges();

          // this.listaEmpresasGeneradas.paginator = this.paginatorEmpresas;
          // this.listaEmpresasGeneradas.sort = this.sortEmpresas;
          //como quita/pone pom es necesario inicializarlo todo de nuevo
          this.inicializarPaginadoresSortsEmpresas();
          if (this.listaEmpresasGeneradas && this.listaEmpresasGeneradas.data.length > 0) {
            this.badgetEmpresasGeneradas = this.listaEmpresasGeneradas.data.length;
            this.openSnackBar(
              this.translate.instant(marker('generadores.jpromocion.perfil.mensajes.generadoempresas.mensaje')),
              this.translate.instant(marker('generadores.jpromocion.perfil.mensajes.generadoempresas.titulo')));
          }
      });
    }

  }


  /**
   * Generamos un nuevo perfil con los criterios seleccionadosq
   */
  onClickBotonGenerarPerfil(): void {
    this.personaGenerada = undefined;
    this.listaPersonasGeneradas = new MatTableDataSource<Persona>();
    this.listaPersonasGeneradasOriginal = [];
    this.empresaGenerada = undefined;
    this.listaEmpresasGeneradas = new MatTableDataSource<Empresa>();
    this.listaEmpresasGeneradasOriginal = [];

    if (this.tipoPerfil == 'p') {
      this.getPersonas(this.numGenerar);
    } else if (this.tipoPerfil == 'e') {
      this.getEmpresas(this.numGenerar);
    }

  }


  /**
   * Exportacion de los datos a un fichero excel la lista de personas generadas
   */
  exportJsonPersonas(): void {
    //var res = alasql('SEARCH / AS @data \ people / AS @persons \ RETURN(@persons->name as Name, @persons->age as Age, @data->city AS City) \ FROM ?', [this.peopleByCity])











    const displayedColumns = this.displayedColumnsPersonas;
    const res = this.listaPersonasGeneradas.data.map(persona => {
      const result: any = {};
      displayedColumns.forEach(col => {
      switch (col) {
        case 'Nif':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.nif.label'))] = persona.nif;
        break;
        case 'Nie':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.nie.label'))] = persona.nie;
        break;
        case 'Nss':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.nss.label'))] = persona.nss;
        break;
        case 'Pasaporte':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.pasaporte.label'))] = persona.pasaporte;
        break;
        case 'Genero':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.sexo.label'))] = this.transformaTexto(persona.genero);
        break;
        case 'Fecha_Nacimiento':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.fechanacimiento.label'))] = persona.fechaNacimiento;
        result[this.translate.instant(marker('generadores.jpromocion.perfil.excel.personas.columnas.edad'))] = persona.edad;
        break;
        case 'Nombre':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.nombre.label'))] = this.transformaTexto(persona.nombre);
        break;
        case 'Apellido_1':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.apellido1.label'))] = this.transformaTexto(persona.apellido1);
        break;
        case 'Apellido_2':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.apellido2.label'))] = this.transformaTexto(persona.apellido2);
        break;
        case 'Nombre_Completo':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.nombrecompleto.label'))] = this.transformaTexto(persona.nombreCompleto);
        break;
        case 'Telefono_Movil':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.telefonomovil.label'))] = persona.telefonoMovil;
        break;
        case 'Telefono_Fijo':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.telefonofijo.label'))] = persona.telefonoFijo;
        break;
        case 'Login':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.login.label'))] = this.transformaTexto(persona.login);
        break;
        case 'Email':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.email.label'))] = this.transformaTexto(persona.email);
        break;
        case 'Password':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.password.label'))] = persona.password;
        break;
        case 'CCAA':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.excel.personas.columnas.codccaa'))] = persona.direccion.ineCcaa;
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.ccaa.label'))] = this.transformaTexto(persona.direccion.ccaa);
        break;
        case 'Provincia':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.excel.personas.columnas.codprov'))] = persona.direccion.ineProvincia;
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.provincia.label'))] = this.transformaTexto(persona.direccion.provincia);
        break;
        case 'Municipio':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.excel.personas.columnas.codmuni'))] = persona.direccion.ineMunicipio;
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.municipio.label'))] = this.transformaTexto(persona.direccion.municipio);
        break;
        case 'Cod_Postal':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.cp.label'))] = persona.direccion.codPostal;
        break;
        case 'Direccion':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.direccion.label'))] = this.transformaTexto(persona.direccion.direccionAMedio);
        break;
        case 'Dir_Completa':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.direccioncompleta.label'))] = this.transformaTexto(persona.direccion.direccionCompleta);
        break;
        case 'Ref_Catastral':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.refcatastral.label'))] = this.transformaTexto(persona.direccion.referenciaCatastral);
        break;
        case 'Iban':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.iban.label'))] = persona.iban;
        break;
        case 'Bic':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.bic.label'))] = persona.bic;
        break;
        case 'Tarjeta':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.tarjeta.label'))] = persona.tarjetaCredito;
        break;
        case 'Tipo_Tarjeta':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.tipotarjeta.label'))] = this.transformaTexto(persona.tipoTarjeta);
        break;
        case 'Expiracion':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.expiracion.label'))] = persona.expiracionCredito;
        break;
        case 'Cvc':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.persona.cvc.label'))] = persona.cvc;
        break;
      }
      });
      return result;
    });

    //DEPRECATED: cuando exportabamos todas las columnas y no solo las seleccionadas en el selector de columnas visibles
    // const res = this.listaPersonasGeneradas.data.map(persona => ({
    //   NIF: persona.nif,
    //   NIE: persona.nie,
    //   NSS: persona.nss,
    //   Pasaporte: persona.pasaporte,
    //   Genero: persona.genero,
    //   FechaNacimiento: persona.fechaNacimiento,
    //   Edad: persona.edad,
    //   Nombre: this.transformaTexto(persona.nombre),
    //   Apellido1: this.transformaTexto(persona.apellido1),
    //   Apellido2: this.transformaTexto(persona.apellido2),
    //   NombreCompleto: this.transformaTexto(persona.nombreCompleto),
    //   TelefonoMovil: persona.telefonoMovil,
    //   TelefonoFijo: persona.telefonoFijo,
    //   Login: persona.login,
    //   Email: persona.email,
    //   Password: persona.password,
    //   CCAA_Ine: persona.direccion.ineCcaa,
    //   CCAA: this.transformaTexto(persona.direccion.ccaa),
    //   Provincia_Ine: persona.direccion.ineProvincia,
    //   Provincia: this.transformaTexto(persona.direccion.provincia),
    //   Municipio_Ine: persona.direccion.ineMunicipio,
    //   Municipio: this.transformaTexto(persona.direccion.municipio),
    //   CodigoPostal: persona.direccion.codPostal,
    //   Direccion: this.transformaTexto(persona.direccion.direccionAMedio),
    //   Direccion_Completa: this.transformaTexto(persona.direccion.direccionCompleta),
    //   ReferenciaCatastral: this.transformaTexto(persona.direccion.referenciaCatastral),
    //   IBAN: persona.iban,
    //   BIC: persona.bic,
    //   TarjetaCredito: persona.tarjetaCredito,
    //   TipoTarjeta: this.transformaTexto(persona.tipoTarjeta),
    //   ExpiracionCredito: persona.expiracionCredito,
    //   CVC: persona.cvc
    // }));

    this.excelService.exportAsExcelFile(res, this.translate.instant(marker('generadores.jpromocion.perfil.excel.personas.titulo')));
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.perfil.mensajes.excelpersona.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.perfil.mensajes.excelpersona.titulo')));
  }

  /**
    * Limpiar tabla personas
    */
  onClickLimpiarPersonas(): void {
    this.listaPersonasGeneradas = new MatTableDataSource<Persona>();
    this.listaPersonasGeneradasOriginal = [];
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.perfil.mensajes.limpiadopersona.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.perfil.mensajes.limpiadopersona.titulo')));

  }


  /**
   * Evento ante las seleccion/deseleccion de una columna visible del combo de columnas de personas
   * NOTA: "selectColumnasPersonas" ya llega con el nuevo valor actualizado, llevando el string[] de las columnas
   * seleccionadas tras el cambio efectuado.
   * @param selected true si el cambio a sido a marcado, false en otro caso
   * @param value Columna cambiada en el combo
   */
  togglePerOneColumnasPersonas(selected: boolean, value: string): void {
    //Tratamos como caso especial el Seleccionar Todas... para marcar o desmarcar directamente las columnas reales
    if (value == BaseGeneraComponent.columSeleccionarTodas && selected) {
      this.selectColumnasPersonas = this.listaColumnasPersonas;
    } else if (value == BaseGeneraComponent.columSeleccionarTodas && !selected){
      this.selectColumnasPersonas = [];
    } else {
      //otro caso implica que se ha marcado o desmarcado una columna real
      //NOTA: en lo que respecta a la aplicacion del marcado/desmarcado de una columna real, no hay que
      //hacer nada especial, dado que el model asociado al mat-select "selectColumnasPersonas" ya llega
      //aqui con dicha columna real marcada/desmarcada según se realizo. Al final
      //soincronizaremos displayedColumnsPersonas.

      //Eso si, comparamos si estan todas o no, dado que de ello dependerera el automarcar o autodesmarcar la opcion
      //especial "Seleccionar Todas..."
      let seleccionesMenosTodos = this.selectColumnasPersonas.filter((col) => col != BaseGeneraComponent.columSeleccionarTodas);
      let todasMenosTodos = this.listaColumnasPersonas.filter((col) => col != BaseGeneraComponent.columSeleccionarTodas);
      if (seleccionesMenosTodos.length == todasMenosTodos.length) {
        //marcamos seleccionar todo si no lo esta ya
        if (!this.selectColumnasPersonas.includes(BaseGeneraComponent.columSeleccionarTodas)) {
          this.selectColumnasPersonas = this.selectColumnasPersonas.concat([BaseGeneraComponent.columSeleccionarTodas])
        }
      } else{
        //si estuviera marcado seleccionadr todo, lo quitamos
        if (this.selectColumnasPersonas.includes(BaseGeneraComponent.columSeleccionarTodas)) {
          this.selectColumnasPersonas = this.selectColumnasPersonas.filter((col) => col != BaseGeneraComponent.columSeleccionarTodas);
        }
      }
    }

    //Sincronizamos a la lista de columnas visibles de la tabla
    this.sincronizarListaColumVisiblesPersonas();

  }

  /**
   * Sincroniza las columnas visibles modificadas por el combo de columnas de personas a mostrar
   * sobre la lista de columnas mostradas asociadas a la tabla.
   */
  sincronizarListaColumVisiblesPersonas(): void {
    this.displayedColumnsPersonas = this.selectColumnasPersonas.filter((col) => col != BaseGeneraComponent.columSeleccionarTodas);
  }

  /**
   * Evento de drag&drop para reordenar las columnas visibles de la tabla de personas
   * @param event
   */
  dropColumnsPersonas(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumnsPersonas, event.previousIndex, event.currentIndex);
  }


  /**
   * Necesitamos una funcion concreta de ordenacion para tabla personas.
   * No nos sirve announceSortChange porque para eso los key que se asocia a matColumnDef
   * deberia tener el mismo valor que en la propiedad de los datos que se filtran, y no es asi,
   * porque los modificamos porque son los que se utilizan en el combo de columnas visibles.
   * Referencia: https://medium.com/@srik913/angular-material-table-complete-example-bb5726b96c5e
   * @param $event
   */
  sortDataPersonas($event: Sort) {
    const sortId = $event.active;
    const sortDirection = $event.direction;

    //sortId recibe el col.key... y debemos sacar de COLUMNS_SCHEMA_PERSONAS, el valor de col.columna que corresponde a esa key
    //para poder ordenar correctamente. En caso de no encontrarlo, no se ordena.
    let columnaOrdenar = GeneraPerfilesComponent.COLUMNS_SCHEMA_PERSONAS.find((col) => col.key == sortId);

    //ojo, si es del type "subobjeto" se debe filtrar dentro del objeto de la propiedad "columna", por la propiedad "subpropiedad"
    if (columnaOrdenar && columnaOrdenar.type == 'subobjeto') {
      let propiedad = columnaOrdenar.columna as keyof Persona;
      let subpropiedad = columnaOrdenar.subpropiedad as keyof DireccionCompleta;

      if ('asc' == sortDirection) {
        this.listaPersonasGeneradas.data = this.listaPersonasGeneradas.data.slice().sort(
          (a, b) => (a[propiedad] as DireccionCompleta)[subpropiedad] > (b[propiedad] as DireccionCompleta)[subpropiedad] ? -1 : (a[propiedad] as DireccionCompleta)[subpropiedad] < (b[propiedad] as DireccionCompleta)[subpropiedad] ? 1 : 0
        );
      } else {
        this.listaPersonasGeneradas.data = this.listaPersonasGeneradas.data.slice().sort(
          (a, b) => (a[propiedad] as DireccionCompleta)[subpropiedad] < (b[propiedad] as DireccionCompleta)[subpropiedad] ? -1 : (a[propiedad] as DireccionCompleta)[subpropiedad] > (b[propiedad] as DireccionCompleta)[subpropiedad] ? 1 : 0
        );
      }

    } else{
      let columnaOrdenarReal = columnaOrdenar ? columnaOrdenar.columna : '';

      if ('asc' == sortDirection) {
        this.listaPersonasGeneradas.data = this.listaPersonasGeneradas.data.slice().sort(
          (a, b) => a[columnaOrdenarReal as keyof Persona] > b[columnaOrdenarReal as keyof Persona] ? -1 : a[columnaOrdenarReal as keyof Persona] < b[columnaOrdenarReal as keyof Persona] ? 1 : 0
        );
      } else {
        this.listaPersonasGeneradas.data = this.listaPersonasGeneradas.data.slice().sort(
          (a, b) => a[columnaOrdenarReal as keyof Persona] < b[columnaOrdenarReal as keyof Persona] ? -1 : a[columnaOrdenarReal as keyof Persona] > b[columnaOrdenarReal as keyof Persona] ? 1 : 0
        );
      }
    }


  }

  /**
   * Des-oculta el filtro asociado a una columna de la cabecera de la tabla de Personas
   * @param col
   */
  openFilterPersonas(col: string) {
    const filterElement = document.getElementById(col + '-filterPersonas');
    if (filterElement) {
      filterElement.removeAttribute('hidden');
    }
  }

  /**
   * Oculta el filtro asociado a una columna de la cabecera de la tabla de Personas
   * @param col
   */
  closeFilterPersonas(col: string) {
    const filterElement = document.getElementById(col + '-filterPersonas');
    if (filterElement) {
      filterElement.setAttribute('hidden', 'true');
    }
  }

  /**
   * Aplica el filtro de texto (sin distincion mayusculars/minusculas) en la tabla
   * de Personas.
   * @param col Nombre de la columna en la tabla sobre la que se filtra
   * @param filtertext Entrada del texto a filtrar
   */
  filterDataPersonas(col: string, filtertext: string) {
    if (filtertext.trim() != '') {

      //En col.key recibimos el key de la columna, debenmos acceder a COLUMN_SCHEMA_PERSONAS para obtener la columna real
      //que se corresponde con el key, y asi poder filtrar correctamente.
      let columnaFiltrar = GeneraPerfilesComponent.COLUMNS_SCHEMA_PERSONAS.find((col2) => col2.key == col);

      //ojo, si es del type "subobjeto" se debe filtrar dentro del objeto de la propiedad "columna", por la propiedad "subpropiedad"
      if (columnaFiltrar && columnaFiltrar.type == 'subobjeto') {
        let propiedad = columnaFiltrar.columna as keyof Persona;
        let subpropiedad = columnaFiltrar.subpropiedad as keyof DireccionCompleta;

        this.listaPersonasGeneradas.data = this.listaPersonasGeneradasOriginal.slice().filter(
          (element) => JSON.stringify((element[propiedad] as DireccionCompleta)[subpropiedad]).toLowerCase().indexOf(filtertext.toLowerCase()) > -1
        );
      } else{
        let columnaOrdenarReal = columnaFiltrar ? columnaFiltrar.columna : '';
        this.listaPersonasGeneradas.data = this.listaPersonasGeneradasOriginal.slice().filter(
          (element) => JSON.stringify(element[columnaOrdenarReal as keyof Persona]).toLowerCase().indexOf(filtertext.toLowerCase()) > -1
        );
      }

    } else{
      //si hubieramos filtrado antes, ahora limpiamos
      if (this.listaPersonasGeneradas.data.length != this.listaPersonasGeneradasOriginal.length) {
        this.listaPersonasGeneradas.data = this.listaPersonasGeneradasOriginal;
      }
    }
  }

  /**
   * Accion boton para limpiar la aplicacion de filtrar en la tabla Personas, y volver al estado original
   */
  onClickLimpiarFiltrosPersonas(): void {
    this.listaPersonasGeneradas.data = this.listaPersonasGeneradasOriginal;
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.perfil.mensajes.limpiadofiltrospersona.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.perfil.mensajes.limpiadofiltrospersona.titulo')));
  }


  /**
   * Exportacion de los datos a un fichero excel la lista de empresas generadas
   */
  exportJsonEmpresas(): void {
    const displayedColumns = this.displayedColumnsEmpresas;
    const res = this.listaEmpresasGeneradas.data.map(empresa => {
      const result: any = {};
      displayedColumns.forEach(col => {
      switch (col) {
        case 'Cif':
        //result.CIF = empresa.cif;
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.empresa.cif.label'))] = empresa.cif;
        break;
        case 'Razón':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.empresa.razonsocial.label'))] = this.transformaTexto(empresa.nombre);
        break;
        case 'Fecha_Constitución':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.empresa.fechaconstitucion.label'))] = empresa.fechaCreacion;
        break;
        case 'Cnae':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.empresa.cnae.label'))] = empresa.cnae;
        break;
        case 'Actividad':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.empresa.actividad.label'))] = this.transformaTexto(empresa.actividad);
        break;
        case 'Email':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.empresa.email.label'))] = this.transformaTexto(empresa.email);
        break;
        case 'Página_Web':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.empresa.paginaweb.label'))] = this.transformaTexto(empresa.paginaWeb);
        break;
        case 'Telefono':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.empresa.telefono.label'))] = empresa.telefono;
        break;
        case 'Fax':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.empresa.fax.label'))] = empresa.fax;
        break;
        case 'CCAA':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.excel.empresas.columnas.codccaa'))] = empresa.direccion.ineCcaa;
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.empresa.ccaa.label'))] = this.transformaTexto(empresa.direccion.ccaa);
        break;
        case 'Provincia':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.excel.empresas.columnas.codprov'))] = empresa.direccion.ineProvincia;
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.empresa.provincia.label'))] = this.transformaTexto(empresa.direccion.provincia);
        break;
        case 'Municipio':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.excel.empresas.columnas.codmuni'))] = empresa.direccion.ineMunicipio;
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.empresa.municipio.label'))] = this.transformaTexto(empresa.direccion.municipio);
        break;
        case 'Cod_Postal':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.empresa.cp.label'))] = empresa.direccion.codPostal;
        break;
        case 'Direccion':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.empresa.direccion.label'))] = this.transformaTexto(empresa.direccion.direccionAMedio);
        break;
        case 'Dir_Completa':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.empresa.direccioncompleta.label'))] = this.transformaTexto(empresa.direccion.direccionCompleta);
        break;
        case 'Ref_Catastral':
        result[this.translate.instant(marker('generadores.jpromocion.perfil.salida.empresa.refcatastral.label'))] = this.transformaTexto(empresa.direccion.referenciaCatastral);
        break;
      }
      });
      return result;
    });

    this.excelService.exportAsExcelFile(res, this.translate.instant(marker('generadores.jpromocion.perfil.excel.empresas.titulo')));
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.perfil.mensajes.excelempresa.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.perfil.mensajes.excelempresa.titulo')));
  }




  /**
    * Limpiar tabla empresas
    */
  onClickLimpiarEmpresas(): void {
    this.listaEmpresasGeneradas = new MatTableDataSource<Empresa>();
    this.listaEmpresasGeneradasOriginal = [];
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.perfil.mensajes.limpiadoempresa.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.perfil.mensajes.limpiadoempresa.titulo')));
  }



  /**
   * Evento ante las seleccion/deseleccion de una columna visible del combo de columnas de empresas
   * NOTA: "selectColumnasEmpresas" ya llega con el nuevo valor actualizado, llevando el string[] de las columnas
   * seleccionadas tras el cambio efectuado.
   * @param selected true si el cambio a sido a marcado, false en otro caso
   * @param value Columna cambiada en el combo
   */
  togglePerOneColumnasEmpresas(selected: boolean, value: string): void {
    //Tratamos como caso especial el Seleccionar Todas... para marcar o desmarcar directamente las columnas reales
    if (value == BaseGeneraComponent.columSeleccionarTodas && selected) {
      this.selectColumnasEmpresas = this.listaColumnasEmpresas;
    } else if (value == BaseGeneraComponent.columSeleccionarTodas && !selected){
      this.selectColumnasEmpresas = [];
    } else {
      //otro caso implica que se ha marcado o desmarcado una columna real
      //NOTA: en lo que respecta a la aplicacion del marcado/desmarcado de una columna real, no hay que
      //hacer nada especial, dado que el model asociado al mat-select "selectColumnasEmpresas" ya llega
      //aqui con dicha columna real marcada/desmarcada según se realizo. Al final
      //soincronizaremos displayedColumnsEmpresas.

      //Eso si, comparamos si estan todas o no, dado que de ello dependerera el automarcar o autodesmarcar la opcion
      //especial "Seleccionar Todas..."
      let seleccionesMenosTodos = this.selectColumnasEmpresas.filter((col) => col != BaseGeneraComponent.columSeleccionarTodas);
      let todasMenosTodos = this.listaColumnasEmpresas.filter((col) => col != BaseGeneraComponent.columSeleccionarTodas);
      if (seleccionesMenosTodos.length == todasMenosTodos.length) {
        //marcamos seleccionar todo si no lo esta ya
        if (!this.selectColumnasEmpresas.includes(BaseGeneraComponent.columSeleccionarTodas)) {
          this.selectColumnasEmpresas = this.selectColumnasEmpresas.concat([BaseGeneraComponent.columSeleccionarTodas])
        }
      } else{
        //si estuviera marcado seleccionadr todo, lo quitamos
        if (this.selectColumnasEmpresas.includes(BaseGeneraComponent.columSeleccionarTodas)) {
          this.selectColumnasEmpresas = this.selectColumnasEmpresas.filter((col) => col != BaseGeneraComponent.columSeleccionarTodas);
        }
      }
    }

    //Sincronizamos a la lista de columnas visibles de la tabla
    this.sincronizarListaColumVisiblesEmpresas();

  }


  /**
   * Sincroniza las columnas visibles modificadas por el combo de columnas de Empresas a mostrar
   * sobre la lista de columnas mostradas asociadas a la tabla.
   */
  sincronizarListaColumVisiblesEmpresas(): void {
    this.displayedColumnsEmpresas = this.selectColumnasEmpresas.filter((col) => col != BaseGeneraComponent.columSeleccionarTodas);
  }

  /**
   * Evento de drag&drop para reordenar las columnas visibles de la tabla de Empresas
   * @param event
   */
  dropColumnsEmpresas(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumnsEmpresas, event.previousIndex, event.currentIndex);
  }


  /**
   * Necesitamos una funcion concreta de ordenacion para tabla empresas.
   * No nos sirve announceSortChange porque para eso los key que se asocia a matColumnDef
   * deberia tener el mismo valor que en la propiedad de los datos que se filtran, y no es asi,
   * porque los modificamos porque son los que se utilizan en el combo de columnas visibles.
   * Referencia: https://medium.com/@srik913/angular-material-table-complete-example-bb5726b96c5e
   * @param $event
   */
  sortDataEmpresas($event: Sort) {
    const sortId = $event.active;
    const sortDirection = $event.direction;

    //sortId recibe el col.key... y debemos sacar de COLUMNS_SCHEMA_EMPRESAS, el valor de col.columna que corresponde a esa key
    //para poder ordenar correctamente. En caso de no encontrarlo, no se ordena.
    let columnaOrdenar = GeneraPerfilesComponent.COLUMNS_SCHEMA_EMPRESAS.find((col) => col.key == sortId);

    //ojo, si es del type "subobjeto" se debe filtrar dentro del objeto de la propiedad "columna", por la propiedad "subpropiedad"
    if (columnaOrdenar && columnaOrdenar.type == 'subobjeto') {
      let propiedad = columnaOrdenar.columna as keyof Empresa;
      let subpropiedad = columnaOrdenar.subpropiedad as keyof DireccionCompleta;

      if ('asc' == sortDirection) {
        this.listaEmpresasGeneradas.data = this.listaEmpresasGeneradas.data.slice().sort(
          (a, b) => (a[propiedad] as DireccionCompleta)[subpropiedad] > (b[propiedad] as DireccionCompleta)[subpropiedad] ? -1 : (a[propiedad] as DireccionCompleta)[subpropiedad] < (b[propiedad] as DireccionCompleta)[subpropiedad] ? 1 : 0
        );
      } else {
        this.listaEmpresasGeneradas.data = this.listaEmpresasGeneradas.data.slice().sort(
          (a, b) => (a[propiedad] as DireccionCompleta)[subpropiedad] < (b[propiedad] as DireccionCompleta)[subpropiedad] ? -1 : (a[propiedad] as DireccionCompleta)[subpropiedad] > (b[propiedad] as DireccionCompleta)[subpropiedad] ? 1 : 0
        );
      }

    } else {
      let columnaOrdenarReal = columnaOrdenar ? columnaOrdenar.columna : '';

      if ('asc' == sortDirection) {
        this.listaEmpresasGeneradas.data = this.listaEmpresasGeneradas.data.slice().sort(
          (a, b) => a[columnaOrdenarReal as keyof Empresa] > b[columnaOrdenarReal as keyof Empresa] ? -1 : a[columnaOrdenarReal as keyof Empresa] < b[columnaOrdenarReal as keyof Empresa] ? 1 : 0
        );
      } else {
        this.listaEmpresasGeneradas.data = this.listaEmpresasGeneradas.data.slice().sort(
          (a, b) => a[columnaOrdenarReal as keyof Empresa] < b[columnaOrdenarReal as keyof Empresa] ? -1 : a[columnaOrdenarReal as keyof Empresa] > b[columnaOrdenarReal as keyof Empresa] ? 1 : 0
        );
      }


    }
  }


  /**
   * Des-oculta el filtro asociado a una columna de la cabecera de la tabla de Empresas
   * @param col
   */
  openFilterEmpresas(col: string) {
    const filterElement = document.getElementById(col + '-filterEmpresas');
    if (filterElement) {
      filterElement.removeAttribute('hidden');
    }
  }

  /**
   * Oculta el filtro asociado a una columna de la cabecera de la tabla de Empresas
   * @param col
   */
  closeFilterEmpresas(col: string) {
    const filterElement = document.getElementById(col + '-filterEmpresas');
    if (filterElement) {
      filterElement.setAttribute('hidden', 'true');
    }
  }

  /**
   * Aplica el filtro de texto (sin distincion mayusculars/minusculas) en la tabla
   * de Empresas.
   * @param col Nombre de la columna en la tabla sobre la que se filtra
   * @param filtertext Entrada del texto a filtrar
   */
  filterDataEmpresas(col: string, filtertext: string) {
    if (filtertext.trim() != '') {

      //En col.key recibimos el key de la columna, debenmos acceder a COLUMNS_SCHEMA_EMPRESAS para obtener la columna real
      //que se corresponde con el key, y asi poder filtrar correctamente.
      let columnaFiltrar = GeneraPerfilesComponent.COLUMNS_SCHEMA_EMPRESAS.find((col2) => col2.key == col);

      //ojo, si es del type "subobjeto" se debe filtrar dentro del objeto de la propiedad "columna", por la propiedad "subpropiedad"
      if (columnaFiltrar && columnaFiltrar.type == 'subobjeto') {
        let propiedad = columnaFiltrar.columna as keyof Empresa;
        let subpropiedad = columnaFiltrar.subpropiedad as keyof DireccionCompleta;

        this.listaEmpresasGeneradas.data = this.listaEmpresasGeneradasOriginal.slice().filter(
          (element) => JSON.stringify((element[propiedad] as DireccionCompleta)[subpropiedad]).toLowerCase().indexOf(filtertext.toLowerCase()) > -1
        );
      } else{
        let columnaOrdenarReal = columnaFiltrar ? columnaFiltrar.columna : '';
        this.listaEmpresasGeneradas.data = this.listaEmpresasGeneradasOriginal.slice().filter(
          (element) => JSON.stringify(element[columnaOrdenarReal as keyof Empresa]).toLowerCase().indexOf(filtertext.toLowerCase()) > -1
        );
      }

    } else{
      //si hubieramos filtrado antes, ahora limpiamos
      if (this.listaEmpresasGeneradas.data.length != this.listaEmpresasGeneradasOriginal.length) {
        this.listaEmpresasGeneradas.data = this.listaEmpresasGeneradasOriginal;
      }
    }
  }

  /**
   * Accion boton para limpiar la aplicacion de filtrar en la tabla Empresas, y volver al estado original
   */
  onClickLimpiarFiltrosEmpresas(): void {
    this.listaEmpresasGeneradas.data = this.listaEmpresasGeneradasOriginal;
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.perfil.mensajes.limpiadofiltrosempresa.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.perfil.mensajes.limpiadofiltrosempresa.titulo')));
  }


}
