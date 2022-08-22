import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router : Router, public sharedService : SharedService) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
