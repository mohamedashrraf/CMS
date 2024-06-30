import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Post } from '../Interfaces/post';
import { GlobalResponse } from '../Interfaces/generic';

@Injectable({
  providedIn: 'root',
})
export class ApiBlogService {
  // blogs:any[] = [];
  constructor(private httpClient: HttpClient) { }

  getAllPosts(
    status?: string,
    filterColumn?: string,
    FilterValue?: number
  ): Observable<GlobalResponse<Post[]>> {
    if (!FilterValue && !filterColumn && !status) {
      return this.httpClient.get<GlobalResponse<Post[]>>(
        `${environment.BASEURL}api/Post/AllPosts`
      );
    } else if (!FilterValue && !filterColumn && status) {
      return this.httpClient.get<GlobalResponse<Post[]>>(
        `${environment.BASEURL}api/Post/AllPosts?Status=${status}`
      );
    } else {
      return this.httpClient.get<GlobalResponse<Post[]>>(
        `${environment.BASEURL}api/Post/AllPosts?Status=${status}&filterColumn=${filterColumn}&FilterValue=${FilterValue}`
      );
    }
  }

  getPostsBySearch(
    searchColumn?: string,
    searchValue?: string
  ): Observable<Post[]> {
    return this.httpClient.get<Post[]>(
      `${environment.BASEURL}api/Post/AllPosts?SearchColumn=${searchColumn}&SearchValue=${searchValue}`
    );
  }

  //     getPostsByFilterDate(startDate?: string, endDate?: string, FilterColumn?:string): Observable<Post[]> {
  //     return this.httpClient.get<Post[]>(`${environment.BASEURL}api/Post/AllPosts?FilterColumn=${FilterColumn}&StartDate=${startDate}&EndDate=${endDate}`);
  // }

  getPostsByFilter(
    filterColumn?: string,
    filterValue?: string,
    startDate?: string,
    endDate?: string
  ): Observable<Post[]> {
    if (!startDate && !endDate) {
      return this.httpClient.get<Post[]>(
        `${environment.BASEURL}api/Post/AllPosts?FilterColumn=${filterColumn}&FilterValue=${filterValue}`
      );
    } else if (!filterValue) {
      if (!endDate) {
        return this.httpClient.get<Post[]>(
          `${environment.BASEURL}api/Post/AllPosts?FilterColumn=${filterColumn}&StartDate=${startDate}`
        );
      } else {
        // if (!endDate) {
        //   endDate = startDate;
        // }
        return this.httpClient.get<Post[]>(
          `${environment.BASEURL}api/Post/AllPosts?FilterColumn=${filterColumn}&StartDate=${startDate}&EndDate=${endDate}`
        );
      }
    } else {
      return this.httpClient.get<Post[]>(
        `${environment.BASEURL}api/Post/AllPosts`
      );
    }
  }

  getPostsBySort(
    sortColumn?: string,
    isDescending?: boolean
  ): Observable<Post[]> {
    return this.httpClient.get<Post[]>(
      `${environment.BASEURL}api/Post/AllPosts?SortColumn=${sortColumn}&IsDescending=${isDescending}`
    );
  }

  unpublishPost(postId: string): Observable<any> {
    return this.httpClient.put<any>(
      `${environment.BASEURL}api/Post/UnPublishedPost?postId=${postId}`,
      {}
    );
  }

  publishPost(postId: string): Observable<any> {
    return this.httpClient.put<any>(
      `${environment.BASEURL}api/Post/PublishedPost?postId=${postId}`,
      {}
    );
  }

  deletePost(postId: string): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.BASEURL}api/Post?id=${postId}`,
      {}
    );
  }
}

