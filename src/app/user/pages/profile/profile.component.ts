import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  checked = false;
  
  constructor(private pf: FormBuilder, public sharedService : SharedService ) { 
    this.profileForm = this.pf.group ({
      name: [""],
      email: [""],
      bio: [""],
      active: [""]
    })
  }

  ngOnInit(): void {
    this.sharedService.show();
    this.profileForm.valueChanges.subscribe((data) => {
        console.log(data);
      })
  }

  submit() {
    console.log(this.profileForm.value);
  }

}
