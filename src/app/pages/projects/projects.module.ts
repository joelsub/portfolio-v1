import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './components/title/title.component';
import { XrunnerComponent } from './xrunner/xrunner.component';
import { ProjectTestComponent } from './project-test/project-test.component';

import { NgIconComponent } from '@ng-icons/core';



@NgModule({
  declarations: [
    TitleComponent,
    XrunnerComponent,
    ProjectTestComponent,
  ],
  imports: [
    CommonModule,
    NgIconComponent
  ],
  exports: [
    XrunnerComponent,
    ProjectTestComponent,
  ]
})
export class ProjectsModule { }
