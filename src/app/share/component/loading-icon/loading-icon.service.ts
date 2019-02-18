import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingIconService {
  private loadingSubject = new Subject<boolean>();

  constructor() { }

  getLoading(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }
  loading(showLoading: boolean) {
    this.loadingSubject.next(showLoading);
  }
}
