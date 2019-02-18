import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // return true;
    let url: string = state.url;
    return this.checkLogin(url);
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
  checkLogin(url: string): boolean {
    // 确认是否登录
    if (this.authService.isLogin()) { return true; }
    // 确认是否token的缓存，如果有则可以登录
    this.router.navigate(['account/session/signin'], { queryParams: { returnUrl: url } });
  }
}
