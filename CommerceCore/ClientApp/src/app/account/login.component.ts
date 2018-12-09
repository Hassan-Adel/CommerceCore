import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from './../services/authentication.service'
import { CustomValidatorService } from './../shared/custom-validators';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  form : any;
  constructor(private authApi : AuthenticationService, private FB : FormBuilder, customValidaors : CustomValidatorService) {
      this.form = FB.group({
        email:['', [Validators.required, customValidaors.emailValid()]],
        password:['', Validators.required],
      });
   }

   login(){
      this.authApi.login(this.form.value);
    }
}
