import { Component, OnInit } from '@angular/core';
import { BookService} from '../../shared/services/book.service'
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {Books} from "../../shared/models/Books.model";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategorieService } from 'src/app/shared/services/categorie.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  addBookForm : FormGroup;
  books : Books;
  error_code : number;
  title_already_use = "";
  categories : Observable<any>

  constructor(private BookService : BookService , private formBuilder : FormBuilder , private router : Router , private categorieService : CategorieService ) {
   }

  ngOnInit() {
    this.initForm();
    this.categories = this.categorieService.getCategories();
    
  }

  initForm()
  {
    this.addBookForm = this.formBuilder.group({
      titre : ['', [Validators.required ]],
      resume : ['' , [Validators.required ]],
      categories : this.formBuilder.array([]),
      note : ['' ,[ Validators.required , Validators.pattern('^([0-9]\d*)(?:\.[5]?)?$')]],

    });

    this.onAddCategory();
  }

  getCategories(): FormArray {
    return this.addBookForm.get('categories') as FormArray;
  }

  onAddCategory() {
    const newCategoryControl = this.formBuilder.control(null, Validators.required);
    this.getCategories().push(newCategoryControl);
}

  onSubmit()
  {
    this.books = {
      titre : this.addBookForm.get('titre').value ,
      resume : this.addBookForm.get('resume').value,
      categories : this.addBookForm.get('categories').value,
      note :  this.addBookForm.get('note').value,
      userId : ""
    };

    console.log(this.books);

    this.BookService.addBook(this.books).subscribe((res) => {
      console.log(res);
      this.title_already_use = '';
      if(res.insert)
      {
        this.router.navigate(['books']);
      }

    } , (err) => {
      console.log(err);

      this.error_code = err.error.ErrorCode;

      if(this.error_code == 11000)
      {
        this.title_already_use = "Ce titre est deja dans la base de donnée";
      }

    });

  }

}
