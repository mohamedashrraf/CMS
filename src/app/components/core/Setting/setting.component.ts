import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BreadcrumbService } from '../../../services/breadcrumb/breadcrumb.service';

@Component({
    selector: 'app-setting',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './setting.component.html',
    styleUrl: './setting.component.css'
})
export class SettingComponent implements OnInit {

    constructor(private _BreadCurmb: BreadcrumbService) { }

    ngOnInit() {
        this._BreadCurmb.changeCurrentPath();
    }

}
