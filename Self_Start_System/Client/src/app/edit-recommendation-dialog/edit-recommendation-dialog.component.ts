import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormService } from "../form.service";

@Component({
  selector: 'app-edit-recommendation-dialog',
  templateUrl: './edit-recommendation-dialog.component.html',
  styleUrls: ['./edit-recommendation-dialog.component.scss']
})
export class EditRecommendationDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EditRecommendationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private formService: FormService) { }

  recommendation: any;
  newRecommendationFlag: boolean;

  ngOnInit() {
    this.recommendation = this.data.recommendation;
    this.newRecommendationFlag = this.data.newRecommendationFlag;
  }
}
