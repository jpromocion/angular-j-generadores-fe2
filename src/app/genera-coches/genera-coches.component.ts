import { Component, inject, OnInit, ElementRef, ViewChild} from '@angular/core';
import {NgIf} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {BaseGeneraComponent} from '../shared/components/base-genera/base-genera.component';
import { VehicleService } from '../core/services/vehicle.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-genera-coches',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, MatButtonToggleModule, MatIconModule, MatButtonModule,
    MatTooltipModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatListModule,
    MatCardModule, MatAutocompleteModule, TranslateModule],
  templateUrl: './genera-coches.component.html',
  styleUrl: './genera-coches.component.scss'
})
export class GeneraCochesComponent extends BaseGeneraComponent implements OnInit {

  //filtros
  //selectedTipoGenera: string = '';
  @ViewChild('selectedTipoGeneraIn') selectedTipoGeneraIn: ElementRef<HTMLInputElement> = inject(ElementRef);
  selectedTipoGeneraFC = new FormControl('');
  tiposGenera: Array<any> = [
    //{valor: '', nombre: 'Seleccionar un tipo de generación.'},
    {valor: 't', nombre: 'Turismo'},
    {valor: 'c', nombre: 'Ciclomotor'},
    {valor: 'r', nombre: 'Remolque'},
    {valor: 'e', nombre: 'Especial'},
    {valor: 'u', nombre: 'Turístico'},
    {valor: 'h', nombre: 'Histórico'},
    {valor: 'tp', nombre: 'Temporal particular'},
    {valor: 'te', nombre: 'Temporal empresa'},
    {valor: 'd', nombre: 'Diplomática'},
    {valor: 'vin', nombre: 'Nº Bastidor'}
  ];
  tiposGeneraFiltrado: Array<any> = [];
  numGenerar: number = 1;

  textoGenerado: string[] = [];

  bastidorValidar: string = '';
  bastidorValidarOk: string = '';



  //inyeccion de dependencia para utilizar el servicio de generacion de nifs
  private vehicleService: VehicleService = inject(VehicleService);



  constructor() {
    super();
  }

  override ngOnInit(): void {

  }



  /**
   * Invocamos la operacion del servicio para obtener una lista de caracteres aleatorios
   */
  getMatricula(resultados: number, tipo: string = ''): void {
      this.vehicleService.getPlatenumber(resultados, tipo)
      .subscribe(cadena => {
        this.textoGenerado = cadena;
        if (this.textoGenerado && this.textoGenerado.length > 0){
          this.openSnackBar('Matrícula generada', 'GenerarMatricula');
        }
      });
  }

  /**
   * Invocamos la operacion del servicio para obtener una lista de caracteres aleatorios
   */
  getBastidor(resultados: number): void {
      this.vehicleService.getVin(resultados)
      .subscribe(cadena => {
        this.textoGenerado = cadena;
        if (this.textoGenerado && this.textoGenerado.length > 0){
          this.openSnackBar('Nº Bastidor generado', 'GenerarBastidor');
        }
      });
  }


  /**
   * El metodo encargado de filtrar la lista de opciones de tipos de generacion cuando se va rellenando algo.
   * Utiliza el valor provisional rellenado recuperando de #selectedTipoGeneraIn a traves de su mapeado aqui
   * selectedTipoGeneraIn. NOTA: recordemos que "[formControl]="selectedTipoGeneraFC"" llevaria el valor final
   * seleccionado, pero en este metodo neccesitamos la entrada que el usuario esta rellenando... que es distinto
   */
  filterTiposGenera(): void {
    //obtenemos el valor rellenado por usuario del campo en si
    const filterValue = this.selectedTipoGeneraIn.nativeElement.value.toLowerCase();
    //cargamos la lista filtrada tiposGeneraFiltrado, filtrando siempore de la original tiposGenera el valor rellenado
    //NOTA: sobre la columna "nombre" que es lo que se muestra.
    this.tiposGeneraFiltrado = this.tiposGenera.filter(o => o.nombre.toLowerCase().includes(filterValue));
  }

  /**
   * Al no ser el origen una lista de string simple, sino un objeto compuesto: valor, nombre. Este metodo
   * se encarga de para el valor ya seleccionado, mostrar solo el nombre asociado a ese objeto.
   * @param tipo
   * @returns
   */
  displayTiposGenera(tipo: any): string {
    return tipo && tipo.nombre ? tipo.nombre : '';
  }


  /**
  * Generamos un tipo matricula aleatorio
  */
  onClickBotonGenerarTexto(): void {
    //let codigoTipoSeleccionado = this.selectedTipoGenera;
    let codigoTipoSeleccionado = (<any>this.selectedTipoGeneraFC?.value)?.valor;

    if (!codigoTipoSeleccionado || codigoTipoSeleccionado == '') {
      this.openSnackBar('Debe seleccionar un tipo de matrícula.','Cerrar');
    } else if (codigoTipoSeleccionado != 'vin') {
      this.getMatricula(this.numGenerar, codigoTipoSeleccionado);
    } else {
      this.getBastidor(this.numGenerar);
    }

  }

  /**
    * Limpiar el campo de cif generado
    */
  onClickLimpiarTexto(): void {
    this.textoGenerado = [];
    this.openSnackBar('Datos limpiados', 'LimpiarVehiculos');
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonTipos(): void {
    const formattedNies = this.textoGenerado.map(matricula => ({ Valor: matricula }));
    this.excelService.exportAsExcelFile(formattedNies, 'Lista_tipos');
    this.openSnackBar('Excel generado','ExcelVehiculos');
  }


  /**
    * Evento boton para validar un bastidor
    */
  onClickValidarBastidor(): void {
    this.vehicleService.validateVin(this.bastidorValidar)
    .subscribe(esOk => {
      this.bastidorValidarOk = esOk;
      if (this.bastidorValidarOk && this.bastidorValidarOk != ''){
        this.openSnackBar('Nº Bastidor validado', 'ValidarBastidor');
      }
    });
    //console.info('Bastidor validado: ' + this.bastidorValidarOk);
  }

}
