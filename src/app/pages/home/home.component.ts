import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 

import { SidebarComponent } from '../../components/sidebar/sidebar.component'
import { WindowsContentComponent } from '../../components/windows-content/windows-content.component'
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component'

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapArrowDownCircle } from '@ng-icons/bootstrap-icons';

import { gsap } from 'gsap';
import { XrunnerComponent } from '../projects/xrunner/xrunner.component';
import { ProjectTestComponent } from '../projects/project-test/project-test.component';
import { ProjectsModule } from '../projects/projects.module';
import { ProjectsComponent } from '../projects/projects.component';

import { ProjectDisplayService } from '../../services/project-display.service';
import { ProjectAnimationService } from '../../services/project-animation.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SidebarComponent, WindowsContentComponent, NavBarComponent, NgIconComponent, ProjectsModule],
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

  activeProject: string | null = null; 

  

  @ViewChild('navbarElement') navbarElement!: ElementRef;
  @ViewChild('sidebarElement') sidebarElement!: ElementRef;
  @ViewChild('profileElement') profileElement!: ElementRef;
  @ViewChild('windowsProjects') windowsProjects!: ElementRef;

  constructor(
    private router: Router, 
    private projectDisplayService: ProjectDisplayService,
    private animationService: ProjectAnimationService

  ) {}

  ngAfterViewInit() {
    this.animationService.projectHover$.subscribe((coverUrl: string | null) => {
      if (!this.projectClicked) {
        this.changeBackgroundImage(coverUrl || this.defaultCover);
      }
    });

    this.projectDisplayService.activeProject.subscribe(projectName => {
      if (projectName) {
        this.activeProject = projectName;
        this.projectClicked = true; 
        this.changeBackgroundImage(`url(${this.findCoverByProjectName(projectName)})`);
      } else {
        this.activeProject = null;
        this.projectClicked = false;
        this.changeBackgroundImage(this.defaultCover); 
      }
    });

    this.projectDisplayService.onResetAnimations.subscribe(reset => {
      if (reset) {
        this.resetAnimations();
        this.projectDisplayService.resetAnimationsSubject.next(false);
      }
    });
  }

  public works = [
    {
      name: 'xrunner',
      cover: 'assets/img/projects/xrunner/xrunner-cover.jpeg'
    },
    {
      name: 'ejemplo',
      cover: 'assets/img/projects/test/test-cover.jpeg'
    }
  ];

  findCoverByProjectName(projectName: string): string {
    const project = this.works.find(p => p.name === projectName);
    return project ? project.cover : this.defaultCover;
  }

  
  
  changeBackgroundImage(coverUrl: string) {
    // GSAP cambia el fondo 
    gsap.to(this.windowsProjects.nativeElement, {
      duration: 0.5, 
      ease: 'power2.inOut',
      backgroundImage: `url(${coverUrl})`
    });
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


  handleProjectClick(projectName: string) {

    this.projectClicked = true;
    let tl = gsap.timeline();

    gsap.timeline()
    tl.to('.projects-window', {
      duration: .8,
      width: '100%',
      height: '100vh',
      top: 0,
      left: 0,
      ease: 'power2.inOut',
      onComplete: () => {
        // this.activeProject = projectName;
        this.projectDisplayService.activateProject(projectName);
      }
    });

    tl.to(this.sidebarElement.nativeElement, {
      duration: .1,
      display: 'none',
      ease: 'power2.inOut',
    });
    tl.to(this.profileElement.nativeElement, {
      duration: .1,
      display: 'none',
      ease: 'power2.inOut',
    });

    tl.to('.projects-window', {
      duration: .8,
      y: '300px', 
      ease: 'power2.inOut',
    });

    tl.to('.projects-window', {
      duration: .1,
      display: 'none', 
    });
  }


  loadProjectContent(projectName: string) {
    this.activeProject = projectName;
  }


  resetAnimations() {
    gsap.killTweensOf([
      this.sidebarElement.nativeElement,
      this.navbarElement.nativeElement,
      this.profileElement.nativeElement,
      this.windowsProjects.nativeElement,
    ]);
  
    // Restablece las propiedades de los elementos a los valores iniciales
    gsap.set(this.sidebarElement.nativeElement, { x: '0%', opacity: 1, clearProps: "all" });
    gsap.set(this.navbarElement.nativeElement, { y: '0%', opacity: 1, clearProps: "all" });
    gsap.set(this.profileElement.nativeElement, { x: '0%', opacity: 1, clearProps: "all" });
    
    
    // Asegúrate de resetear también las propiedades de .projects-window a su estado original
    gsap.set(this.windowsProjects.nativeElement, {
      width: '500px', // Estos valores deben ser los iniciales que tiene .projects-window
      height: '80%',
      top: '10%',
      left: '200px',
      opacity: 1,
      clearProps: "all"
    });

    this.windowsProjects.nativeElement.style.backgroundImage = `url(${this.defaultCover})`;

  
  }
  
}
