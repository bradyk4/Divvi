import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page/login-page.component';
import { SignUpComponent } from './sign-up-page/sign-up/sign-up.component';
import { HomeComponent } from './home-page/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sign-up', component: SignUpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
