import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from './../services/authentication.service'
import { CustomValidatorService } from './../shared/custom-validators';


@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  form : any;
  constructor(private authApi : AuthenticationService, private FB : FormBuilder, customValidaors : CustomValidatorService) {
      this.form = FB.group({
        email:['', [Validators.required, customValidaors.emailValid()]],
        password:['', Validators.required],
        confirmPassword:['', Validators.required]
      }
      ,{ validator: customValidaors.matchingFields('password', 'confirmPassword')}
      
      );
   }

   register(){
      this.authApi.register(this.form.value);
    }
}
