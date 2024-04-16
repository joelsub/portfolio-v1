import { Component, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { ProjectAnimationService } from '../../services/project-animation.service';
import { gsap } from 'gsap';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-windows-content',
  standalone: true,
  imports: [],
  templateUrl: './windows-content.component.html',
  styleUrl: './windows-content.component.scss'
})
export class WindowsContentComponent implements AfterViewInit, OnDestroy {

  @ViewChild('windowsContent') windowsContent!: ElementRef;
  private subscription: Subscription = new Subscription();
  constructor(private animationService: ProjectAnimationService) { }

  ngAfterViewInit() {
    // Suscribirse a los clics para iniciar la animación
    this.subscription.add(
      this.animationService.projectTrigger$.subscribe(projectId => {
        if (projectId) {
          this.animateWindowContent(projectId);
        }
      })
    );
  
    // Suscribirse a los hovers para cambiar el color de fondo
    this.subscription.add(
      this.animationService.projectHover$.subscribe(color => {
        if (color) {
          this.windowsContent.nativeElement.style.backgroundColor = color;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  currentWorkId: string | null = null;


  private animateWindowContent(projectId: string) {
    // tamaño y posición iniciales definidos
    gsap.set(this.windowsContent.nativeElement, {width: 'inicial', height: 'inicial', top: 'inicial', left: 'inicial'});
    // línea de tiempo
    const tl = gsap.timeline({onComplete: () => this.showProjectContent(projectId)});
    // 1: Expandir para cubrir
    tl.to(this.windowsContent.nativeElement, { duration: .5, width: '100%', height: '100vh', top: 0, left: 0 });
    // pausa
    tl.to(this.windowsContent.nativeElement, {duration: 0.3}, "+=0.3");
    // 2: Deslizar hacia abajo
    tl.to(this.windowsContent.nativeElement, { duration: 0.5, y: '300px' });
  }
  
  private showProjectContent(projectId: string) {
  }


}
