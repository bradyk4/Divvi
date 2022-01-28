import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import {Router} from '@angular/router';

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
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.username, this.password);
    this.router.navigate(['/home']);
  }

}
