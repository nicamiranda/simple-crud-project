import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    loadChildren: () => import("./login/login.module").then(m => m.LoginModule)
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "blog",
    loadChildren: () => import("./blog/blog.module").then(m => m.BlogModule),
    canActivate:[AuthGuard]
  },
  {
    path: "book",
    loadChildren: () => import("./book/book.module").then(m => m.BookModule),
    canActivate:[AuthGuard]
  },
  {
    path: "profile",
    loadChildren: () => import("./user/user.module").then(m => m.UserModule),
    canActivate:[AuthGuard]
  },
  {path: '**',
   component: LoginComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
