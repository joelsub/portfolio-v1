import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectDisplayService {
  // maneja el nombre del proyecto activo
  private activeProjectSubject = new BehaviorSubject<string | null>(null);
  public activeProject = this.activeProjectSubject.asObservable();

  // Resetear animaciones
  public resetAnimationsSubject = new BehaviorSubject<boolean>(false);
  public onResetAnimations = this.resetAnimationsSubject.asObservable();

  constructor() { }

  // activar un proyecto
  activateProject(projectName: string) {
    this.activeProjectSubject.next(projectName);
  }

  // desactivar el proyecto actual
  deactivateProject() {
    this.activeProjectSubject.next(null);
  }
  resetHomeAnimations() {
    this.resetAnimationsSubject.next(true);
  }
}
