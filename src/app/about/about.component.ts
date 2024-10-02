import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { version } from '../../../package.json';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  version = version;

}
