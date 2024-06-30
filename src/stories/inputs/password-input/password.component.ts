import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordInputComponent implements OnInit {

  showPassword!: Boolean;
  passwordType!: string;
  inpTextForm!: FormGroup;
  @ViewChild('password') password!: ElementRef;
  @Input('inp') inp!: string;

  constructor() {
    this.showPassword = false;
    this.passwordType = "password";
  }

  ngOnInit(): void { }

  showPasswordToggle() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.passwordType = "text";
    } else {
      this.passwordType = "password";
    }

  }

}
