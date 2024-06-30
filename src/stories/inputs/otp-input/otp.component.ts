import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutoFocusDirective } from '../../../app/components/Authentication/directives/auto-focus.directive';


@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AutoFocusDirective],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent implements OnInit {

  str1!: string;
  str2!: string;
  str3!: string;
  str4!: string;
  str5!: string;
  str6!: string;
  email!: string | undefined;
  otp: string = '';
  errorExist: boolean = false;
  resendOTPBool!: Boolean;
  resendOtpMsg!: string;
  spinner!: Boolean

  formVerification = new FormGroup({
    verificationCode1: new FormControl(''),
    verificationCode2: new FormControl(''),
    verificationCode3: new FormControl(''),
    verificationCode4: new FormControl(''),
    verificationCode5: new FormControl(''),
    verificationCode6: new FormControl(''),
  });
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.resendOTPBool = false;
    this.spinner = false;
  }
  ngDoCheck(): void { }
  ngOnInit(): void {
    this.email = sessionStorage?.getItem('email')?.slice(0, 4).concat("************");

    this.formVerification = this.formBuilder.group({
      verificationCode1: ['', [Validators.required, Validators.maxLength(1)]],
      verificationCode2: ['', [Validators.required, Validators.maxLength(1)]],
      verificationCode3: ['', [Validators.required, Validators.maxLength(1)]],
      verificationCode4: ['', [Validators.required, Validators.maxLength(1)]],
      verificationCode5: ['', [Validators.required, Validators.maxLength(1)]],
      verificationCode6: ['', [Validators.required, Validators.maxLength(1)]],
    });
  }

  removeErrorExit() {
    this.errorExist = false;
  }

}
