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
  public static loginData: any;

  constructor(
    private http:HttpClient,
    private userService: UserService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    try{
      await this.userService.authenticateUser(this.username, this.password).subscribe(data => {
        if(data){
          LoginPageComponent.loginData = data;
          this.router.navigate(['/home']);
          return LoginPageComponent.loginData;
        }
        else{
          alert("Error: incorrect username or password.")

        }
      });
    }
    catch(HTTPErrorResponse){
      alert("Error: incorrect username or password.");
    }
  }

  onSignup() {
    this.router.navigate(['/sign-up']);
  }
}
