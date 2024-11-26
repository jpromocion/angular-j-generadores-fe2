import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { version } from '../../../package.json';
import { DemoService } from '../core/services/demo.service';
import {ComprameCafeComponent} from '../shared/components/comprame-cafe/comprame-cafe.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatIconModule, ComprameCafeComponent, TranslateModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {

  versionApp = version;

  versionApiRest = '';

  //inyeccion de dependencia para utilizar el servicio de generacion de nifs
  private demoService: DemoService = inject(DemoService);

  /**
   * INicializar los elementos del card glowes social
   */
  private inicializarCardSocial(): void {
    const shareBtn = document.querySelector(".card-social-share-btn");
    const card1 = document.querySelector(".card-social-card1");
    const card2 = document.querySelector(".card-social-card2");
    const card3 = document.querySelector(".card-social-card3");
    const card4 = document.querySelector(".card-social-card4");


    shareBtn?.addEventListener("click", () => {
        if (card1?.getAttribute("data-toggle1") === "true") {
            card1.setAttribute("data-toggle1", 'false');
            card2?.setAttribute("data-toggle2", 'false');
            card3?.setAttribute("data-toggle3", 'false');
            card4?.setAttribute("data-toggle4", 'false');
        } else if (card1?.getAttribute("data-toggle1") === "false") {
            card1.setAttribute("data-toggle1", 'true');
            card2?.setAttribute("data-toggle2", 'true');
            card3?.setAttribute("data-toggle3", 'true');
            card4?.setAttribute("data-toggle4", 'true');
        }
    });
  }

  ngOnInit(): void {
    this.fijarVersionAPI();

    this.inicializarCardSocial();

  }


  fijarVersionAPI(): void {
    this.versionApiRest = '';
    this.demoService.getVersion()
    .subscribe(versionReturn => {
      this.versionApiRest = versionReturn;
    });
  }

}
