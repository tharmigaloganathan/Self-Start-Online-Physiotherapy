import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-question-dialog',
  templateUrl: './edit-question-dialog.component.html',
  styleUrls: ['./edit-question-dialog.component.scss']
})
export class EditQuestionDialogComponent implements OnInit {

  questionTypeOptions = [
    {value: 'Short Answer', viewValue: 'Short Answer'},
    {value: 'Multiple Choice', viewValue: 'Multiple Choice'},
    {value: 'Range', viewValue: 'Range'},
  ]

  selectedQuestion: any;

  constructor(private dialogRef: MatDialogRef<EditQuestionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    console.log("Data passed to dialog:", this.data)
    this.selectedQuestion = this.data.question;
  }

}
