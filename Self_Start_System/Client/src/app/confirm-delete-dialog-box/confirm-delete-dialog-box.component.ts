import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-dialog-box',
  templateUrl: './confirm-delete-dialog-box.component.html',
  styleUrls: ['./confirm-delete-dialog-box.component.scss']
})
export class ConfirmDeleteDialogBoxComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
