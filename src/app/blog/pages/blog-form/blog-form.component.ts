import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { Blog } from '../../models/blog';
import { BlogService } from '../../service/blog.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent implements OnInit {
  blogForm: FormGroup;
  commentsFormArray: FormArray;
  blogData: Blog[] = [];
  blogitem : Blog = <Blog>{};
  showAddBtn = this.blogService.showAddBtn;
  showUpdateBtn = this.blogService.showUpdateBtn;
  blogId: any;
  updatedBlog: Subscription | undefined;
  blogModel:any;
  blogDetails:any;
  

  constructor(private bgf: FormBuilder,
    private blogService : BlogService,
    private router : Router,
    private routes: ActivatedRoute,
    public sharedService : SharedService) {

    this.routes.paramMap.subscribe( paramMap => {
      this.blogId = paramMap.get("id");
    })

    this.blogForm = this.bgf.group({
      id: [],
      title: [""],
      description: [""],
      author: [""],
      img: [""],
      comments: this.bgf.array([""]),
      
    });
   this.commentsFormArray = this.blogForm.get('comments') as FormArray
   
      this.updatedBlog = this.blogService.updateBlog(parseInt(this.blogId)).subscribe(blog => {
      this.blogForm = this.bgf.group({
      id: blog[0].id,
      title: blog[0].title,
      description: blog[0].description,
      author: blog[0].author,
      img: blog[0].img,
      comments : this.bgf.array(blog[0].comments)
    })
      this.commentsFormArray = this.blogForm.get("comments") as FormArray
    }) 

   }

ngOnInit(): void {
  this.sharedService.show();
  this.getAllBlogDetails();
  this.blogForm.valueChanges.subscribe((data) => {
    console.log(data);
  })
}

getAllBlogDetails() {
  this.blogService.getBlogs().subscribe(res=>{
    this.blogDetails = res;
  }, err=>{
    console.log(err);
    
  })
}

addNewBlog() {
  this.showAddBtn = true;
  this.showUpdateBtn = false;
  this.blogModel = Object.assign({}, this.blogForm.value);

  this.blogService.addBlog(this.blogModel).subscribe(res=>{
    alert("Blog Item added successfully");
    let close = document.getElementById('close');
    close?.click();
    this.blogForm.reset();
    this.router.navigate(['blog']);
  // }, err=>{
  //   alert("Error in adding a new blog");
  })
}

updateBlog() {
  this.showAddBtn = false;
  this.showUpdateBtn = true;
  this.blogModel = Object.assign({}, this.blogForm.value);

  this.blogService.editBlog(this.blogModel).subscribe(res=>{
    alert("Blog information updated successfully");
    let close = document.getElementById('close');
    close?.click();
    this.blogForm.reset();
    this.blogModel={};
    this.router.navigate(['blog']);
    // }, err=>{
    // alert("Error in adding a new blog");
  })
}

addComment() {
  this.commentsFormArray.push(new FormControl(''));
}

deleteComment(i: number) {
  this.commentsFormArray.removeAt(i);
}

}
