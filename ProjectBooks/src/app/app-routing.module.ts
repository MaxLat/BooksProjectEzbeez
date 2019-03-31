import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AddBookComponent } from './book/add-book/add-book.component';
import { EditBookComponent } from './book/edit-book/edit-book.component';
import { CategorieListComponent } from './categories/categorie-list/categorie-list.component';
import { AddCategorieComponent } from './categories/add-categorie/add-categorie.component';

const routes: Routes = [
  {path :'signup' , component : SignupComponent},
  {path :'signin' , component : SigninComponent},
  {path :'books',canActivate : [AuthGuard] , component : BookListComponent},
  {path : "addbook" , canActivate : [AuthGuard] , component : AddBookComponent},
  {path : "editbook/:id" , canActivate : [AuthGuard] , component : EditBookComponent},
  {path : "categories" , canActivate : [AuthGuard] , component : CategorieListComponent},
  {path : "addcategorie" , canActivate : [AuthGuard] , component : AddCategorieComponent},

  {path : '' , component : SigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
