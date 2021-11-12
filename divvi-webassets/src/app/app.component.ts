import { Component, OnInit, Inject, OnChanges, SimpleChange } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { UserCreationComponent } from './user-creation/user-creation.component';
import {MatDialogModule} from "@angular/material/dialog";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {HttpClient} from '@angular/common/http';
import { UserService } from './services/user.service';
import { GroupService } from './services/group.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  constructor(private http : HttpClient, private userService: UserService, private groupService: GroupService) {}
  title = 'Divvi';
  user: any;
  users: any;
  selectedGroup: any;
  groups: any;
  groupUsers: any;
  name: any;
  groupID: any;
  id: any;

  ngOnInit(): void {
    this.users = this.getUsers();
    this.groups = this.getGroups();
    this.groupUsers = this.getGroupUsers(1);
  }

public group: Array<{username: string, amountOwed: number}> = [];
  public username!: string;
  public amountOwed!: number;
  public payment!: number;
  public expense!: number;
  public Splitpayment!: number;
  public groupSize: number = 0;
  public fixedamt!: number;
  public percent!: number;
  addUser: boolean = false;
  alert: boolean = false;
  showPayments: boolean = false;
  newExpense: boolean = false;
  evenIsShown: boolean = false ;
  fixedIsShown: boolean = false ;
  percentIsShown: boolean = false ;
  public iterate!: number;
  public expenseName!: string;
  public expenseDesc!: string;
  public pendingTransactions: Array<{groupUsers: string, expenseName: string, expenseDesc: string; payment: number}> =[]


  showUserAddInput(){
    this.addUser = ! this.addUser;
  }

  showPaymentOptions(){
    this.expenseName;
    this.expenseDesc;
    this.payment;
    if(this.expenseDesc == '' || this.expenseName == '' || this.payment == 0 || this.payment == null){
      this.alert = ! this.alert;
      this.expenseName = "";
      this.expenseDesc = "";
      this.payment = 0;
    }
    else{
      this.showPayments = ! this.showPayments;
      
    }
  }

  showNewExpense(){
    this.newExpense = ! this.newExpense;
    this.showPayments = false;
    this.evenIsShown = false;
    this.percentIsShown = false;
    this.fixedIsShown = false;
  }
  cancelShowNewExpense(){
    this.newExpense = false;
    this.showPayments = false;
    this.evenIsShown = false;
    this.percentIsShown = false;
    this.fixedIsShown = false;
    this.expenseName = "";
    this.expenseDesc = "";
    this.payment = 0;

  }

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
    this.groupSize = this.groupUsers.Users.length;
    this.Splitpayment = this.payment / this.groupSize;
    
    this.users.forEach( () => {
      this.pendingTransactions.push( {groupUsers: this.groupUsers, expenseName: this.expenseName, expenseDesc: this.expenseDesc, payment: this.payment} );
    });
    this.newExpense = false;
    this.showPayments = false;
    this.evenIsShown = false;
    this.percentIsShown = false;
    this.fixedIsShown = false;
    this.expenseName = "";
    this.expenseDesc = "";
    this.payment = 0;
    console.log(this.groupUsers.Users)
  }

  Fixedamount(){
    this.Splitpayment = 0;
    for (this.username in this.group)
    {
      this.Splitpayment = this.fixedamt;
    }
    this.users.forEach( () => {
      this.pendingTransactions.push( {groupUsers: this.groupUsers, expenseName: this.expenseName, expenseDesc: this.expenseDesc, payment: this.payment} );
    });
    this.newExpense = false;
    this.showPayments = false;
    this.evenIsShown = false;
    this.percentIsShown = false;
    this.fixedIsShown = false;
    this.expenseName = "";
    this.expenseDesc = "";
    this.payment = 0;
  }

  Percentage(){
    this.Splitpayment = 0;
    for (this.username in this.group)
    {
      this.Splitpayment = this.payment * (this.percent / 100);
    }
    this.users.forEach( () => {
      this.pendingTransactions.push( {groupUsers: this.groupUsers, expenseName: this.expenseName, expenseDesc: this.expenseDesc, payment: this.payment} );
    });
    this.newExpense = false;
    this.showPayments = false;
    this.evenIsShown = false;
    this.percentIsShown = false;
    this.fixedIsShown = false;
    this.expenseName = "";
    this.expenseDesc = "";
    this.payment = 0;
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

  // setup user API functions
  getUsers(){
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      return this.users;
    });
  }

  getUserById(id:number){
    this.userService.getUserById(id).subscribe(data => {
      this.user = data;
      return this.user;
    })
  }

  postUser(name: string, balance: number, groupId: number, id: number){

    this.userService.postUser(name, balance, groupId, id);
  }

  updateUserBalance(id: number, balance: number){
    this.userService.updateUserBalance(id, balance);
  }

  deleteUser(id: number){
    this.userService.deleteUser(id);
  }

  // setup group API functions
  getGroups(){
    this.groupService.getGroups().subscribe(data => {
      this.groups = data;
      return this.groups;
    });
  }

  getGroupUsers(id: number){
    this.groupService.getGroupUsers(id).subscribe(data => {
      this.groupUsers = data;
    });
  }

  getGroup(id: number){
    this.groupService.getGroup(id).subscribe(data => {
      this.selectedGroup = data;
    })
  }

}
