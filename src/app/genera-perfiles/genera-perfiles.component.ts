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
import { MatOption } from '@angular/material/core';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {BaseGeneraComponent} from '../shared/components/base-genera/base-genera.component';
import { ProfilesService } from '../core/services/profiles.service';
import { Persona } from '../core/models/persona';
import { Empresa } from '../core/models/empresa';




@Component({
  selector: 'app-genera-perfiles',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, MatButtonToggleModule,MatIconModule,MatButtonModule,MatTooltipModule,MatGridListModule, CaseTransformerPipe,
    MatTableModule, MatPaginatorModule,MatFormFieldModule,MatInputModule,MatSortModule,NgSwitch,NgSwitchCase,NgSwitchDefault,NgClass,
    MatSelectModule],
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
      label: "Login"
    },
    {
      key: "Email",
      columna: "email",
      type: "button",
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
  listaPersonasGeneradas = new MatTableDataSource<Persona>();

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
  displayedColumnsEmpresas: string[] =  GeneraPerfilesComponent.COLUMNS_SCHEMA_EMPRESAS.map((col) => col.key)
  columnsSchemaEmpresas: any = GeneraPerfilesComponent.COLUMNS_SCHEMA_EMPRESAS;
  //@ViewChild(MatPaginator) paginatorEmpresas!: MatPaginator;
  @ViewChild('paginatorEmpresas') paginatorEmpresas!: MatPaginator;
  @ViewChild('sortEmpresas') sortEmpresas!: MatSort;

  //seleccionar columnas a mostrar en tabla personas
  listaColumnasPersonas: string[] = GeneraPerfilesComponent.COLUMNS_SCHEMA_PERSONAS.map((col) => col.key);
  selectColumnasPersonas: string[] = this.listaColumnasPersonas;
  //inicializar marcado, dado que estan todas las opciones seleccionada
  @ViewChild('allSelectedPersonas') private allSelectedPersonas!: MatOption;


  //seleccionar columnas a mostrar en tabla empresas
  listaColumnasEmpresas: string[] = GeneraPerfilesComponent.COLUMNS_SCHEMA_EMPRESAS.map((col) => col.key);
  selectColumnasEmpresas: string[] = this.listaColumnasEmpresas;



  //inyeccion de dependencia para utilizar el servicio de generacion de datos bancarios
  private profilesService: ProfilesService = inject(ProfilesService);


  constructor() {
    super();
  }

  override ngOnInit(): void {

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

    //el seleccionar todo de columnas de personas marcado de inicio
    //this.allSelectedPersonas.select();
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
    this.empresaGenerada = undefined;
    this.listaEmpresasGeneradas = new MatTableDataSource<Empresa>();

    if (this.tipoPerfil == 'p') {
      this.getPersonas(this.numGenerar);
    } else if (this.tipoPerfil == 'e') {
      this.getEmpresas(this.numGenerar);
    }

  }

  /**
   * Limpiamos el perfil generado
   */
  onClickLimpiarPerfil(): void {
    this.personaGenerada = undefined;
    this.listaPersonasGeneradas = new MatTableDataSource<Persona>();
    this.empresaGenerada = undefined;
    this.listaEmpresasGeneradas = new MatTableDataSource<Empresa>();
    this.openSnackBar('Perfil limpiado', 'LimpiarPerfil');
  }


  /**
   * Exportacion de los datos a un fichero excel la lista de personas generadas
   */
  exportJsonPersonas(): void {
    //var res = alasql('SEARCH / AS @data \ people / AS @persons \ RETURN(@persons->name as Name, @persons->age as Age, @data->city AS City) \ FROM ?', [this.peopleByCity])

    const displayedColumns = this.getDisplayedColumnsPersonas();
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
        result.Genero = persona.genero;
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
        result.Login = persona.login;
        break;
        case 'Email':
        result.Email = persona.email;
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
   * Exportacion de los datos a un fichero excel la lista de empresas generadas
   */
  exportJsonEmpresas(): void {
    const displayedColumns = this.getDisplayedColumnsEmpresas();
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
        result.Email = empresa.email;
        break;
        case 'Página_Web':
        result.PaginaWeb = empresa.paginaWeb;
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
    * Limpiar tabla personas
    */
  onClickLimpiarPersonas(): void {
    this.listaPersonasGeneradas = new MatTableDataSource<Persona>();
    this.openSnackBar('Personas limpiados', 'LimpiarPersonas');

  }

  /**
    * Limpiar tabla empresas
    */
  onClickLimpiarEmpresas(): void {
    this.listaEmpresasGeneradas = new MatTableDataSource<Empresa>();
    this.openSnackBar('Empresas limpiadas', 'LimpiarEmpresas');
  }

  /**
   * Devolver las columnas que en cada momento se mostraran en tabla personas al cambiar con el selector de columnas visibles
   * @returns
   */
  getDisplayedColumnsPersonas(): string[] {
    this.displayedColumnsPersonas = this.selectColumnasPersonas;
    return this.displayedColumnsPersonas;
  }

  /**
   * Devolver las columnas que en cada momento se mostraran en tabla personas al cambiar con el selector de columnas visibles
   * @returns
   */
  getDisplayedColumnsEmpresas(): string[] {
    this.displayedColumnsEmpresas = this.selectColumnasEmpresas;
    return this.displayedColumnsEmpresas;
  }

  /*

  tosslePerOnePersonas(all: any): void{
    if (this.allSelectedPersonas.selected) {
     this.allSelectedPersonas.deselect();
     //return false;
    } else if(this.listaColumnasEmpresas.length == this.selectColumnasEmpresas.length){
      this.allSelectedPersonas.select();
    }
  }

  toggleAllSelectionPersonas() {
    if (this.allSelectedPersonas.selected) {
      this.selectColumnasEmpresas= this.listaColumnasEmpresas;
    } else {
      this.selectColumnasEmpresas = [];
    }
  }
*/

}
