import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, Routes } from '@angular/router';

import { SidebarComponent } from '../../../../shared/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, RouterLink, RouterModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {

  constructor() { }

}
