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
import { ColorPickerModule } from 'ngx-color-picker';
import {MatSliderModule} from '@angular/material/slider';
import {BaseGeneraComponent} from '../shared/components/base-genera/base-genera.component';
import { ColorService } from '../core/services/color.service';
import { Color } from '../core/models/color';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-genera-colores',
  standalone: true,
  imports: [FormsModule, NgIf,MatIconModule,MatButtonModule,MatCardModule,MatTooltipModule,MatGridListModule,MatInputModule,MatSelectModule,MatFormFieldModule,MatListModule,
    ColorPickerModule,MatSliderModule,TranslateModule],
  templateUrl: './genera-colores.component.html',
  styleUrl: './genera-colores.component.scss'
})
export class GeneraColoresComponent extends BaseGeneraComponent implements OnInit {

  //selector color
  colorSele: string = '';
  colorSeleRgb: string = '';
  colorSele2: string = '';

  //generar aleatorio
  color: string = '';
  colorObj: Color | undefined;

  //conversor hex a rgb
  convertHexaParam: string = '';
  convertHexaRgb: string = '';

  //conversor rgb a hex
  convertRgbRojoParam: number | undefined;
  convertRgbVerdeParam: number | undefined;
  convertRgbAzulParam: number | undefined;
  convertRgbHexa: string = '';

  //aclarar
  colorAclarado: string = '';
  aclaraColorCantidad: number = 50;

  //oscrecer
  colorOscurecido: string = '';
  oscureceColorCantidad: number = 50;

  //matiz/saturar/brillo
  colorTransformado: string = '';
  matizColorCantidad: number = 0;
  saturaColorCantidad: number = 0;
  brilloColorCantidad: number = 50;

  //invertir
  colorInvertir: string = '';

  //alpha
  colorAlpha: Color | undefined;
  colorAlphaHex: string = '';
  alphaColorCantidad: number = 100;

  //mezclar colores
  mezclaColorCantidad: number = 50;
  colorMezclado: string = '';

  //gradiente
  gradienteCantidad: number = 32;
  listaGradiente: Color[] = [];

  //monocromatico
  monocromaticoCantidad: number = 32;
  listaMonocromaticos: Color[] = [];


  //inyeccion de dependencia para utilizar el servicio de generacion de datos bancarios
  private colorService: ColorService = inject(ColorService);



  constructor() {
    super();
  }

  override ngOnInit(): void {
    this.colorSele = '#ffffff';
    this.getHexToRgbSele(this.colorSele);
    this.colorSele2 = '#000000';
  }




  /**
   * Invocamos la operacion del servicio para obtener conversion de hex a rgb
   */
  getHexToRgbSele(hexadecimal: string): void {
    this.colorSeleRgb = '';
    this.colorService.getHexToRgb(hexadecimal)
    .subscribe(resultado => {
      this.colorSeleRgb = resultado;
    });
  }


  /**
   * Evento de seleccion de color
   */
  seleccionarColor( color: string): void {
    this.colorSele = color;
    this.colorSeleRgb = '';
    this.getHexToRgbSele(this.colorSele);

  }

  /**
   * Invocamos la operacion del servicio para obtener un Ccor
   */
  getColor(resultados: number): void {
    this.colorService.getColor(1)
    .subscribe(colorGen => {
      if (colorGen && colorGen[0]){
        this.color = colorGen[0].hex;
        this.colorObj = colorGen[0];
        this.openSnackBar('Color generado', 'GenerarColor');
      }
    });
  }




  /**
   * Generamos un color aleatorio
   */
  onClickBotonGenerarColor(): void {
    this.color = '';
    this.colorObj = undefined;
    this.getColor(1);
  }

  /**
  * Limpiar color
  * @deprecated
  */
  onClickLimpiarColor(): void {
    this.color = '';
    this.colorObj = undefined;
  }

  getColorRgb(color: Color): string {
    if (color){
      return 'rgb(' + color.red + ',' + color.green + ',' + color.blue + ')';
    } else {
      return '';
    }
  }


