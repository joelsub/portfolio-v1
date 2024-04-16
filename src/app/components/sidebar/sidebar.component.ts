import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapGithub, bootstrapInstagram, bootstrapLinkedin, bootstrapTwitterX } from '@ng-icons/bootstrap-icons';
import { gsap } from 'gsap';

import { ProjectAnimationService } from '../../services/project-animation.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ bootstrapGithub, bootstrapInstagram, bootstrapLinkedin, bootstrapTwitterX })],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(private animationService: ProjectAnimationService) { }
  public projectId: string = '#';

  works = [
    { id: 'work1', name: 'Proyecto 1', color: 'red' },
    { id: 'work2', name: 'Proyecto 2', color: 'blue' },
  ];

  onWorkClick(projectId: string): void {
    this.animationService.triggerAnimation(projectId);
  }

  onWorkHover(workId: string): void {
    const work = this.works.find(w => w.id === workId);
    if (work) {
      this.animationService.hoverProject(work.color);
    }
  }
}
