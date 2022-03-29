import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupService } from 'src/app/services/group.service';
import { LoginPageComponent } from '../login-page/login-page/login-page.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.css']
})


export class ExpenseDialogComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: boolean, private groupService: GroupService, private http: HttpClient, public dialogRef: MatDialogRef<ExpenseDialogComponent>) { }

  groupUsers: any;
  groupId: number = LoginPageComponent.loginData.user.groupId;
  dropdownVal!: number;
  initialValue!: number;
  expenseInput!: any;
  count: number = 0;
  fixedSum: number = 0;
  payment!: number;
  public expenseTable: Array<{
    id: number;
    debtorName: string;
    expenseSplit?: number;
  }> = [];


  ngOnInit(): void {
    this.groupUsers = this.getGroupUsers(this.groupId);
  }


  dropdownFunc(event: Event) {
    const eventTarget = event.target as HTMLInputElement;
 
    if (+eventTarget.value == 1) {
      this.dropdownVal = 1;
      this.groupUsers.forEach((user: any) => {
        this.expenseTable.push({
          id: user.id,
          debtorName: user.name,
          expenseSplit: undefined,
        });
      });
    }
    else if (+eventTarget.value == 2) {
      this.dropdownVal = 2;
      this.groupUsers.forEach((user: any) => {
        this.expenseTable.push({
          id: user.id,
          debtorName: user.name,
          expenseSplit: undefined,
        });
      });
    }
    else if (+eventTarget.value == 3) {
      this.dropdownVal = 3;
      this.groupUsers.users.forEach((user: any) => {
        this.expenseTable.push({
          id: user.id,
          debtorName: user.name,
          expenseSplit: undefined,
        });
      });
    }
    else {
      this.dropdownVal = 0;
      //display nothing
    }
  }

  onYes() {
    this.dialogRef.close({data: true, dropdownVal: this.dropdownVal});
}

  onNo() {
    this.dialogRef.close({data: false, dropdownVal: 0});
  }


  onFixedChange(event: Event) {
    const eventTarget = event.target as HTMLInputElement;
    this.groupUsers.forEach((user: any) => {
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
          if (value.expenseSplit == undefined) {
            this.count++;
          } else {
            this.fixedSum -= value.expenseSplit!;
          }
        }
        this.initialValue = this.fixedSum / this.count;
      }
    });
  }

  onPercentChange(event: Event) {
    
  }




  getGroupUsers(id: number) {
    this.groupService.getGroupUsers(id).subscribe((data) => {
      this.groupUsers = data;
      return this.groupUsers
    });
  }
}
