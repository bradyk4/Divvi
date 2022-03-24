import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  username: any;
  password: any;
  users: any;
  userId:any;

  constructor(
    private router:Router,
    private userService: UserService,
    ) { }

  ngOnInit(): void {
    this.users = this.getUsers();
  }

  // setup user API functions
  getUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      return this.users;
    });
  }

  async onSubmit() {
    try {
      let user = this.users.find((user: any) => user.name == this.username);
      this.userId = user.id;

      await this.userService.updateUserPassword(this.userId, this.password).subscribe();
      this.router.navigate(['/login']);
    }
    catch(err){
      alert('An error occured when resetting password. Please try again. ' + err)
    }
  }

}
