import { Injectable } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class BreadcrumbService {
  private fullPath!: BehaviorSubject<string[]>;
  constructor(private _LocationStrategy: LocationStrategy) {
    this.fullPath = new BehaviorSubject<string[]>([]);
  }

  ngOnInit() {
    this.fullPath.next(this._LocationStrategy.path().split('/'));
  }

  changeCurrentPath() {
    const includesQuestionMark = this._LocationStrategy.path().includes('?');
    if (includesQuestionMark) {
      this.fullPath.next(this._LocationStrategy.path().slice(0, this._LocationStrategy.path().indexOf('?')).split('/'));
    } else {
      this.fullPath.next(this._LocationStrategy.path().split('/'));
    }
  }

  getCurrentPath(): Observable<any> {
     return this.fullPath;
  }
}
