import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { UserRegistration } from '../shared/models/user.registration.interface';
import { ConfigService } from '../shared/utils/config.service';
import { BaseService } from "./base.service";
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx'; 
// Add the RxJS Observable operators we need in this app.
import '../rxjs-operators';

@Injectable()
export class AuthenticationService extends BaseService {
  baseUrl: string = '';

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;
  //constructor(private http: HttpClient, private router: Router, @Inject('BASE_URL') private baseUrl: string) {
  //}
  constructor(private http: HttpClient, private configService: ConfigService, private router: Router) {
    super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = configService.getApiURI();
  }
    
    //If we add an exclamation mark in front, it will give us true if it doesn't exist and if add another, it'll give us true if it does exist since it's a double negative.
    get isAuthenticated(){
        return !!localStorage.getItem('token');
    }

  register(credentials): Observable<UserRegistration> {
    debugger;
    var email = credentials.email;
    var password = credentials.password;
    var firstName = "firstName";
    var lastName = "lastName";
    var location = "location";

    let body = JSON.stringify({ email, password, firstName, lastName, location });
    //let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })};
    
    return this.http.post(this.baseUrl + "/account", body, httpOptions)
      .map(res => true)
      .catch(this.handleError);
  }

  login(credentials): Observable<UserRegistration> {
    var userName = credentials.email;
    var password = credentials.password;
    let body = JSON.stringify({ userName, password });
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })};

    return this.http.post<any>(this.baseUrl + '/auth/login', body, httpOptions)
      .map(res => {
        localStorage.setItem('auth_token', res.auth_token);
        this.loggedIn = true;
        this._authNavStatusSource.next(true);
        return true;
      })
      .catch(this.handleError);
    }

    logout(){
        localStorage.removeItem('token');
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  authenticate(res) {
    localStorage.setItem('token', res);
    //this.router.navigate(['/home']);
  }


}
