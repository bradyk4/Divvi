import { Component, OnInit, Inject, OnChanges, SimpleChange } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { UserCreationComponent } from './user-creation/user-creation.component';
import {MatDialogModule} from "@angular/material/dialog";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  constructor(private http : HttpClient) {}

  title = 'Divvi';
  users: any = [];
  groups: any = [];
  groupUsers: any = [];

  ngOnInit(): void {
    this.getUsers();
    this.getGroups();
    this.getGroupUsers(1);
  }

public group: Array<{username: string, amountOwed: number}> = [];
  public username!: string;
  public amountOwed!: number;
  public payment!: number;
  public Splitpayment!: number;
  public groupSize!: number;
  public fixedamt!: number;
  public percent!: number;
  evenIsShown: boolean = false ;
  fixedIsShown: boolean = false ;
  percentIsShown: boolean = false ;
  public iterate!: number;

  toggleEvenShow() {

    this.fixedIsShown = false;
    this.percentIsShown = false;
    this.evenIsShown = ! this.evenIsShown;

  }
  toggleFixedShow() {
    this.evenIsShown = false;
    this.percentIsShown = false;
    this.fixedIsShown = ! this.fixedIsShown;

  }

  togglePercentShow() {
    this.fixedIsShown = false;
    this.evenIsShown = false;
    this.percentIsShown = ! this.percentIsShown;

  }

createTable(){
  this.amountOwed = 0;
  this.group.push( {username: this.username, amountOwed: this.Splitpayment} );
  this.username = "";
}

  Evenly(){
    this.groupSize = this.group.length;
    this.Splitpayment = this.payment / this.groupSize;
  }

  Fixedamount(){
    this.Splitpayment = 0;
    for (this.username in this.group)
    {
      this.Splitpayment = this.fixedamt;
    }
  }

  Percentage(){
    this.Splitpayment = 0;
    for (this.username in this.group)
    {
      this.Splitpayment = this.payment * (this.percent / 100);
    }
  }

  clearAmountOwed(){
    for (this.username in this.group)
    {
      this.Splitpayment = 0;
    }

  }

  clearGroup(){
    this.group.length = 0;
  }

  // API response handling
  getUsers(){
    this.http.get('http://localhost:8090/api/users')
      .subscribe(data => {
        console.log(data);
        this.users = data;
      });
  }

  getGroups(){
    this.http.get('http://localhost:8090/api/groups')
      .subscribe(data => {
        console.log(data);
        this.groups = data;
      })
  }

  getGroupUsers(id: number){
    this.http.get('http://localhost:8090/api/groups/users/' + id)
      .subscribe(data => {
        console.log(data);
        this.groupUsers = data;
      });
  }
}
