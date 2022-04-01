import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupService } from 'src/app/services/group.service';
import { LoginPageComponent } from '../login-page/login-page/login-page.component';
import { HttpClient } from '@angular/common/http';
import { TransactionService } from '../services/transaction.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.css']
})


export class ExpenseDialogComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private transactionService: TransactionService ,private groupService: GroupService, private http: HttpClient, public dialogRef: MatDialogRef<ExpenseDialogComponent>) { }

  groupUsers: any;
  groupId: number = LoginPageComponent.loginData.user.groupId;
  authUserId: number = LoginPageComponent.loginData.user.id;
  dropdownVal!: number;
  initialValue!: number;
  expenseInput!: any;
  count: number = 0;
  fixedSum: number = 0;
  payment!: number;
  evenlySplit!: number;
  percentSplit!: number;
  fixedSplit!: number;
  confirmation!: boolean;
  expenseName!: string;
  expenseDesc!: string;
  percentSum!: number;
  transactions!: any;
  public expenseTable: Array<{
    id: number;
    debtorName: string;
    expenseSplit?: number;
  }> = [];

  ngOnInit(): void {
    this.groupUsers = this.getGroupUsers(this.data.groupID);
    this.transactions = this.getTransactions();
  }


  dropdownFunc(event: Event) {
    var eventTarget = event.target as HTMLInputElement;
    if (+eventTarget.value == 1) {
      this.dropdownVal = 1;
      this.payment = this.data.payment;   
      this.expenseName = this.data.expenseName;
      this.expenseDesc = this.data.expenseDesc;

      this.expenseTable.splice(0, this.expenseTable.length);

    }
    else if (+eventTarget.value == 2) {
      this.dropdownVal = 2;
      this.payment = this.data.payment
      this.expenseName = this.data.expenseName;
      this.expenseDesc = this.data.expenseDesc;

      this.expenseTable.splice(0, this.expenseTable.length);
      this.initialValue = this.payment / (this.groupUsers.users.length - 1);
      let users = this.groupUsers.users.filter((user:any) => user.id != this.authUserId)
      users.forEach((user: any) => {
        this.expenseTable.push({
          id: user.id,
          debtorName: user.name,
          expenseSplit: undefined,
        });
      });
      this.count = 0;
      this.fixedSum = this.payment;
    }
    else if (+eventTarget.value == 3) {
      this.dropdownVal = 3;
      this.payment = this.data.payment
      this.expenseName = this.data.expenseName;
      this.expenseDesc = this.data.expenseDesc;
      this.expenseTable.splice(0, this.expenseTable.length);
      this.percentSum = 100;
      let users = this.groupUsers.users.filter((user:any) => user.id != this.authUserId)
      users.forEach((user: any) => {
        this.expenseTable.push({
          id: user.id,
          debtorName: user.name,
          expenseSplit: undefined,
        });
      });
      this.initialValue = 100 / (this.groupUsers.users.length - 1);
    }
    else {
      this.dropdownVal = 0;
      //display nothing
    }
  }

  onSubmit() {
    //evenly
    if (this.dropdownVal == 1){
      this.evenlySplit = this.payment / this.groupUsers.users.length;
      let creator = this.groupUsers.users.find((user:any) => user.id = this.authUserId)
      let users = this.groupUsers.users.filter((user:any) => user.id != this.authUserId)
      users.forEach((user:any) =>{
        this.transactionService
        .postTransaction(
          user.name,
          this.expenseName,
          this.expenseDesc,
          this.evenlySplit,
          user.id,
          this.authUserId,
          creator.name,
          false
        ).subscribe();

      });
  

      this.dialogRef.close({data: true, dropdownVal: this.dropdownVal})
    }

    //fixedAmount
    else if (this.dropdownVal == 2){
      if (this.fixedSum != 0) {
        alert(
          'The fixed amounts do not equal your expense of ' +
            this.payment +
            '. Please re-enter the fixed amounts for each user'
        )
      }
      else if (this.fixedSum == 0 && this.count != 0) {
        this.openDialogFixed();
      }
      else {
        let creator = this.groupUsers.users.find((user:any) => user.id = this.authUserId)
        this.expenseTable.forEach((input: any) => {
          this.transactionService
          .postTransaction(
            input.debtorName,
            this.expenseName,
            this.expenseDesc,
            input.expenseSplit,
            input.id,
            this.authUserId,
            creator.name,
            false
          ).subscribe();

        })
      }
      this.dialogRef.close({data: true, dropdownVal: this.dropdownVal})
    }
    //Percentage
    else if (this.dropdownVal == 3){
      if (this.percentSum != 0){
        alert(
          'Percent total does not equal 100%. Please re-enter the percent total for each user'
        );
        console.log(this.expenseTable)
      }
      else if (this.percentSum == 0 && this.count !=0){
        this.openDialogPerc();

      }
      else{
        let creator = this.groupUsers.users.find((user:any) => user.id = this.authUserId)
        this.expenseTable.forEach((input: any) => {
          this.percentSplit = this.payment * (input.expenseSplit / 100)
          this.transactionService
          .postTransaction(
            input.debtorName,
            this.expenseName,
            this.expenseDesc,
            this.percentSplit,
            input.id,
            this.authUserId,
            creator.name,
            false
          ).subscribe();

        })
      }

      this.dialogRef.close({data: true, dropdownVal: this.dropdownVal})
    }
    //didnt select anything
    else {
        this.dialogRef.disableClose = true;
        console.log(this.dialogRef.disableClose)
        alert("Please select an option")
    }
    this.getTransactions();
}

  onCancel() {
    this.dialogRef.close({data: false, dropdownVal: 0});
  }


  onFixedChange(event: Event) {
    const eventTarget = event.target as HTMLInputElement;
    this.groupUsers.users.forEach((user: any) => {
      if (
        user.id == +eventTarget.id &&
        +this.expenseTable.findIndex((x) => x.debtorName === user.name) != -1
      ) {
        this.expenseInput = +eventTarget.value;
        this.expenseTable.splice(
          this.expenseTable.findIndex((x) => x.debtorName === user.name),
          1
        );
        this.expenseTable.push({
          id: user.id,
          debtorName: user.name,
          expenseSplit: this.expenseInput,
        });
        const iterator = this.expenseTable.values();
        this.count = 0;
        this.fixedSum = +this.payment;
        for (const value of iterator) {
          if (value.expenseSplit == undefined || value.expenseSplit == 0) {
            this.count++;
          } else {
            this.fixedSum -= value.expenseSplit!;
          }
        }
        this.initialValue = this.fixedSum / this.count;
      }
    });
  }

  // handles the event for when changes are made to the percent input boxes
  onPercentChange(event: Event) {
    // we need to push the percent to local array on change, then the if statement below can check everything.
    // then we need to push all the values to the database on the percentage method
    const eventTarget = event.target as HTMLInputElement;

    this.groupUsers.users.forEach((user: any) => {
      if (
        user.id == +eventTarget.id &&
        +this.expenseTable.findIndex((x) => x.debtorName === user.name) != -1
      ) {
        this.expenseInput = +eventTarget.value;
        this.expenseTable.splice(
          this.expenseTable.findIndex((x) => x.debtorName === user.name),
          1
        );
        this.expenseTable.push({
          id: user.id,
          debtorName: user.name,
          expenseSplit: this.expenseInput,
        });
        const iterator = this.expenseTable.values();
        this.count = 0;
        this.percentSum = 100;
        for (const value of iterator) {
          if (value.expenseSplit == undefined || value.expenseSplit == 0) {
            this.count++;
          } else {
            this.percentSum -= value.expenseSplit!;
          }
        }
        this.initialValue = this.percentSum / this.count;
      }
    });

    
  }




  getGroupUsers(id: number) {
    this.groupService.getGroupUsers(id).subscribe((data) => {
      this.groupUsers = data;
      return this.groupUsers
    });
  }

  postTransaction(
    debtorName: string,
    expenseName: string,
    expenseDesc: string,
    amountOwed: number,
    userID: number,
    creatorID: number,
    creatorName: string,
    isAmountPaid: boolean
  ) {
    this.transactionService.postTransaction(
      debtorName,
      expenseName,
      expenseDesc,
      amountOwed,
      userID,
      creatorID,
      creatorName,
      isAmountPaid
    );
  }

  getTransactions() {
    this.transactionService.getTransactions().subscribe((data) => {
      this.transactions = data;
      return this.transactions;
    });
  }










  openDialogFixed() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      height: '250px',
    });
    // grabs dialog data on close
    dialogRef.afterClosed().subscribe((result) => {
      this.confirmation = result.data;
      // if confirmation is true it sets all undefined to 0 and then pushes to DB
      if (this.confirmation == true) {
        let creator = this.groupUsers.users.find((user:any) => user.id = this.authUserId)
        this.expenseTable.forEach((input: any) => {
          if(input.expenseSplit != 0 && input.expenseSplit != undefined){
            this.transactionService
            .postTransaction(
              input.debtorName,
              this.expenseName,
              this.expenseDesc,
              input.expenseSplit,
              input.id,
              this.authUserId,
              creator.name,
              false
            ).subscribe();
          }
          else {
            //do nothing
            return;
          }
        })
      }
      // if false, just return to the payment screen to fix changes
      else if (this.confirmation == false) {
        return;
      }
    });
  }

  //Opens a confirmation Dialog box.
  openDialogPerc() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      height: '250px',
      data:  {
        payment: this.payment
      }
    });
    // grabs dialog data on close
    dialogRef.afterClosed().subscribe((result) => {
      this.confirmation = result.data;
      // if confirmation is true it sets all undefined to 0 and then pushes to DB
      if (this.confirmation == true) {
        let creator = this.groupUsers.users.find((user:any) => user.id = this.authUserId)
        this.expenseTable.forEach((input: any) => {
          if(input.expenseSplit != 0 && input.expenseSplit != undefined){
            this.percentSplit = this.payment * (input.expenseSplit / 100)
            this.transactionService
            .postTransaction(
              input.debtorName,
              this.expenseName,
              this.expenseDesc,
              this.percentSplit,
              input.id,
              this.authUserId,
              creator.name,
              false
            ).subscribe();
            this.getTransactions();
          }
          else {
            //do nothing
            return;
          }
        })
      }
      // if false, just return to the payment screen to fix changes
      else if (this.confirmation == false) {
        return;
      }
    });
  }




}

