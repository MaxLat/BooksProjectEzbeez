import { Component, OnInit } from '@angular/core';
import {FormBuilder , FormGroup , Validators} from '@angular/forms'
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm : FormGroup;


  constructor(private formBuilder : FormBuilder , private authService : AuthService , private router : Router ) { }

  ngOnInit() {

    this.initForm();

  }

  initForm(){
    this.signupForm = this.formBuilder.group({
      email : ['', [Validators.required , Validators.email]],
      password : ['' , [Validators.required , Validators.pattern(/[0-9a-zA-Z]{6,}/)]]

    })

   
  }

  onSubmit()
  {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;

    this.authService.signup(email , password).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/signin'])

    },(error) => {
      console.log(error);
    })

    console.log(email);
    
    
  }

}
