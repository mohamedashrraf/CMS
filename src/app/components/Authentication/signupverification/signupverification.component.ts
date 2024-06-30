import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { AutoFocusDirective } from '../directives/auto-focus.directive';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
// import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-signupverification',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TitleCasePipe,
    AutoFocusDirective,
    SpinnerComponent
  ],
  templateUrl: './signupverification.component.html',
  styleUrl: './signupverification.component.css',
})
export class SignupverificationComponent implements OnInit {
  str1!: string;
  str2!: string;
  str3!: string;
  str4!: string;
  str5!: string;
  str6!: string;
  errorExist!: boolean;
  str: string = '';
  email!: string | undefined;
  sessionStorage!: string | undefined;
  resendOTPBool!: Boolean;
  resendOtpMsg!: string;
  spinner!: Boolean

  public slides: string[] = [
    'assets/images/verification-rightside.svg',
  ];


  formVerification = new FormGroup({
    verificationCode1: new FormControl(''),
    verificationCode2: new FormControl(''),
    verificationCode3: new FormControl(''),
    verificationCode4: new FormControl(''),
    verificationCode5: new FormControl(''),
    verificationCode6: new FormControl(''),
  });
  slidIndex: any = 0;

  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private _Router: Router,
  ) {
    this.resendOTPBool = false;
    this.spinner = false;
    this.errorExist = false;
  }
  ngOnInit(): void {
    this.email = sessionStorage?.getItem('email')?.slice(0, 4).concat("************");
    if (!this.email) {
      this._Router.navigate(['/auth/signup']);
    }
    this.formVerification = this.formBuilder.group({
      verificationCode1: ['', [Validators.required, Validators.maxLength(1)]],
      verificationCode2: ['', [Validators.required, Validators.maxLength(1)]],
      verificationCode3: ['', [Validators.required, Validators.maxLength(1)]],
      verificationCode4: ['', [Validators.required, Validators.maxLength(1)]],
      verificationCode5: ['', [Validators.required, Validators.maxLength(1)]],
      verificationCode6: ['', [Validators.required, Validators.maxLength(1)]],
    });
  }

  verificationSubmit() {
    this.spinner = true;
    if (this.formVerification.invalid) {
      this.spinner = false;
      console.log(this.formVerification);
      return;
    }
    this.str = `${this.str1}${this.str2}${this.str3}${this.str4}${this.str5}${this.str6}`;
    this._authService.verificationCode(this.str).subscribe({
      next: (res) => {
        this.spinner = false;
        sessionStorage.clear();
        this._Router.navigateByUrl('/auth/signin');
      },
      error: (err) => {
        this.spinner = false;
        this.errorExist = true;
        this.resendOTPBool = false;
      },
    });
  }

  resendOTP() {
    this.errorExist = false;
    this.resendOTPBool = false;
    this.spinner = true;
    this._authService.resendOTP().subscribe({
      next: (res: any) => {
        this.spinner = false;
        this.resendOTPBool = true;
        this.resendOtpMsg = res.message;
      },
      error: (err) => {
        this.errorExist = false;
        this.spinner = false;
        this.resendOTPBool = true;
        this.resendOtpMsg = err.error.message;
      },
    });
  }

  removeErrorExit() {
    this.errorExist = false;
  }

  showSlides(i = this.slidIndex) {
    let silde = this.slides[i];
    return silde;
  }
}
