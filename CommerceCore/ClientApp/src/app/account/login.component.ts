import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service'
import { CustomValidatorService } from './../shared/custom-validators';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  form: any;
  brandNew: boolean;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;

  constructor(private authApi: AuthenticationService, private FB: FormBuilder, customValidaors: CustomValidatorService, private router: Router, private activatedRoute: ActivatedRoute ) {
      this.form = FB.group({
        email:['', [Validators.required, customValidaors.emailValid()]],
        password:['', Validators.required],
      });
  }

  ngOnInit() {

    // subscribe to router event
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        this.brandNew = param['brandNew'];
        this.form.email = param['email'];
      });
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }

  login() {
    debugger;
      //this.authApi.login(this.form.value);
     this.submitted = true;
     this.isRequesting = true;
     this.errors = '';

     this.authApi.login(this.form.value)
       .finally(() => this.isRequesting = false)
       .subscribe(
         result => {
           if (result) {
             this.router.navigate(['/home']);
           }
         },
         error => this.errors = error);
    }
}
