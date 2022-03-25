import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-create-group-dialog',
  templateUrl: './create-group-dialog.component.html',
  styleUrls: ['./create-group-dialog.component.css']
})
export class CreateGroupDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: boolean, public dialogRef: MatDialogRef<CreateGroupDialogComponent>) { }


  groupNum!: number;
  ngOnInit(): void {

  }

  
  onYes() {
    this.dialogRef.close({groupNum: this.groupNum, data: true});
}

  onNo() {
    this.dialogRef.close({data: false});
  }

}
