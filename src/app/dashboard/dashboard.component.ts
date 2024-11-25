import { Component, inject, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatRippleModule} from '@angular/material/core';
import { MessagesComponent } from '../shared/components/messages/messages.component';
import {ComprameCafeComponent} from '../shared/components/comprame-cafe/comprame-cafe.component';
import { DatosConexionService } from '../core/services/datos-conexion.service';
import { environment } from '../../environments/environment';
import {BaseGeneraComponent} from '../shared/components/base-genera/base-genera.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatTooltipModule,
    MessagesComponent,
    MatRippleModule,
    ComprameCafeComponent,
    TranslateModule
  ]
})
export class DashboardComponent extends BaseGeneraComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);

  //para el sombreado del matripper
  centered = false;
  disabled = false;
  unbounded = false;
  radius: number = 50;

  apiKey: string = '';
  visibilityApiKey = true;

  mostrarApiUrlPorAsegurar = environment.apiUrl;


  //inyectamos el servicio de datos conexion, para fijar la api-key cuando la rellenen
  private datosConexionService: DatosConexionService = inject(DatosConexionService);


  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );


  override ngOnInit(): void {
    //cargamos la api-key del servicio actual
    this.apiKey = this.datosConexionService.getApiKey();
  }

  /**
   * Evento de cambio del input apiKey. Lo fijamos en el servicio de datos de conexion
   * @param event
   */
  cambioValorApiKey(event: any) {
    this.apiKey = event.target.value;
    this.datosConexionService.setApiKey(this.apiKey);
  }


}
