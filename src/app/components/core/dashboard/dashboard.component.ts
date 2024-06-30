import { Component } from '@angular/core';
import { BreadcrumbService } from '../../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private _BreadCurmb: BreadcrumbService) { }

  ngOnInit() {
    this._BreadCurmb.changeCurrentPath();
  }
}
