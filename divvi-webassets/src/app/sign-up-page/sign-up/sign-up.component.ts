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

  constructor(
    private http:HttpClient,
    private userService: UserService,
    private groupService: GroupService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.groups = this.getGroups();
  }

  // setup group API functions
  getGroups(){
    this.groupService.getGroups().subscribe(data => {
      this.groups = data;
      return this.groups;
    });
  }

  onBack() {
    this.router.navigate(['/login']);
  }
  onSubmit() {
    this.username = this.username.toString();
    this.password = this.password.toString();
    this.groupName = this.groupName.toString();

    //assign group name to group id for user creation
    this.groups.forEach((group: any) => {
      // checks that group exists
      if (this.groupName == group.name)
      {
        this.groupId = group.id;
        console.log(this.username, this.password, 0, this.groupId);
        this.userService.postUser(this.username, this.password, 0, this.groupId).subscribe();
      }
      else{
        console.error("No group exists with that name.");
      }
    });

    this.router.navigate(['/login']);
  }

}
