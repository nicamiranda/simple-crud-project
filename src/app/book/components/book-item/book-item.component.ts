import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent implements OnInit {
  @Input() book : Book | undefined;
  @Output() editEmitter = new EventEmitter<Book>();
  @Output() deleteEmitter = new EventEmitter<Book>();

  constructor() { }
  
  ngOnInit(): void {}

  edit() {
    this.editEmitter.emit(this.book);
  }

  delete() {
    this.deleteEmitter.emit(this.book);
  }

}