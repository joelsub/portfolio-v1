import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component'
import { WindowsContentComponent } from '../../components/windows-content/windows-content.component'
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component'

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapArrowDownCircle } from '@ng-icons/bootstrap-icons';

import { gsap } from 'gsap';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SidebarComponent, WindowsContentComponent, NavBarComponent, NgIconComponent],
  providers: [provideIcons({ bootstrapArrowDownCircle })],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  defaultCover = 'assets/img/cover-default.webp';
  currentCover = this.defaultCover; 

  constructor() {}

  setCover(cover: string) {
    if (this.currentCover !== cover) {
      this.currentCover = cover; 
    }
  }

  onMouseEnter(coverUrl: string) {
    this.currentCover = coverUrl;  
  }
  
  onMouseLeave() {
    this.currentCover = this.defaultCover; 
  }


  handleProjectClick() {
    gsap.to('.projects-window', {
      duration: 1,
      scaleX: 1,
      scaleY: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.to('.projects-window', {
          duration: 0.5,
          y: '100vh',
          ease: 'power2.inOut',
          onComplete: () => {
            this.loadProjectContent(); // Carga el contenido del proyecto
          }
        });
      }
    });
  }

  loadProjectContent() {
    console.log("Cargando contenido del proyecto...");
    // Implementa la carga del contenido del proyecto aquí
  }
}
