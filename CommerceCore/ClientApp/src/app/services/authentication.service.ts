import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router, @Inject('BASE_URL') private baseUrl: string) {
  }
    
    //If we add an exclamation mark in front, it will give us true if it doesn't exist and if add another, it'll give us true if it does exist since it's a double negative.
    get isAuthenticated(){
        return !!localStorage.getItem('token');
    }

    register(credentials){
      this.http.post<any>(this.baseUrl + 'api/account', credentials).subscribe(res => {
            this.authenticate(res);
        });
    }

    login(credentials){
      this.http.post<any>(this.baseUrl + 'api/account/login', credentials).subscribe(res => {
            this.authenticate(res);
        });
    }

    logout(){
        localStorage.removeItem('token');
    }

    authenticate(res){
        localStorage.setItem('token', res);
        this.router.navigate(['/']);
    }
}
