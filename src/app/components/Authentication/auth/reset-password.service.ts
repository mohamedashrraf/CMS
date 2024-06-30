import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IForgetPassRequest } from '../../../interfaces/iforget-pass-request';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  authenticationURL!: string;
  baseURL!: string;

  constructor(private _HttpClient: HttpClient) {
    this.baseURL = environment.BASEURL;
    this.authenticationURL = '/api/Authentication'
  }

  resetPassword(res: IForgetPassRequest): Observable<any> {
    const obj = {
      email: sessionStorage.getItem('email')?.toString(),
      token: sessionStorage.getItem('token')?.toString(),
      // message: sessionStorage.getItem('message')?.toString(),
      newPassword: res.password.toString(),
      confirmNewPassword: res.confirmNewPassword.toString()
    }
    return this._HttpClient.post<any>(`${this.baseURL}api/Authentication/ConfirmForgetPassword`, obj);
  }
}
