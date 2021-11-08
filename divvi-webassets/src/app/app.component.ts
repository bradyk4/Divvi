import { Component, OnInit, Inject, OnChanges, SimpleChange } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { UserCreationComponent } from './user-creation/user-creation.component';
import {MatDialogModule} from "@angular/material/dialog";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{

  title = 'Divvi';
  users = [
    { firstName: 'Jerermy', lastName: 'Mazurowski', amountOwed: 0},
    { firstName: 'TJ', lastName: 'Brown', amountOwed: 0},
    { firstName: 'Kyle', lastName: 'Brady', amountOwed: 0},
    { firstName: 'Kenny', lastName: 'Williams', amountOwed: 0}
];

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
}
