import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-edit-exercise-dialog',
    templateUrl: './edit-exercise-dialog.component.html',
    styleUrls: ['./edit-exercise-dialog.component.scss']
})
export class EditExerciseDialogComponent implements OnInit {
    myExercises = [];
    allExercises = [];
    filteredExercises = [];
    activeExercise;
    result = {
        myExercises: [],
        allExercises: [],
        activeExercise: {},
        selectedRow: 0
    };


    constructor(private dialogRef: MatDialogRef<EditExerciseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data) { }

    ngOnInit() {
        console.log("Data passed to dialog:", this.data);
        this.myExercises = this.data.myExercises;
        this.allExercises = this.data.allExercises;
        this.filteredExercises = this.allExercises;
        this.activeExercise = this.data.activeExercise;
    }

    exerciseSelected(id: string) {
        for(var i = 0; i < this.data.allExercises.length; i++) {
            if(this.data.allExercises[i]._id == id) {
                this.data.myExercises.push(this.data.allExercises[i]);
                this.data.allExercises.splice(i,1);
            }
        }
        this.result.myExercises = this.data.myExercises;
        this.result.allExercises = this.data.allExercises;
        this.result.activeExercise = this.data.myExercises[this.data.myExercises.length-1];
        this.result.selectedRow = this.data.myExercises.length - 1;
        this.dialogRef.close({data: this.result});
    }

    assignCopy(){
        this.filteredExercises = Object.assign([], this.allExercises);
    }

    filterItem(value){
        console.log(value);
        if(!value) this.assignCopy(); //when nothing has typed
        this.filteredExercises = Object.assign([], this.allExercises).filter(
        item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    )};

}
