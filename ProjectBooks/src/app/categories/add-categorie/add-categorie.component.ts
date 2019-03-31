import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/shared/models/Categorie.model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/shared/services/categorie.service';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent implements OnInit {

  addCategorieForm : FormGroup;
  categorie : Categorie;
  error_code : number;
  title_already_use = "";

  constructor( private categorieService : CategorieService , private formBuilder : FormBuilder , private router : Router) { }

  ngOnInit() {
    this.initForm();
  }


  initForm()
  {
    this.addCategorieForm = this.formBuilder.group({
      label : ['', [Validators.required ]],
    });

  }

  onSubmit()
  {
    this.categorie = {
      label : this.addCategorieForm.get('label').value ,
      
    };

    console.log(this.categorie);

    this.categorieService.addCategorie(this.categorie).subscribe((res) => {
      console.log(res);
      this.title_already_use = '';
      if(res.insert)
      {
        this.router.navigate(['categories']);
      }

    } , (err) => {
      console.log(err);

      this.error_code = err.error.ErrorCode;

      if(this.error_code == 11000)
      {
        this.title_already_use = "Cette categorie est deja dans la base de donnée";
      }

    });

  }


}
