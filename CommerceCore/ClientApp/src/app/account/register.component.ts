import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service'
import { CustomValidatorService } from './../shared/custom-validators';


@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  form: any;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;

  constructor(private authApi: AuthenticationService, private FB: FormBuilder, customValidaors: CustomValidatorService, private router: Router) {
      this.form = FB.group({
        email:['', [Validators.required, customValidaors.emailValid()]],
        password: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        location: ['', Validators.required],
        confirmPassword:['', Validators.required]
      }
      ,{ validator: customValidaors.matchingFields('password', 'confirmPassword')}
      
      );
   }

  register() {

    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';

     this.authApi.register(this.form.value)
       .finally(() => this.isRequesting = false)
       .subscribe(
         result => {
           if (result) {
             this.router.navigate(['/login'], { queryParams: { brandNew: true, email: this.form.email } });
           }
         },
         errors => this.errors = errors);
    }
}
