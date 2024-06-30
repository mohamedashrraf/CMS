import { Component } from '@angular/core';
import { BreadcrumbService } from '../../../services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {

  constructor(private _BreadCurmb: BreadcrumbService) { }

  ngOnInit() {
    this._BreadCurmb.changeCurrentPath();
  }
}
