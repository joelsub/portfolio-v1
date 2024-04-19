import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DarkModeService } from './services/dark-mode.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio-v1';

  @HostBinding('class.dark-mode') get isDarkMode() {
    return this.darkModeService.isDarkMode;
  }

  constructor(public darkModeService: DarkModeService) {}
}
