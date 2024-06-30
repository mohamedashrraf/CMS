import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, Input, OnChanges } from '@angular/core';
import { ViewRole } from '../../interfaces/view.role';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-view-role',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  templateUrl: './view-role.component.html',
  styleUrl: './view-role.component.css'
})
export class ViewRoleComponent implements OnChanges {

  role!: ViewRole;

  @Input('roleId') roleId!: string;

  _Role = inject(RoleService);

  ngOnChanges(): void {
    this._Role.getRolesById(this.roleId).subscribe(res => {
      this.role = res;
    })
  }

}
