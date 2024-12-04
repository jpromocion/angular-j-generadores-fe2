import { Component, inject, OnInit } from '@angular/core';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
//https://stackoverflow.com/questions/49720908/angular-material-matdatepicker-no-provider-found-for-dateadapter
import {MatNativeDateModule} from '@angular/material/core';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';
import {BaseGeneraComponent} from '../shared/components/base-genera/base-genera.component';
import { DateService } from '../core/services/date.service';
import { Edad } from '../core/models/edad';
import { Pascua } from '../core/models/pascua';
import { TranslateModule } from '@ngx-translate/core';
import { marker} from '@colsen1991/ngx-translate-extract-marker';

@Component({
  selector: 'app-genera-fechas',
  standalone: true,
  imports: [FormsModule, NgIf, MatButtonToggleModule,MatIconModule,MatButtonModule,MatTooltipModule,
    MatFormFieldModule,MatInputModule,MatSelectModule,MatListModule,MatCardModule,MatCheckboxModule,MatDatepickerModule,MatNativeDateModule,
    NgxMatTimepickerModule, TranslateModule],
  templateUrl: './genera-fechas.component.html',
  styleUrl: './genera-fechas.component.scss'
})
export class GeneraFechasComponent extends BaseGeneraComponent implements OnInit {

  //filtro tipos generales
  numGenerar: number = 1;
  selectedTipoGenera: string = '';
  tiposGenera: Array<any> = [
    //{valor: '', nombre: 'Seleccionar un tipo de generación.'},
    {valor: 'fn', nombre: 'generadores.jpromocion.generarcomunes.lovs.tiposfecha.valorfn'},
    {valor: 'ff', nombre: 'generadores.jpromocion.generarcomunes.lovs.tiposfecha.valorff'},
  ];
  textoGenerado: string[] = [];

  //fecha naciumiento
  fechaNacimiento: Date = new Date('1984-01-01');
  horaNacimiento: string = '13:00';
  edadRes: Edad | undefined;

  //fecha diferencia
  fechaDifParam1: Date = new Date('1984-01-01');
  fechaDifParam2: Date = new Date();
  horaDifParam1: string = '13:00';
  horaDifParam2: string = '13:00';
  difRes: Edad | undefined;

  //dia de la semana
  fechaDiaSemanaParam: Date = new Date();
  diaSemanaRes: string = '';

  //fecha diferencia
  fechaOperarParam: Date = new Date();
  horaOperarParam: string = '13:00';
  selectedTipoOpera: string = '';
  tiposOpera: Array<any> = [
    //{valor: '', nombre: 'Seleccionar una operación.'},
    {valor: 'sum', nombre: 'generadores.jpromocion.generarcomunes.lovs.operacionfecha.valorsum'},
    {valor: 'res', nombre: 'generadores.jpromocion.generarcomunes.lovs.operacionfecha.valorres'},
  ];
  paramOperaAnyos: number = 0;
  paramOperaMeses: number = 0;
  paramOperaDias: number = 0;
  paramOperaHoras: number = 0;
  paramOperaMinutos: number = 0;
  fechaOperarRes: Date | undefined;
  horaOperarRes: string = '';

  //time unix -> fecha

  paramTimeUnix: number = Math.floor(Date.now() / 1000);
  fechaLocalResTimUnix: Date | undefined;
  horaLocalResTimUnix: string = '';
  fechaUTCResTimUnix: Date | undefined;
  horaUTCResTimUnix: string = '';

  //fecha -> time unix
  paramFechaLocal: Date = new Date();
  paramHoraLocal: string = ('0' + this.paramFechaLocal.getHours()).slice(-2) + ':' + ('0' + this.paramFechaLocal.getMinutes()).slice(-2);
  timeUnixRes: number | undefined;

  //pascua
  pascuaParamEjercicio: number = 2024;
  pascuaRes: Pascua | undefined = undefined;


  //inyeccion de dependencia para utilizar el servicio de generacion de fechas
  private dateService: DateService = inject(DateService);

