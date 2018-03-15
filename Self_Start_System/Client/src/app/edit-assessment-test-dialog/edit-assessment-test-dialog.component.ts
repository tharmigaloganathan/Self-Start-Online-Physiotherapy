import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-assessment-test-dialog',
  templateUrl: './edit-assessment-test-dialog.component.html',
  styleUrls: ['./edit-assessment-test-dialog.component.scss']
})
export class EditAssessmentTestDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EditAssessmentTestDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
  }

}
