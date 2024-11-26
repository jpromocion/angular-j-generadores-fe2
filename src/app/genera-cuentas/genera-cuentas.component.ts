import { Component, OnInit, inject } from '@angular/core';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
//necesario  para tooltips de bootstrap, al cambiar a angular material es innecesario
//import * as bootstrap from 'bootstrap';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatListModule} from '@angular/material/list';
import {BaseGeneraComponent} from '../shared/components/base-genera/base-genera.component';
import { BankService } from '../core/services/bank.service';
import { Cuenta } from '../core/models/cuenta';
import { Tarjeta } from '../core/models/tarjeta';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-genera-cuentas',
  standalone: true,
  imports: [FormsModule, NgIf, MatIconModule, MatButtonModule, MatCardModule, MatTooltipModule, MatGridListModule,
    MatInputModule, MatSelectModule, MatFormFieldModule, MatListModule, TranslateModule],
  templateUrl: './genera-cuentas.component.html',
  styleUrl: './genera-cuentas.component.scss'
})
export class GeneraCuentasComponent extends BaseGeneraComponent implements OnInit {

  // ibanGenerado: Cuenta | undefined;
  // tarjetaGenerado: Tarjeta | undefined;

  listaIban: Cuenta[] = [];
  listaTarjeta: Tarjeta[] = [];

  numGenerar: number = 1;

  ibanValidar: string = '';
  tarjetaValidar: string = '';

  ibanValidarOk: string = '';
  tarjetaValidarOk: string = '';

  selectedTarjetaTipo: string = '';
  tiposTarjetas: Array<any> = [
    //{valor: '', nombre: 'Seleccionar un tipo concreto para generar solo este tipo.'},
    {valor: 'americanexpress', nombre: 'American Express'},
    {valor: 'visa', nombre: 'Visa'},
    {valor: 'mastercard', nombre: 'Mastercard'},
    {valor: 'discover', nombre: 'Discover'}
  ];


  //inyeccion de dependencia para utilizar el servicio de generacion de datos bancarios
  private bankService: BankService = inject(BankService);



  constructor() {
    super();
  }

  override ngOnInit(): void {
    this.selectedTarjetaTipo = '';
    this.numGenerar = 1;

    //necesario  para tooltips de bootstrap, al cambiar a angular material es innecesario
    //Forma para utilizar el tooltip de bootstrap
    //const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    //const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
  }


  /**
   * Invocamos la operacion del servicio para obtener una lista de ibans aleatorios
   */
  getCuentas(resultados: number): void {
    // if (resultados == 1) {
    //   this.bankService.getAccount(resultados)
    //   .subscribe(cuenta => {
    //     this.ibanGenerado = cuenta[0];
    //     if (this.ibanGenerado){
    //       this.openSnackBar('IBAN generado', 'GenerarIBAN');
    //     }
    //   });
    // } else{
      this.bankService.getAccount(resultados)
      .subscribe(cuentas => {
        this.listaIban = cuentas;
        if (this.listaIban && this.listaIban.length > 0) {
          this.openSnackBar('Lista IBANs generados', 'GenerarIBANs');
        }
      });
    // }
  }

  /**
   * Invocamos la operacion del servicio para obtener una lista de tarjetas aleatorios
   */
  getTarjetas(resultados: number): void {
    // if (resultados == 1) {
    //   this.bankService.getCard(resultados, this.selectedTarjetaTipo)
    //   .subscribe(cuenta => {
    //     this.tarjetaGenerado = cuenta[0];
    //     if (this.tarjetaGenerado){
    //       this.openSnackBar('Tarjeta generada', 'GenerarTarjeta');
    //     }
    //   });
    // } else{
      this.bankService.getCard(resultados, this.selectedTarjetaTipo)
      .subscribe(cuentas => {
        this.listaTarjeta = cuentas;
        if (this.listaTarjeta && this.listaTarjeta.length > 0) {
          this.openSnackBar('Lista Tarjetas generadas', 'GenerarTarjetas');
        }
      });
    // }
  }



  /**
   * Generamos una lista ibans aleatorio
   */
  onClickBotonGenerarListaIban(): void {
    this.listaIban = [];
    this.getCuentas(this.numGenerar);
  }

  /**
   * Generamos una lista ibans aleatorio
   */
  onClickBotonGenerarListaTarjetas(): void {
    this.listaTarjeta = [];
    this.getTarjetas(this.numGenerar);
  }

  /**
   * Evento boton validar iban
   */
  onClickValidarIban(): void {
    this.bankService.validateIban(this.ibanValidar)
    .subscribe(ibanOk => {
      this.ibanValidarOk = ibanOk;
      if (this.ibanValidarOk && this.ibanValidarOk != ''){
        this.openSnackBar('IBAN validado', 'ValidarIBAN');
      }
    });
    //console.info('Iban validado: ' + this.ibanValidarOk);
  }

  /**
   * Evento boton validar tarjeta
   */
  onClickValidarTarjeta(): void {
    this.bankService.validateCard(this.tarjetaValidar)
    .subscribe(tarjetaOk => {
      this.tarjetaValidarOk = tarjetaOk;
      if (this.tarjetaValidarOk && this.tarjetaValidarOk != ''){
        this.openSnackBar('Tarjeta validada', 'ValidarTarjeta');
      }
    });
    //console.info('Tarjeta validada: ' + this.tarjetaValidarOk);
  }


  /**
  * Limpiar tooddas las listas de generacion multiples
  * @deprecated Se han creado metodos y botones para cada lista concreta
  */
  onClickLimpiarListas(): void {
    this.listaIban = [];
    this.listaTarjeta = [];
  }

  /**
   * Limpiar la lista de iban generados
   */
  onClickLimpiarListaIBAN(): void {
    this.listaIban = [];
    this.openSnackBar('IBANs limpiado', 'LimpiarIBANs');
  }

  /**
   * Limpiar la lista de tarjetas generadas
   */
  onClickLimpiarListaTarjetas(): void {
    this.listaTarjeta = [];
    this.openSnackBar('Tarjetas limpiado', 'LimpiarTarjetas');
  }


  /**
   * Exportar la lista de iban generados a excel
   */
  exportJsonIban(): void {
    const filteredIbanList = this.listaIban.map(({ iban, ibanFormateado }) => ({ iban, ibanFormateado }));
    this.excelService.exportAsExcelFile(filteredIbanList, 'Lista_IBANs');
    this.openSnackBar('Excel generado','ExcelIban');
  }

  /**
  * Exportar la lista de tarjetas generados a excel
  */
  exportJsonTarjetas(): void {
    const filteredTarjetaList = this.listaTarjeta.map(({ tarjeta, tarjetaFormateada, expiracionCredito, cvc }) => ({ tarjeta, tarjetaFormateada, expiracionCredito, cvc }));
    this.excelService.exportAsExcelFile(filteredTarjetaList, 'Lista_Tarjetas');
    this.openSnackBar('Excel generado','ExcelTarjetas');
  }

}
