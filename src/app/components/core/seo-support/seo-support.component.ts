import { Component } from '@angular/core';
import { BreadcrumbService } from '../../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-seo-support',
  standalone: true,
  imports: [],
  templateUrl: './seo-support.component.html',
  styleUrl: './seo-support.component.css'
})
export class SeoSupportComponent {

  constructor(private _BreadCurmb: BreadcrumbService) { }

  ngOnInit() {
    this._BreadCurmb.changeCurrentPath();
  }
}
