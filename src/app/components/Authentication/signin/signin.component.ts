import { CommonModule } from '@angular/common';
import { Component, DoCheck, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuthService } from '../auth/auth.service';
import { ILogin } from '../../../interfaces/logininterface';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PasswordDirective } from '../directives/password.directive';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';


export interface CardData {
  state: "default" | "flipped" | "matched";
}


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule, FontAwesomeModule, PasswordDirective, SpinnerComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
  animations: [
    trigger("cardFlip", [
      state(
        "*",
        style({
          transform: "rotateY(-90deg)"
        })
      ),
      state(
        "flipped",
        style({
          transform: "rotateY(0deg)"
        })
      ),
      state(
        "default",
        style({
          transform: "rotateY(90deg)"
        })
      ),
      transition("* => flipped", [animate("1000ms")]),
      transition("default => *", [animate("1000ms")]),
    ])
  ]
})
export class SigninComponent implements OnInit, DoCheck, OnDestroy {

  Index: number = 1;
  submitted: boolean = false;
  passwordHint: boolean = false;
  eyeshow: boolean = false;
  uppercase: boolean = false;
  specialChar: boolean = false;
  Number: boolean = false;
  numberLength: boolean = false;
  signInRequest: ILogin = {} as ILogin;
  faEye = faEye;
  faEyaSlash = faEyeSlash;
  errorExit: boolean = false;
  resendOTPBool!: Boolean;
  resendOtpMsg!: string;
  spinner!: Boolean

  data: CardData = {
    state: "flipped"
  };


  constructor(private formBuilder: FormBuilder,
    private _authService: AuthService,
    private _Router: Router) {
    this.spinner = false;
    this.resendOTPBool = false;
  }

  formInfo = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngDoCheck(): void { }


  ngOnInit(): void {
    this.formInfo = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
        ],
      ],

    });
  }


  Submit() { //login
    this.submitted = true;
    if (this.formInfo.invalid) {
      console.log(this.formInfo);
      return;
    }
    const fv = this.formInfo.value!;
    this.signInRequest = {
      email: fv.email?.toString() ?? '',
      password: fv.password?.toString() ?? '',
    }

    this._authService.Login(this.signInRequest).subscribe({
      next: (res) => {


        console.log(res);
        this._authService.saveUserSession(res);
        this._authService.setUser(res);

        this._Router.navigateByUrl('/cms');
        // this._Router.navigate(['/cms'], { skipLocationChange: true }) If you want to use only one route for the user to see
      },
      error: (err) => {
        // console.log(err);
        this.errorExit = true;
      }
    });
  }

  checkbox() {
    localStorage.setItem('email', this.formInfo.controls.email?.toString() ?? '');
    localStorage.setItem('password', this.formInfo.controls.password?.toString() ?? '');
  }

  showConfirmPass: boolean = false
  showConfirmPassword() {
    this.showConfirmPass = !this.showConfirmPass
  }

  showPass: boolean = false;
  showPassword() {
    this.showPass = !this.showPass;
  }

  checkPasswordLength(controlName: string) {
    if (this.formInfo.get(controlName)?.value) {
      if (+this.formInfo.get(controlName)?.value.length > 40)
        this.formInfo.get(controlName)?.patchValue(this.formInfo.get(controlName)?.value.slice(0, 40));
    }
  }

  clearErrorExit() {
    this.errorExit = false;
  }

  shooww(event: any, controlName: string) {
    this.formInfo.get(controlName)?.patchValue(event)
  }

  ngOnDestroy(): void {
    this.data.state = "default";
  }
}
