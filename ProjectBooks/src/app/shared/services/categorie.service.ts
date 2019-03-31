import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject , Subject} from 'rxjs';
import {Categorie} from '../models/Categorie.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  

  constructor(private HttpClient : HttpClient) { }

  addCategorie(newCategorie : Categorie) : Observable<any>
  {
    let token = localStorage.getItem("jwt");
   return this.HttpClient.post<Categorie>('/api/addcategorie', newCategorie , { headers : { 'authorization' : token }})
  }

  getCategories() : Observable<any>
  {
    let token = localStorage.getItem("jwt");
    return this.HttpClient.get<Categorie[]>('/api/getcategories', { headers : { 'authorization' : token }}).pipe(tap((res) => {
     console.log(res);

   }));
  }

  removeCategorie(id) : Observable<any>
  {
    let token = localStorage.getItem("jwt");
    return this.HttpClient.get<Categorie[]>('/api/removecategorie/' + id,  { headers : { 'authorization' : token }})
  }
}
