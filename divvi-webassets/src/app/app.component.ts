import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { UserCreationComponent } from './user-creation/user-creation.component';
import {MatDialogModule} from "@angular/material/dialog";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

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
  this.group.push( {username: this.username, amountOwed: this.amountOwed} );
  this.username = "";
}

  Evenly(){
    this.groupSize = this.group.length;
    this.Splitpayment = this.payment / this.groupSize;
  }

  Fixedamount(){
    this.Splitpayment = this.payment / this.fixedamt;
  }

  Percentage(){
    this.Splitpayment = 0;
    this.Splitpayment = this.payment * (this.percent / 100);
  }

  clearAmountOwed(){
    this.iterate = 1;
    while (this.iterate < this.group.length)
    {
      delete this.group[this.iterate];
      this.iterate = this.iterate + 2;
    }
  }

  clearGroup(){
    this.group.length = 0;
  }
}


