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
    {value: 'Image Upload', viewValue: 'Image Upload'}
  ]

  newOption: string;

  selectedQuestion: any;

  constructor(private dialogRef: MatDialogRef<EditQuestionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    console.log("Data passed to dialog:", this.data)
    this.selectedQuestion = this.data.question;
  }

  addOption(option: string){
    console.log("this is the selected question", this.selectedQuestion);
    this.selectedQuestion.answerChoices.push(option);
    this.newOption = null;
  }

  deleteOption(option: string){
    for (let i = 0; i < this.selectedQuestion.answerChoices.length; i++){
      if(this.selectedQuestion.answerChoices[i] == option){
        this.selectedQuestion.answerChoices.splice(i, 1);
      }
    }
  }
}
