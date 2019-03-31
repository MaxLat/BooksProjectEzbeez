import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { JwtToken } from './shared/models/JwtToken.model';
import { Subscription } from 'rxjs';
import { Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ProjectBooks';
  jwtToken : JwtToken;
  subscription : Subscription;

  constructor(private authService : AuthService , private router : Router)
  {

  }

  ngOnInit()
  {
    this.subscription = this.authService.jwtToken.subscribe((jwtToken) => {
      this.jwtToken = jwtToken
    })
  }

  ngOnDestroy()
  {
    if(this.subscription)
    {
      this.subscription.unsubscribe();
    }
  }

  onLogOut()
  {
    this.authService.logout();
    this.router.navigate(['signin']);
    
  }
}
