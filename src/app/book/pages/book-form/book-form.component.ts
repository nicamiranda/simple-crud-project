import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { Book } from '../../models/book';
import { BookService } from '../../service/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  authorsFormArray: FormArray;
  bookData: Book[] = [];
  bookitem : Book = <Book>{};
  showAddBtn = this.bookService.showAddBtn;
  showUpdateBtn = this.bookService.showUpdateBtn;
  updatedBook: Subscription | undefined;
  bookId: any;
  upBook: Subscription | undefined;
  bookModel:any;
  bookDetails:any;
  
  constructor(private bf: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private routes: ActivatedRoute,
    public sharedService : SharedService) { 
   
  this.routes.paramMap.subscribe( paramMap => {
    this.bookId = paramMap.get("id");
  })

  this.bookForm = this.bf.group({
    name: [""],
    authors: this.bf.array([""]),
    isbn: [""],
    img: [""],
  });
 this.authorsFormArray = this.bookForm.get('authors') as FormArray
 
    this.updatedBook = this.bookService.updateBook(parseInt(this.bookId)).subscribe(book => {
    this.bookForm = this.bf.group({
    name: book[0].name,
    authors: this.bf.array(book[0].authors),
    isbn: book[0].isbn,
    img: book[0].img,
  })
    this.authorsFormArray = this.bookForm.get("authors") as FormArray
  }) 
  }
  

  ngOnInit(): void {
    this.sharedService.show();
    this.getAllBookDetails();
    this.bookForm.valueChanges.subscribe((data) => {
      console.log(data);
  })
 }

 getAllBookDetails() {
  this.bookService.getBooks().subscribe(booklist=>{
    this.bookDetails = booklist;
  // }, err=>{
  //   console.log(err);
  })
}

 addNewBook() {
  this.showAddBtn = true;
  this.showUpdateBtn = false;
  this.bookModel = Object.assign({}, this.bookForm.value);

  this.bookService.addBook(this.bookModel).subscribe(res=>{
    alert("Book Item added successfully");
    let close = document.getElementById('close');
    close?.click();
    this.bookForm.reset();
    this.router.navigate(['book']);
  // }, err=>{
  //   alert("Error in adding a new blog");
  })
}

 updateBook() {
  this.showAddBtn = false;
  this.showUpdateBtn = true;
  this.bookModel = Object.assign({}, this.bookForm.value);

  this.bookService.editBook(this.bookModel).subscribe(res=>{
    alert("Blog information updated successfully");
    let close = document.getElementById('close');
    close?.click();
    this.bookForm.reset();
    this.bookModel={};
    this.router.navigate(['book']);
    // }, err=>{
    // alert("Error in adding a new blog");
  })
}

addAuthor() {
  this.authorsFormArray.push(new FormControl(""));
}

deleteAuthor(i: number) {
  this.authorsFormArray.removeAt(i);
}

}