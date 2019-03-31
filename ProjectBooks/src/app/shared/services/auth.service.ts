import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
import { JwtToken } from '../models/JwtToken.model';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public jwtToken : BehaviorSubject<JwtToken> = new BehaviorSubject({
    isAuthenticated : null ,
    token : null
  });


  constructor(private httpClient : HttpClient) { 
    this.initToken();
  }

  private initToken() : void {
    const token = localStorage.getItem('jwt');
    if(token)
    {
      this.jwtToken.next({
        isAuthenticated : true ,
        token : token
      });
    }
    else 
    {
      this.jwtToken.next({
        isAuthenticated : false,
        token : null
      });
    }
  }

  public signup(email , password) : Observable<any>{

    return this.httpClient.post('/api/signup', {email : email , password : password})
  }

  public signin(email , password) : Observable<any> {

    return this.httpClient.post('/api/signin', {email : email , password : password}).pipe(
      tap( (token) => {
        this.jwtToken.next({
          isAuthenticated : true ,
          token : token.token
        })

        localStorage.setItem('jwt', token.token)

      })
    );
  }

  public logout() : void
  {
    this.jwtToken.next({
      isAuthenticated : false,
        token : null
    });
     localStorage.removeItem('jwt');
  }
}
