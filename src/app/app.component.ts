import { CommonModule } from '@angular/common';
import { Component, HostBinding, HostListener } from '@angular/core';
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

  cursorPos = { x: 0, y: 0 };
  isHovering = false;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.cursorPos.x = event.clientX;
    this.cursorPos.y = event.clientY;
  }

  @HostListener('document:mouseover', ['$event'])
  onMouseOver(event: MouseEvent) {
    this.isHovering = (event.target as Element).classList.contains('hover-target');
  }
  
  @HostListener('document:mouseout', ['$event'])
  onMouseOut(event: MouseEvent) {
    this.isHovering = false;
  }
}
