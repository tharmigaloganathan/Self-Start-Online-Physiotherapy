import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-rehabilitation-plan',
  templateUrl: './rehabilitation-plan.component.html',
  styleUrls: ['./rehabilitation-plan.component.scss']
})
export class RehabilitationPlanComponent implements OnInit {
    showSidebar = true;
    animal: string;
    name: string;

  constructor(public dialog: MatDialog) {
      // drawer.toggle();
      //find test physiotherapist "physiotherapist2224"


      //access all rehabilitation plans and display
   }

   openDialog(): void {

    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });
    this.changePosition();

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
      console.log(result);
    });
  }

  ngOnInit() {
  }

  changePosition() {
       this.dialogRef.updatePosition({ top: '500px', left: '500px' });
   }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>){}
    // @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
