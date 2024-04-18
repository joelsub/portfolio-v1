import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { bootstrapArrowLeft } from '@ng-icons/bootstrap-icons';
import { Router } from '@angular/router';


import { gsap } from 'gsap';


@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
  providers: [
    provideIcons({ bootstrapArrowLeft })
  ]
})
export class TitleComponent implements AfterViewInit {
  @ViewChild('container') container!: ElementRef; // Usa ViewChild para acceder al DOM

  @Input() projectName!: string;
  @Input() projectType!: string;
  @Input() stage!: string;
  @Input() deliverables!: string;
  @Input() coverUrl!: string;

  constructor(private router: Router) { }

  ngAfterViewInit() {
    this.animateContainer();
  }

  animateContainer() {
    // GSAP animación desde abajo hacia la posición actual
    gsap.from(this.container.nativeElement, {
      y: 500, // Empieza 500px abajo desde la posición actual
      duration: .5,
      zIndex: 0,
      ease: 'power3.out',
      // El valor de 'y' aquí es un ejemplo, ajústalo según la distancia que desees
    });
  }

  onBackClick() {
    let tl = gsap.timeline();
    gsap.timeline()

    tl.to('.cover', {
      duration: .8,
      y: '0', 
      ease: 'power2.inOut',
      onComplete: () => {
        // this.router.navigateByUrl('/');
      } 
    });

    tl.to(this.container.nativeElement, {
      duration: .1,
      opacity: 0,
      ease: 'power2.inOut',
    });

    tl.to('.cover', {
      duration: .8,
      width: '500px',
      height: '80vh',
      position: 'absolute',
      left: 200,
      ease: 'power2.inOut',
    });

    tl.to('.cover', {
      duration: .3,
      opacity: 0,
      ease: 'power2.inOut',
      onComplete: () => {
        this.router.navigateByUrl('/');
      } 
    });



    

  }
}
