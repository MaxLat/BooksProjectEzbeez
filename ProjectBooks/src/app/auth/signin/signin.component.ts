import { Component, OnInit } from '@angular/core';
import {FormBuilder , FormGroup , Validators} from '@angular/forms'
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Router} from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm : FormGroup;
  error : string;

  constructor(private formBuilder : FormBuilder , private httpClient : HttpClient 
    , private router : Router , private authService : AuthService ) { }

  ngOnInit() {

    this.initForm();
  }

  initForm(){
    this.signinForm = this.formBuilder.group({
      email : ['', [Validators.required , Validators.email]],
      password : ['' , [Validators.required , Validators.pattern(/[0-9a-zA-Z]{6,}/)]]

    })

   
  }

  onSubmit()
  {
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;

    this.authService.signin(email , password).subscribe((response) => {
      this.router.navigate(['books']);
    },(error) => {
      console.log(error);
      this.error = "Votre email ou votre mot de passe ne sont pas correct";
    })

    console.log(email);
    
    
  }

}
