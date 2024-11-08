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
import {BaseGeneraComponent} from '../shared/components/base-genera/base-genera.component';
import { ProfilesService } from '../core/services/profiles.service';
import { Persona } from '../core/models/persona';
import { Empresa } from '../core/models/empresa';
import { DireccionCompleta } from '../core/models/direccion-completa';




@Component({
  selector: 'app-genera-perfiles',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, MatButtonToggleModule,MatIconModule,MatButtonModule,MatTooltipModule,MatGridListModule, CaseTransformerPipe,
    MatTableModule, MatPaginatorModule,MatFormFieldModule,MatInputModule,MatSortModule,NgSwitch,NgSwitchCase,NgSwitchDefault,NgClass,
    MatSelectModule, CdkDropList, CdkDrag],
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
      label: "NIF"
    },
    {
      key: "Nie",
      columna: "nie",
      type: "button",
      label: "NIE"
    },
    {
      key: "Nss",
      columna: "nss",
      type: "button",
      label: "NSS"
    },
    {
      key: "Pasaporte",
      columna: "pasaporte",
      type: "button",
      label: "Pasaporte"
    },
    {
      key: "Genero",
      columna: "genero",
      type: "button",
      caseSensitive: true,
      label: "Sexo"
    },
    {
      key: "Fecha_Nacimiento",
      columna: "fechaNacimiento",
      type: "button",
      caseSensitive: true,
      clase: "botonFlatReducido",
      label: "Fecha nacimiento (edad)",
      columna2: "edad",
    },
    {
      key: "Nombre",
      columna: "nombre",
      type: "button",
      caseSensitive: true,
      clase: "botonFlatGrande",
      label: "Nombre"
    },
    {
      key: "Apellido_1",
      columna: "apellido1",
      type: "button",
      caseSensitive: true,
      clase: "botonFlatGrande",
      label: "1º Apellido"
    },
    {
      key: "Apellido_2",
      columna: "apellido2",
      type: "button",
      caseSensitive: true,
      clase: "botonFlatGrande",
      label: "2º Apellido"
    },
    {
      key: "Nombre_Completo",
      columna: "nombreCompleto",
      type: "button",
      caseSensitive: true,
      clase: "botonFlatGrande",
      label: "Nombre completo"
    },
    {
      key: "Telefono_Movil",
      columna: "telefonoMovil",
      type: "button",
      label: "Teléfono movil"
    },
    {
      key: "Telefono_Fijo",
      columna: "telefonoFijo",
      type: "button",
      label: "Teléfono fijo"
    },
    {
      key: "Login",
      columna: "login",
      type: "button",
      caseSensitive: true,
      label: "Login"
    },
    {
      key: "Email",
      columna: "email",
      type: "button",
      caseSensitive: true,
      label: "Email"
    },
    {
      key: "Password",
      columna: "password",
      type: "button",
      label: "Password"
    },
    {
      key: "CCAA",
      columna: "direccion",
      subpropiedad: "ineCcaa",
      clase: "botonFlatReducido",
      type: "subobjeto",
      caseSensitive: true,
      label: "CCAA",
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
      label: "Provincia",
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
      label: "Municipio",
      columna2: "direccion",
      subpropiedad2: "municipio",
    },
    {
      key: "Cod_Postal",
      columna: "direccion",
      subpropiedad: "codPostal",
      type: "subobjeto",
      caseSensitive: true,
      label: "Cod. Postal"
    },
    {
      key: "Direccion",
      columna: "direccion",
      subpropiedad: "direccionAMedio",
      clase: "botonFlatGrande",
      type: "subobjeto",
      caseSensitive: true,
      label: "Dirección"
    },
    {
      key: "Dir_Completa",
      columna: "direccion",
      subpropiedad: "direccionCompleta",
      clase: "botonFlatGrande",
      type: "subobjeto",
      caseSensitive: true,
      label: "Dirección completa"
    },
    {
      key: "Ref_Catastral",
      columna: "direccion",
      subpropiedad: "referenciaCatastral",
      type: "subobjeto",
      caseSensitive: true,
      label: "Ref. catastral"
    },
    {
      key: "Iban",
      columna: "iban",
      type: "button",
      label: "IBAN"
    },
    {
      key: "Bic",
      columna: "bic",
      type: "button",
      label: "BIC (SWIFT)"
    },
    {
      key: "Tarjeta",
      columna: "tarjetaCredito",
      type: "button",
      label: "Num. tarjeta"
    },
    {
      key: "Tipo_Tarjeta",
      columna: "tipoTarjeta",
      type: "button",
      caseSensitive: true,
      label: "Tipo tarj."
    },
    {
      key: "Expiracion",
      columna: "expiracionCredito",
      type: "button",
      label: "Expiración"
    },
    {
      key: "Cvc",
      columna: "cvc",
      type: "button",
      label: "CVC"
    }
  ];

  //Definicion del mostrado de columnas para tabla empresas, personalizado opciones
  //para mostrar filas por plantillas
  static COLUMNS_SCHEMA_EMPRESAS = [
    {
      key: "Cif",
      columna: "cif",
      type: "button",
      label: "CIF"
    },
    {
      key: "Razón",
      columna: "nombre",
      type: "button",
      clase: "botonFlatGrande",
      caseSensitive: true,
      label: "Razón social"
    },
    {
      key: "Fecha_Constitución",
      columna: "fechaCreacion",
      type: "button",
      label: "F. constitución"
    },
    {
      key: "Cnae",
      columna: "cnae",
      type: "button",
      label: "CNAE"
    },
    {
      key: "Actividad",
      columna: "actividad",
      type: "button",
      clase: "botonFlatGrande",
      caseSensitive: true,
      label: "Actividad"
    },
    {
      key: "Email",
      columna: "email",
      type: "button",
      caseSensitive: true,
      label: "Email"
    },
    {
      key: "Página_Web",
      columna: "paginaWeb",
      type: "button",
      caseSensitive: true,
      label: "Pág. Web"
    },
    {
      key: "Telefono",
      columna: "telefono",
      type: "button",
      label: "Teléfono"
    },
    {
      key: "Fax",
      columna: "fax",
      type: "button",
      label: "Fax"
    },
    {
      key: "CCAA",
      columna: "direccion",
      subpropiedad: "ineCcaa",
      clase: "botonFlatReducido",
      type: "subobjeto",
      caseSensitive: true,
      label: "CCAA",
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
      label: "Provincia",
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
      label: "Municipio",
      columna2: "direccion",
      subpropiedad2: "municipio",
    },
    {
      key: "Cod_Postal",
      columna: "direccion",
      subpropiedad: "codPostal",
      type: "subobjeto",
      caseSensitive: true,
      label: "Cod. Postal"
    },
    {
      key: "Dirección",
      columna: "direccion",
      subpropiedad: "direccionAMedio",
      clase: "botonFlatGrande",
      type: "subobjeto",
      caseSensitive: true,
      label: "Dirección"
    },
    {
      key: "Dir_Completa",
      columna: "direccion",
      subpropiedad: "direccionCompleta",
      clase: "botonFlatGrande",
      type: "subobjeto",
      caseSensitive: true,
      label: "Dirección completa"
    },
    {
      key: "Ref_Catastral",
      columna: "direccion",
      subpropiedad: "referenciaCatastral",
      type: "subobjeto",
      caseSensitive: true,
      label: "Ref. catastral"
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

  //cuando generamos varias empresas
  listaEmpresasGeneradas = new MatTableDataSource<Empresa>();
  listaEmpresasGeneradasOriginal: Empresa[] = [];
  displayedColumnsEmpresas: string[] =  GeneraPerfilesComponent.COLUMNS_SCHEMA_EMPRESAS.map((col) => col.key)
  columnsSchemaEmpresas: any = GeneraPerfilesComponent.COLUMNS_SCHEMA_EMPRESAS;
  //@ViewChild(MatPaginator) paginatorEmpresas!: MatPaginator;
  @ViewChild('paginatorEmpresas') paginatorEmpresas!: MatPaginator;
  @ViewChild('sortEmpresas') sortEmpresas!: MatSort;

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


  constructor() {
    super();
  }

  override ngOnInit(): void {
    console.log("prueba");
  }


  ngAfterViewInit() {
    //this.inicializarLabelsPaginador(this.paginatorPagina.toArray()[0]);
    this.inicializarLabelsPaginador(this.paginatorPersonas);
    //this.inicializarLabelsPaginador(this.paginatorPagina.toArray()[1]);
    this.inicializarLabelsPaginador(this.paginatorEmpresas);

    //ASiociar el paginador. por defecto aqui, pero en nuestro caso deberemos hacerlo tambien donde obtenemos los datos
    //this.listaPersonasGeneradas.paginator = this.paginatorPagina.toArray()[0];
    this.listaPersonasGeneradas.paginator = this.paginatorPersonas;
    //this.listaEmpresasGeneradas.paginator = this.paginatorPagina.toArray()[1];
    this.listaEmpresasGeneradas.paginator = this.paginatorEmpresas;

    this.listaPersonasGeneradas.sort = this.sortPersonas;
    this.listaEmpresasGeneradas.sort = this.sortEmpresas;
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
          this.openSnackBar('Persona generada', 'GenerarPersona');
        }
      });
    } else {
      this.profilesService.getPerson(resultados, sexoparam)
      .subscribe(personas => {
        this.listaPersonasGeneradas.data = personas;
        this.listaPersonasGeneradasOriginal = personas;
        //this.listaPersonasGeneradas.paginator = this.paginatorPagina.toArray()[0];
        this.listaPersonasGeneradas.paginator = this.paginatorPersonas;
        this.listaPersonasGeneradas.sort = this.sortPersonas;
        if (this.listaPersonasGeneradas && this.listaPersonasGeneradas.data.length > 0) {
          this.openSnackBar('Lista Personas generadas', 'GenerarPersonas');
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
          this.openSnackBar('Empresa generada', 'GenerarEmpresa');
        }
      });
    } else {
      this.profilesService.getCompany(resultados)
      .subscribe(empresa => {
          this.listaEmpresasGeneradas.data = empresa;
          this.listaEmpresasGeneradasOriginal = empresa;
          //this.listaEmpresasGeneradas.paginator = this.paginatorPagina.toArray()[1];
          this.listaEmpresasGeneradas.paginator = this.paginatorEmpresas;
          this.listaEmpresasGeneradas.sort = this.sortEmpresas;
          if (this.listaEmpresasGeneradas && this.listaEmpresasGeneradas.data.length > 0) {
            this.openSnackBar('Lista Empresas generadas', 'GenerarEmpresas');
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
        result.NIF = persona.nif;
        break;
        case 'Nie':
        result.NIE = persona.nie;
        break;
        case 'Nss':
        result.NSS = persona.nss;
        break;
        case 'Pasaporte':
        result.Pasaporte = persona.pasaporte;
        break;
        case 'Genero':
        result.Genero = this.transformaTexto(persona.genero);
        break;
        case 'Fecha_Nacimiento':
        result.FechaNacimiento = persona.fechaNacimiento;
        result.Edad = persona.edad;
        break;
        case 'Nombre':
        result.Nombre = this.transformaTexto(persona.nombre);
        break;
        case 'Apellido_1':
        result.Apellido1 = this.transformaTexto(persona.apellido1);
        break;
        case 'Apellido_2':
        result.Apellido2 = this.transformaTexto(persona.apellido2);
        break;
        case 'Nombre_Completo':
        result.NombreCompleto = this.transformaTexto(persona.nombreCompleto);
        break;
        case 'Telefono_Movil':
        result.TelefonoMovil = persona.telefonoMovil;
        break;
        case 'Telefono_Fijo':
        result.TelefonoFijo = persona.telefonoFijo;
        break;
        case 'Login':
        result.Login = this.transformaTexto(persona.login);
        break;
        case 'Email':
        result.Email = this.transformaTexto(persona.email);
        break;
        case 'Password':
        result.Password = persona.password;
        break;
        case 'CCAA':
        result.CCAA_Ine = persona.direccion.ineCcaa;
        result.CCAA = this.transformaTexto(persona.direccion.ccaa);
        break;
        case 'Provincia':
        result.Provincia_Ine = persona.direccion.ineProvincia;
        result.Provincia = this.transformaTexto(persona.direccion.provincia);
        break;
        case 'Municipio':
        result.Municipio_Ine = persona.direccion.ineMunicipio;
        result.Municipio = this.transformaTexto(persona.direccion.municipio);
        break;
        case 'Cod_Postal':
        result.CodigoPostal = persona.direccion.codPostal;
        break;
        case 'Direccion':
        result.Direccion = this.transformaTexto(persona.direccion.direccionAMedio);
        break;
        case 'Dir_Completa':
        result.Direccion_Completa = this.transformaTexto(persona.direccion.direccionCompleta);
        break;
        case 'Ref_Catastral':
        result.ReferenciaCatastral = this.transformaTexto(persona.direccion.referenciaCatastral);
        break;
        case 'Iban':
        result.IBAN = persona.iban;
        break;
        case 'Bic':
        result.BIC = persona.bic;
        break;
        case 'Tarjeta':
        result.TarjetaCredito = persona.tarjetaCredito;
        break;
        case 'Tipo_Tarjeta':
        result.TipoTarjeta = this.transformaTexto(persona.tipoTarjeta);
        break;
        case 'Expiracion':
        result.ExpiracionCredito = persona.expiracionCredito;
        break;
        case 'Cvc':
        result.CVC = persona.cvc;
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

    this.excelService.exportAsExcelFile(res, 'Perfiles_personas');
    this.openSnackBar('Excel generado','ExcelPersonas');
  }

  /**
    * Limpiar tabla personas
    */
  onClickLimpiarPersonas(): void {
    this.listaPersonasGeneradas = new MatTableDataSource<Persona>();
    this.listaPersonasGeneradasOriginal = [];
    this.openSnackBar('Personas limpiados', 'LimpiarPersonas');

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
    this.openSnackBar('Filtros limpiados', 'LimpiarFiltrosPersonas');
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
        result.CIF = empresa.cif;
        break;
        case 'Razón':
        result.Razon = this.transformaTexto(empresa.nombre);
        break;
        case 'Fecha_Constitución':
        result.FechaConstitucion = empresa.fechaCreacion;
        break;
        case 'Cnae':
        result.CNAE = empresa.cnae;
        break;
        case 'Actividad':
        result.Actividad = this.transformaTexto(empresa.actividad);
        break;
        case 'Email':
        result.Email = this.transformaTexto(empresa.email);
        break;
        case 'Página_Web':
        result.PaginaWeb = this.transformaTexto(empresa.paginaWeb);
        break;
        case 'Telefono':
        result.Telefono = empresa.telefono;
        break;
        case 'Fax':
        result.Fax = empresa.fax;
        break;
        case 'CCAA':
        result.CCAA_Ine = empresa.direccion.ineCcaa;
        result.CCAA = this.transformaTexto(empresa.direccion.ccaa);
        break;
        case 'Provincia':
        result.Provincia_Ine = empresa.direccion.ineProvincia;
        result.Provincia = this.transformaTexto(empresa.direccion.provincia);
        break;
        case 'Municipio':
        result.Municipio_Ine = empresa.direccion.ineMunicipio;
        result.Municipio = this.transformaTexto(empresa.direccion.municipio);
        break;
        case 'Cod_Postal':
        result.CodigoPostal = empresa.direccion.codPostal;
        break;
        case 'Direccion':
        result.Direccion = this.transformaTexto(empresa.direccion.direccionAMedio);
        break;
        case 'Dir_Completa':
        result.Direccion_Completa = this.transformaTexto(empresa.direccion.direccionCompleta);
        break;
        case 'Ref_Catastral':
        result.ReferenciaCatastral = this.transformaTexto(empresa.direccion.referenciaCatastral);
        break;
      }
      });
      return result;
    });

    //DEPRECATED: cuando exportabamos todas las columnas y no solo las seleccionadas en el selector de columnas visibles
    // const res = this.listaEmpresasGeneradas.data.map(empresa => ({
    //   CIF: empresa.cif,
    //   Razon: this.transformaTexto(empresa.nombre),
    //   FechaConstitucion: empresa.fechaCreacion,
    //   CNAE: empresa.cnae,
    //   Actividad: this.transformaTexto(empresa.actividad),
    //   Email: empresa.email,
    //   Telefono: empresa.telefono,
    //   Fax: empresa.fax,
    //   CCAA_Ine: empresa.direccion.ineCcaa,
    //   CCAA: this.transformaTexto(empresa.direccion.ccaa),
    //   Provincia_Ine: empresa.direccion.ineProvincia,
    //   Provincia: this.transformaTexto(empresa.direccion.provincia),
    //   Municipio_Ine: empresa.direccion.ineMunicipio,
    //   Municipio: this.transformaTexto(empresa.direccion.municipio),
    //   CodigoPostal: empresa.direccion.codPostal,
    //   Direccion: this.transformaTexto(empresa.direccion.direccionAMedio),
    //   Direccion_Completa: this.transformaTexto(empresa.direccion.direccionCompleta),
    //   ReferenciaCatastral: this.transformaTexto(empresa.direccion.referenciaCatastral)
    // }));

    this.excelService.exportAsExcelFile(res, 'Perfiles_empresas');
    this.openSnackBar('Excel generado','ExcelEmpresas');
  }




  /**
    * Limpiar tabla empresas
    */
  onClickLimpiarEmpresas(): void {
    this.listaEmpresasGeneradas = new MatTableDataSource<Empresa>();
    this.listaEmpresasGeneradasOriginal = [];
    this.openSnackBar('Empresas limpiadas', 'LimpiarEmpresas');
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
    this.openSnackBar('Filtros limpiados', 'LimpiarFiltrosEmpresas');
  }


}
