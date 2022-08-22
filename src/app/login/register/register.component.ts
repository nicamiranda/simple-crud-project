import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup;
  hide: boolean = false;
  registerurl = `${https://json-server-seven-mock.herokuapp.com}/register`;
  
  constructor(private rf : FormBuilder, private router: Router, private authService : AuthService, private http : HttpClient) {
    this.registerForm = this.rf.group(
      {
        firstname : ["", [Validators.required]],
        lastname: ["", [Validators.required]],
        email : ["", [Validators.compose([Validators.required, Validators.email])]],
        password: ["", [Validators.required, Validators.minLength(6)]]
      }
    );
  }

  ngOnInit(): void {
  }

  onRegister() {

      this.http.post(this.registerurl, this.registerForm.getRawValue())
      .subscribe(() => {
        this.router.navigate(['login']);
      });
      
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

}
