import { Component, OnInit, inject, AfterViewInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import {NgFor,NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatGridListModule} from '@angular/material/grid-list';
import { CaseTransformerPipe } from '../case-transformer.pipe';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ProfilesService } from '../profiles.service';
import { Persona } from '../persona';
import { Empresa } from '../empresa';
import { ExcelService } from '../excel.service';


@Component({
  selector: 'app-genera-perfiles',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, MatButtonToggleModule,MatIconModule,MatButtonModule,MatTooltipModule,MatGridListModule, CaseTransformerPipe,
    MatTableModule, MatPaginatorModule,MatFormFieldModule,MatInputModule,MatSortModule],
  templateUrl: './genera-perfiles.component.html',
  styleUrl: './genera-perfiles.component.scss'
})
export class GeneraPerfilesComponent implements OnInit, AfterViewInit  {

  //filstros
  tipoPerfil: string = 'p';
  sexoSeleccionado: string = 'a';
  tipoLetra: string = 'M';

  numGenerar: number = 1;

  personaGenerada: Persona | undefined;
  empresaGenerada: Empresa | undefined;

  //cuando generamos varias personas
  listaPersonasGeneradas = new MatTableDataSource<Persona>();
  displayedColumnsPersonas: string[] = ['nif', 'nie','sexo', 'fechanacimiento', 'nombre', 'apellido1', 'apellido2','nombrecompleto','tlfmovil','tlffijo','login','email',
    'password','ccaa','provincia','municipio','codpostal','direccion','direccioncompleta','iban','bic', 'tarjeta','tipotarjeta',
  'expiracion','cvc'];
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
  displayedColumnsEmpresas: string[] = ['cif','razon','fechacons','cnae','actividad','email','paginaWeb','telefono','fax','ccaa','provincia','municipio','codpostal','direcion','direcioncompleta'];
  //@ViewChild(MatPaginator) paginatorEmpresas!: MatPaginator;
  @ViewChild('paginatorEmpresas') paginatorEmpresas!: MatPaginator;
  @ViewChild('sortEmpresas') sortEmpresas!: MatSort;

  //inyeccion de dependencia para utilizar el servicio de clipboard
  private clipboard: Clipboard = inject(Clipboard);

  //inyeccion de dependencia para utilizar el servicio de generacion de datos bancarios
  private profilesService: ProfilesService = inject(ProfilesService);

  //inyeccion de dependencia para utilizar el servicio de liveAnnouncer para ordenar
  private _liveAnnouncer = inject(LiveAnnouncer);

  //inyeccion del servicio para generar excel
  private excelService: ExcelService = inject(ExcelService);

  //mensajes notificaciones
  private _snackBar = inject(MatSnackBar);

  ngOnInit(): void {
  }

  /**
  * Inicializamos los labels del paginador de personas
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
   * Dado un texto, lo transformamos segun el tipo de letra seleccionado con el pipe CaseTransformerPipe
   */
  transformaTexto(texto: string): string {
    return new CaseTransformerPipe().transform(texto, this.tipoLetra);
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
   * Exportacion de los datos a un fichero excel la lista de personas generadas
   */
  exportJsonPersonas(): void {
    //var res = alasql('SEARCH / AS @data \ people / AS @persons \ RETURN(@persons->name as Name, @persons->age as Age, @data->city AS City) \ FROM ?', [this.peopleByCity])
    const res = this.listaPersonasGeneradas.data.map(persona => ({
      NIF: persona.nif,
      NIE: persona.nie,
      Genero: persona.genero,
      FechaNacimiento: persona.fechaNacimiento,
      Edad: persona.edad,
      Nombre: this.transformaTexto(persona.nombre),
      Apellido1: this.transformaTexto(persona.apellido1),
      Apellido2: this.transformaTexto(persona.apellido2),
      NombreCompleto: this.transformaTexto(persona.nombreCompleto),
      TelefonoMovil: persona.telefonoMovil,
      TelefonoFijo: persona.telefonoFijo,
      Login: persona.login,
      Email: persona.email,
      Password: persona.password,
      CCAA_Ine: persona.ccaaIne,
      CCAA: this.transformaTexto(persona.ccaa),
      Provincia_Ine: persona.provinciaIne,
      Provincia: this.transformaTexto(persona.provincia),
      Municipio_Ine: persona.municipioIne,
      Municipio: this.transformaTexto(persona.municipio),
      CodigoPostal: persona.codigoPostal,
      Direccion: this.transformaTexto(persona.direccion + ', ' + persona.numerovia),
      Direccion_Completa: this.transformaTexto(persona.direccion + ', ' + persona.numerovia + ', ' + persona.codigoPostal + ', ' + persona.municipio + ' (' + persona.provincia + ')'),
      IBAN: persona.iban,
      BIC: persona.bic,
      TarjetaCredito: persona.tarjetaCredito,
      TipoTarjeta: this.transformaTexto(persona.tipoTarjeta),
      ExpiracionCredito: persona.expiracionCredito,
      CVC: persona.cvc
    }));

    this.excelService.exportAsExcelFile(res, 'Perfiles_personas');
    this.openSnackBar('Excel generado','ExcelPersonas');
  }

  /**
   * Exportacion de los datos a un fichero excel la lista de empresas generadas
   */
  exportJsonEmpresas(): void {
    const res = this.listaEmpresasGeneradas.data.map(empresa => ({
      CIF: empresa.cif,
      Razon: this.transformaTexto(empresa.nombre),
      FechaConstitucion: empresa.fechaCreacion,
      CNAE: empresa.cnae,
      Actividad: this.transformaTexto(empresa.actividad),
      Email: empresa.email,
      Telefono: empresa.telefono,
      Fax: empresa.fax,
      CCAA_Ine: empresa.ccaaIne,
      CCAA: this.transformaTexto(empresa.ccaa),
      Provincia_Ine: empresa.provinciaIne,
      Provincia: this.transformaTexto(empresa.provincia),
      Municipio_Ine: empresa.municipioIne,
      Municipio: this.transformaTexto(empresa.municipio),
      CodigoPostal: empresa.codigoPostal,
      Direccion: this.transformaTexto(empresa.direccion + ', ' + empresa.codigoPostal),
      Direccion_Completa: this.transformaTexto(empresa.direccion + ', ' + empresa.numerovia + ', ' + empresa.codigoPostal + ', ' + empresa.municipio + ' (' + empresa.provincia + ')'),
    }));

    this.excelService.exportAsExcelFile(res, 'Perfiles_empresas');
    this.openSnackBar('Excel generado','ExcelEmpresas');
  }

}
