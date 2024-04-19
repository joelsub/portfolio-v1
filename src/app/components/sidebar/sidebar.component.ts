import { Component, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapGithub, bootstrapInstagram, bootstrapLinkedin, bootstrapTwitterX } from '@ng-icons/bootstrap-icons';
import { RouterModule } from '@angular/router';
import { ProjectAnimationService } from '../../services/project-animation.service';  // Asegúrate de importar el servicio correctamente

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, NgIconComponent, RouterModule],
  providers: [provideIcons({ bootstrapGithub, bootstrapInstagram, bootstrapLinkedin, bootstrapTwitterX })],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(private animationService: ProjectAnimationService) { }

  @Output() hoverProject = new EventEmitter<string>();
  @Output() projectClicked = new EventEmitter<string>();
  
  public projectId: string = '#';
  defaultCover: string = 'assets/img/cover-default.webp';

  works = [
    {
      name: 'xrunner', 
      router: '/xrunner',
      cover: 'assets/img/projects/xrunner/xrunner-cover.jpeg'
    },
    {
      name: 'ejemplo', 
      router: '/project-test',
      cover: 'assets/img/projects/test/test-cover.jpeg'
    }
  ];

  onMouseEnter(coverUrl: string) {
    this.animationService.hoverProject(coverUrl);

  }
  
  onMouseLeave() {
    this.animationService.hoverProject(this.defaultCover);

  }

  onClickProject(projectName: string) {
    // this.projectClicked.emit(routerLink); 
    this.projectClicked.emit(projectName); 
    console.log(projectName)
  }
}
