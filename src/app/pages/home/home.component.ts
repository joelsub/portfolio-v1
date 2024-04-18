import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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

   public experiences = [
    {
      date: '2019 - 2020',
      role: 'Designer - Epress',
      detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis explicabo itaque praesentium sunt harum voluptatem aut temporibus mollitia blanditiis? Quaerat odio ipsum beatae fugit repudiandae, minima obcaecati',
      tags: ['one', 'two', 'three'],
    },
    {
      date: '2020 - 2021',
      role: 'Designer - FrontEnd',
      detail: 'Lorem ipsum dolor sit amet consectetur ti',
      tags: ['Angular', 'figma'],
    },
    {
      date: '2021 - Presente',
      role: 'Designer - FrontEnd engenieer',
      detail: 'Lorem ipsum dolor sit amet consectetur ti',
      tags: ['Angular', 'figma'],
    },
  ]

  defaultCover = 'assets/img/cover-default.webp';
  currentCover = this.defaultCover; 
  currentProjectRoute: string = '';
  projectClicked = false; 
  

  @ViewChild('sidebarElement') sidebarElement!: ElementRef;
  @ViewChild('profileElement') profileElement!: ElementRef;
  @ViewChild('windowsProjects') windowsProjects!: ElementRef;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.animateElementsIntoPosition();
  }

  animateElementsIntoPosition() {
    // Asegúrate de que los elementos existen
    if (this.sidebarElement && this.profileElement) {
      // Animar el sidebar desde la izquierda
      gsap.from(this.sidebarElement.nativeElement, {
        x: '-100%', // Comienza fuera de la pantalla a la izquierda
        duration: 1,
        opacity: 0,
        ease: 'power3.out'
      });

      // Animar el profile-content desde la derecha
      gsap.from(this.profileElement.nativeElement, {
        x: '100%', // Comienza fuera de la pantalla a la derecha
        duration: 1,
        opacity: 0,
        ease: 'power3.out'
      });

      // Animar el windows
      gsap.from(this.windowsProjects.nativeElement, {
        duration: 1,
        opacity: 0,
        ease: 'power3.out'
      });
    }
  }


  setCover(cover: string) {
    if (!this.projectClicked) { 
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

    this.projectClicked = true;
    
    gsap.timeline()
      .to(this.sidebarElement.nativeElement, {
        duration: 0.5,
        x: '-300px',  // Mueve el sidebar hacia la izquierda
        opacity: 0,
        ease: 'power2.inOut'
      })
      .to(this.profileElement.nativeElement, {
        duration: 0.5,
        x: '100%',  // Mueve el profile-content hacia la derecha
        opacity: 0,
        ease: 'power2.inOut',
      }, '<');  // asegura que las animaciones se ejecuten simultáneamente

    this.currentProjectRoute = route;
    let tl = gsap.timeline();

    gsap.timeline()

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
