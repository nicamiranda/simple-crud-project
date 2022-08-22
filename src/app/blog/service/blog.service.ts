import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subscription, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Blog } from '../models/blog';

@Injectable({
  providedIn: 'root'
})

export class BlogService {
  blogs: Blog[] = [];
  blogurl = "https://nica-mockapi-json-server.herokuapp.com/blogs";
  showUpdateBtn!: boolean;
  showAddBtn!: boolean;

  // blogs: Blog[] = []
  //   {
  //     id: 1,
  //     title: "Book Riot",
  //     description: "Book Riot is the largest independent editorial book site in North America"+
  //                  "and home to a host of media, from podcasts to newsletters to original content,"+
  //                  "all designed around diverse readers and across all genres.",
  //     author: "Riot New Media Group",
  //     comments: ["Always Books"," Never Boring"]
  //   },
  //   {
  //     id: 2,
  //     title: "The Chrysalis BREW Project",
  //     description: "An Australia-based award-winning platform. This is where you would find thoughts, words, photos, videos,"+
  //                  "and other ideas in the realm of Books, Reviews, and Everything Written (BREW).",
  //     author: "Susan Frances",
  //     comments: ["Power of the Written Word"," Top Australian and Global book blog"]
  //   },
  //   {
  //     id: 3,
  //     title: "Amazon Book Review",
  //     description: "The Amazon Book Review, formerly known as Omnivoracious is a large book blog"+
  //                  "managed by four different editors. It’s updated practically every day with at"+
  //                  "least two new articles.It is one of the most comprehensive book blog out there",
  //     author: "Amazon",
  //     comments: ["Always hot off the press"," sheer variety"]
  //   }
  // ];

  constructor(private http : HttpClient) {}

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.blogurl).pipe(tap((blogs: Blog[]) => {
      return blogs;
    }));
  }

  addBlog(blog:any){
    return this.http.post<any>(this.blogurl, blog);
  }

  editBlog(blog : any){
    return this.http.put(`${this.blogurl}/${blog.id}`, blog)
  }

  editBlogForm(id: number, blog : Blog[]){
    return this.http.get<Blog[]>(this.blogurl).pipe(
      map((blog: Blog[]) => {
        return blog.filter( x => 
          x.id === id  
          )
      }))
  }

  updateBlog(id: number){
    return this.http.get<Blog[]>(this.blogurl).pipe(
      map((blog: Blog[]) => {
        return blog.filter( blog => 
          blog.id === id )
      }));
  }

  deleteBlog(blog: Blog) {
    return this.http.delete(`${this.blogurl}/${blog.id}`);
  }
 
}
