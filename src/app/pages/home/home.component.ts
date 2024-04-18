import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 

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
  currentProjectRoute: string = '';

  constructor(private router: Router) {}

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


  handleProjectClick(route: string) {

    this.currentProjectRoute = route;
    let tl = gsap.timeline();

    tl.to('.projects-window', {
      duration: .8,
      width: '100%',
      height: '100vh',
      top: 0,
      left: 0,
      ease: 'power2.inOut',
      
    });

    // tl.pause(.3);  // Pausa la animación por 2 segundos

    tl.to('.projects-window', {
      duration: .8,
      y: '300px', 
      ease: 'power2.inOut',
      onComplete: () => this.loadProjectContent()
    });
  }


  loadProjectContent() {
    console.log("Cargando contenido del proyecto...");
    this.router.navigate([this.currentProjectRoute]);
  }
}
