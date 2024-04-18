import { Component, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapGithub, bootstrapInstagram, bootstrapLinkedin, bootstrapTwitterX } from '@ng-icons/bootstrap-icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, NgIconComponent, RouterModule],
  providers: [provideIcons({ bootstrapGithub, bootstrapInstagram, bootstrapLinkedin, bootstrapTwitterX })],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor() { }

  @Output() hoverProject = new EventEmitter<string>();
  @Output() projectClicked = new EventEmitter<string>();
  
  public projectId: string = '#';

  works = [
    {
      name: 'xrunner', 
      router: '/xrunner',
      cover: 'assets/img/projects/xrunner/cover.jpeg'
    },
    {
      name: 'ejemplo', 
      router: '/project-test',
      cover: 'assets/img/projects/test/cover.jpeg'
    }
  ];

  onMouseEnter(coverUrl: string) {
    this.hoverProject.emit(coverUrl);
  }
  
  onMouseLeave() {
    this.hoverProject.emit('');
  }

  onClickProject(routerLink: string) {
    this.projectClicked.emit(routerLink); 
  }
}
