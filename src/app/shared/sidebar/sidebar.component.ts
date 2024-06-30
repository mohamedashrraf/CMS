import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { Breakpoints } from '@angular/cdk/layout';

import { ToggleService } from '../../services/toggleBtn/toggle.service';
import { ToggleThemeService } from '../../services/toggleDarkTheme/toggle-theme.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  openDropdown!: Boolean;
  dropDownToggler!: Boolean;
  darkMode!: Boolean;
  sidebarToggler!: Boolean;

  constructor(private _Toggle: ToggleService, private _DataTheme: ToggleThemeService) {
    this.openDropdown = true;
    this.darkMode = false;
    this.sidebarToggler = false;
    this.dropDownToggler = false;
  }

  ngOnInit(): void {

    // console.log('Web ' + Breakpoints.Web);

    this._Toggle.getToggleValue().subscribe({
      next: (value) => {
        this.sidebarToggler = value;
      }
    })
    this._DataTheme.getTheme().subscribe({
      next: (res) => {
        this.darkMode = res;
        // console.log("dark: " + this.darkMode);

      }
    })
  }

  togglesidebar() {
    this._Toggle.toggle();
    this.sidebarToggler = !this.sidebarToggler;
  }

  Dropdowntoggle() {
    this.dropDownToggler = !this.dropDownToggler;
    // console.log("Dropdown: " + this.dropDownToggler);

  }

  toggleAppearance() {
    // console.log("dark: " + this.darkMode);

    this.darkMode = !this.darkMode;
  }

  getRouterLinkClass(router: RouterLinkActive): any {
    return this.darkMode && router.isActive ? 'darkTheme_active' : !this.darkMode && router.isActive ? 'active' : '';
  }

}
