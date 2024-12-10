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
import { BarcodesService } from '../core/services/barcodes.service';
import { TranslateModule } from '@ngx-translate/core';
import { marker} from '@colsen1991/ngx-translate-extract-marker';

@Component({
    selector: 'app-genera-barras',
    imports: [NgIf, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTooltipModule, MatCardModule, MatIconModule,
        MatListModule, MatCheckboxModule, MatSlideToggleModule, MatSelectModule, MatButtonToggleModule, MatRadioModule,
        TranslateModule],
    templateUrl: './genera-barras.component.html',
    styleUrl: './genera-barras.component.scss'
})
export class GeneraBarrasComponent extends BaseGeneraComponent implements OnInit {

  ancho: number | undefined;
  alto: number | undefined;

  //upc A
  imagenUpcA: string = '';
  upcABarcode: string = '';

  //upc E
  imagenUpcE: string = '';
  upcEBarcode: string = '';

  //EAN-13
  imagenEan: string = '';
  eanBarcode: string = '';

  //Code 128
  imagenCode128: string = '';
  code128Barcode: string = '';

  //PDF 147
  imagenPdf147: string = '';
  pdf147Barcode: string = '';

  //QR
  imagenQr: string = '';
  qrBarcode: string = '';
  qrTextoTop: string = '';
  qrTextoBottom: string = '';

  //inyeccion de dependencia para utilizar el servicio de generacion de numeros
  private barcodesService: BarcodesService = inject(BarcodesService);


  constructor() {
    super();
  }

  override ngOnInit(): void {

  }

