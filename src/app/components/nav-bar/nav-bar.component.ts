import { Component } from '@angular/core';
import { DarkModeService } from '../../services/dark-mode.service';


import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapMoonFill, bootstrapSunFill, bootstrapEnvelopeFill } from '@ng-icons/bootstrap-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgIconComponent, CommonModule],
  providers: [provideIcons({ bootstrapMoonFill, bootstrapSunFill, bootstrapEnvelopeFill })],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  constructor(public darkModeService: DarkModeService) {}

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
}
