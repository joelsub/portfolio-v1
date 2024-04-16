import { Component } from '@angular/core';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapMoonFill, bootstrapSunFill, bootstrapEnvelopeFill } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgIconComponent],
  providers: [provideIcons({ bootstrapMoonFill, bootstrapSunFill, bootstrapEnvelopeFill })],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

}
