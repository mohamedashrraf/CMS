import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


import { environment } from '../../../../environments/environment';
import { ISignupRequest } from '../../../interfaces/signupinterface';
import { ILogin } from '../../../interfaces/logininterface';
import { ISignUpResponse } from '../../../interfaces/isign-up-response';
import { AppUser } from '../../../interfaces/app-user';
import { LocalStorageKeys } from '../../../keys/local-storage-keys';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private user$: BehaviorSubject<AppUser> = new BehaviorSubject<AppUser>({
    fullName: "",
    email: "",
    token: "",
    emailConfirmed: "",
    expireDate: "",
    imageProfilePath: '',
    roleName: '',
    paymentState: true,
  });

  constructor(private http: HttpClient, private _Route: Router) { }

  signUp(registerData: ISignupRequest): Observable<ISignUpResponse> {
    return this.http.post<ISignUpResponse>(
      environment.BASEURL + 'api/Authentication/Register',
      registerData
    );
  }

  verificationCode(otp: string): Observable<any> {
    var obj = {
      email: sessionStorage.getItem('email')?.toString(),
      otp: otp.toString(),
      token: sessionStorage.getItem('token')?.toString(),
    };
    return this.http.post(
      `${environment.BASEURL}api/Authentication/ConfirmEmail`,
      obj
    );
  }

  resendOTP() {
    var obj = {
      email: sessionStorage.getItem("email"),
    };
    return this.http.post(
      environment.BASEURL + `api/Authentication/ResendOTP?email=${obj.email}`,
      {}
    );
  }


  ResendOTPForgetPassword() {
    var obj = {
      email: sessionStorage.getItem("email"),
    };
    return this.http.post(
      environment.BASEURL + `api/Authentication/ResendOTPForgetPassword?email=${obj.email}`,
      {}
    );
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  setTokenInSessionStorage(token: string) {
    sessionStorage.setItem('token', token);
  }

  setUser(user: any) {
    const data = {
      email: user.data.email,
      fullName: user.data.fullName,
      expireDate: user.data.expireDate,
      emailConfirmed: user.data.emailConfirmed,
      token: user.data.token,
      imageProfilePath: user.imageProfilePath,
      roleName: user.roleName,
      paymentState: user.paymentState != null ? user.paymentState : true
    }
    this.user$.next(data);
  }

  setUnpaidUser(user: any) {
    const data = {
      email: user.data.email,
      fullName: user.data.fullName,
      expireDate: user.data.expireDate,
      emailConfirmed: user.data.emailConfirmed,
      token: user.data.token,
      paymentState: user.paymentState ? user.paymentState : true
    }
    this.user$.next(data);
  }

  setUserOnBootstrap(user: AppUser) {
    this.user$.next(user);
  }

  getUser(): Observable<AppUser> {
    return this.user$;
  }

  get isLoggedIn(): boolean {
    const userData = localStorage.getItem(LocalStorageKeys.USER_SESSION);

    if (userData) {
      const jsonUserData: AppUser = JSON.parse(userData);
      const token = jsonUserData.token;
      const tokenExpireDate =
        jsonUserData.expireDate;
      return token != null && new Date(tokenExpireDate) >= new Date();
    }
    return false;
  }

  saveUnpaidUserSession(applicationUser: any) {
    const data = {
      email: applicationUser.data.email,
      fullName: applicationUser.data.fullName,
      expireDate: applicationUser.data.expireDate,
      emailConfirmed: applicationUser.data.emailConfirmed,
      token: applicationUser.data.token,
      paymentState: applicationUser.paymentState
    }
    localStorage.setItem(
      'userSession',
      JSON.stringify(data)
    );
  }

  saveUserSession(applicationUser: any) {
    const data = {
      email: applicationUser.data.email,
      fullName: applicationUser.data.fullName,
      expireDate: applicationUser.data.expireDate,
      emailConfirmed: applicationUser.data.emailConfirmed,
      token: applicationUser.data.token,
      imageProfilePath: applicationUser.imageProfilePath,
      roleName: applicationUser.roleName,
      paymentState: applicationUser.paymentState ?? true,
    }
    localStorage.setItem(
      'userSession',
      JSON.stringify(data)
    );
  }

  get Name() {
    if (this.isLoggedIn) {
      let userData = localStorage.getItem(LocalStorageKeys.USER_SESSION);
      if (userData) return (JSON.parse(userData) as AppUser).fullName;
      return null;
    }
    return null;
  }

  get Token() {
    if (this.isLoggedIn) {
      let userData = localStorage.getItem(LocalStorageKeys.USER_SESSION);
      if (userData)
        return (JSON.parse(userData) as AppUser).token;
    }
    return null;
  }

  get getPaymentState() {
    return this.user$.value.paymentState;
  }

  sendMail(email: string): Observable<any> {
    return this.http.post(
      `${environment.BASEURL}api/Authentication/ForgetPassword?email=${email}`,
      {}
    );
  }

  resetVerificationCode(res: string): Observable<any> {
    var obj = {
      email: sessionStorage.getItem('email')?.toString(),
      otp: res.toString(),
      //token: sessionStorage.getItem('token')?.toString(),
    };
    return this.http.post(
      `${environment.BASEURL}api/Authentication/ConfirmForgetPasswordOTP`,
      obj
    );
  }

  Login(request: ILogin): Observable<AppUser> {
    return this.http.post<AppUser>(
      environment.BASEURL + 'api/Authentication/Login',
      request
    );
  }

  forgetPassword(email: string) {
    return this.http.post<any>(
      `${environment.BASEURL}api/Authentication/ForgetPassword?email=${email}`,
      {}
    );
  }

  logout() {
    localStorage.removeItem(LocalStorageKeys.USER_SESSION);
    this._Route.navigate(['/auth/signin']);
    this.user$.next({
      fullName: "",
      email: "",
      token: "",
      emailConfirmed: "",
      expireDate: "",
      imageProfilePath: '',
      roleName: '',
      paymentState: true,
    })
  }

}