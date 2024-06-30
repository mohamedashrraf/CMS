import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../interfaces/role';
import { environment } from '../../../../../../environments/environment';
import { NewRole } from '../interfaces/new.role';
import { GetAllRoles } from '../../../add-user/interfaces/getAllRoles';
import { UserPermissionsRoles } from '../interfaces/user.permissions';
import { IconList } from '../interfaces/icon.list';
import { ViewRole } from '../interfaces/view.role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  _HttpClient = inject(HttpClient);

  // GET
  getRoles(
    status?: Boolean,
    filterColumn?: string,
    filterValue?: string,
    pageNumber?: number,
    pageSize?: number,
    startDate?: string,
    endDate?: string
  ): Observable<Role> {
    if (status && filterColumn && filterValue && !startDate && !endDate) {
      return this._HttpClient.get<Role>(
        `${environment.BASEURL}api/UserRole/AllRoles?StatusId=${status}&FilterColumn=${filterColumn}&FilterValue=${filterValue}`
      );
    }
    else if (status && filterColumn && filterValue && startDate && endDate) {


      return this._HttpClient.get<Role>(
        `${environment.BASEURL}api/UserRole/AllRoles?StatusId=${status}&FilterColumn=${filterColumn}&FilterValue=${filterValue}&Page=${pageNumber}&PageSize=${pageSize}`
      );
    }

    // if (!startDate && !endDate) {
    //   return this._HttpClient.get<Role>(`${environment.BASEURL}api/UserRole/AllRoles?StatusId=${status}&FilterColumn=${filterColumn}&FilterValue=${filterValue}`
    //   );
    // }

    else if (status && filterColumn && !filterValue) {
      if (!endDate) {
        return this._HttpClient.get<Role>(
          `${environment.BASEURL}api/UserRole/AllRoles?StatusId=${status}&FilterColumn=${filterColumn}&StartDate=${startDate}`
        );
      } else {
        return this._HttpClient.get<Role>(
          `${environment.BASEURL}api/UserRole/AllRoles?StatusId=${status}&FilterColumn=${filterColumn}&StartDate=${startDate}&EndDate=${endDate}`
        );
      }
    }

    else if (status && pageNumber && pageSize) {
      return this._HttpClient.get<Role>(`${environment.BASEURL}api/UserRole/AllRoles?StatusId=${status}&Page=${pageNumber}&PageSize=${pageSize}`);
    } else if (status) {
      return this._HttpClient.get<Role>(`${environment.BASEURL}api/UserRole/AllRoles?StatusId=${status}&Page=1&PageSize=8`);
    } else if (pageNumber && pageSize) {
      return this._HttpClient.get<Role>(`${environment.BASEURL}api/UserRole/AllRoles?StatusId=${status}&Page=${pageNumber}&PageSize=${pageSize}`);
    }
    else {
      return this._HttpClient.get<Role>(
        `${environment.BASEURL}api/UserRole/AllRoles?StatusId=${status}&Page=1&PageSize=8`
      );
    }

  }

  getAllRoles(): Observable<GetAllRoles> {
    return this._HttpClient.get<GetAllRoles>(`${environment.BASEURL}api/UserRole/RolesList`);
  }

  getAllIcons(): Observable<IconList> {
    return this._HttpClient.get<IconList>(`${environment.BASEURL}api/UserRole/RoleIcons`);
  }

  getAllRolesBySearch(searchColumn?: string, searchValue?: string): Observable<Role> {
    return this._HttpClient.get<Role>(`${environment.BASEURL}api/UserRole/RoleById?SearchColumn=${searchColumn}&SearchValue=${searchValue}`);
  }

  getUserPermission(): Observable<UserPermissionsRoles[]> {
    return this._HttpClient.get<UserPermissionsRoles[]>(`${environment.BASEURL}api/UserRole/ModuleWithPermissions`);
  }


  getRolesById(roleId: string): Observable<ViewRole> {
    return this._HttpClient.get<ViewRole>(
      `${environment.BASEURL}api/UserRole/ViewRole?roleId=${roleId}`
    );
  }

  getRolesBySearch(
    searchColumn?: string,
    searchValue?: string
  ): Observable<Role> {
    return this._HttpClient.get<Role>(
      `${environment.BASEURL}api/UserRole/AllRoles?SearchColumn=${searchColumn}&SearchValue=${searchValue}`
    );
  }

  getRolesByFilter(
    filterColumn?: string,
    filterValue?: string,
    startDate?: string,
    endDate?: string
  ): Observable<Role> {
    if (!startDate && !endDate) {
      return this._HttpClient.get<Role>(
        `${environment.BASEURL}api/UserRole/AllRoles?FilterColumn=${filterColumn}&FilterValue=${filterValue}`
      );
    } else if (!filterValue) {
      if (!endDate) {
        return this._HttpClient.get<Role>(
          `${environment.BASEURL}api/UserRole/AllRoles?FilterColumn=${filterColumn}&StartDate=${startDate}`
        );
      } else {
        // if (!endDate) {
        //   endDate = startDate;
        // }
        return this._HttpClient.get<Role>(
          `${environment.BASEURL}api/UserRole/AllRoles?FilterColumn=${filterColumn}&StartDate=${startDate}&EndDate=${endDate}`
        );
      }
    } else {
      return this._HttpClient.get<Role>(
        `${environment.BASEURL}api/UserRole/AllRoles`
      );
    }
  }

  // POST
  createRole(newRole: NewRole): Observable<any> {
    return this._HttpClient.post<any>(
      `${environment.BASEURL}api/UserRole/CreateRole`,
      newRole
    );
  }

  updateRole(newRole: NewRole): Observable<any> {
    return this._HttpClient.put<any>(
      `${environment.BASEURL}api/UserRole/UpdateRole`,
      newRole
    );
  }

  deleteRole(roleId: string): Observable<any> {
    return this._HttpClient.delete<any>(
      `${environment.BASEURL}api/UserRole/DeleteRole?roleId=${roleId}`

    );
  }

  changeActivation(roleId: String, status: Boolean): Observable<any> {
    return this._HttpClient.put<any>(
      `${environment.BASEURL}/api/UserRole/ChangeActivateRole?roleId=${roleId}&activated=${status}`
      , {});
  }
}
