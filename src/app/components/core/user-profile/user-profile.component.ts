import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CardModalComponent } from '../../../shared/pop-up-card/card-modal/card-modal.component';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { ToggleDeleteModalService } from '../../../services/toggleModal/toggle-delete-modal.service';
import { ProfileService } from './services/profile.service';
import { UserDetails } from './interfaces/user-details';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterOutlet, RouterModule, RouterLink, FormsModule, CardModalComponent, CommonModule, TitleCasePipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  searchText: string = '';
  activeTab: string = 'edit';
  isavailable: Boolean = true;
  currentUser!: UserDetails;
  deleteAccountModal!: Boolean;
  profileToggle: Boolean = false;


  _ToggleDeleteModalService = inject(ToggleDeleteModalService);
  _userProfileService = inject(ProfileService);

  constructor() {
    this.deleteAccountModal = false;
  }

  ngOnInit() {

    this.getUserDetails();

    this._ToggleDeleteModalService.getToggleUserProfile().subscribe({
      next: (toggler) => {
        this.isavailable = toggler;
      }
    })
    this._ToggleDeleteModalService.getToggleValue().subscribe({
      next: (toggler) => {
        this.deleteAccountModal = toggler;
      }
    })
  }

  getUserDetails() {
    this._userProfileService.userDetails().subscribe({
      next: (res) => {
        this.currentUser = res;
        console.log(res);
      }
    })
  }

  display(tab: string) {
    this.activeTab = tab;
  }
  close() {
    this._ToggleDeleteModalService.toggleUserProfile();
  }

  openModal() {
    this._ToggleDeleteModalService.toggleUserProfile()
  }

  deleteAccount() {
    console.log("Account Deleted");
  }
  closeDeleteModal() {
    this._ToggleDeleteModalService.toggle();
  }

}
