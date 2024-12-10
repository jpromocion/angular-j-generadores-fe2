import { Component, OnInit, inject} from '@angular/core';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {BaseGeneraComponent} from '../shared/components/base-genera/base-genera.component';
import { NumberService } from '../core/services/number.service';
import { TranslateModule } from '@ngx-translate/core';
import { marker} from '@colsen1991/ngx-translate-extract-marker';

@Component({
    selector: 'app-genera-numeros',
    imports: [NgIf, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTooltipModule, MatCardModule, MatIconModule,
        MatListModule, MatCheckboxModule, MatSlideToggleModule, MatSelectModule, MatButtonToggleModule, MatRadioModule,
        TranslateModule],
    templateUrl: './genera-numeros.component.html',
    styleUrl: './genera-numeros.component.scss'
})
export class GeneraNumerosComponent extends BaseGeneraComponent implements OnInit {
  //filtro general
  numGenerar: number = 1;
  posicionesDecimales: number = 2;

  //aleatorio
  aleatorioMinimo: number = 0;
  aleatorioMaximo: number = 100;
  aleatorioDecimales: boolean = false;
  aleatorioRepetidos: boolean = true;
  aleatorioGenerado: string[] = [];

  //moneda
  monedaCara: string = 'O';
  monedaCruz: string = 'X';
  monedaGenerado: string[] = [];

  //dado
  dadoGenerado: string[] = [];

  //gaussiano
  gaussianoMedia: number = 0;
  gaussianoDesviacion: number = 1;
  gaussianoGenerado: string[] = [];

  //calculadora
  calculadoraPantalla: string = '';
  calculadoraOperacion: string = '';
  calculadoraGrado: string = 'grados';
  calculadoraOperando1?: number;
  calculadoraOperando2?: number;
  calculadoraCalculado: boolean = false;

  //proporcion
  proporcionA: number = 100;
  proporcionB: number = 10;
  proporcionC: number = 200;
  proporcionDirecta: boolean = true;
  proporcionResultado: string = '';

  //area
  areaSelectedTipo: string = '';
  areaTiposArea: Array<any> = [
    //{valor: '', nombre: 'Seleccionar un tipo de figura.'},
    {valor: 'cuadrado', nombre: 'generadores.jpromocion.generarcomunes.lovs.figurasarea.valorcuadrado'},
    {valor: 'rectangulo', nombre: 'generadores.jpromocion.generarcomunes.lovs.figurasarea.valorrectangulo'},
    {valor: 'triangulo', nombre: 'generadores.jpromocion.generarcomunes.lovs.figurasarea.valortriangulo'},
    {valor: 'paralelogramo', nombre: 'generadores.jpromocion.generarcomunes.lovs.figurasarea.valorparalelogramo'},
    {valor: 'trapezoide', nombre: 'generadores.jpromocion.generarcomunes.lovs.figurasarea.valortrapezoide'},
    {valor: 'circulo', nombre: 'generadores.jpromocion.generarcomunes.lovs.figurasarea.valorcirculo'},
    {valor: 'elipse', nombre: 'generadores.jpromocion.generarcomunes.lovs.figurasarea.valorelipse'}
  ];
  areaA: number = 0;
  areaB: number = 0;
  areaC: number = 0;
  areaLabelA: string = '';
  areaLabelB: string = '';
  areaLabelC: string = '';
  areaResultado: string = '';

  //grados-radianes
  gradosValor: number = 0;
  medidaGrados: string = 'grados';
  gradosResultado: string = '';

  //base
  baseValor: string = '';
  baseActual: number = 10;
  baseNueva: number = 10;
  baseResultado: string = '';

  //arabigo
  arabigoValor: string = '';
  arabigoTipo: string = 'arabigo';
  arabigoResultado: string = '';

  //inyeccion de dependencia para utilizar el servicio de generacion de numeros
  private numberService: NumberService = inject(NumberService);


  constructor() {
    super();
  }

  override ngOnInit(): void {
    this.areaLabelA = this.translate.instant(marker('generadores.jpromocion.numeros.entrada.areaa.label'));
    this.areaLabelB = this.translate.instant(marker('generadores.jpromocion.numeros.entrada.areab.label'));
    this.areaLabelC = this.translate.instant(marker('generadores.jpromocion.numeros.entrada.areac.label'));
  }




