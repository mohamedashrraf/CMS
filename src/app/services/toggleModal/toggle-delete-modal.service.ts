import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ToggleDeleteModalService {

  constructor() { }

  private toggler: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  private createUserToggle: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  private createRoleToggle: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  private viewRoleToggle: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  private updateRoleToggle: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  private userProfileToggle: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  private filterToggler: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  private sortToggler: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  // Toggle delete user btn
  toggle() {
    this.toggler.next(!this.toggler.value);
    console.log("delete: " + this.toggler.value);
  }

  setDeletingToggle(toggle: Boolean) {
    this.toggler.next(toggle);
  }

  getToggleValue(): Observable<Boolean> {
    return this.toggler;
  }

  toggleFilter() {
    this.filterToggler.next(!this.filterToggler.value);
  }

  getFilterValue(): Observable<Boolean> {
    return this.filterToggler;
  }
  toggleSort() {
    this.sortToggler.next(!this.sortToggler.value);
  }

  getSortValue(): Observable<Boolean> {
    return this.sortToggler;
  }

  // Create user modal toggle at user management
  toggleCreateUser() {
    this.createUserToggle.next(!this.createUserToggle.value);
    console.log("create user: " + this.createUserToggle.value);
  }
  getToggleCreateUser() {
    return this.createUserToggle;
  }

  // Create Role modal toggle 
  toggleCreateRole() {
    this.createRoleToggle.next(!this.createRoleToggle.value);
    console.log("create role: " + this.createRoleToggle.value);
  }
  getToggleCreateRole() {
    return this.createRoleToggle;
  }

  // View Role modal toggle 
  toggleViewRole() {
    this.viewRoleToggle.next(!this.viewRoleToggle.value);
    console.log("view role: " + this.viewRoleToggle.value);
  }
  getToggleViewRole() {
    return this.viewRoleToggle;
  }

  //update role
  toggleUpdateRole() {
    this.updateRoleToggle.next(!this.updateRoleToggle.value);
    console.log("Update role: " + this.updateRoleToggle.value);
  }
  getToggleUpdateRole() {
    return this.updateRoleToggle;
  }

  // Toggle User profile
  toggleUserProfile() {
    this.userProfileToggle.next(!this.userProfileToggle.value);
    console.log("Profile user: " + this.userProfileToggle.value);
  }
  getToggleUserProfile() {
    return this.userProfileToggle;
  }
}
