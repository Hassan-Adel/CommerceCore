import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service'

@Component({
  selector: 'app-facebook-login',
  templateUrl: './facebook-login.component.html'
})
export class FacebookLoginComponent {

  private authWindow: Window;
  failed: boolean;
  error: string;
  errorDescription: string;
  isRequesting: boolean;

  launchFbLogin() {
    this.authWindow = window.open('https://www.facebook.com/v2.11/dialog/oauth?&response_type=token&display=popup&client_id=249633702197250&display=popup&redirect_uri=https://localhost:44368/facebook-auth.html&scope=email', null, 'width=600,height=400');
  }

  constructor(private userService: AuthenticationService, private router: Router) {
    if (window.addEventListener) {
      window.addEventListener("message", this.handleMessage.bind(this), false);
    } else {
      (<any>window).attachEvent("onmessage", this.handleMessage.bind(this));
    }
  }

  handleMessage(event: Event) {
    debugger;
    const message = event as MessageEvent;
    // Only trust messages from the below origin.
    //if (message.origin !== "http://localhost:5000") return;
    if (message.origin !== "https://localhost:44368") return;

    try {
      this.authWindow.close();
    }
    catch (Exception)
    {
      // Code to handle exception
    }
    

    const result = JSON.parse(message.data);
    if (!result.status) {
      this.failed = true;
      this.error = result.error;
      this.errorDescription = result.errorDescription;
    }
    else {
      this.failed = false;
      this.isRequesting = true;

      this.userService.facebookLogin(result.accessToken)
        .finally(() => this.isRequesting = false)
        .subscribe(
          result => {
            if (result) {
              this.router.navigate(['/dashboard/home']);
            }
          },
          error => {
            this.failed = true;
            this.error = error;
          });
    }
  }
}
