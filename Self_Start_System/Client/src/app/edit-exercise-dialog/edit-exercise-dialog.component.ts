import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-edit-exercise-dialog',
    templateUrl: './edit-exercise-dialog.component.html',
    styleUrls: ['./edit-exercise-dialog.component.scss']
})
export class EditExerciseDialogComponent implements OnInit {
    selectedExercise: any;

    constructor(private dialogRef: MatDialogRef<EditExerciseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data) { }

    ngOnInit() {
        console.log("Data passed to dialog:", this.data)
        this.selectedExercise = this.data.exercise;
    }

}