  constructor() {
    super();
  }

  override ngOnInit(): void {

  }




  /**
   * Invocamos la operacion del servicio para obtener una lista de fechas nacimiento
   */
  getFecNacimiento(resultados: number): void {
    this.dateService.getBirthDate(resultados)
    .subscribe(cadena => {
      this.textoGenerado = cadena;
      if (this.textoGenerado && this.textoGenerado.length > 0){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.generadofecnaci.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.generadofecnaci.titulo')));
      }
    });
  }

  /**
   * Invocamos la operacion del servicio para obtener una lista de fechas futuras
   */
  getFutureDate(resultados: number): void {
    this.dateService.getFutureDate(resultados)
    .subscribe(cadena => {
      this.textoGenerado = cadena;
      if (this.textoGenerado && this.textoGenerado.length > 0){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.generadofecfuturas.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.generadofecfuturas.titulo')));
      }
    });
  }


  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGenerarTipo(): void {
    this.textoGenerado = [];
    if (this.selectedTipoGenera == '') {
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.errorfectipo.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.errorfectipo.titulo')));
    } else if (this.selectedTipoGenera == 'fn') {
      this.getFecNacimiento(this.numGenerar);
    } else if (this.selectedTipoGenera == 'ff') {
      this.getFutureDate(this.numGenerar);
    }

  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarTipo(): void {
    this.textoGenerado = [];
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.limpiadofec.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.limpiadofec.titulo')));
  }


  /**
  * Exportar la lista de tipos generados a excel
  */
  exportJsonTipos(): void {
    const formatted = this.textoGenerado.map(dato => ({ Valor: dato }));
    this.excelService.exportAsExcelFile(formatted, 'Lista_tipos');
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.excelfec.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.excelfec.titulo')));
  }


  /**
   * Invocamos la operacion del servicio para calcular la edad
   */
  getAge(fechaNacimiento: Date): void {
    this.dateService.getAge(fechaNacimiento)
    .subscribe(edad => {
      if (edad){
        this.edadRes = edad;
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.calculadoedad.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.calculadoedad.titulo')));

        //situarnos en el campo resultado final
        const btnResDifFinal = document.getElementById('btnResEdadFinal');
        if (btnResDifFinal) {
          btnResDifFinal.focus();
        }

      }
    });
  }

  /**
   * Se limpia del mapeo de fecha de un DatePicker por si llevara horas, minutos...
   * lo que ocurre cuando inicializamos el DatePicker con una fecha que los lleve
   * pero no al seleccionar, dado que el DatePicker no puede configurarse para esto.
   * @param fecha
   * @returns
   */
  private limpiarHorasMinutos(fecha: Date): Date {
    fecha.setHours(0);
    fecha.setMinutes(0);
    fecha.setSeconds(0);
    fecha.setMilliseconds(0);
    return fecha;
  }


  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonEdad(): void {
    this.edadRes = undefined;
    //console.log('Fecha Nacimiento: ' + this.fechaNacimiento);
    //console.log('Hora Nacimiento: ' + this.horaNacimiento);

    if (this.fechaNacimiento == null){
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.erroredad.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.erroredad.titulo')));
      return;
    } else{
      //limpiar horas y minutos de fechaNacimiento
      this.fechaNacimiento = this.limpiarHorasMinutos(this.fechaNacimiento);

      //fijarle ahora la hora y minutos del picker time
      if (this.horaNacimiento != ''){
        let horaMinutos = this.horaNacimiento.split(':');
        this.fechaNacimiento.setHours(parseInt(horaMinutos[0]));
        this.fechaNacimiento.setMinutes(parseInt(horaMinutos[1]));
      }
      let fechaNueva = new Date(this.fechaNacimiento);
      //console.log('Fecha nueva: ' + fechaNueva);
      this.getAge(fechaNueva);
    }


  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarEdad(): void {
    this.edadRes = undefined;
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.limpiadoedad.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.limpiadoedad.titulo')));
  }



  /**
   * Invocamos la operacion del servicio para calcular la edad
   */
  getDateDiff(fechaInicio: Date, fechaFin: Date): void {
    this.dateService.getDateDiff(fechaInicio, fechaFin)
    .subscribe(diff => {
      if (diff){
        this.difRes = diff;
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.calculadodiff.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.calculadodiff.titulo')));

        //situarnos en el campo resultado final
        const btnResDifFinal = document.getElementById('btnResDifFinal');
        if (btnResDifFinal) {
          btnResDifFinal.focus();
        }

      }
    });
  }


  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonDiferencia(): void {
    this.difRes = undefined;
    // console.log('Fecha 1: ' + this.fechaDifParam1);
    // console.log('Hora 1: ' + this.horaDifParam1);
    // console.log('Fecha 2: ' + this.fechaDifParam2);
    // console.log('Hora 2: ' + this.horaDifParam2);

    if (this.fechaDifParam1 == null){
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.errordiff1.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.errordiff1.titulo')));
      return;
    } else if (this.fechaDifParam2 == null){
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.errordiff2.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.errordiff2.titulo')));
        return;
    } else{
      //limpiar horas y minutos de fechas de diferencia
      this.fechaDifParam1 = this.limpiarHorasMinutos(this.fechaDifParam1);
      this.fechaDifParam2 = this.limpiarHorasMinutos(this.fechaDifParam2);

      //fijarle ahora la hora y minutos del picker time
      if (this.horaDifParam1 != ''){
        let horaMinutos = this.horaDifParam1.split(':');
        this.fechaDifParam1.setHours(parseInt(horaMinutos[0]));
        this.fechaDifParam1.setMinutes(parseInt(horaMinutos[1]));
      }
      let fechaDifParam1Nueva = new Date(this.fechaDifParam1);

      if (this.horaDifParam2 != ''){
        let horaMinutos = this.horaDifParam2.split(':');
        this.fechaDifParam2.setHours(parseInt(horaMinutos[0]));
        this.fechaDifParam2.setMinutes(parseInt(horaMinutos[1]));
      }
      let fechaDifParam2Nueva = new Date(this.fechaDifParam2);

      //console.log('Fecha nueva 1: ' + fechaDifParam1Nueva);
      //console.log('Fecha nueva 2: ' + fechaDifParam2Nueva);
      this.getDateDiff(fechaDifParam1Nueva, fechaDifParam2Nueva);
    }



  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarDiferencia(): void {
    this.difRes = undefined;
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.limpiadodiff.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.limpiadodiff.titulo')));
  }


  /**
   * Invocamos la operacion del servicio para operacion sobre fecha
   */
  getDateoperation(date: Date, operation: String, years: number = 0, months: number = 0, days: number = 0,
    hours: number = 0, minutes: number = 0, seconds: number = 0): void {
    this.dateService.getDateoperation(date, operation, years, months, days, hours, minutes, seconds)
    .subscribe(dateResCad => {
      if (dateResCad && dateResCad != ''){
        const [datePart, timePart] = dateResCad.split(' ');
        const [day, month, year] = datePart.split('/').map(Number);
        const [hours, minutes, seconds] = timePart.split(':').map(Number);
        this.fechaOperarRes = new Date(year, month - 1, day, hours, minutes, seconds);
        this.horaOperarRes = ('0' + this.fechaOperarRes.getHours()).slice(-2) + ':' + ('0' + this.fechaOperarRes.getMinutes()).slice(-2);

        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.calculadoopera.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.calculadoopera.titulo')));

        //situarnos en el campo resultado final
        const in_fechaOperarRes = document.getElementById('in_fechaOperarRes');
        if (in_fechaOperarRes) {
          in_fechaOperarRes.focus();
        }

      }
    });
  }


  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonOperar(): void {
    this.fechaOperarRes = undefined;
    this.horaOperarRes = '';

    if (this.fechaOperarParam == null){
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.erroropera1.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.erroropera1.titulo')));
      return;
    } else if (this.selectedTipoOpera == ''){
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.erroropera2.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.erroropera2.titulo')));
      return;
    } else if (this.paramOperaAnyos == null || this.paramOperaMeses == null || this.paramOperaDias == null ||
      this.paramOperaHoras == null || this.paramOperaMinutos == null){
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.erroropera3.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.erroropera3.titulo')));
    } else{
      //limpiar horas y minutos de fechas de diferencia
      this.fechaOperarParam = this.limpiarHorasMinutos(this.fechaOperarParam);

      //fijarle ahora la hora y minutos del picker time
      if (this.horaOperarParam != ''){
        let horaMinutos = this.horaOperarParam.split(':');
        this.fechaOperarParam.setHours(parseInt(horaMinutos[0]));
        this.fechaOperarParam.setMinutes(parseInt(horaMinutos[1]));
      }
      let fechaOperarParamNueva = new Date(this.fechaOperarParam);

      this.getDateoperation(fechaOperarParamNueva, this.selectedTipoOpera, this.paramOperaAnyos, this.paramOperaMeses,
        this.paramOperaDias, this.paramOperaHoras, this.paramOperaMinutos);
    }



  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarOperar(): void {
    this.fechaOperarRes = undefined;
    this.horaOperarRes = '';
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.limpiadoopera.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.limpiadoopera.titulo')));
  }




  /**
   * Invocamos la operacion del servicio para operacion sobre fecha
   */
  getDayofweek(date: Date): void {
    this.dateService.getDayofweek(date)
    .subscribe(dia => {
      if (dia && dia != ''){
        this.diaSemanaRes = dia;
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.calculadodiasem.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.calculadodiasem.titulo')));

        //situarnos en el campo resultado final
        const in_diaSemanaRes = document.getElementById('in_diaSemanaRes');
        if (in_diaSemanaRes) {
          in_diaSemanaRes.focus();
        }

      }
    });
  }


  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonDiaSemana(): void {
    this.diaSemanaRes = '';

    if (this.fechaDiaSemanaParam == null){
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.errordiasem.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.errordiasem.titulo')));
      return;
    } else{
      this.getDayofweek(this.fechaDiaSemanaParam);
    }



  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarDiaSemana(): void {
    this.diaSemanaRes = '';
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.limpiadodiasem.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.limpiadodiasem.titulo')));
  }




  /**
   * Invocamos la operacion del servicio para calcular la edad
   */
  getUnixtimeToTime(unixTime: number): void {
    this.dateService.getUnixtimeToTime(unixTime)
    .subscribe(matriz => {
      if (matriz){
        //realmente el fechaLocal lleva un String en formato estandar de la fecha, no llega un Date
        this.fechaLocalResTimUnix = new Date(matriz.fechaLocal);
        this.horaLocalResTimUnix = ('0' + this.fechaLocalResTimUnix.getHours()).slice(-2) + ':' + ('0' + this.fechaLocalResTimUnix.getMinutes()).slice(-2);
        this.fechaUTCResTimUnix = new Date(matriz.fechaUTC);
        this.horaUTCResTimUnix = ('0' + this.fechaUTCResTimUnix.getHours()).slice(-2) + ':' + ('0' + this.fechaUTCResTimUnix.getMinutes()).slice(-2);
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.convertidoutc.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.convertidoutc.titulo')));

        //situarnos en el campo resultado final
        const in_fechaLocalResTimUnix = document.getElementById('in_fechaLocalResTimUnix');
        if (in_fechaLocalResTimUnix) {
          in_fechaLocalResTimUnix.focus();
        }

      }
    });
  }


  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonUTCFecha(): void {
    this.fechaLocalResTimUnix = undefined;
    this.horaLocalResTimUnix = '';
    this.fechaUTCResTimUnix = undefined;
    this.horaUTCResTimUnix = '';

    if (this.paramTimeUnix == null){
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.errorutc.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.errorutc.titulo')));
      return;
    } else{
      this.getUnixtimeToTime(this.paramTimeUnix);
    }



  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarUTCFecha(): void {
    this.fechaLocalResTimUnix = undefined;
    this.horaLocalResTimUnix = '';
    this.fechaUTCResTimUnix = undefined;
    this.horaUTCResTimUnix = '';
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.limpiadoutc.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.limpiadoutc.titulo')));
  }




  /**
   * Invocamos la operacion del servicio para calcular la edad
   */
  getTimeToUnixtime(date: Date): void {
    this.dateService.getTimeToUnixtime(date)
    .subscribe(matriz => {
      if (matriz){
        this.timeUnixRes = matriz.tiempoUnixUTC;
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.convertidofecha.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.convertidofecha.titulo')));

        //situarnos en el campo resultado final
        const btnResTimeUnix = document.getElementById('btnResTimeUnix');
        if (btnResTimeUnix) {
          btnResTimeUnix.focus();
        }

      }
    });
  }


  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonFechaUTC(): void {
    this.timeUnixRes = undefined;

    if (this.paramFechaLocal == null){
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.errorfecha.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.errorfecha.titulo')));
      return;
    } else{
      //limpiar horas y minutos
      this.paramFechaLocal = this.limpiarHorasMinutos(this.paramFechaLocal);

      //fijarle ahora la hora y minutos del picker time
      if (this.paramHoraLocal != ''){
        let horaMinutos = this.paramHoraLocal.split(':');
        this.paramFechaLocal.setHours(parseInt(horaMinutos[0]));
        this.paramFechaLocal.setMinutes(parseInt(horaMinutos[1]));
      }
      let fechaNueva = new Date(this.paramFechaLocal);

      this.getTimeToUnixtime(fechaNueva);
    }



  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarFechaUTC(): void {
    this.timeUnixRes = undefined;
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.limpiadofecha.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.limpiadofecha.titulo')));
  }




  /**
   * Invocamos la operacion del servicio para obtener la pascua
   */
  getHolyWeek(year: number): void {
    this.dateService.getHolyWeek(year)
    .subscribe(pascua => {
      if (pascua){
        this.pascuaRes = new Object() as Pascua;
        this.pascuaRes.fechaDomingoRamos = new Date(pascua.fechaDomingoRamos);
        this.pascuaRes.fechaLunesSanto = new Date(pascua.fechaLunesSanto);
        this.pascuaRes.fechaMartesSanto = new Date(pascua.fechaMartesSanto);
        this.pascuaRes.fechaMiercolesSanto = new Date(pascua.fechaMiercolesSanto);
        this.pascuaRes.fechaJuevesSanto = new Date(pascua.fechaJuevesSanto);
        this.pascuaRes.fechaViernesSanto = new Date(pascua.fechaViernesSanto);
        this.pascuaRes.fechaSabadoSanto = new Date(pascua.fechaSabadoSanto);
        this.pascuaRes.fechaDomingoResurreccion = new Date(pascua.fechaDomingoResurreccion);
        this.pascuaRes.fechaLunesPeriodoVacacional = new Date(pascua.fechaLunesPeriodoVacacional);
        this.pascuaRes.fechaDomingoPeriodoVacacional = new Date(pascua.fechaDomingoPeriodoVacacional);

        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.generadopascua.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.generadopascua.titulo')));

        //situarnos en el campo resultado final
        const btnPascuaResDomingoRamos = document.getElementById('btnPascuaResDomingoRamos');
        if (btnPascuaResDomingoRamos) {
          btnPascuaResDomingoRamos.focus();
        }
      }
    });
  }


  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGenerarPascua(): void {
    this.pascuaRes = undefined;
    if (this.pascuaParamEjercicio == null){
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.errorpascua.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.errorpascua.titulo')));
    } else {
      this.getHolyWeek(this.pascuaParamEjercicio);
    }

  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarPascua(): void {
    this.pascuaRes = undefined;
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.limpiadopascua.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.fechas.mensajes.limpiadopascua.titulo')));
  }



}
