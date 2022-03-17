import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Inject, OnChanges, SimpleChange } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from "@angular/material/dialog";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {HttpClient} from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { GroupService } from 'src/app/services/group.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    
    ],
})
export class HomeComponent implements OnInit {
  constructor(private http : HttpClient, private userService: UserService, private groupService: GroupService, private transactionService: TransactionService, public dialog: MatDialog) {}
  title = 'Divvi';
  user: any;
  users: any;
  selectedGroup: any;
  groups: any;
  groupUsers: any;
  name: any;
  groupID: any;
  groupName: any;
  id: any;
  updateBalance: any;
  transactions: any;

  // this method gets group #1, and the users within the group
  ngOnInit(): void {
    this.users = this.getUsers();
    this.groups = this.getGroups();
    this.groupUsers = this.getGroupUsers(1);
    this.transactions = this.getTransactions();
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
  last!: {};
  public expenseTable: Array<{ id: number; username: string;  expenseSplit?: number}> = [];
  inGroup!: boolean;
  groupExists!: boolean;
  nameID!: number;
  userExists!: boolean;
  expenseInput = 0;
  initialValue!: number;
  percentSum = 100;
  count = 0;
  fixedSum = 0;
  confirmation!: boolean;
  public authID: number = 3;

// handles true/false change for isAmountPaid check box
onPaidChange(event: Event){
  const eventTarget = event.target as HTMLInputElement;
  console.log(eventTarget)
  console.log(eventTarget.id)

  if (eventTarget.checked == true) {
    //do something for checked
    console.log(eventTarget.checked)
  }

  else if (eventTarget.checked == false) {
    //do nothing for unchecked
    console.log(eventTarget.checked)
  }

}  

//Opens a confirmation Dialog box.
openDialogPerc (){
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    width: '250px',
    height: '250px',
});
// grabs dialog data on close
dialogRef.afterClosed().subscribe(result => {
  this.confirmation = result.data
    console.log(`Dialog result: ${result.data}`);
    // if confirmation is true it sets all undefined to 0 and then pushes to DB
    if (this.confirmation == true) {
      const iterator = this.expenseTable.values();
    for (const value of iterator) {
      this.users.forEach( (user:any) => {
              if (user.name == value.username && value.expenseSplit != undefined) {
              this.Splitpayment = value.expenseSplit!
              this.Splitpayment = this.payment * (value.expenseSplit! / 100)
              user.balance += this.Splitpayment
              this.pendingTransactions.push( {groupUsers: value.username, expenseName: this.expenseName, expenseDesc: this.expenseDesc, payment: this.Splitpayment} );
              this.updateUserBalance(value.id, user.balance)
              }
          });
         }
    this.expenseTable.splice(0,this.expenseTable.length)
    this.newExpense = false;
    this.percentIsShown = false;
    this.showPayments = false;
    this.evenIsShown = false;
    this.percentIsShown = false;
    this.fixedIsShown = false;
    this.expenseName = "";
    this.expenseDesc = "";
    this.payment = 0;
    }
    // if false, just return to the payment screen to fix changes
    else if (this.confirmation == false) {
      return;
    }
});
}
//open dialog for fixed amount.
  openDialogFixed (){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      height: '250px',
  });
// grabs dialog data on close
  dialogRef.afterClosed().subscribe(result => {
    this.confirmation = result.data
      console.log(`Dialog result: ${result.data}`);
      // if confirmation is true it sets all undefined to 0 and then pushes to DB
      if (this.confirmation == true) {
        const iterator = this.expenseTable.values();
      for (const value of iterator) {
        this.users.forEach( (user:any) => {
                if (user.name == value.username && value.expenseSplit != undefined) {
                this.Splitpayment = value.expenseSplit!
                user.balance += this.Splitpayment
                this.pendingTransactions.push( {groupUsers: value.username, expenseName: this.expenseName, expenseDesc: this.expenseDesc, payment: this.Splitpayment} );
                this.updateUserBalance(value.id, user.balance)
                }
            });
           }
      this.expenseTable.splice(0,this.expenseTable.length)
      this.newExpense = false;
      this.percentIsShown = false;
      this.showPayments = false;
      this.evenIsShown = false;
      this.percentIsShown = false;
      this.fixedIsShown = false;
      this.expenseName = "";
      this.expenseDesc = "";
      this.payment = 0;
      }
      // if false, just return to the payment screen to fix changes
      else if (this.confirmation == false) {
        return;
      }
  });
  }

  showUserAddInput(){
    this.addUser = ! this.addUser;
  }
  
