import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectAnimationService {

  private projectTrigger = new BehaviorSubject<string | null>(null);
  projectTrigger$ = this.projectTrigger.asObservable();

  triggerAnimation(projectId: string) {
    this.projectTrigger.next(projectId);
  }

  private projectHover = new BehaviorSubject<string | null>(null);
  projectHover$ = this.projectHover.asObservable();

  hoverProject(color: string) {
    this.projectHover.next(color);
  }

  
}
