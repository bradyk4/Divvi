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
  updateBalance: any;

  // this method gets group #1, and the users within the group
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
  public fixedamt: any = [];
  public percent: any = [];
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


  // this method is the framework to check user entry - if expense Name, Description, or payment is blank or 0 then the payment options will not show and it will 
  // require the user to re-enter their values.
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


  // The following 4 methods is how we show which inputs / payment options we want to show. We call these on click when a user wants to split a payment, and when the user
  // chooses how they want to split their payment (evenly, fixed, or percentage)
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


  // This Evenly function splits the payment, and pushes values to the database and the pending transactions table
  Evenly(){
    this.groupSize = this.groupUsers.Users.length;
    this.Splitpayment = this.payment / this.groupSize;

  
    this.users.forEach( (user:any) => {
      var balance = this.payment / this.groupSize;
      this.pendingTransactions.push( {groupUsers: user.name, expenseName: this.expenseName, expenseDesc: this.expenseDesc, payment: balance} );
      user.balance += this.payment/ this.groupSize;
      this.updateUserBalance(user.id, user.balance);
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


  // The fixed amount method reads each payment for each user. The user ID is read on click in the HTML using the index and for each user in the group, the amount entered
  // is read and pushed to the pending transactions table and the database in the updateUserBalance() method.
  Fixedamount(){
    this.Splitpayment = 0;
    this.users.forEach( (user:any) => {
      this.pendingTransactions.push( {groupUsers: user.name, expenseName: this.expenseName, expenseDesc: this.expenseDesc, payment: this.fixedamt[user.id -1 ]} );
      user.balance += this.fixedamt[user.id - 1];
      this.updateUserBalance(user.id, user.balance);
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


  // The percentage method reads each payment for each user. The user ID is read on click in the HTML using the index and for each user in the group, the amount entered
  // is read and pushed to the pending transactions table and the database in the updateUserBalance() method.
  Percentage(){
    this.Splitpayment = 0;
    this.users.forEach( (user:any) => {
      this.Splitpayment = this.payment * (this.percent[user.id - 1] / 100);
      user.balance += this.Splitpayment;
      this.pendingTransactions.push( {groupUsers: user.name, expenseName: this.expenseName, expenseDesc: this.expenseDesc, payment: this.Splitpayment} );
      this.updateUserBalance(user.id, user.balance);
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

  
  // Framework to clear amount owed 
  clearAmountOwed(){
    for (this.username in this.group)
    {
      this.Splitpayment = 0;
    }

  }


  //framework to delete a group
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
    this.userService.updateUserBalance(id, balance).subscribe(data => {
      this.user.id = data;
      this.user.balance = data;
      return data
    });
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
