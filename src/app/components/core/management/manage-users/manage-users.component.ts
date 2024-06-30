import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { CardComponent } from '../../../../shared/card/card.component';
import { BreadcrumbService } from '../../../../services/breadcrumb/breadcrumb.service';
import { FilterComponent } from '../../../../shared/filter/filter.component';
import { AddButtonComponent } from '../../../../shared/add-button/button.component';
import { AddUserComponent } from '../../add-user/add-user.component';
import { ToggleDeleteModalService } from '../../../../services/toggleModal/toggle-delete-modal.service';
import { SortComponent } from '../../../../shared/sort/sort.component';
import { UserManagementsService } from './services/user-managements.service';
import { SettingsService } from '../../Setting/services/settings.service';
import { OutsideClickDirective } from '../../../../shared/directives/outside-click.directive';
import { ActivatedRoute, NavigationExtras, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TableComponent } from '../../../../shared/table/table.component';
import { TableData } from '../../../../shared/table/table-data';
import { ToastService } from '../../../../services/toast/toast.service';
import { ToastType } from '../../../../interfaces/toast';
import { PaginatorComponent } from '../../../../shared/paginator/paginator.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../../../../shared/search/search.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { CardModalComponent } from '../../../../shared/pop-up-card/card-modal/card-modal.component';
import { FilterHeader } from '../../../../shared/filter/filter-header.interface';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [
    CardComponent,
    RouterOutlet, TableComponent,
    FilterComponent, AddButtonComponent,
    AddUserComponent, SortComponent,
    OutsideClickDirective, CommonModule,
    RouterLink, RouterLinkActive,
    PaginatorComponent, FormsModule,
    SearchComponent, UserProfileComponent,
    AddUserComponent, CardModalComponent],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})

export class ManageUsersComponent implements OnInit, OnDestroy {
  /** VARS */
  row1 = [12345];
  bodydata = [12345];
  heads!: string[];
  headdata = this.row1;
  users: any = null;
  addUserToggler!: Boolean;
  filterValue!: Boolean;
  sessionId!: string;
  isDropdownOpen!: Boolean;
  analytics: { totalCount: number, activateUsers: number, deactivateUsers: number } = { totalCount: 0, activateUsers: 0, deactivateUsers: 0 };
  tableData: TableData[] = [
    { key: 'id', displayName: 'User ID' },
    { key: 'profileImagePath', displayName: 'User Info' },
    { key: 'userStatus', displayName: 'Status' },
    { key: 'roleName', displayName: 'Role name' },
    { key: 'email', displayName: 'Email' },
    { key: 'createdAt', displayName: 'Joined at', pipe: new DatePipe('en-US') },
  ];

  filterData: FilterHeader[] = [
    { key: 'createdAt', displayName: 'One Day' },
    { key: 'createdAt', displayName: 'Date Range' },
  ];

  deleteUserFlag: Boolean = false;
  activateUserFlag: Boolean = false;
  deactivateUserFlag: Boolean = false;
  userStatus!: string;
  activeStatus!: string;
  baseURL = environment.BASEURL;

  // For paginator
  rows = 2;

  /*INPUTS & OUTPUTS */
  @Input('') inp!: any;
  @Output() event = new EventEmitter<void>();

  /** INJECT */
  _BreadCurmb = inject(BreadcrumbService);
  _ToggleModal = inject(ToggleDeleteModalService);
  _SettingService = inject(SettingsService);
  _UserManagement = inject(UserManagementsService);
  _ActivatedRoute = inject(ActivatedRoute);
  _ToastService = inject(ToastService);
  _Router = inject(Router);
  searchTitle: any;

  constructor() {
    this.users = [];
    this.isDropdownOpen = false;
    this.userStatus = '0';
    this.activeStatus = '1';
  }

  ngOnInit() {
    this._ToggleModal.setDeletingToggle(false);
    this._BreadCurmb.changeCurrentPath();
    this._ActivatedRoute.queryParamMap.subscribe({
      next: (params) => {
        this.userStatus = params.get('ustatus') || "0";
        this.getAnalytics();
        this.getAllUsers();
      }
    })


    this._ToggleModal.getToggleCreateUser().subscribe({
      next: (toggleValue) => {
        this.addUserToggler = toggleValue;
      }
    })

    this._ToggleModal.getFilterValue().subscribe({
      next: (toggleValue) => {
        this.filterValue = toggleValue;
      }
    })
  }

  getAnalytics() {
    forkJoin({
      analytics: this._UserManagement.getUserAnalytics(),
    }).subscribe({
      next: (res: any) => {
        this.analytics = res.analytics;
      }
    });
  }

