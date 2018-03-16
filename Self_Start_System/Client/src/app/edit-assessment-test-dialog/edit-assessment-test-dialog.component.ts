import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormService } from "../form.service";

@Component({
  selector: 'app-edit-assessment-test-dialog',
  templateUrl: './edit-assessment-test-dialog.component.html',
  styleUrls: ['./edit-assessment-test-dialog.component.scss']
})
export class EditAssessmentTestDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EditAssessmentTestDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private formService: FormService) { }

  assessmentTest: any;
  newQuestionFlag: boolean;
  formOptions;

  ngOnInit() {
    this.assessmentTest = this.data.assessmentTest;
    this.newQuestionFlag = this.data.newQuestionFlag;
    this.loadFormOptions();
  }

  loadFormOptions(){
    this.formService.getAllForms().subscribe(
      data => {
        console.log("forms received! ",data);
        this.formOptions = data.form;
      },
      error => console.log(error)
    );
  }

}
