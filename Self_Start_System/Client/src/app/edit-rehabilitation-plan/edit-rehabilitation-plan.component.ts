import { Component, OnInit } from '@angular/core';
import { RehabilitationPlanService } from '../rehabilitation-plan.service';
import { ExerciseService } from '../services/exercise.service';
import { ViewEncapsulation } from '@angular/core';
import { DndModule } from "ng2-dnd";
import { MatDialog, MatDialogRef } from "@angular/material";
import { EditExerciseDialogComponent } from "../edit-exercise-dialog/edit-exercise-dialog.component";

@Component({
    selector: 'app-edit-rehabilitation-plan',
    templateUrl: './edit-rehabilitation-plan.component.html',
    styleUrls: ['./edit-rehabilitation-plan.component.scss'],
    providers: [ RehabilitationPlanService ],
    encapsulation: ViewEncapsulation.None
})

export class EditRehabilitationPlanComponent implements OnInit {
    showSidebar = true;
    data: Object;

    rehabilitationplans = {rehabilitationPlan:[]}; //Temporary fix
    rehabilitationplan = { exerciseOrders: []}; //Temporary fix
    allExercises = [];//nullaaaaa
    myExercises = [];//nullasaaaa
    exerciseIDs = [];
    selectedExercise = {};

    deleteList = [];
    editID = localStorage.getItem('edit_rehabilitation_id');
    moveList = [];
    editExerciseDialogRef: MatDialogRef<EditExerciseDialogComponent>

    constructor(private rehabilitationplanService: RehabilitationPlanService,
        private exerciseService: ExerciseService,
        private dialog: MatDialog) {}

    ngOnInit() {
        this.getRehabilitationPlans();
    }

    openEditExerciseDialog(exercise){
        this.selectedExercise = exercise;
        // this.selectQuestion(exercise);
        this.editExerciseDialogRef = this.dialog.open(EditExerciseDialogComponent, {
            width: '50vw',
            data: {
                exercise: this.selectedExercise
            }
        });

        this.editExerciseDialogRef.afterClosed().subscribe(result => {
            this.selectedExercise = result;
            // this.editQuestion(this.selectedExercise);
        });
    }

    //get all exercise ids from myExercises, pushes to exerciseIDs
    getExerciseIDs() {
        for(var i = 0; i < this.myExercises.length; i++) {
            this.exerciseIDs.push(this.myExercises[i]._id);
        }
    }

    //push changes made to rehab plan to database
    putRehabilitationPlan(name: String, description: String, authorName: String, goal: String, timeframe: String) {
        this.getExerciseIDs();
        this.data = {
            name: name,
            authorName: authorName,
            description: description,
            goal: goal,
            timeFrameToComplete: timeframe,
            exerciseOrders: this.exerciseIDs
        };

        console.log("PUT DATA: ",this.data);
        this.rehabilitationplanService.updateRehabilitationPlan(this.data, this.editID).subscribe(res =>
            {
                console.log("PUT RESULT:",res);
            }
        );
    }

    //gets all rehab plan information and extracts info for this specific rehab plan
    getRehabilitationPlans() {
        this.rehabilitationplanService.getRehabilitationPlans().subscribe(data =>
            {
                this.rehabilitationplans = data;
                for(var i = 0; i < this.rehabilitationplans.rehabilitationPlan.length; i++) { //dadf
                    if(this.rehabilitationplans.rehabilitationPlan[i]._id == localStorage.getItem('edit_rehabilitation_id')) {
                        this.rehabilitationplan = this.rehabilitationplans.rehabilitationPlan[i];
                    }

                }
                this.getExercises();
            }
        );
    }

    //gets exercises of this rehab plan
    getExercises() {
        this.exerciseService.getAllExercises().subscribe(
            data => {
                this.allExercises = data.exercise;
                this.exerciseService.getAllExercises().subscribe(
                    data2 => {
                        let exercises = data2.exercise;
                        let k = 0; //keeps track of the number of objects deleted from this.allExercises
                        for(var i = 0; i < this.rehabilitationplan.exerciseOrders.length; i++) {
                            for(var j = 0; j < exercises.length; j++) {
                                if(exercises[j]._id == this.rehabilitationplan.exerciseOrders[i]) {
                                    this.myExercises.push(exercises[j]);
                                    this.allExercises.splice(j-k, 1); //should be j?
                                    k++;
                                }
                            }
                        }
                    },
                    error => console.log(error)
                );
            },
            error => console.log(error)
        );
    }
}
