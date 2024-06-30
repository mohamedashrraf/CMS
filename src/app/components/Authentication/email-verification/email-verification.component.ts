import { Component, DoCheck, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { AuthService } from '../auth/auth.service';
import { AutoFocusDirective } from '../directives/auto-focus.directive';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule, AutoFocusDirective, SpinnerComponent],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css',
  animations: [
    trigger('flipInOut', [
      transition(':enter', [
        animate('1s', style({ transform: 'rotateY(90deg)' })),
      ]),
      transition(':leave', [
        animate('1s', style({ transform: 'rotateY(180deg)' })),
      ]),
    ]),
  ],
})
export class EmailVerificationComponent implements OnInit, DoCheck {
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

  paramEmail!: string;
  paramToken!: string;

  public slides: string[] = [
    'assets/images/illustration-signup.svg',
    'assets/images/Frame 1000016152.svg',
  ];

  formVerification = new FormGroup({
    verificationCode1: new FormControl(''),
    verificationCode2: new FormControl(''),
    verificationCode3: new FormControl(''),
    verificationCode4: new FormControl(''),
    verificationCode5: new FormControl(''),
    verificationCode6: new FormControl(''),
  });
  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this.resendOTPBool = false;
    this.spinner = false;
  }
  ngDoCheck(): void { }
  ngOnInit(): void {
    this.email = sessionStorage?.getItem('email')?.slice(0, 4).concat("************");

    console.log(this._ActivatedRoute.snapshot.queryParamMap.get('token'));


    if (this._ActivatedRoute.snapshot.queryParamMap.get('token') && this._ActivatedRoute.snapshot.queryParamMap.get('email')) {
      this._ActivatedRoute.queryParamMap.subscribe({
        next: (res) => {
          console.log(res);
          sessionStorage.setItem('token', res.get('token')!);
          sessionStorage.setItem('email', res.get('email')!);
        }
      })
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

  // send otp
  verificationSubmit() {
    this.spinner = true;
    if (this.formVerification.invalid) {
      this.spinner = false;
      console.log(this.formVerification);
      return;
    }

    this.otp = `${this.str1}${this.str2}${this.str3}${this.str4}${this.str5}${this.str6}`;
    this._authService.resetVerificationCode(this.otp).subscribe({
      next: (res) => {
        this.spinner = false;
        sessionStorage.setItem('token', res.token);
        this._Router.navigateByUrl('/auth/setnewpassword');
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
    this.resendOTPBool = true;
    this.spinner = true;
    this._authService.ResendOTPForgetPassword().subscribe({
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
      }
    })
  }

  removeErrorExit() {
    this.errorExist = false;
  }
}
