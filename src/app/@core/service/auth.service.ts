import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  constructor(private http: HttpClient, private localStorage: StorageService) { }
  login(user: User): Observable<any> {
    let paramStr = 'username' + '=' + user.username;
    return this.http.post('api/uaa/wisdomLogin', paramStr, {
      headers: new HttpHeaders().set('Authorization', 'Basic cmVzb3VyY2Utc2VydmVyOnJvb3Q=-server')
        .set('Content-type', 'application/x-www-form-urlencoded')
    });
  }
  setToken(token){
    this.localStorage.set('token',token);
  }
  getToken(){
    return this.localStorage.get('token');
  }
  getTokenValue(){
    this.token=this.localStorage.get('token');
  }
  removeTOken(){
    this.localStorage.remove('token');
  }
  isLogin():boolean{
    this.getTokenValue();
    let isLogin:boolean;
    if(this.token){
      isLogin=true;
    }else{
      isLogin=false
    }
    return isLogin;
  }
  getUserName():Observable<any>{
    this.getTokenValue();
    let token;
    if(this.token){
      token=this.token.substring(7,this.token.length);
    }
    return this.http.post('/api/system/user/getUserByToken', {'token': token});
  }
  signOut(username):Observable<any>{
    return this.http.get(`api/uaa/login/logout?userName=${username}`);
  }
}

export interface User {
  username: string;
  password: any;
}