  /**
   * Invocamos la operacion del servicio para obtener una lista de cod promocionales
   */
  getAleatorios(resultados: number, minimo: number, maximo: number, decimales: String, repetidos: String): void {
    this.numberService.getRandom(resultados, minimo, maximo, decimales, repetidos)
    .subscribe(cadena => {
      this.aleatorioGenerado = cadena;
      if (this.aleatorioGenerado && this.aleatorioGenerado.length > 0){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.generadoalea.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.generadoalea.titulo')));
      }
    });
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGenerarAleatorios(): void {
    this.aleatorioGenerado = [];
    this.getAleatorios(this.numGenerar, this.aleatorioMinimo, this.aleatorioMaximo, this.aleatorioDecimales ? "y" : "n", this.aleatorioRepetidos ? "y" : "n");

  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarAleatorios(): void {
    this.aleatorioGenerado = [];
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.limpiadoalea.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.limpiadoalea.titulo')));
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonAleatorios(): void {
    const formatted = this.aleatorioGenerado.map(dato => ({ [this.translate.instant(marker('generadores.jpromocion.numeros.excel.aleatorios.columnas.numero'))]: dato }));
    this.excelService.exportAsExcelFile(formatted, this.translate.instant(marker('generadores.jpromocion.numeros.excel.aleatorios.titulo')));
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.excelalea.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.excelalea.titulo')));
  }


  /**
   * Invocamos la operacion del servicio para obtener una lista de cod promocionales
   */
  getMoneda(resultados: number, simboloCara: String = '', simboloCruz: String = ''): void {
    this.numberService.getCoin(resultados, simboloCara, simboloCruz)
    .subscribe(cadena => {
      this.monedaGenerado = cadena;
      if (this.monedaGenerado && this.monedaGenerado.length > 0){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.generadomoneda.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.generadomoneda.titulo')));
      }
    });
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGenerarMoneda(): void {
    this.monedaGenerado = [];
    this.getMoneda(this.numGenerar, this.monedaCara, this.monedaCruz);
    //fijamos el focus en un elmento cercano para que no se vaya hasta arriba de la paginba
    document.getElementById('monedaCara')?.focus();
  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarMoneda(): void {
    this.monedaGenerado = [];
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.limpiadomoneda.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.limpiadomoneda.titulo')));
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonMoneda(): void {
    const formatted = this.monedaGenerado.map(dato => ({ [this.translate.instant(marker('generadores.jpromocion.numeros.excel.monedas.columnas.caracruz'))]: dato }));
    this.excelService.exportAsExcelFile(formatted, this.translate.instant(marker('generadores.jpromocion.numeros.excel.monedas.titulo')));

    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.excelmoneda.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.excelmoneda.titulo')));
  }



  /**
   * Invocamos la operacion del servicio para obtener una lista de cod promocionales
   */
  getDado(resultados: number): void {
    this.numberService.getDice(resultados)
    .subscribe(cadena => {
      this.dadoGenerado = cadena;
      if (this.dadoGenerado && this.dadoGenerado.length > 0){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.generadodado.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.generadodado.titulo')));
      }
    });
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGenerarDado(): void {
    this.dadoGenerado = [];
    this.getDado(this.numGenerar);
    //fijamos el focus en un elmento cercano para que no se vaya hasta arriba de la paginba
    document.getElementById('btGenerarDado')?.focus();
  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarDado(): void {
    this.dadoGenerado = [];
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.limpiadodado.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.limpiadodado.titulo')));
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonDado(): void {
    const formatted = this.dadoGenerado.map(dato => ({ [this.translate.instant(marker('generadores.jpromocion.numeros.excel.dados.columnas.dado'))]: dato }));
    this.excelService.exportAsExcelFile(formatted, this.translate.instant(marker('generadores.jpromocion.numeros.excel.dados.titulo')));

    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.exceldado.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.exceldado.titulo')));
  }





  /**
   * Invocamos la operacion del servicio para obtener una lista de aleatorios gaussiano
   */
  getGaussiano(resultados: number, media: number, desviacion: number, decimales: number): void {
    this.numberService.getGauss(resultados, media, desviacion, decimales)
    .subscribe(cadena => {
      this.gaussianoGenerado = cadena;
      if (this.gaussianoGenerado && this.gaussianoGenerado.length > 0){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.generadogaussiano.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.generadogaussiano.titulo')));
      }
    });
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGenerarGaussiano(): void {
    this.gaussianoGenerado = [];
    this.getGaussiano(this.numGenerar, this.gaussianoMedia, this.gaussianoDesviacion, this.posicionesDecimales);
    //fijamos el focus en un elmento cercano para que no se vaya hasta arriba de la paginba
    document.getElementById('gaussianoDesviacion')?.focus();
  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarGaussiano(): void {
    this.gaussianoGenerado = [];
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.limpiadogaussiano.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.limpiadogaussiano.titulo')));
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonGaussiano(): void {
    const formatted = this.gaussianoGenerado.map(dato => ({ [this.translate.instant(marker('generadores.jpromocion.numeros.excel.gaussianos.columnas.numero'))]: dato }));
    this.excelService.exportAsExcelFile(formatted, this.translate.instant(marker('generadores.jpromocion.numeros.excel.gaussianos.titulo')));

    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.excelgaussiano.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.excelgaussiano.titulo')));
  }

  /**
   * Invocamos la operacion del servicio para realizar un calculo
   */
  getCalcularadora(operando: string, numero1: number, numero2: number, decimales: number): void {
    this.calculadoraPantalla = '';
    this.calculadoraCalculado = false;
    this.numberService.getCalculator(operando, numero1, numero2, decimales)
    .subscribe(resultado => {
      this.calculadoraPantalla = resultado;
      //si en el resultado tras la , decimal solo hay ceros, eliminamos la parte decimal
      if (this.calculadoraPantalla.indexOf(',') > 0){
        let parteDecimal = this.calculadoraPantalla.substring(this.calculadoraPantalla.indexOf(',') + 1);
        if (parseFloat(parteDecimal) === 0){
          this.calculadoraPantalla = this.calculadoraPantalla.substring(0, this.calculadoraPantalla.indexOf(','));
        }
      }

      if (this.calculadoraPantalla && this.calculadoraPantalla != ''){
        this.calculadoraCalculado = true;
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.operacioncalculada.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.operacioncalculada.titulo')));
      }
    });
  }


  /**
   * Invocamos la operacion del servicio para realizar un calculo de la parte trigonometrica
   */
  getTrigonometrica(operando: string, numero: number, tipoNumero: String, decimales: number): void {
    this.calculadoraPantalla = '';
    this.calculadoraCalculado = false;
    this.numberService.getTrigonometric(operando, numero, tipoNumero, decimales)
    .subscribe(resultado => {
      this.calculadoraPantalla = resultado;
      //si en el resultado tras la , decimal solo hay ceros, eliminamos la parte decimal
      if (this.calculadoraPantalla.indexOf(',') > 0){
        let parteDecimal = this.calculadoraPantalla.substring(this.calculadoraPantalla.indexOf(',') + 1);
        if (parseFloat(parteDecimal) === 0){
          this.calculadoraPantalla = this.calculadoraPantalla.substring(0, this.calculadoraPantalla.indexOf(','));
        }
      }

      if (this.calculadoraPantalla && this.calculadoraPantalla != ''){
        this.calculadoraCalculado = true;
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.operacioncalculada.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.operacioncalculada.titulo')));
      }
    });
  }

  /**
   * Tras haber realizado una operacion calculada con el servicio,
   * si se vuelve a utilizar la calculadora debemos empezar una nueva
   * desde cero
   */
  private resetearOperacionRealizaCalculadora(): void {
    if (this.calculadoraCalculado){
      this.calculadoraCalculado = false;
      this.calculadoraPantalla = '';
      this.calculadoraOperacion = '';
      this.calculadoraOperando1 = undefined;
      this.calculadoraOperando2 = undefined;
    }
  }

  /**
   * Transforma el operador de la calculadora de pantalla por el que espera equivalente el servicio
   */
  private transformarOperando(operadorCalcu: string): string {
    let operadorServicio = '';
    switch (operadorCalcu) {
      case '+':
        operadorServicio = '+';
        break;
      case '-':
        operadorServicio = '-';
        break;
      case 'x':
        operadorServicio = '*';
        break;
        case '\u00F7':
        operadorServicio = '/';
        break;
      case 'MOD':
        operadorServicio = 'resto';
        break;
       case '^':
        operadorServicio = 'potencia';
        break;
      case '%':
        operadorServicio = 'porcentaje';
        break;
      case '!':
        operadorServicio = 'factorial';
        break;
      case 'log':
        operadorServicio = 'logaritmo';
        break;
      case 'ln':
        operadorServicio = 'logaritmoNaturalNeperiano';
        break;
      case 'log2':
        operadorServicio = 'logaritmoBase2';
        break;
      case 'logX':
        operadorServicio = 'logaritmoBaseX';
        break;
      case '\u221A':
        operadorServicio = 'raizCuadrada';
        break;
      case '\u221B':
        operadorServicio = 'raizCubica';
        break;
      case 'n\u221A':
        operadorServicio = 'raizN';
        break;
      case 'sen':
        operadorServicio = 'seno';
        break;
      case 'cos':
        operadorServicio = 'coseno';
        break;
      case 'tan':
        operadorServicio = 'tangente';
        break;
      case 'cot':
        operadorServicio = 'cotangente';
        break;
      case 'sec':
        operadorServicio = 'secante';
        break;
      case 'csc':
        operadorServicio = 'cosecante';
        break;
      case 'arcsen':
        operadorServicio = 'arcoseno';
        break;
      case 'arccos':
        operadorServicio = 'arcocoseno';
        break;
      case 'arctg':
        operadorServicio = 'arcotangente';
        break;
      case 'sinh':
        operadorServicio = 'senohiperbolico';
        break;
      case 'cosh':
        operadorServicio = 'cosenohiperbolico';
        break;
      case 'tanh':
        operadorServicio = 'tangentehiperbolico';
        break;
      default:
        operadorServicio = '';
    }
    return operadorServicio;
  }

  /**
  * Pulsa un boton de calculadora
  */
  onClickBotonCalculadora(elemento: string): void {

    this.resetearOperacionRealizaCalculadora();

    if (elemento === 'C'){
      this.calculadoraPantalla = '';
      this.calculadoraOperacion = '';
      this.calculadoraOperando1 = undefined;
      this.calculadoraOperando2 = undefined;
    } else if (elemento === '.'){
      this.calculadoraPantalla += ',';
    } else if (elemento === '1' || elemento === '2' || elemento === '3' || elemento === '4' || elemento === '5' || elemento === '6' || elemento === '7' || elemento === '8' || elemento === '9' || elemento === '0'){
      //si el caracter anterior en pantalla existe y no es un numero metemos un espacio para separarlo del operador
      if (this.calculadoraPantalla.length > 0 && isNaN(parseInt(this.calculadoraPantalla.charAt(this.calculadoraPantalla.length - 1)))){
        this.calculadoraPantalla += ' ';
      }
      this.calculadoraPantalla += elemento;
    } else if (elemento === '='){
      if (this.calculadoraOperacion === ''){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.calculadoraerror1.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.calculadoraerror1.titulo')));
      } else if (this.calculadoraOperando1 === undefined) {
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.calculadoraerror2.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.calculadoraerror2.titulo')));
      } else {
        //rellenamos el calculadoraOperando2 con la parte de la pantalla que hay tras el operador
        this.calculadoraOperando2 = parseFloat(this.calculadoraPantalla.substring(this.calculadoraPantalla.indexOf(this.calculadoraOperacion) + this.calculadoraOperacion.length).replace(',', '.'));

        if (this.calculadoraOperacion == 'sen' || this.calculadoraOperacion == 'cos' || this.calculadoraOperacion == 'tan' || this.calculadoraOperacion == 'cot'
          || this.calculadoraOperacion == 'sec' || this.calculadoraOperacion == 'csc' || this.calculadoraOperacion == 'arcsen' || this.calculadoraOperacion == 'arccos'
          || this.calculadoraOperacion == 'arctg' || this.calculadoraOperacion == 'sinh' || this.calculadoraOperacion == 'cosh' || this.calculadoraOperacion == 'tanh'){
          this.getTrigonometrica(this.transformarOperando(this.calculadoraOperacion), this.calculadoraOperando1, this.calculadoraGrado, this.posicionesDecimales);
        } else{
          this.getCalcularadora(this.transformarOperando(this.calculadoraOperacion), this.calculadoraOperando1, this.calculadoraOperando2, this.posicionesDecimales);
        }

      }
    } else{
      //Cualquier otro caso es un operador.
      //No podemos pulsar un operador si ya se registro otro, la calculadora es para hacer una operacion por vez!!!!
      if (this.calculadoraOperacion && this.calculadoraOperacion != ''){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.calculadoraerror3.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.calculadoraerror3.titulo')));
      } else{
        //cargamos el primer operando con lo que hay antes
        this.calculadoraOperando1 = parseFloat(this.calculadoraPantalla.replace(',', '.'));

        //cargamos la operacion, y actualizamos la pantalla
        this.calculadoraOperacion = elemento;
        this.calculadoraPantalla += ' ' + elemento;
      }

    }

  }



  /**
   * Invocamos la operacion del servicio para obtener una lista de cod promocionales
   */
  getProporcion(numeroA: number, numeroB: number, numeroC: number, directa: String, decimales: number): void {
    this.proporcionResultado = '';
    this.numberService.getProportion(numeroA, numeroB, numeroC, directa, decimales)
    .subscribe(resultado => {
      this.proporcionResultado = resultado;
      if (this.proporcionResultado && this.proporcionResultado != ''){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.generadoproporcion.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.generadoproporcion.titulo')));
      }
    });
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonProporcion(): void {
    this.proporcionResultado = '';
    this.getProporcion(this.proporcionA, this.proporcionB, this.proporcionC, this.proporcionDirecta ? 'y' : 'n', this.posicionesDecimales);
    document.getElementById('proporcionResultado')?.focus();
  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarProporcion(): void {
    this.proporcionResultado = '';
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.limpiadoproporcion.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.limpiadoproporcion.titulo')));
  }



  /**
   * Invocamos la operacion del servicio para obtener una lista de cod promocionales
   */
  getArea(tipo: String, numeroA: number, numeroB: number, numeroC: number, decimales: number): void {
    this.areaResultado = '';
    this.numberService.getArea(tipo, numeroA, numeroB, numeroC, decimales)
    .subscribe(resultado => {
      this.areaResultado = resultado;
      if (this.areaResultado && this.areaResultado != ''){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.generadoarea.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.generadoarea.titulo')));
      }
    });
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonArea(): void {
    if (this.areaSelectedTipo === ''){
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.errorarea.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.errorarea.titulo')));
      return;
    }
    this.areaResultado = '';
    this.getArea(this.areaSelectedTipo, this.areaA, this.areaB, this.areaC, this.posicionesDecimales);
    document.getElementById('areaResultado')?.focus();
  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarArea(): void {
    this.areaResultado = '';
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.limpiadoarea.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.limpiadoarea.titulo')));
  }

  /**
   *
   * @param nuevoValor Al cambiar de valor en figuras trigonometricas, cambiamos las etiquetas de los campos de valor
   */
  onSelectedFiguraTrigo(nuevoValor: string): void {
    //cambiamos las label de los campos de valor
    switch (nuevoValor) {
      case 'cuadrado':
        this.areaLabelA = this.translate.instant(marker('generadores.jpromocion.numeros.entrada.areaa.labellado'));
        this.areaLabelB = this.translate.instant(marker('generadores.jpromocion.numeros.entrada.areab.label'));
        this.areaLabelC = this.translate.instant(marker('generadores.jpromocion.numeros.entrada.areac.label'));
        break;
      case 'rectangulo':
        this.areaLabelA = this.translate.instant(marker('generadores.jpromocion.numeros.entrada.areaa.labelancho'));
        this.areaLabelB = this.translate.instant(marker('generadores.jpromocion.numeros.entrada.areab.labelalto'));
        this.areaLabelC = this.translate.instant(marker('generadores.jpromocion.numeros.entrada.areac.label'));
        break;
      case 'triangulo':
        this.areaLabelA = this.translate.instant(marker('generadores.jpromocion.numeros.entrada.areaa.labelbase'));
        this.areaLabelB = this.translate.instant(marker('generadores.jpromocion.numeros.entrada.areab.labelaltovertical'));
        this.areaLabelC = this.translate.instant(marker('generadores.jpromocion.numeros.entrada.areac.label'));
        break;
      case 'paralelogramo':
        this.areaLabelA = this.translate.instant(marker('generadores.jpromocion.numeros.entrada.areaa.labelbase'));
        this.areaLabelB = this.translate.instant(marker('generadores.jpromocion.numeros.entrada.areab.labelaltovertical'));
        this.areaLabelC = this.translate.instant(marker('generadores.jpromocion.numeros.entrada.areac.label'));
        break;
      case 'trapezoide':
        this.areaLabelA = this.translate.instant(marker('generadores.jpromocion.numeros.entrada.areaa.labelbasesuperior'));
        this.areaLabelB = this.translate.instant(marker('generadores.jpromocion.numeros.entrada.areab.labelbaseinferior'));
        this.areaLabelC = this.translate.instant(marker('generadores.jpromocion.numeros.entrada.areac.labelaltovertical'));;
        break;
      case 'circulo':
        this.areaLabelA = this.translate.instant(marker('generadores.jpromocion.numeros.entrada.areaa.labelradio'));
        this.areaLabelB = this.translate.instant(marker('generadores.jpromocion.numeros.entrada.areab.label'));
        this.areaLabelC = this.translate.instant(marker('generadores.jpromocion.numeros.entrada.areac.label'));
        break;
      case 'elipse':
        this.areaLabelA = this.translate.instant(marker('generadores.jpromocion.numeros.entrada.areaa.labelejecorto'));
        this.areaLabelB = this.translate.instant(marker('generadores.jpromocion.numeros.entrada.areab.labelejelargo'));
        this.areaLabelC = this.translate.instant(marker('generadores.jpromocion.numeros.entrada.areac.label'));
        break;
      default:
        this.areaLabelA = this.translate.instant(marker('generadores.jpromocion.numeros.entrada.areaa.label'));
        this.areaLabelB = this.translate.instant(marker('generadores.jpromocion.numeros.entrada.areab.label'));
        this.areaLabelC = this.translate.instant(marker('generadores.jpromocion.numeros.entrada.areac.label'));
    }
  }


  /**
   * Invocamos la operacion del servicio para obtener una lista de cod promocionales
   */
  getGradosRadianes(grados: number, decimales: number): void {
    this.gradosResultado = '';
    this.numberService.getDegreesToRadians(grados, decimales)
    .subscribe(resultado => {
      this.gradosResultado = resultado;
      if (this.gradosResultado && this.gradosResultado != ''){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.convertidogrados.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.convertidogrados.titulo')));
      }
    });
  }

  getRadianesGrados(radianes: number, decimales: number): void {
    this.gradosResultado = '';
    this.numberService.getRadiansToDegrees(radianes, decimales)
    .subscribe(resultado => {
      this.gradosResultado = resultado;
      if (this.gradosResultado && this.gradosResultado != ''){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.convertidoradianes.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.convertidoradianes.titulo')));
      }
    });
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGrados(): void {
    this.gradosResultado = '';
    if (this.medidaGrados == 'grados'){
      this.getGradosRadianes(this.gradosValor, this.posicionesDecimales);
    } else{
      this.getRadianesGrados(this.gradosValor, this.posicionesDecimales);
    }

    document.getElementById('gradosResultado')?.focus();
  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarGrados(): void {
    this.gradosResultado = '';
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.limpiadogrados.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.limpiadogrados.titulo')));
  }

  /**
   * Invocamos la operacion del servicio para obtener una lista de cod promocionales
   */
  getBase(numero: String, baseOrigen: number, baseDestino: number): void {
    this.baseResultado = '';
    this.numberService.getBaseConverter(numero, baseOrigen, baseDestino)
    .subscribe(resultado => {
      this.baseResultado = resultado;
      if (this.baseResultado && this.baseResultado != ''){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.convertidobase.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.convertidobase.titulo')));
      }
    });
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonBase(): void {
    this.baseResultado = '';
    this.getBase(this.baseValor, this.baseActual, this.baseNueva);
    document.getElementById('baseResultado')?.focus();
  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarBase(): void {
    this.baseResultado = '';
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.limpiadobase.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.limpiadobase.titulo')));
  }



 /**
   * Invocamos la operacion del servicio para obtener una lista de cod promocionales
   */
 getArabigoRomano(numero: number): void {
    this.arabigoResultado = '';
    this.numberService.getArabicToRoman(numero)
    .subscribe(resultado => {
      this.arabigoResultado = resultado;
      if (this.arabigoResultado && this.arabigoResultado != ''){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.convertidoarabigo.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.convertidoarabigo.titulo')));
      }
    });
  }

  getRomanoArabigo(numero: string): void {
    this.arabigoResultado = '';
    this.numberService.getRomanToArabic(numero)
    .subscribe(resultado => {
      this.arabigoResultado = resultado;
      if (this.arabigoResultado && this.arabigoResultado != ''){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.convertidoromano.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.convertidoromano.titulo')));
      }
    });
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonArabigo(): void {
    this.arabigoResultado = '';
    if (this.arabigoTipo == 'arabigo'){
      let valor = parseInt(this.arabigoValor);
      if (isNaN(valor)){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.errorarabigo.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.errorarabigo.titulo')));
      } else{
        this.getArabigoRomano(parseInt(this.arabigoValor));
      }

    } else{
      this.getRomanoArabigo(this.arabigoValor);
    }

    document.getElementById('arabigoResultado')?.focus();
  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarArabigo(): void {
    this.arabigoResultado = '';
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.limpiadoarabigo.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.numeros.mensajes.limpiadoarabigo.titulo')));
  }







}
