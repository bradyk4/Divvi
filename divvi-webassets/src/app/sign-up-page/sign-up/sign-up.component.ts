import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  username: any;
  password: any;
  groupName: any;

  constructor(
    private http:HttpClient,
    private userService: UserService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }


  onBack() {
    this.router.navigate(['/login']);
  }
  onSubmit() {
    this.username = this.username.toString();
    this.password = this.password.toString();
    let groupId: number = 1;
    this.userService.postUser(this.username, this.password, 0, groupId).subscribe();

    this.router.navigate(['/login']);
  }

}
