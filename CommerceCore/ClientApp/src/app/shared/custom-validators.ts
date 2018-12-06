import { Injectable } from '@angular/core';
@Injectable()
  export class CustomValidatorService {
        // Matching fields validator
        matchingFields(field1: any, field2: any){
            return (form: any) => {
                if (form.controls[field1].value !== form.controls[field2].value){
                    return { mismatchedFields: true }
                }
            }
        }
        // Search for email regex (regular expression)
        emailValid() {
            return (control: any) => {
                var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        
                return regex.test(control.value) ? null : { invalidEmail: true }
            }
        }
  }