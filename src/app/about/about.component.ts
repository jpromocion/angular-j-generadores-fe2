import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { version } from '../../../package.json';
import { DemoService } from '../demo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {

  versionApp = version;

  versionApiRest = '';

  //inyeccion de dependencia para utilizar el servicio de generacion de nifs
  private demoService: DemoService = inject(DemoService);

  ngOnInit(): void {
    this.fijarVersionAPI();

  }


  fijarVersionAPI(): void {
    this.versionApiRest = '';
    this.demoService.getVersion()
    .subscribe(versionReturn => {
      this.versionApiRest = versionReturn;
    });
  }

}
