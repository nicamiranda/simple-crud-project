import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderInterceptor } from 'src/app/core/interceptor/header.interceptor';
import { SharedService } from 'src/app/shared/shared.service';
import { environment } from 'src/environments/environment';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  hide: boolean = false;
  users : any = [];
  responsedata: any;
  loginurl = `${https://json-server-seven-mock.herokuapp.com}/login`;

  constructor(private lf : FormBuilder,
              private router: Router,
              private loginService : LoginService,
              private sharedService : SharedService,
              private http : HttpClient) { 


    this.loginForm = this.lf.group(
      {
        email : ["", [Validators.compose([Validators.required, Validators.email])]],
        password: ["", [Validators.required, Validators.minLength(6)]]
      }
    );

  }

  ngOnInit() : void {
    this.sharedService.hide();
  }

  onLogin() {
    if (!this.loginForm.valid) {
      alert("Account does not exist");
      return ;
    }
    console.log("User is Valid");

    this.http.post(this.loginurl, this.loginForm.getRawValue(), {withCredentials: true})
      .subscribe((res: any) => {
        HeaderInterceptor.accessToken = res.token;
        localStorage.setItem('token',HeaderInterceptor.accessToken);
        this.router.navigate(['blog']);
      });
  }

  goToRegister() {
    this.router.navigate(['register']);
  }
}


