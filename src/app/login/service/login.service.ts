import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginurl = `${https://json-server-seven-mock.herokuapp.com}/login`;
  registerurl = `${https://json-server-seven-mock.herokuapp.com}/register`;
  
  constructor(private http : HttpClient) { }

  proceedLogin(user:any){
    return this.http.post(this.loginurl, user);
  }

  GetToken(){
    return localStorage.getItem('token')||'';
   }

}
