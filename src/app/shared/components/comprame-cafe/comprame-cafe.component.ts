import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-comprame-cafe',
  standalone: true,
  imports: [MatIconModule,MatButtonModule, TranslateModule],
  templateUrl: './comprame-cafe.component.html',
  styleUrl: './comprame-cafe.component.scss'
})
export class ComprameCafeComponent {

}