  /**
   * Invocamos la operacion del servicio para obtener conversion de hex a rgb
   */
  getHexToRgb(hexadecimal: string): void {
    this.convertHexaRgb = '';
    this.colorService.getHexToRgb(hexadecimal)
    .subscribe(resultado => {
      this.convertHexaRgb = resultado;
      if (this.convertHexaRgb && this.convertHexaRgb != ''){
        this.openSnackBar('Conversión hexa-RGB realizada', 'ConvHexRGB');
      }
    });
  }

  /**
  * Convertir un color hexadecimal a RGB
  */
  onClickBotonConvertirHexaRGB(): void {
    this.convertHexaRgb = '';
    if (this.convertHexaParam === ''){
      this.openSnackBar('Introduzca un valor hexadecimal', 'ErrorConvHexRGB');
      return;
    }
    this.getHexToRgb(this.convertHexaParam);

    document.getElementById('convertHexaRgb')?.focus();
  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarConvertirHexaRGB(): void {
    this.convertHexaRgb = '';
    this.openSnackBar('Conversión hexa-RGB limpiada', 'LimpiarConvHexRGB');
  }



 /**
   * Invocamos la operacion del servicio para obtener conversion de hex a rgb
   */
 getRgbToHex(rojo: number, verde: number, azul:number): void {
    this.convertRgbHexa = '';
    this.colorService.getRgbToHex(rojo, verde, azul)
    .subscribe(resultado => {
      this.convertRgbHexa = resultado;
      if (this.convertRgbHexa && this.convertRgbHexa != ''){
        this.openSnackBar('Conversión RGB-hexa realizada', 'ConvRGBHex');
      }
    });
  }

  /**
  * Convertir un color hexadecimal a RGB
  */
  onClickBotonConvertirRGBHexa(): void {
    this.convertRgbHexa = '';
    if (this.convertRgbRojoParam === undefined || this.convertRgbVerdeParam === undefined || this.convertRgbAzulParam === undefined){
      this.openSnackBar('Introduzca los 3 valores de colores RGB', 'ErrorConvRGBHex');
      return;
    }
    this.getRgbToHex(this.convertRgbRojoParam, this.convertRgbVerdeParam, this.convertRgbAzulParam);

    document.getElementById('convertRgbHexa')?.focus();
  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarConvertirRGBHexa(): void {
    this.convertRgbHexa = '';
    this.openSnackBar('Conversión RGB-hexa limpiada', 'LimpiarConvRGBHex');
  }




  /**
   * Invocamos la operacion del servicio para obtener conversion de hex a rgb
   */
  getLighten(hexadecimal: string, cantidad: number): void {
    this.colorAclarado = '';
    this.colorService.getLighten(hexadecimal, cantidad)
    .subscribe(resultado => {
      this.colorAclarado = resultado;
      if (this.colorAclarado && this.colorAclarado != ''){
        this.openSnackBar('Color aclarado', 'AclararColor');
      }
    });
  }

  /**
  * Convertir un color hexadecimal a RGB
  */
  onClickBotonAclararColor(): void {
    this.colorAclarado = '';
    if (this.colorSele === ''){
      this.openSnackBar('Seleccione color origen', 'ErrorAclarar');
      return;
    }
    this.getLighten(this.colorSele,this.aclaraColorCantidad);

    document.getElementById('btColorAclarado')?.focus();
  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarAclararColor(): void {
    this.colorAclarado = '';
    this.openSnackBar('Aclarar color limpiado', 'LimpiarAclarar');
  }




  /**
   * Invocamos la operacion del servicio para obtener conversion de hex a rgb
   */
  getDarken(hexadecimal: string, cantidad: number): void {
    this.colorOscurecido = '';
    this.colorService.getDarken(hexadecimal, cantidad)
    .subscribe(resultado => {
      this.colorOscurecido = resultado;
      if (this.colorOscurecido && this.colorOscurecido != ''){
        this.openSnackBar('Color oscurecido', 'OscurecerColor');
      }
    });
  }

  /**
  * Convertir un color hexadecimal a RGB
  */
  onClickBotonOscurecerColor(): void {
    this.colorOscurecido = '';
    if (this.colorSele === ''){
      this.openSnackBar('Seleccione color origen', 'ErrorOscurecer');
      return;
    }
    this.getDarken(this.colorSele,this.oscureceColorCantidad);

    document.getElementById('btColorOscurecido')?.focus();
  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarOscurecerColor(): void {
    this.colorOscurecido = '';
    this.openSnackBar('Oscurecer color limpiado', 'LimpiarOscurecer');
  }



  /**
   * transformar por matiz/saturacion/brillo un color
   */
  getTransformarColor(hexadecimal: string, matiz: number, saturacion: number, brillo: number): void {
    this.colorService.getHue(hexadecimal, matiz)
    .subscribe(resultado => {
      this.colorTransformado = resultado;
      if (this.colorTransformado && this.colorTransformado != ''){

        this.colorService.getSaturate(hexadecimal, saturacion)
        .subscribe(resultado => {
          this.colorTransformado = resultado;
          if (this.colorTransformado && this.colorTransformado != ''){

            this.colorService.getBrightness(hexadecimal, brillo)
            .subscribe(resultado => {
              this.colorTransformado = resultado;
              if (this.colorTransformado && this.colorTransformado != ''){
                this.openSnackBar('Color transformado', 'TransformarColor');
              }
            });

          }
        });

      }
    });
  }

  /**
  * Transformar un color
  */
  onClickBotonTransformarColor(): void {
    this.colorTransformado = '';
    if (this.colorSele === ''){
      this.openSnackBar('Seleccione color origen', 'ErrorTransformar');
      return;
    }
    this.getTransformarColor(this.colorSele,this.matizColorCantidad, this.saturaColorCantidad, this.brilloColorCantidad);

    document.getElementById('btcolorTransformado')?.focus();
  }

  /**
    * Limpiar el campo de transformado
    */
  onClickLimpiarTransformarColor(): void {
    this.colorTransformado = '';
    this.openSnackBar('Color transformado limpiado', 'LimpiarTransformar');
  }






  /**
   * Invocamos la operacion del servicio para obtener conversion de hex a rgb
   */
  getInvert(hexadecimal: string): void {
    this.colorInvertir = '';
    this.colorService.getInvert(hexadecimal)
    .subscribe(resultado => {
      this.colorInvertir = resultado;
      if (this.colorInvertir && this.colorInvertir != ''){
        this.openSnackBar('Color invertido', 'InvertirColor');
      }
    });
  }

  /**
  * Convertir un color hexadecimal a RGB
  */
  onClickBotonInvertirColor(): void {
    this.colorInvertir = '';
    if (this.colorSele === ''){
      this.openSnackBar('Seleccione color origen', 'ErrorInvertir');
      return;
    }
    this.getInvert(this.colorSele);

    document.getElementById('btcolorInvertir')?.focus();
  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarInvertirColor(): void {
    this.colorInvertir = '';
    this.openSnackBar('Color invertido limpiado', 'LimpiarInvertir');
  }




  /**
   * Invocamos la operacion del servicio para color alpha
   */
  getAlpha(hexadecimal: string, alpha: number): void {
    this.colorService.getAlpha(hexadecimal, alpha)
    .subscribe(colorGen => {
      if (colorGen){
        this.colorAlphaHex = colorGen.hex;
        this.colorAlpha = colorGen;
        this.openSnackBar('Color alpha', 'AlphaColor');
      }
    });
  }

  /**
  * Convertir un color hexadecimal a RGB
  */
  onClickBotonAlphaColor(): void {
    this.colorAlpha = undefined;
    this.colorAlphaHex = '';
    if (this.colorSele === ''){
      this.openSnackBar('Seleccione color origen', 'ErrorAlpha');
      return;
    }
    this.getAlpha(this.colorSele,this.alphaColorCantidad);

    document.getElementById('btcolorAlphaHex')?.focus();
  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarAlphaColor(): void {
    this.colorAlpha = undefined;
    this.colorAlphaHex = '';
    this.openSnackBar('Color alpha limpiado', 'LimpiarAlpha');
  }


  /**
   * Invocamos la operacion del servicio para obtener conversion de hex a rgb
   */
  getMix(hexadecimal1: string, hexadecimal2: string, porcentaje: number): void {
    this.colorMezclado = '';
    this.colorService.getMix(hexadecimal1, hexadecimal2, porcentaje)
    .subscribe(resultado => {
      this.colorMezclado = resultado;
      if (this.colorMezclado && this.colorMezclado != ''){
        this.openSnackBar('Colores mezclados', 'MezclarColor');
      }
    });
  }

  /**
  * Convertir un color hexadecimal a RGB
  */
  onClickBotonMezclarColor(): void {
    this.colorMezclado = '';
    if (this.colorSele === ''){
      this.openSnackBar('Seleccione color 1', 'ErrorMezclar');
      return;
    } else if (this.colorSele2 === ''){
      this.openSnackBar('Seleccione color 2', 'ErrorMezclar');
      return;
    }
    this.getMix(this.colorSele, this.colorSele2, this.mezclaColorCantidad);

    document.getElementById('btcolorMezclado')?.focus();
  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarMezclarColor(): void {
    this.colorMezclado = '';
    this.openSnackBar('Color invertido limpiado', 'LimpiarMezclar');
  }




  /**
   * Invocamos la operacion del servicio para obtener una lista de ibans aleatorios
   */
  getGradiente(hexadecimal1: string, hexadecimal2: string, numberOfGradients: number): void {
      this.colorService.getGradient(hexadecimal1, hexadecimal2, numberOfGradients)
      .subscribe(gradientes => {
        this.listaGradiente = gradientes;
        if (this.listaGradiente && this.listaGradiente.length > 0) {
          this.openSnackBar('Lista gradientes generados', 'GenerarGradiente');
        }
      });
  }



  /**
   * Generamos una lista ibans aleatorio
   */
  onClickBotonGradienteColor(): void {
    this.listaGradiente = [];
    if (this.colorSele === ''){
      this.openSnackBar('Seleccione color 1', 'ErrorGradiente');
      return;
    } else if (this.colorSele2 === ''){
      this.openSnackBar('Seleccione color 2', 'ErrorGradiente');
      return;
    }
    this.getGradiente(this.colorSele, this.colorSele2, this.gradienteCantidad);
  }


  /**
   * Limpiar la lista de iban generados
   */
  onClickLimpiarGradienteColor(): void {
    this.listaGradiente = [];
    this.openSnackBar('Gradiente limpiado', 'LimpiarGradiente');
  }

  /**
   * Exportar la lista de gradientes generados a excel
   */
  exportJsonGradiente(): void {
    const filteredIbanList = this.listaGradiente.map(({ hex }) => ({ hex }));
    this.excelService.exportAsExcelFile(filteredIbanList, 'Lista_Gradiente');
    this.openSnackBar('Excel generado','ExcelGradiente');
  }






  /**
   * Invocamos la operacion del servicio para obtener una lista de ibans aleatorios
   */
  getMonochrome(hexadecimal: string, numberOfColors: number): void {
    this.colorService.getMonochrome(hexadecimal, numberOfColors)
    .subscribe(monos => {
      this.listaMonocromaticos = monos;
      if (this.listaMonocromaticos && this.listaMonocromaticos.length > 0) {
        this.openSnackBar('Lista monocromáticos generados', 'GenerarMonocromatico');
      }
    });
  }



  /**
  * Generamos una lista ibans aleatorio
  */
  onClickBotonMonocromaticoColor(): void {
    this.listaMonocromaticos = [];
    if (this.colorSele === ''){
      this.openSnackBar('Seleccione color 1', 'ErrorMonocromatico');
      return;
    }
    this.getMonochrome(this.colorSele, this.monocromaticoCantidad);
  }


  /**
  * Limpiar la lista de iban generados
  */
  onClickLimpiarMonocromaticoColor(): void {
    this.listaMonocromaticos = [];
    this.openSnackBar('Monocromático limpiado', 'LimpiarMonocromatico');
  }

  /**
  * Exportar la lista de gradientes generados a excel
  */
  exportJsonMonocromatico(): void {
    const filteredIbanList = this.listaMonocromaticos.map(({ hex }) => ({ hex }));
    this.excelService.exportAsExcelFile(filteredIbanList, 'Lista_Monocromatico');
    this.openSnackBar('Excel generado','ExcelMonocromatico');
  }




}