// updates the User's group ID based on group Name selected
  addUserToGroup() {
    console.log(this.name)
    console.log(this.groupName)
    console.log(this.groups)
    this.user.forEach( (user:any) =>{
      // checks if user exists
      if (this.name == user.name)
      {
        this.userExists = true;
        this.nameID = user.id
        return;
      }
      else
      {
        this.userExists = false;
        alert("User does not exist")
      }
    });
    this.groups.forEach( (group:any) => {
      // checks that group exists
      if (this.groupName == group.name) 
      {
        this.groupID == group.id
        this.groupExists == true;
        this.groupUsers == this.groupService.getGroupUsers(this.groupID)
        this.groupUsers.Users.forEach( (user:any) => {
          console.log(user)
          // checks if user is already in group
          if (this.name == user.name) 
          {
            this.inGroup = true
            return;
          }
          else 
          {
            this.inGroup = false
          }
        });
      }
      else
      {
        alert("This group does not exist")
        this.groupExists == false;
      }
    });
    if (this.groupExists == true && this.inGroup == false && this.userExists == true) 
      {
        this.userService.updateUserGroup(this.nameID, this.groupID)
      }
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
    this.expenseTable.splice(0,this.expenseTable.length)
  }

  toggleFixedShow() {
    this.expenseTable.splice(0,this.expenseTable.length)
    this.evenIsShown = false;
    this.percentIsShown = false;
    this.fixedIsShown = ! this.fixedIsShown;
    this.initialValue = this.payment / this.groupUsers.Users.length;
    this.users.forEach( (user:any) => {
      this.expenseTable.push( {id: user.id, username: user.name, expenseSplit: undefined} );
  
    });
  }

  togglePercentShow() {
    this.expenseTable.splice(0,this.expenseTable.length)
    this.fixedIsShown = false;
    this.evenIsShown = false;
    this.percentIsShown = ! this.percentIsShown;
    this.initialValue = 100/ this.groupUsers.Users.length;
    this.users.forEach( (user:any) => {
      this.expenseTable.push( {id: user.id, username: user.name, expenseSplit: undefined} );

    });
    for (const value of this.expenseTable) {
      console.log(value)
      console.log(value.username)
    }
      console.log(this.expenseTable)
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
    this.expenseTable.splice(0,this.expenseTable.length)
    this.newExpense = false;
    this.showPayments = false;
    this.evenIsShown = false;
    this.percentIsShown = false;
    this.fixedIsShown = false;
    this.expenseName = "";
    this.expenseDesc = "";
    this.payment = 0;

  }

    onFixedChange(event: Event) 
    {
      const eventTarget = event.target as HTMLInputElement;

      this.users.forEach( (user:any) => {
        if((user.id == +eventTarget.id) && +this.expenseTable.findIndex(x => x.username === user.name) != -1){
          this.expenseInput = +eventTarget.value;
          this.expenseTable.splice(this.expenseTable.findIndex(x => x.username === user.name), 1)
          this.expenseTable.push({id: user.id, username: user.name, expenseSplit: this.expenseInput})     
          const iterator = this.expenseTable.values();
          this.count = 0;
          this.fixedSum = +this.payment;
          for (const value of iterator) 
          {
            if (value.expenseSplit == undefined)
            {
              this.count++
  
            }
            else
            {
              this.fixedSum -= value.expenseSplit!
  
            }
  
          }
          this.initialValue = (this.fixedSum / this.count)
        }
  
        });
    }

  // The fixed amount method reads each payment for each user. The user ID is read on click in the HTML using the index and for each user in the group, the amount entered
  // is read and pushed to the pending transactions table and the database in the updateUserBalance() method.
  Fixedamount(){
    this.Splitpayment = 0;
    this.count =0;

    this.fixedSum = this.payment;

      const iterator = this.expenseTable.values();

      for (const value of iterator)

      {

        if(value.expenseSplit == undefined)

        {

          this.count++

        }

        else

        {

          this.fixedSum -= value.expenseSplit;

        }

      }

    if (this.fixedSum != 0)

    {

      alert("The fixed amounts do not equal your expense of " + this.payment + ". Please re-enter the fixed amounts for each user")
      this.fixedIsShown = true;
      this.newExpense = false;
      this.showPayments = false;
    }

    else if ((this.fixedSum == 0) && this.count != 0)

    {
      this.openDialogFixed();
      this.fixedIsShown = true;
      this.newExpense = false;
      this.showPayments = false;
    }

    else

    {
      
      console.log("Push expense table to DB");
      const iterator = this.expenseTable.values();
      for (const value of iterator) {
        this.users.forEach( (user:any) => {
                if (user.name == value.username) {
                this.Splitpayment = value.expenseSplit!
                user.balance += this.Splitpayment
                this.pendingTransactions.push( {groupUsers: value.username, expenseName: this.expenseName, expenseDesc: this.expenseDesc, payment: this.Splitpayment} );
                 this.updateUserBalance(value.id, user.balance)
                }
            });
           }
      this.expenseTable.splice(0,this.expenseTable.length)
      this.newExpense = false;
      this.percentIsShown = false;
      this.showPayments = false;
      this.evenIsShown = false;
      this.percentIsShown = false;
      this.fixedIsShown = false;
      this.expenseName = "";
      this.expenseDesc = "";
      this.payment = 0;
    }

  }

