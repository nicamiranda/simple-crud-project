import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginurl = `${environment.url}/login`;
  registerurl = `${environment.url}/register`;
  
  constructor(private http : HttpClient) { }

  proceedLogin(user:any){
    return this.http.post(this.loginurl, user);
  }

  GetToken(){
    return localStorage.getItem('token')||'';
   }

}
