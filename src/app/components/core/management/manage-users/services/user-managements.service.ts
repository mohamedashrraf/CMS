import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../../../environments/environment';
import { ManageUser } from '../../../../../interfaces/manage-user';

@Injectable({
  providedIn: 'root'
})
export class UserManagementsService {

  IsDescending: boolean = false;

  constructor(private _HttpClient: HttpClient) { }

  /** GET */
  getAllUsers(userStatus?: string, filterColumn?: string, filterValue?: string, pageNumber?: number, pageSize?: number): Observable<ManageUser[]> {
    if (userStatus && filterColumn && filterValue) {
      return this._HttpClient.get<ManageUser[]>(`${environment.BASEURL}api/UserManagment/AllUsers?StatusId=${userStatus}&FilterColumn=${filterColumn}&FilterValue=${filterValue}`);
    } else if (filterColumn && filterValue) {
      return this._HttpClient.get<ManageUser[]>(`${environment.BASEURL}api/UserManagment/AllUsers?StatusId=0&FilterColumn=${filterColumn}&FilterValue=${filterValue}`);
    } else if (userStatus && pageNumber && pageSize) {
      return this._HttpClient.get<ManageUser[]>(`${environment.BASEURL}api/UserManagment/AllUsers?StatusId=${userStatus}&Page=${pageNumber}&PageSize=${pageSize}`);
    } else if (userStatus) {
      return this._HttpClient.get<ManageUser[]>(`${environment.BASEURL}api/UserManagment/AllUsers?StatusId=${userStatus}&Page=1&PageSize=8`);
    } else if (pageNumber && pageSize) {
      return this._HttpClient.get<ManageUser[]>(`${environment.BASEURL}api/UserManagment/AllUsers?StatusId=0&Page=${pageNumber}&PageSize=${pageSize}`);
    } else
      return this._HttpClient.get<ManageUser[]>(`${environment.BASEURL}api/UserManagment/AllUsers?StatusId=0&FilterColumn=${filterColumn}&FilterValue=${filterValue}&Page=${pageNumber}&PageSize=${pageSize}`);
  }


  getUsersByFilter(
    filterColumn?: string,
    filterValue?: string,
    startDate?: string,
    endDate?: string
  ): Observable<ManageUser[]> {
    if (!startDate && !endDate) {
      return this._HttpClient.get<ManageUser[]>(
        `${environment.BASEURL}api/UserManagment/AllUsers?FilterColumn=${filterColumn}&FilterValue=${filterValue}`
      );
    } else if (!filterValue) {
      if (!endDate) {
        return this._HttpClient.get<ManageUser[]>(
          `${environment.BASEURL}api/UserManagment/AllUsers?FilterColumn=${filterColumn}&StartDate=${startDate}`
        );
      } else {
        // if (!endDate) {
        //   endDate = startDate;
        // }
        return this._HttpClient.get<ManageUser[]>(
          `${environment.BASEURL}api/UserManagment/AllUsers?FilterColumn=${filterColumn}&StartDate=${startDate}&EndDate=${endDate}`
        );
      }
    } else {
      return this._HttpClient.get<ManageUser[]>(
        `${environment.BASEURL}api/UserManagment/AllUsers`
      );
    }
  }

  getAllUsersWithPagination(pageNumber: number, pageSize: number): Observable<ManageUser[]> {
    return this._HttpClient.get<ManageUser[]>(`${environment.BASEURL}api/UserManagment/AllUsers?Page=${pageNumber}&PageSize=${pageSize}`);
  }

  getAllUsersBySearch(searchColumn?: string, searchValue?: string): Observable<ManageUser[]> {
    return this._HttpClient.get<ManageUser[]>(`${environment.BASEURL}api/UserManagment/AllUsers?SearchColumn=${searchColumn}&SearchValue=${searchValue}`);
  }
  getUserAnalytics(): Observable<{ totalCount: number, activateUsers: number, deactivateUsers: number }> {
    return this._HttpClient.get<{ totalCount: number, activateUsers: number, deactivateUsers: number }>(`${environment.BASEURL}api/UserManagment/UsersAnalytics`)
  }
  changeUserActivation(userId: string, userStatus: string): Observable<any> {
    return this._HttpClient.get<any>(`${environment.BASEURL}api/UserManagment/ChangeUserActivation/${userId}?userStatus=${userStatus}`)
  }
  getUserDetails(): Observable<any> {
    return this._HttpClient.get<any>(`${environment.BASEURL}api/UserManagment/UserDetails`)
  }
  getUserActivity(): Observable<any> {
    return this._HttpClient.get<any>(`${environment.BASEURL}api/UserManagment/UserActivity`)
  }
  resendInvitation(userId: string): Observable<any> {
    return this._HttpClient.get<any>(`${environment.BASEURL}api/UserManagment/ResendInvitaion?UserId=${userId}`)
  }


  /** POST */
  createUser(formData: FormData): Observable<any> {
    return this._HttpClient.post<any>(`${environment.BASEURL}api/UserManagment/CreateUser`, formData);
  }


  /** PUT */

  updateUser(fullname: string, phone: string, ImageProfile: any): Observable<any> {
    return this._HttpClient.put(`${environment.BASEURL}api/UserManagment/UpdateUser?FullName=${fullname}&PhoneNumber=${phone}`, ImageProfile);
  }
  updateUserPassword(currenetPassword: string, newPassword: string, confirmNewPassword: string): Observable<any> {
    return this._HttpClient.put(`${environment.BASEURL}api/UserManagment/UpdateUser`, { currenetPassword, newPassword, confirmNewPassword });
  }
  updateUserAsSuperAdmin(userId: string, roleId: string, fullName: string, phone: string): Observable<any> {
    return this._HttpClient.put(`${environment.BASEURL}api/UserManagment/UpdateUserAsSuperAdmin`, { userId, roleId, fullName, phone });
  }


  /** DELETE */
  deleteUserAsSuperAdmin(userId: string): Observable<any> {
    return this._HttpClient.delete(`${environment.BASEURL}api/UserManagment/DeleteUserAsSuperAdmin?userId=${userId}`);
  }

}
