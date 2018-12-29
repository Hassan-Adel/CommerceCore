import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
//services
import { ConfigService } from './shared/utils/config.service';
import { CustomValidatorService } from './shared/custom-validators';
import { AuthenticationService } from './services/authentication.service'
//components
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { RegisterComponent } from './account/register.component';
import { LoginComponent } from './account/login.component'; 
import { SpinnerComponent } from './spinner/spinner.component';
// Dashboard Module Import
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    SpinnerComponent,
    CounterComponent,
    FetchDataComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    DashboardModule 
  ],
  providers: [ConfigService, CustomValidatorService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
