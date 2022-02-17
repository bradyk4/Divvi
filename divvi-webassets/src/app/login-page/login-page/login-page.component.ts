import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import {Router} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    this.userService.getUsers().subscribe(data => {
      console.log(data)
    });

    //this.userService.postUser(this.username, 0, 1, this.password)
  }

  onSignup() {
    this.router.navigate(['/sign-up']);
  }
}
