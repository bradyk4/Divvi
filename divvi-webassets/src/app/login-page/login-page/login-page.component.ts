import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import {Router} from '@angular/router';
import { AuthenticationServiceService } from 'src/app/services/authentication-service/authentication-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  username: any;
  password: any;

  constructor(
    private http:HttpClient,
    private userService: UserService,
    private router:Router,
    private authenticationService: AuthenticationServiceService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.username, this.password);
    this.router.navigate(['/home']);
  }

}
