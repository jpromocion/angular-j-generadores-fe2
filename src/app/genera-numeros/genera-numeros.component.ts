import { Component, OnInit, inject} from '@angular/core';
import {NgFor,NgIf} from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import {MatSnackBar} from '@angular/material/snack-bar';
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
import { ExcelService } from '../excel.service';
import { NumberService } from '../number.service';

@Component({
  selector: 'app-genera-numeros',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTooltipModule, MatCardModule, MatIconModule,
    MatListModule, MatCheckboxModule, MatSlideToggleModule, MatSelectModule, MatButtonToggleModule],
  templateUrl: './genera-numeros.component.html',
  styleUrl: './genera-numeros.component.scss'
})
export class GeneraNumerosComponent implements OnInit {
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
    {valor: '', nombre: 'Seleccionar un tipo de figura.'},
    {valor: 'cuadrado', nombre: 'Cuadrado'},
    {valor: 'rectangulo', nombre: 'Rectángulo'},
    {valor: 'triangulo', nombre: 'Triángulo'},
    {valor: 'paralelogramo', nombre: 'Paralelogramo'},
    {valor: 'trapezoide', nombre: 'Trapezoide'},
    {valor: 'circulo', nombre: 'Círculo'},
    {valor: 'elipse', nombre: 'Elipse'}
  ];
  areaA: number = 0;
  areaB: number = 0;
  areaC: number = 0;
  areaLabelA: string = 'Valor A';
  areaLabelB: string = 'Valor B';
  areaLabelC: string = 'Valor C';
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


  //inyeccion de dependencia para utilizar el servicio de clipboard
  private clipboard: Clipboard = inject(Clipboard);

  //inyeccion de dependencia para utilizar el servicio de generacion de numeros
  private numberService: NumberService = inject(NumberService);

  //inyeccion del servicio para generar excel
  private excelService: ExcelService = inject(ExcelService);

  //mensajes notificaciones
  private _snackBar = inject(MatSnackBar);


  constructor() { }

  ngOnInit(): void {

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
   * Invocamos la operacion del servicio para obtener una lista de cod promocionales
   */
  getAleatorios(resultados: number, minimo: number, maximo: number, decimales: String, repetidos: String): void {
    this.numberService.getRandom(resultados, minimo, maximo, decimales, repetidos)
    .subscribe(cadena => {
      this.aleatorioGenerado = cadena;
      if (this.aleatorioGenerado && this.aleatorioGenerado.length > 0){
        this.openSnackBar('Num. aleatorios generados', 'GenerarNumAleatorios');
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
    this.openSnackBar('Números aleatorios limpiados', 'LimpiarNumAleatorios');
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonAleatorios(): void {
    const formatted = this.aleatorioGenerado.map(dato => ({ Numero: dato }));
    this.excelService.exportAsExcelFile(formatted, 'Lista_NumAleatorios');
    this.openSnackBar('Excel generado','ExcelNumAleatorios');
  }


  /**
   * Invocamos la operacion del servicio para obtener una lista de cod promocionales
   */
  getMoneda(resultados: number, simboloCara: String = '', simboloCruz: String = ''): void {
    this.numberService.getCoin(resultados, simboloCara, simboloCruz)
    .subscribe(cadena => {
      this.monedaGenerado = cadena;
      if (this.monedaGenerado && this.monedaGenerado.length > 0){
        this.openSnackBar('Lanzamientos moneda generados', 'GenerarLanzaMoneda');
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
    this.openSnackBar('Lanzamientos moneda limpiados', 'LimpiarLanzaMoneda');
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonMoneda(): void {
    const formatted = this.monedaGenerado.map(dato => ({ CaraCruz: dato }));
    this.excelService.exportAsExcelFile(formatted, 'Lista_LanzaMoneda');
    this.openSnackBar('Excel generado','ExcelLanzaMoneda');
  }



  /**
   * Invocamos la operacion del servicio para obtener una lista de cod promocionales
   */
  getDado(resultados: number): void {
    this.numberService.getDice(resultados)
    .subscribe(cadena => {
      this.dadoGenerado = cadena;
      if (this.dadoGenerado && this.dadoGenerado.length > 0){
        this.openSnackBar('Lanzamientos Dado generados', 'GenerarLanzaDado');
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
    this.openSnackBar('Lanzamientos Dado limpiados', 'LimpiarLanzaDado');
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonDado(): void {
    const formatted = this.dadoGenerado.map(dato => ({ Dado: dato }));
    this.excelService.exportAsExcelFile(formatted, 'Lista_LanzaDado');
    this.openSnackBar('Excel generado','ExcelLanzaDado');
  }





  /**
   * Invocamos la operacion del servicio para obtener una lista de aleatorios gaussiano
   */
  getGaussiano(resultados: number, media: number, desviacion: number, decimales: number): void {
    this.numberService.getGauss(resultados, media, desviacion, decimales)
    .subscribe(cadena => {
      this.gaussianoGenerado = cadena;
      if (this.gaussianoGenerado && this.gaussianoGenerado.length > 0){
        this.openSnackBar('Num. Gaussiano generados', 'GenerarNumGaussiano');
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
    this.openSnackBar('Números Gaussiano limpiados', 'LimpiarNumGaussiano');
  }

  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonGaussiano(): void {
    const formatted = this.gaussianoGenerado.map(dato => ({ Numero: dato }));
    this.excelService.exportAsExcelFile(formatted, 'Lista_NumGaussiano');
    this.openSnackBar('Excel generado','ExcelNumGaussiano');
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
        this.openSnackBar('Operación calculada', 'Calculado');
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
        this.openSnackBar('No hay operador', 'No,no,no');
      } else if (this.calculadoraOperando1 === undefined) {
        this.openSnackBar('Operando 1 no está definido', 'No,no,no');
      } else {
        //rellenamos el calculadoraOperando2 con la parte de la pantalla que hay tras el operador
        this.calculadoraOperando2 = parseFloat(this.calculadoraPantalla.substring(this.calculadoraPantalla.indexOf(this.calculadoraOperacion) + this.calculadoraOperacion.length).replace(',', '.'));
        this.getCalcularadora(this.transformarOperando(this.calculadoraOperacion), this.calculadoraOperando1, this.calculadoraOperando2, this.posicionesDecimales);
      }
    } else{
      //Cualquier otro caso es un operador.
      //No podemos pulsar un operador si ya se registro otro, la calculadora es para hacer una operacion por vez!!!!
      if (this.calculadoraOperacion && this.calculadoraOperacion != ''){
        this.openSnackBar('Ya hay un operador, calcule primero', 'No,no,no');
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
        this.openSnackBar('Proporción calculada', 'ProporcionCalculada');
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
    this.openSnackBar('Cálculo proporcion limpiado', 'LimpiarProporcion');
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
        this.openSnackBar('Área calculada', 'AreaCalculada');
      }
    });
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonArea(): void {
    if (this.areaSelectedTipo === ''){
      this.openSnackBar('Selecciona un tipo de figura', 'Error');
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
    this.openSnackBar('Cálculo área limpiado', 'LimpiarArea');
  }

  /**
   *
   * @param nuevoValor Al cambiar de valor en figuras trigonometricas, cambiamos las etiquetas de los campos de valor
   */
  onSelectedFiguraTrigo(nuevoValor: string): void {
    //cambiamos las label de los campos de valor
    switch (nuevoValor) {
      case 'cuadrado':
        this.areaLabelA = 'Longitud de lado';
        this.areaLabelB = 'Valor B';
        this.areaLabelC = 'Valor C';
        break;
      case 'rectangulo':
        this.areaLabelA = 'Ancho';
        this.areaLabelB = 'Alto';
        this.areaLabelC = 'Valor C';
        break;
      case 'triangulo':
        this.areaLabelA = 'Base';
        this.areaLabelB = 'Altura vertical';
        this.areaLabelC = 'Valor C';
        break;
      case 'paralelogramo':
        this.areaLabelA = 'Base';
        this.areaLabelB = 'Altura vertical';
        this.areaLabelC = 'Valor C';
        break;
      case 'trapezoide':
        this.areaLabelA = 'Base superior (corta/menor)';
        this.areaLabelB = 'Base inferior (larga/mayor)';
        this.areaLabelC = 'Altura vertical';
        break;
      case 'circulo':
        this.areaLabelA = 'Radio';
        this.areaLabelB = 'Valor B';
        this.areaLabelC = 'Valor C';
        break;
      case 'elipse':
        this.areaLabelA = 'Eje corto/menor (similar al radio)';
        this.areaLabelB = 'Eje largo/mayor (similar al radio)';
        this.areaLabelC = 'Valor C';
        break;
      default:
        this.areaLabelA = 'Valor A';
        this.areaLabelB = 'Valor B';
        this.areaLabelC = 'Valor C';
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
        this.openSnackBar('Conversión grados-radianes realizada', 'ConvGraRad');
      }
    });
  }

  getRadianesGrados(radianes: number, decimales: number): void {
    this.gradosResultado = '';
    this.numberService.getRadiansToDegrees(radianes, decimales)
    .subscribe(resultado => {
      this.gradosResultado = resultado;
      if (this.gradosResultado && this.gradosResultado != ''){
        this.openSnackBar('Conversión radianes-grados realizada', 'ConvRadGra');
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
    this.openSnackBar('Conversión grados-radianes limpiada', 'LimpiarConvGraRad');
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
        this.openSnackBar('Conversión base', 'ConvBase');
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
    this.openSnackBar('Conversión base limpiado', 'LimpiarConvBase');
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
        this.openSnackBar('Conversión arábigo-romano realizada', 'ConvAraRom');
      }
    });
  }

  getRomanoArabigo(numero: string): void {
    this.arabigoResultado = '';
    this.numberService.getRomanToArabic(numero)
    .subscribe(resultado => {
      this.arabigoResultado = resultado;
      if (this.arabigoResultado && this.arabigoResultado != ''){
        this.openSnackBar('Conversión romano-arábigo realizada', 'ConvRomAra');
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
        this.openSnackBar('Valor arábigo no válido', 'Error');
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
    this.openSnackBar('Conversión arábigo-romano limpiada', 'LimpiarConvAraRom');
  }







}
