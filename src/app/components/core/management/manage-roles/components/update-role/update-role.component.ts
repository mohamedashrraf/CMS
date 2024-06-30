import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewRole } from '../../interfaces/new.role';
import { GetAllRoles } from '../../../../add-user/interfaces/getAllRoles';
import { RoleService } from '../../services/role.service';
import { UserPermissionsRoles } from '../../interfaces/user.permissions';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IconList } from '../../interfaces/icon.list';
import { SearchComponent } from '../../../../../../shared/search/search.component';
import { TableComponent } from '../../../../../../shared/table/table.component';

@Component({
  selector: 'app-update-role',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SearchComponent, TableComponent],
  templateUrl: './update-role.component.html',
  styleUrl: './update-role.component.css'
})
export class UpdateRoleComponent {
  /**** VARS */
  activeStatus: Boolean = true;
  addRole!: FormGroup;
  selectedRole!: string;
  selectedRoleIcon!: string;
  toggleSelectMenu!: Boolean;
  rolesList!: GetAllRoles;
  iconsList!: IconList;
  userPermissionsRoles!: UserPermissionsRoles[];
  rolesDetails: Boolean = false;
  relatedUsers: Boolean = true;
  /** INJECTIONS */
  _FormBuilder = inject(FormBuilder);
  _RolesService = inject(RoleService);
  _Router = inject(Router);


  /** OUTPUT */
  @Output() toggleUpdateRole = new EventEmitter<Boolean>();
  @Output() updateRoleForm = new EventEmitter<NewRole>();

  /** METHODS */

  constructor() {
    this.userPermissionsRoles = [
      {
        name: '',
        userPermissions: [
          {
            id: 0,
            name: ''
          }
        ]
      }
    ]
  }

  ngOnInit() {
    this.fb();
    this.getAllRoles();
    this.getUserPermission();
  }

  showRolesDetails(){
    this.rolesDetails = true;
    this.relatedUsers = false;
  }
  showrelatedUsers(){
    this.rolesDetails = false;
    this.relatedUsers = true;
  }
  setActive(status: Boolean) {
    this.activeStatus = status;
  }

  isActive(status: Boolean): Boolean {
    return this.activeStatus === status;
  }


  fb() {
    this.addRole = this._FormBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60), Validators.pattern('^[a-zA-Z ]+$')]],
      description: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(200)]],
      isActive: [true, [Validators.required]],
      color: ['string', [Validators.required]],
      roleIconId: ['', [Validators.required]],
      userPermissionId: this._FormBuilder.array([], [Validators.required])
    });
  }

  getAllRoles() {
    this._RolesService.getAllIcons().subscribe({
      next: (res) => { this.iconsList = res; },
      error: (err) => { console.log(err); }
    })
  }

  getUserPermission() {
    this._RolesService.getUserPermission().subscribe({
      next: (res) => {
        this.userPermissionsRoles = res;
        this.userPermissionsRoles.forEach((element: any) => {
          element.showPermission = false;
        });

        this.userPermissionsRoles.forEach((element: any) => {
          element.userPermissions.checked = false;
        });
      },
      error: (err) => { console.log(err); }
    })
  }

  newRole() {
    if (this.addRole.invalid) {
      console.log(this.addRole);
      return;
    }

    this.updateRoleForm.emit(this.addRole.value);
  }

  selectRole(role: any) {
    this.addRole.patchValue({ roleIconId: role.id });
    this.selectedRoleIcon = role.iconPath
  }

  // Toggle select menu
  toggleMenu() {
    this.toggleSelectMenu = !this.toggleSelectMenu;
  }

  onChecked(event: any, elementId: number, element: any) {
    const isChecked = event.target.checked;
    element.checked = isChecked;

    if (isChecked && !(this.addRole.get('userPermissionId') as FormArray).value.includes(elementId)) {
      (this.addRole.get('userPermissionId') as FormArray).push(new FormControl(elementId));
    } else if (!isChecked) {
      const index = (this.addRole.get('userPermissionId') as FormArray).value.indexOf(elementId);
      if (index !== -1) {
        (this.addRole.get('userPermissionId') as FormArray).removeAt(index);
      }
    }
  }

  checkAll(event: any, userRole: any) {
    const isChecked = event.target.checked;
    const userPermissionIdArray = this.addRole.get('userPermissionId') as FormArray;

    userRole.userPermissions.forEach((element: any) => {
      element.checked = isChecked;
      if (isChecked && !userPermissionIdArray.value.includes(element.id)) {
        userPermissionIdArray.push(new FormControl(element.id));
      } else if (!isChecked) {
        const index = userPermissionIdArray.value.indexOf(element.id);
        if (index !== -1) {
          userPermissionIdArray.removeAt(index);
        }
      }
    });
  }



  togglePermission(event: any, userRole: any) {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'LABEL') {
      return; // Skip toggling if the clicked element is an input or label
    }
    console.log(event);
    event.currentTarget.classList.toggle('active-role');
    userRole.showPermission = !userRole.showPermission;
  }

  close() {
    this.toggleUpdateRole.emit(false);
  }

}
