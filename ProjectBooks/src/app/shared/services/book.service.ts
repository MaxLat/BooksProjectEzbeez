import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject , Subject} from 'rxjs';
import {Books} from '../models/Books.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {


  constructor(private HttpClient : HttpClient) { }

  addBook(newBook : Books) : Observable<any>
  {
    let token = localStorage.getItem("jwt");
   return this.HttpClient.post<Books>('/api/addbook', newBook , { headers : { 'authorization' : token }})
  }

  getbooks() : Observable<any>
  {
    let token = localStorage.getItem("jwt");
   return this.HttpClient.get<Books[]>('/api/getbooks', { headers : { 'authorization' : token }}).pipe(tap((res) => {
     console.log(res);

   }));
  }

  getbook(id) : Observable<any>
  {
  
   let token = localStorage.getItem("jwt");
   return this.HttpClient.get<Books[]>('/api/getbook/' + id, { headers : { 'authorization' : token }})
  }

  editbook(id , newBook) : Observable<any>
  {
  
   let token = localStorage.getItem("jwt");
   return this.HttpClient.post<Books[]>('/api/editbook/' + id, newBook , { headers : { 'authorization' : token }})
  }

  removebook(id) : Observable<any>
  {
    let token = localStorage.getItem("jwt");
    return this.HttpClient.get<Books[]>('/api/removebook/' + id,  { headers : { 'authorization' : token }})
  }
}
