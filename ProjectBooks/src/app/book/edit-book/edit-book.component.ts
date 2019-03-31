import { Component, OnInit } from '@angular/core';
import { BookService} from '../../shared/services/book.service'
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {Books} from "../../shared/models/Books.model";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  addBookForm : FormGroup;
  books : Books;
  error_code : number;
  title_error = "";
  bookId : string;

  constructor(private BookService : BookService , private formBuilder : FormBuilder , private router : Router , private route : ActivatedRoute) { }

  ngOnInit() {
    this.bookId = this.route.snapshot.params['id'];
    console.log(this.bookId);
    this.initForm()
    this.BookService.getbook(this.bookId).subscribe((res) => {
      console.log(res[0].note);
      this.addBookForm.setValue({
        titre : res[0].titre,
        categories : [""],
        note : res[0].note,
        resume : res[0].resume
      });

      //permet d'ajouter les valeurs a du tableau categorie dans le form
      this.addBookForm.setControl('categories' , this.formBuilder.array(res[0].categories || []));
      

    
    })
  }

  initForm()
  {
    this.addBookForm = this.formBuilder.group({
      titre : ['', [Validators.required ]],
      resume : ['' , [Validators.required ]],
      categories : this.formBuilder.array([]),
      note : ['' ,[ Validators.required , Validators.pattern('^([0-9]\d*)(?:\.[5]?)?$')]],

    });

    // res[0].array.forEach(element => {
      
    // });
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

    this.BookService.editbook(this.bookId , this.books).subscribe((res) => {
      console.log(res);
      this.title_error = '';
      if(res.nModified == 1)
      {
        this.router.navigate(['books']);
      }
      if(res.nModified == 0)
      {
        this.title_error = 'le livre n\'a pas été modifié , le titre est soit deja utilisé soit aucun changement a été fait';
      }

    } , (err) => {
      console.log(err); 

    });

  }


}
