import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToggleThemeService {

  private changeTheme$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  constructor(private _HttpClient: HttpClient) { }

  ngOnInit(): void {
    // this._HttpClient.get(`${environment.BASEURL}`).subscribe({
    //   next: (res: any) => {
    //     this.changeTheme$.next(res.theme);
    //   }
    // })
  }

  changeBehavoirSubject() {
    this.changeTheme$.next(!this.changeTheme$.value);
  }

  getTheme(): Observable<Boolean> {
    return this.changeTheme$;
  }

}
