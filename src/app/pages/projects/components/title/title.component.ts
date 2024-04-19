import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { bootstrapArrowLeftShort } from '@ng-icons/bootstrap-icons';
import { Router } from '@angular/router';


import { gsap } from 'gsap';


@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
  providers: [
    provideIcons({ bootstrapArrowLeftShort })
  ]
})
export class TitleComponent implements AfterViewInit {
  @ViewChild('container') container!: ElementRef;

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
    gsap.from(this.container.nativeElement, {
      y: 500,
      duration: .5,
      zIndex: 0,
      ease: 'power3.out',
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
