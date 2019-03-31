import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { BookService } from 'src/app/shared/services/book.service';
import {Books} from '../../shared/models/Books.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  token : string;
  books : Observable<any[]>
  constructor(private httpClient : HttpClient , private bookService : BookService , private router : Router) { }

  ngOnInit() {
    this.token = localStorage.getItem('jwt');

    this.books = this.bookService.getbooks();
  }

  onEdit(bookId)
  {
    console.log(bookId);
    this.router.navigate(['/editbook', bookId ]);
  }

  onRemove(bookId)
  {
    console.log(this.books);
    this.bookService.removebook(bookId).subscribe(
      (res) => {
        this.books = this.bookService.getbooks();
    })
  }

}