  getAllUsers() {
    this._UserManagement.getAllUsers(this.userStatus).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.users = res;
        } else {
          this.users.data = [];
        }
      }, error: (err) => {
        // console.log(err);
        this._ToastService.addToast({ message: `${err.message}`, type: ToastType.Failed, title: 'Error', duration: 4000 })
      }
    })
  }

  toggleUserModal() {
    this._ToggleModal.toggleCreateUser();
  }

  openFilterModal() {
    this._ToggleModal.toggleFilter();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  };

  navigateWithQueryParam(paramKey: string, paramValue: string): void {
    const queryParams = { [paramKey]: paramValue };
    const navigationExtras: NavigationExtras = {
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    };
    this._Router.navigate([], navigationExtras);
  }

  // For paginator
  getCount(e: { currentPage: number, currentRows: number }) {
    console.log(e);
    this._UserManagement.getAllUsers(this.userStatus, '', '', e.currentPage, e.currentRows).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.users = res;
          console.log(res);
        } else {
          this.users.data = [];
        }
      }
    })
  }


  //Search
  onSearchChange(search: { searchValue: string }) {
    this._UserManagement.getAllUsersBySearch('fullName', search.searchValue).subscribe({
      next: (res: any) => {
        if (res.data) {
          this.users = res;
        } else {
          this.users.data = [];
        }
      },
      error: (err) => {
        this._ToastService.addToast({ message: `${err.message}`, type: ToastType.Failed, title: 'Error', duration: 4000 })
      }
    })
  }

  setActive(status: string) {
    this.activeStatus = status;
  }
  isActive(status: string): boolean {
    return this.activeStatus === status;
  }

  // addUserForm
  addUserForm(e: { formdata: any, selectedImage: File }) {
    console.log(e);

    const formData = new FormData();

    formData.append('FullName', e.formdata.FullName);
    formData.append('RoleId', e.formdata.RoleId);
    formData.append('Email', e.formdata.Email);
    formData.append('Password', e.formdata.Password);
    formData.append('ConfirmPassword', e.formdata.ConfirmPassword);
    if (e.selectedImage) {
      formData.append('ImageProfile', e.selectedImage, e.selectedImage.name);
    }

    this._UserManagement.createUser(formData).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastService.addToast({ message: `${res.message}`, type: ToastType.Success, title: 'Success', duration: 4000 })
        this.getAllUsers();
        this.getAnalytics();
        this._ToggleModal.toggleCreateUser();
      }
    })
    // console.log(event);
  }

  /*************************** FILTER ***********************************/
  filterUsers(event: any) {
    const { filterColumn, filterValue, startDate, endDate } = event;
    console.log(event);

    this._UserManagement.getUsersByFilter(filterColumn, filterValue, startDate, endDate)
      .subscribe({
        next: (res: any) => {
          if (res.data) {
            this.users = res;
          } else {
            this.users.data = [];
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
  }




  /*************************** CHANGIN USER ACTIVATION STATUS ***********************************/
  // temp variable for caching user status
  currentUserStatus!: any;
  confirmChangeUserStatus(event: any) {
    if (event.type == 2) {
      this.deactivateUserFlag = true;
    } else {
      this.activateUserFlag = true;
    }
    this.currentUserStatus = event;
    this._ToggleModal.toggle();
  }

  changeUserState() {
    this._UserManagement.changeUserActivation(this.currentUserStatus.rowId, this.currentUserStatus.state).subscribe({
      next: (res) => {
        this._ToastService.addToast({ message: `${res.message}`, type: ToastType.Success, title: 'Success', duration: 4000 });
        this.getAllUsers();
        this.getAnalytics();
        this.currentDeletedUserData = {};
        this._ToggleModal.toggle();
        this.activateUserFlag = false;
        this.deactivateUserFlag = false;
      }
    })
  }

  cancelActivateUser() {
    this.currentDeletedUserData = {};
    this._ToggleModal.toggle();
    this.activateUserFlag = false;
    this.deactivateUserFlag = false;
  }

  /*************************** USER INVITAION ***********************************/
  sendInviteFlag!: Boolean;
  userInvitationData!: any;
  confirmUserInvitation(event: any) {
    this.sendInviteFlag = true;
    this.userInvitationData = event;
    this._ToggleModal.toggle();
  }

  inviteUser() {
    this._UserManagement.resendInvitation(this.userInvitationData.rowId).subscribe({
      next: (res) => {
        this._ToastService.addToast({ message: `${res.message}`, type: ToastType.Success, title: 'Success', duration: 11000000 });
        this.cancelUserInvitation();
      }
    })
  }

  cancelUserInvitation() {
    this.sendInviteFlag = false;
    this.userInvitationData = {};
    this._ToggleModal.toggle();
  }


  /******************** DELETING USER ********************/
  // temp variable for caching user data
  currentDeletedUserData!: any;
  deleteUserToggle(e: any) {
    this.currentDeletedUserData = e;
    this.deleteUserFlag = true;
    this._ToggleModal.toggle()
  }

  deleteUser() {
    this._UserManagement.deleteUserAsSuperAdmin(this.currentDeletedUserData.rowId).subscribe({
      next: (res) => {
        this._ToastService.addToast({ message: `${res.message}`, type: ToastType.Success, title: 'Success', duration: 4000 });
        this.getAllUsers();
        this.getAnalytics();
        this.cancelDeletingUser();
        this.activateUserFlag = false;
        this.deactivateUserFlag = false;
      }
    })
  }

  cancelDeletingUser() {
    this.currentDeletedUserData = {};
    this._ToggleModal.toggle()
    this.deleteUserFlag = false;
  }

  ngOnDestroy(): void { }
}
