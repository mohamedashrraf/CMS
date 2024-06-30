import { Component } from '@angular/core';
import { BreadcrumbService } from '../../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-reports-analytics',
  standalone: true,
  imports: [],
  templateUrl: './reports-analytics.component.html',
  styleUrl: './reports-analytics.component.css'
})
export class ReportsAnalyticsComponent {

  constructor(private _BreadCurmb: BreadcrumbService) { }

  ngOnInit() {
    this._BreadCurmb.changeCurrentPath();
  }
}
