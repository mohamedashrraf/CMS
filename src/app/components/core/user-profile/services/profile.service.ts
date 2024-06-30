import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { UserDetails } from '../interfaces/user-details';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  _HttpClient = inject(HttpClient);


  userDetails(): Observable<UserDetails> {
    return this._HttpClient.get<UserDetails>(`${environment.BASEURL}api/UserManagment/UserDetails`);
  }
}
