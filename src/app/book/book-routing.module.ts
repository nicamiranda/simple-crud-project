import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './pages/book-list/book-list.component';
import { RouterModule, Routes } from '@angular/router';
import { BookFormComponent } from './pages/book-form/book-form.component';

const routes: Routes = [
{
  path: "",
  component: BookListComponent,
},
{
  path: "form",
  component: BookFormComponent,
},
{
  path: "form/:id",
  component: BookFormComponent,
}

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class BookRoutingModule { }
