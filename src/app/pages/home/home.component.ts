import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component'
import { WindowsContentComponent } from '../../components/windows-content/windows-content.component'
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component'

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapArrowDownCircle } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SidebarComponent, WindowsContentComponent, NavBarComponent, NgIconComponent],
  providers: [provideIcons({ bootstrapArrowDownCircle })],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
