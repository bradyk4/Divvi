import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  username: any;
  password: any;
  groupname: any;

  constructor(
    private http:HttpClient,
    private userService: UserService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.username = this.username.toString();
    this.password = this.password.toString();
    let balance: number = 0;
    let groupId: number = 1;
    this.userService.postUser(this.username, this.password, balance, groupId).subscribe();

    this.router.navigate(['/login']);
  }

}
