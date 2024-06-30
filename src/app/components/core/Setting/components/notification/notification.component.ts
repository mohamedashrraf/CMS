import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../../../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit{

  constructor(private _BreadCurmb: BreadcrumbService) { }

  ngOnInit() {
    this._BreadCurmb.changeCurrentPath();
  }

}
