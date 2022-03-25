import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import {Router} from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { CreateGroupDialogComponent } from 'src/app/create-group-dialog/create-group-dialog.component';
import { MatDialog } from '@angular/material/dialog';


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
  groupId!: number;
  confirmation!: boolean;
  isGroup!: boolean;
  groupNumber!: number;
  data: any;
 

  constructor(
    private http:HttpClient,
    private userService: UserService,
    private groupService: GroupService,
    private router:Router,
    public dialog: MatDialog
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
        this.isGroup = true;
        this.groupId = group.id;
        this.userService.postUser(this.username, this.password, 0, this.groupId).subscribe();
        this.router.navigate(['/login']);
      }
      else{
        console.error("No group exists with that name.");
        this.isGroup = false;
    }
    });
    if (this.isGroup == false) {
      const dialogRef = this.dialog.open(CreateGroupDialogComponent, {
        width: '250px',
        height: '250px',
      });
      // grabs dialog data on close
      dialogRef.afterClosed().subscribe((result) => {
        this.confirmation = result.data;
        this.groupNumber = result.groupNum;
        if (this.confirmation == true){
          this.groupService.postGroup(this.groupName, this.groupNumber).subscribe(data => {
            this.data = data;
            this.groupId = this.data.group.id;
            this.userService.postUser(this.username, this.password, 0, this.groupId).subscribe();
          });
          this.router.navigate(['/login']);
          return;
        }
        else if (this.confirmation == false) {
          return;
        }
    });
    }
    else {
      return;
    }
  }

}
