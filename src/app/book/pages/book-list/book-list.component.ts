import { Component, OnInit } from '@angular/core';
import { BookService } from '../../service/book.service';
import { Book } from '../../models/book';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  public books: Book[] = [];

  constructor(private bookService: BookService,
    private router : Router,
    public sharedService : SharedService ) {}

  ngOnInit(): void {
    this.sharedService.show();
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService.getBooks().subscribe(booklist => {
      this.books = booklist
    });
  }

  executeEdit(book:Book) {
    this.bookService.showAddBtn = false;
    this.bookService.showUpdateBtn = true;
    this.bookService.editBookForm(book.id, this.books)
    console.log(book.id);
  }

  executeAdd(){
    this.bookService.showAddBtn = true;
    this.bookService.showUpdateBtn = false;
  }

  executeDelete(book:Book){
   console.log(book.id);
      forkJoin([this.bookService.deleteBook(book),
      this.bookService.getBooks()])
      .subscribe( data => {
        alert("Book Card Deleted Successfully")
        this.books = data[1]
        this.getAllBooks();
      })
    }

    executeDeleteAll(book : Book) {
      console.log("All items are deleted");
      for(let book of this.books){
        this.executeDelete(book)
      }
    }

  }