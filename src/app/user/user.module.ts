import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormComponent } from './components/form/form.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../material-design.module';

@NgModule({
  declarations: [
    ProfileComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialDesignModule
  ],
  exports: [ProfileComponent]
})
export class UserModule { }
