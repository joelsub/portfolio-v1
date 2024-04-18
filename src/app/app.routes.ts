import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { XrunnerComponent } from './pages/projects/xrunner/xrunner.component';
import { ProjectTestComponent } from './pages/projects/project-test/project-test.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'xrunner',
        component: XrunnerComponent,
    },
    {
        path: 'project-test',
        component: ProjectTestComponent,
    }
];
