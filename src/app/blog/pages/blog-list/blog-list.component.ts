import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../service/blog.service';
import { Blog } from '../../models/blog';
import { SharedService } from 'src/app/shared/shared.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit { 
  public blogs: Blog[] = [];

  constructor(private blogService: BlogService,
    public sharedService : SharedService ) {
    
   }
  
  ngOnInit() : void {
    this.sharedService.show();
    this.getAllBlogs();
    
  }

  getAllBlogs() {
    this.blogService.getBlogs().subscribe(bloglist => {
      this.blogs = bloglist
    });
  }

  executeEdit(blog:Blog) {
    this.blogService.showAddBtn = false;
    this.blogService.showUpdateBtn = true;
    this.blogService.editBlogForm(blog.id, this.blogs)
    console.log(blog.id);
  }

  executeDelete(blog:Blog){
    console.log(blog.id);
       forkJoin([this.blogService.deleteBlog(blog),
       this.blogService.getBlogs()])
       .subscribe( data => {
         alert("Book Card Deleted Successfully")
         this.blogs = data[1]
         this.getAllBlogs();
       })
     }

   executeAdd() {
      this.blogService.showAddBtn = true;
      this.blogService.showUpdateBtn = false;
    }

   executeDeleteAll(blog:Blog) {
      console.log("All items are deleted");
      for(let blog of this.blogs){
        this.executeDelete(blog)
      }
    }


   }
