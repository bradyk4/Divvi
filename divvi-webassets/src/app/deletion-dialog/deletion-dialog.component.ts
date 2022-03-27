import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deletion-dialog',
  templateUrl: './deletion-dialog.component.html',
  styleUrls: ['./deletion-dialog.component.css']
})
export class DeletionDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: boolean, public dialogRef: MatDialogRef<DeletionDialogComponent>) { }

  ngOnInit(): void {

  }

  
  onYes() {
    this.dialogRef.close({data: true});
}

  onNo() {
    this.dialogRef.close({data: false});
  }

}