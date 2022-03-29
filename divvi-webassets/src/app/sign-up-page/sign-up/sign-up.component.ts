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
  groupName: any;
  groups: any;
  groupId: any;
  user: any;

  constructor(
    private http:HttpClient,
    private userService: UserService,
    private groupService: GroupService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getGroups();
  }

  // setup group API functions
  async getGroups(){
    await this.groupService.getGroups().subscribe(data => {
      this.groups = data;
      return this.groups;
    });
  }

  onBack() {
    this.router.navigate(['/login']);
  }
  async onSubmit() {
    this.username = this.username.toString();
    this.password = this.password.toString();
    this.groupName = this.groupName.toString();

    //assign group name to group id for user creation
    let group = this.groups.find((group: any) => group.name == this.groupName);

    if (group == undefined){
      alert('No group exists with that name: ' + this.groupName);
    }
    else{
      this.groupId = group.id;
      this.userService.postUser(this.username, this.password, 0, this.groupId).subscribe();
    }

    this.router.navigate(['/login']);
  }

}
