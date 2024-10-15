import { Component, inject, OnInit, ViewChild  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MenuComponent}  from './shared/components/menu/menu.component';
import { DatosConexionService } from './core/services/datos-conexion.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angular-j-generadores-fe2';

  //inyectamos el servicio de datos conexion, para fijar la api-key cuando la rellenen
  private datosConexionService: DatosConexionService = inject(DatosConexionService);


  ngOnInit(): void {

  }

}