// handles the event for when changes are made to the percent input boxes
  onPercentChange(event : Event) {
    // we need to push the percent to local array on change, then the if statement below can check everything. 
    // then we need to push all the values to the database on the percentage method
    const eventTarget = event.target as HTMLInputElement;


    this.users.forEach( (user:any) => {
      if((user.id == +eventTarget.id) && +this.expenseTable.findIndex(x => x.username === user.name) != -1){
        this.expenseInput = +eventTarget.value;
        this.expenseTable.splice(this.expenseTable.findIndex(x => x.username === user.name), 1)
        this.expenseTable.push({id: user.id, username: user.name, expenseSplit: this.expenseInput})     
        const iterator = this.expenseTable.values();
        this.count = 0;
        this.percentSum = 100;
        for (const value of iterator) 
        {
          if (value.expenseSplit == undefined)
          {
            this.count++

          }
          else
          {
            this.percentSum -= value.expenseSplit!

          }

        }
        this.initialValue = (this.percentSum / this.count)
      }

      });

      // this.total = (100 - this.toNumber) / (this.groupUsers.Users.length - 1)this.total = (100 - this.toNumber) / (this.groupUsers.Users.length - 1)
  }

  // The percentage method reads each payment for each user. The user ID is read on click in the HTML using the index and for each user in the group, the amount entered
  // is read and pushed to the pending transactions table and the database in the updateUserBalance() method.
  Percentage(){

    this.Splitpayment = 0;

    this.count =0;

    this.percentSum = 100;

      const iterator = this.expenseTable.values();

      for (const value of iterator)

      {

        if(value.expenseSplit == undefined)

        {

          this.count++

        }

        else

        {

          this.percentSum -= value.expenseSplit;

        }

      }
    if (this.percentSum != 0)

    {

      alert("Percent total does not equal 100%. Please re-enter the percent total for each user")
      this.percentIsShown = true;
      this.newExpense = false;
      this.showPayments = false;
    }

    else if ((this.percentSum == 0) && this.count != 0)

    {
      this.openDialogPerc();
      this.percentIsShown = true;
      this.newExpense = false;
      this.showPayments = false;
    }

    else

    {
      
      console.log("Push expense table to DB");
      const iterator = this.expenseTable.values();
      for (const value of iterator) {
      this.users.forEach( (user:any) => {
              if (user.name == value.username) {
              this.Splitpayment = this.payment * (value.expenseSplit! / 100)
              user.balance += this.Splitpayment
              this.pendingTransactions.push( {groupUsers: value.username, expenseName: this.expenseName, expenseDesc: this.expenseDesc, payment: this.Splitpayment} );
              this.updateUserBalance(value.id, user.balance)
              }
          });
         }
      this.expenseTable.splice(0,this.expenseTable.length)
      this.newExpense = false;
      this.percentIsShown = false;
      this.showPayments = false;
      this.evenIsShown = false;
      this.percentIsShown = false;
      this.fixedIsShown = false;
      this.expenseName = "";
      this.expenseDesc = "";
      this.payment = 0;
    }

  }


  // Framework to clear amount owed
  clearAmountOwed(){
    this.users.forEach( (user:any) => {
    
      this.updateUserBalance(user.id, 0);
      
    });
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

  postUser(name: string, password: string, groupId: number, balance: number){

    this.userService.postUser(name, password, groupId, balance);
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

  getTransactions() {
    this.transactionService.getTransactions().subscribe(data => {
      this.transactions = data;
      return this.transactions
    });
  
  }

  postTransaction(userName: string, expenseName: string, expenseDesc: string, amountOwed: number, userID: number, creatorID: number, isAmountPaid: boolean) {
    
    this.transactionService.postTransaction(userName, expenseName, expenseDesc, amountOwed, userID, creatorID, isAmountPaid);
  }

  
}

 