  /**
   * Invocamos la operacion del servicio para obtener un codigo de barras
   */
  getUpcA(barcode: string, ancho?: number, alto?: number): void {
      this.barcodesService.getUpca(barcode, ancho, alto)
      .subscribe(imagen => {
        if (imagen.size > 0) {
          this.imagenUpcA = URL.createObjectURL(imagen);
        } else{
          this.imagenUpcA = '';
        }
        if (this.imagenUpcA != '') {
          this.openSnackBar(
            this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.generadoupca.mensaje')),
            this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.generadoupca.titulo')));
        }
      });
    }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGenerarUpcA(): void {
    this.imagenUpcA = '';
    //comprobamos que upcABarcode sean solo numeros y de tamaño 12 o 11
    if ((this.upcABarcode.length != 12 && this.upcABarcode.length != 11) || isNaN(Number(this.upcABarcode))) {
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.errorupcatamano.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.errorupcatamano.titulo')));
      return;
    } else{
      this.getUpcA(this.upcABarcode, this.ancho, this.alto);
    }


  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarUpcA(): void {
    this.imagenUpcA = '';
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.limpiadooupca.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.limpiadooupca.titulo')));
  }

  /**
   * Invocamos la operacion del servicio para obtener un codigo de barras
   */
  getUpcE(barcode: string, ancho?: number, alto?: number): void {
    this.barcodesService.getUpcE(barcode, ancho, alto)
    .subscribe(imagen => {
      if (imagen.size > 0) {
        this.imagenUpcE = URL.createObjectURL(imagen);
      } else{
        this.imagenUpcE = '';
      }
      if (this.imagenUpcE != '') {
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.generadoupce.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.generadoupce.titulo')));
      }
    });
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGenerarUpcE(): void {
    this.imagenUpcE = '';
    //comprobamos que upcEBarcode sean solo numeros y de tamaño 8
    if (this.upcEBarcode.length != 8 || isNaN(Number(this.upcEBarcode))) {
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.errorupcetamano.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.errorupcetamano.titulo')));
      return;
    } else{
      this.getUpcE(this.upcEBarcode, this.ancho, this.alto);
    }
  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarUpcE(): void {
    this.imagenUpcE = '';
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.limpiadooupce.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.limpiadooupce.titulo')));
  }


  /**
   * Invocamos la operacion del servicio para obtener un codigo de barras
   */
  getEan(barcode: string, ancho?: number, alto?: number): void {
    this.barcodesService.getEan13(barcode, ancho, alto)
    .subscribe(imagen => {
      if (imagen.size > 0) {
        this.imagenEan = URL.createObjectURL(imagen);
      } else{
        this.imagenEan = '';
      }
      if (this.imagenEan != '') {
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.generadoean13.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.generadoean13.titulo')));
      }
    });
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGenerarEan(): void {
    this.imagenEan = '';
    //comprobamos que EanBarcode sean solo numeros y de tamaño 13
    if (this.eanBarcode.length != 13 || isNaN(Number(this.eanBarcode))) {
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.errorean13tamano.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.errorean13tamano.titulo')));
      return;
    } else{
      this.getEan(this.eanBarcode, this.ancho, this.alto);
    }
  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarEan(): void {
    this.imagenEan = '';
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.limpiadooean13.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.limpiadooean13.titulo')));
  }




  /**
   * Invocamos la operacion del servicio para obtener un codigo de barras
   */
  getCode128(barcode: string, ancho?: number, alto?: number): void {
    this.barcodesService.postCode128(barcode, ancho, alto)
    .subscribe(imagen => {
      if (imagen.size > 0) {
        this.imagenCode128 = URL.createObjectURL(imagen);
      } else{
        this.imagenCode128 = '';
      }
      if (this.imagenCode128 != '') {
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.generadocode128.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.generadocode128.titulo')));
      }
    });
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGenerarCode128(): void {
    this.imagenCode128 = '';
    //comprobamos que Code128Barcode tamaño máximo de 80
    if (this.code128Barcode.length > 80) {
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.errorcode128tamano.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.errorcode128tamano.titulo')));
      return;
    } else{
      this.getCode128(this.code128Barcode, this.ancho, this.alto);
    }
  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarCode128(): void {
    this.imagenCode128 = '';
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.limpiadoocode128.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.limpiadoocode128.titulo')));
  }



  /**
   * Invocamos la operacion del servicio para obtener un codigo de barras
   */
  getPdf147(barcode: string, ancho?: number, alto?: number): void {
    this.barcodesService.postPdf417(barcode, ancho, alto)
    .subscribe(imagen => {
      if (imagen.size > 0) {
        this.imagenPdf147 = URL.createObjectURL(imagen);
      } else{
        this.imagenPdf147 = '';
      }
      if (this.imagenPdf147 != '') {
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.generadopdf147.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.generadopdf147.titulo')));
      }
    });
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGenerarPdf147(): void {
    this.imagenPdf147 = '';

    //comprobamos que tenga algo
    if (this.pdf147Barcode.length <= 0) {
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.errorpdf147tamano.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.errorpdf147tamano.titulo')));
      return;
    } else{
      this.getPdf147(this.pdf147Barcode, this.ancho, this.alto);
    }

  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarPdf147(): void {
    this.imagenPdf147 = '';
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.limpiadoopdf147.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.limpiadoopdf147.titulo')));
  }




  /**
   * Invocamos la operacion del servicio para obtener un codigo qr
   */
  getQr(barcode: string, ancho?: number, alto?: number, textoSup?: string, textoInfe?:string): void {
    this.barcodesService.postQrcode(barcode, ancho, alto,textoSup,textoInfe)
    .subscribe(imagen => {
      if (imagen.size > 0) {
        this.imagenQr = URL.createObjectURL(imagen);
      } else{
        this.imagenQr = '';
      }
      if (this.imagenQr != '') {
        this.openSnackBar(
          this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.generadoqr.mensaje')),
          this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.generadoqr.titulo')));
      }
    });
  }

  /**
  * Generamos un tipo seleccionado aleatorio
  */
  onClickBotonGenerarQr(): void {
    this.imagenQr = '';
    //comprobamos que tenga algo
    if (this.qrBarcode.length <= 0) {
      this.openSnackBar(
        this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.errorqrtamano.mensaje')),
        this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.errorqrtamano.titulo')));
      return;
    } else{
      this.getQr(this.qrBarcode, this.ancho, this.alto, this.qrTextoTop, this.qrTextoBottom);
    }

  }

  /**
    * Limpiar el campo de tipo generado
    */
  onClickLimpiarQr(): void {
    this.imagenQr = '';
    this.openSnackBar(
      this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.limpiadoqr.mensaje')),
      this.translate.instant(marker('generadores.jpromocion.qrbarras.mensajes.limpiadoqr.titulo')));
  }

}
