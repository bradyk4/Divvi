import { Component, OnInit, Inject, OnChanges, SimpleChange } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from "@angular/material/dialog";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {HttpClient} from '@angular/common/http';
import { UserService } from './services/user.service';
import { GroupService } from './services/group.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'Divvi';
  constructor(
    private router:Router
    ){}

  ngOnInit(): void {
      this.router.navigate(['login'])
  }
}
