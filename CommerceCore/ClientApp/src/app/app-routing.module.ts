import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { RegisterComponent } from './account/register.component';
import { LoginComponent } from './account/login.component';
import { FacebookLoginComponent } from './account/facebook-login.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'facebook-login', component: FacebookLoginComponent }
  //{ path: '', redirectTo: '', pathMatch: 'full' },//anytime user navigates to root take them to books, use pathMach whenever using redirecting
  //{ path: '**', redirectTo: '', pathMatch: 'full' }// '**' (wild card) when a user navigates to route that isn't defined , ie: 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
