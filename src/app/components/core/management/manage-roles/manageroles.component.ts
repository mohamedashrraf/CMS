import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe, SlicePipe } from '@angular/common';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToggleDeleteModalService } from '../../../../services/toggleModal/toggle-delete-modal.service';
import { CardModalComponent } from '../../../../shared/pop-up-card/card-modal/card-modal.component';
import { BreadcrumbService } from '../../../../services/breadcrumb/breadcrumb.service';
import { AddButtonComponent } from '../../../../shared/add-button/button.component';
import { PaginatorComponent } from '../../../../shared/paginator/paginator.component';
import { CreateRoleComponent } from './components/create-role/create-role.component';
import { FilterHeader } from '../../../../shared/filter/filter-header.interface';
import { SearchComponent } from '../../../../shared/search/search.component';
import { FilterComponent } from '../../../../shared/filter/filter.component';
import { TableComponent } from '../../../../shared/table/table.component';
import { ToastService } from '../../../../services/toast/toast.service';
import { TableData } from '../../../../shared/table/table-data';
import { ToastType } from '../../../../interfaces/toast';
import { RoleService } from './services/role.service';
import { NewRole } from './interfaces/new.role';
import { Role } from './interfaces/role';
import { SliceTextPipe } from './pipes/slice-text.pipe';
import { TestTableComponent } from '../../../../shared/test-table/test-table.component';
import { ViewRoleComponent } from './components/view-role/view-role.component';
import { UpdateRoleComponent } from './components/update-role/update-role.component';

@Component({
  selector: 'app-manageroles',
  standalone: true,
  imports: [
    CommonModule,
    AddButtonComponent,
    SearchComponent,
    TableComponent,
    PaginatorComponent,
    FilterComponent,
    CreateRoleComponent,
    CardModalComponent,
    SlicePipe,
    SliceTextPipe,
    TestTableComponent,
    ViewRoleComponent,
    UpdateRoleComponent
  ],
  templateUrl: './manageroles.component.html',
  styleUrls: ['./manageroles.component.css'],
})
export class ManageRolesComponent implements OnInit {
  /** VARS */
  selectedRoleId: string = '';
  roles!: Role;
  activeStatus: Boolean = true;
  roleStatus!: any;
  gridView: boolean = false;
  newRole: Boolean = false;
  viewRole: Boolean = false;
  selectedId!: string;
  tableView: boolean = false;
  updateRoleFlag: Boolean = false;
  deleteRoleFlag: Boolean = false;
  roleOptions: Boolean = false;
  tableData: TableData[] = [
    { key: 'id', displayName: 'Role ID' },
    { key: 'name', displayName: 'Role name' },
    { key: 'description', displayName: 'Description Role' },
    { key: 'isActive', displayName: 'Status' },
    { key: 'applicationUsers', displayName: 'Members' },
    {
      key: 'createdAt',
      displayName: 'Created at',
      pipe: new DatePipe('en-US'),
    },
  ];
  filterData: FilterHeader[] = [
    { key: 'name', displayName: 'Role name' },
    { key: 'createdAt', displayName: 'One Day' },
    { key: 'createdAt', displayName: 'Date Range' },
  ];

  /** SERVICES */
  _BreadCurmb = inject(BreadcrumbService);
  _RoleService = inject(RoleService);
  _ToggleModal = inject(ToggleDeleteModalService);
  _ToastService = inject(ToastService);
  _Router = inject(Router);
  _ActivatedRoute = inject(ActivatedRoute);
  DEFAULT_ROLE: Role = {
    success: false,
    message: 'No data available',
    data: [
      {
        id: '',
        name: '',
        roleIcon: {
          id: 0,
          iconPath: '',
        },
        description: '',
        isActive: true,
        color: '',
        createdAt: '',
        applicationUsers: [
          {
            id: '',
            fullName: '',
            profileImagePath: '',
          },
        ],
        usersCount: 0,
      },
    ],
    total: 0,
    pagesNumber: 0
  };

  constructor() {
    this.roles = this.DEFAULT_ROLE;
    this.roleStatus = true;
    this.activeStatus = true;
  }

  ngOnInit() {
    this.tableView = true;
    this._BreadCurmb.changeCurrentPath();
    this._ToggleModal.setDeletingToggle(false);

    this.roles = this.DEFAULT_ROLE;

    this._ToggleModal.getToggleCreateRole().subscribe({
      next: (value) => {
        this.newRole = value;
      },
    });

    this._ToggleModal.getToggleViewRole().subscribe({
      next: (value) => {
        this.viewRole = value;
      },
    });

    // this._ToggleModal.getToggleUpdateRole().subscribe({
    //   next: (value) => {
    //     this.updateRoleFlag = value;
    //   },
    // });

    this._ActivatedRoute.queryParamMap.subscribe({
      next: (params) => {
        // this.roleStatus = params.get('rstatus') ? !!params.get('rstatus') : true;

        if (!params.get('rstatus')) {
          this.roleStatus = true;
        } else {
          this.roleStatus = params.get('rstatus')
        }

        // if (params.get('rstatus') === 'true') {
        //   this.roleStatus = true;
        // } else {
        //   this.roleStatus = false;
        // }
        this.getAllRoles();
      },
    });
  }

