import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import {Router} from '@angular/router';
import { GroupService } from 'src/app/services/group.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  username: any;
  password: any;
  groups: any;
  groupId: any;
  users: any;

  constructor(
    private http:HttpClient,
    private userService: UserService,
    private groupService: GroupService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }


  async getUsers(){
    await this.userService.getUsers().subscribe((data) => {
      this.users = data;
      return this.users;
    });
  }

  onBack() {
    this.router.navigate(['/login']);
  }
  onSubmit() {
    this.username = this.username.toString();
    this.password = this.password.toString();

    let user = this.users.find((user: any) => user.name == this.username);
    if (user == undefined){
      this.userService.postUser(this.username, this.password, 0, 0).subscribe();
      this.getUsers();
    }
    else{
      alert('User with that name already exists. Please try again.')
    }

    this.router.navigate(['/login']);
  }

}
