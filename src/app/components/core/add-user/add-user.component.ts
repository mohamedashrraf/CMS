import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { CardModalComponent } from '../../../shared/pop-up-card/card-modal/card-modal.component';
import { ToggleDeleteModalService } from '../../../services/toggleModal/toggle-delete-modal.service';
import { CommonModule } from '@angular/common';
import { GetAllRoles } from './interfaces/getAllRoles';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PasswordDirective } from '../../Authentication/directives/password.directive';
import { RoleService } from '../management/manage-roles/services/role.service';


@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule, PasswordDirective, CardModalComponent, CommonModule, FontAwesomeModule,
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {
  // INPUTS && VIEWCHILDS
  @ViewChild('imgHiddenInp') imgHiddenInp!: ElementRef;
  @Output() onAddUser: EventEmitter<{ formdata: any, selectedImage: File }> = new EventEmitter<{ formdata: FormData, selectedImage: File }>();

  // VARS
  isavailable!: Boolean;
  addAccountModal!: Boolean;
  rolesList!: GetAllRoles;
  selectedRole!: string;
  selectedRoleIcon!: string;
  addUser!: FormGroup;
  errorExit: Boolean = false;
  toggleSelectMenu: Boolean = false;
  faEye = faEye;
  faEyaSlash = faEyeSlash;
  passwordHint: boolean = false;
  selectedImage!: File;
  selectedImageUrl: string | ArrayBuffer | null = null;

  constructor(private element: ElementRef, private _FormBuilder: FormBuilder, private _RolesService: RoleService, private _ToggleAddModalService: ToggleDeleteModalService) {
    this.selectedRole = '';
    this.selectedRoleIcon = '';
  }

  ngOnInit(): void {
    this.fb();
    this._RolesService.getAllRoles().subscribe({
      next: (res) => { this.rolesList = res; },
      error: (err) => {
        console.log(err);
      }
    })

    this._ToggleAddModalService.getToggleCreateUser().subscribe({
      next: (toggler) => {
        this.isavailable = toggler;
      }
    })
  }

  fb() {
    this.addUser = this._FormBuilder.group({
      FullName: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.pattern(`^[A-Za-z\\s]*$`)
      ],
      ],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [
        Validators.required,
        Validators.maxLength(40),
        Validators.minLength(8),
        Validators.pattern(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
        ),
      ],
      ],
      ConfirmPassword: ['', Validators.required],
      RoleId: ['', Validators.required],
      ImageProfile: [''],
    },
      { validator: this.validateAreEqual('Password', 'ConfirmPassword') }
    )
  }

  validateAreEqual(pass: string, confimPass: string) {
    return (group: FormGroup) => {
      const password = group.controls[pass];
      const confimPassword = group.controls[confimPass];
      if (password.value !== confimPassword.value) {
        confimPassword.setErrors({ passwordMismatch: true });
      } else {
        confimPassword.setErrors(null);
      }
      console.log();

    };
  }

  uploadProfileImage(fileEvent: any) {
    const file = (fileEvent.target.files as FileList)[0];
    this.selectedImage = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImageUrl = reader.result;
    };
    reader.readAsDataURL(this.selectedImage);
    console.log(this.selectedImage);
  }

  selectRole(role: any) {
    this.addUser.patchValue({ RoleId: role.roleId });
    this.selectedRole = role.roleName
    this.selectedRoleIcon = role.roleIconPath
  }

  // Toggle select menu
  toggleMenu() {
    this.toggleSelectMenu = !this.toggleSelectMenu;
  }


  close() {
    this._ToggleAddModalService.toggleCreateUser();
  }

  showPass: boolean = false;
  showPassword() {
    this.showPass = !this.showPass;
  }

  showConfirmPass: boolean = false
  showConfirmPassword() {
    this.showConfirmPass = !this.showConfirmPass
  }

  unshowPassAfter2S(event: any) {
    const ele = this.element.nativeElement as HTMLInputElement;
    setTimeout(() => {
      ele.type = 'text'
    }, 2000)
  }

  test() {
    this.passwordHint = !this.passwordHint;
  }

  checkPasswordLength(controlName: string) {
    if (this.addUser.get(controlName)?.value) {
      if (+this.addUser.get(controlName)?.value.length > 40)
        this.addUser.get(controlName)?.patchValue(this.addUser.get(controlName)?.value.slice(0, 40));
    }
  }

  shooww(event: any, controlName: string) {
    this.addUser.get(controlName)?.patchValue(event)
  }

  AddUser() {
    console.log(this.addUser);
    this.onAddUser.emit({ formdata: this.addUser.value, selectedImage: this.selectedImage });
  }

}