  getAllRoles() {
    this._RoleService.getRoles(this.roleStatus).subscribe({
      next: (res) => {
        if (res.data) {
          this.roles = res;
        } else {
          this.roles.data = [
            {
              id: '',
              name: '',
              roleIcon: {
                id: 0,
                iconPath: '',
              },
              description: '',
              isActive: true,
              color: '',
              createdAt: '',
              applicationUsers: [
                {
                  id: '',
                  fullName: '',
                  profileImagePath: '',
                },
              ],
              usersCount: 0,
            },
          ];
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getRoleId(id: string) {
    this.selectedId = id;
    this._ToggleModal.toggleViewRole();
  }

  searchRoles(search: { searchValue: string }) {
    this._RoleService.getRolesBySearch('member', search.searchValue).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.roles = res;
        } else {
          this.roles.data = [
            {
              id: '',
              name: '',
              roleIcon: {
                id: 0,
                iconPath: '',
              },
              description: '',
              isActive: true,
              color: '',
              createdAt: '',
              applicationUsers: [
                {
                  id: '',
                  fullName: '',
                  profileImagePath: '',
                },
              ],
              usersCount: 0,
            },
          ];
        }
      },
      error: (err) => {
        this._ToastService.addToast({
          message: `${err.message}`,
          type: ToastType.Failed,
          title: 'Error',
          duration: 4000,
        });
      },
    });
  }

  setActive(status: Boolean) {
    this.activeStatus = status;
  }

  isActive(status: Boolean): Boolean {
    return this.activeStatus === status;
  }

  navigateWithQueryParam(paramKey: string, paramValue: any): void {
    const queryParams = { [paramKey]: paramValue };
    const navigationExtras: NavigationExtras = {
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    };
    this._Router.navigate([], navigationExtras);
  }

  activeGridView() {
    this.gridView = true;
    this.tableView = false;
  }

  activeTableView() {
    this.gridView = false;
    this.tableView = true;
  }

  filterRoles(filter: { filterColumn: string; filterValue: string; startDate: string; endDate: string }) {
    const { filterColumn, filterValue, startDate, endDate } = filter;
    this._RoleService.getRolesByFilter(filterColumn, filterValue, startDate, endDate).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.roles = res;
        } else {
          this.roles = this.DEFAULT_ROLE;
        }
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  currentRoleState!: any;
  roleStateToggle(e: any) {
    this.currentRoleState = e;
    this._ToggleModal.toggle();
  }

  //Show Selected Role Menu
  showRoleMenu(roleId: string) {
    this.selectedRoleId = this.selectedRoleId === roleId ? '' : roleId; //like menu = !menu
    this.roleOptions = true;
  }

  //Create Role
  createRole(role: NewRole) {
    this._RoleService.createRole(role).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastService.addToast({
          message: `${res.message}`,
          type: ToastType.Success,
          title: 'Success',
          duration: 4000,
        });
        this.getAllRoles();
        this.toggleCreateRole();
      },
    });
  }
  toggleCreateRole() {
    this._ToggleModal.toggleCreateRole();
  }

  //View Role
  toggleViewRole() {
    this._ToggleModal.toggleViewRole();
  }

  //update role
  updateRole(role: NewRole) {
    this._RoleService.updateRole(role).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastService.addToast({
          message: `${res.message}`,
          type: ToastType.Success,
          title: 'Success',
          duration: 4000,
        });
        this.getAllRoles();
        this.toggleUpdateRole();
      },
    });
  }
  toggleUpdateRole() {
    this._ToggleModal.toggleUpdateRole();
    this.roleOptions=false;
  }

  changeActivation() {
    this._RoleService.changeActivation(this.selectedRoleId, !this.activeStatus).subscribe({
      next: (res) => {
        this._ToastService.addToast({
          message: `${res.message}`,
          type: ToastType.Success,
          title: 'Success',
          duration: 4000,
        });
        console.log(res);
        this.getAllRoles();
      },

    })
  }

  currentDeletedRoleData!: any;
  deleteRoleToggle(e: any) {
    this.currentDeletedRoleData = e;
    this.deleteRoleFlag = true;
    this.roleOptions = !this.roleOptions;
    this._ToggleModal.toggle();
    console.log(this.deleteRoleFlag);

  }
  deleteRole() {
    this._RoleService
      .deleteRole(this.currentDeletedRoleData.rowId || this.selectedRoleId)
      .subscribe({
        next: (res) => {
          this._ToastService.addToast({
            message: `${res.message}`,
            type: ToastType.Success,
            title: 'Success',
            duration: 4000,
          });
          this.getAllRoles();
        },
      });
    this.roleOptions = false;
    this._ToggleModal.toggle();
    this.deleteRoleFlag = !this.deleteRoleFlag;
    this.selectedRoleId = '';

  }

  cancelDeletingRole() {
    this.currentDeletedRoleData = {};
    this._ToggleModal.toggle();
    this.deleteRoleFlag = false;
    this.roleOptions = false;
    this.selectedRoleId = '';
  }




  getCount(e: { currentPage: number; currentRows: number }) {
    this._RoleService.getRoles(this.roleStatus, '', '', e.currentPage, e.currentRows).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.roles = res;
        } else {
          this.roles.data = [
            {
              id: '',
              name: '',
              roleIcon: {
                id: 0,
                iconPath: '',
              },
              description: '',
              isActive: true,
              color: '',
              createdAt: '',
              applicationUsers: [
                {
                  id: '',
                  fullName: '',
                  profileImagePath: '',
                },
              ],
              usersCount: 0,
            },
          ];
        }
      },
    });
  }
}


// this.roles = {
//   success: false,
//   message: '',
//   data: [
//     {
//       id: '',
//       name: '',
//       roleIcon: {
//         id: 0,
//         iconPath: '',
//       },
//       description: '',
//       isActive: true,
//       color: '',
//       createdAt: '',
//       applicationUsers: [
//         {
//           id: '',
//           fullName: '',
//           profileImagePath: '',
//         },
//       ],
//       usersCount: 0,
//     },
//   ],
// };
