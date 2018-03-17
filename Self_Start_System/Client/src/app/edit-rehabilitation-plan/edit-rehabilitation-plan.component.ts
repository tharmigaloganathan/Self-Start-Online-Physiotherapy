import { Component, OnInit } from '@angular/core';
import { RehabilitationPlanService } from '../rehabilitation-plan.service';
import { ExerciseService } from '../services/exercise.service';
import { ViewEncapsulation } from '@angular/core';
import { DndModule } from "ng2-dnd";
import { MatDialog, MatDialogRef } from "@angular/material";

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
    rehabilitationplan = {exercises:[]}; //Temporary fix
    allExercises = [];//nullaaaaa
    myExercises = [];//nullasaaaa
    exerciseIDs = [];
    selectedExercise = {};

    deleteList = [];
    editID = localStorage.getItem('edit_rehabilitation_id');
    moveList = [];
    // editQuestionDialogRef: MatDialogRef<EditQuestionDialogComponent>

    constructor(private rehabilitationplanService: RehabilitationPlanService, private exerciseService: ExerciseService) {
        console.log("ID", this.editID)
    }

    ngOnInit() {
        this.getRehabilitationPlans();
        this.getExercises();
    }

    // openEditQuestionDialog(exercise){
    //     this.selectedExercise = exercise;
    //     // this.selectQuestion(exercise);
    //     this.editQuestionDialogRef = this.dialog.open(EditQuestionDialogComponent, {
    //         width: '50vw',
    //         data: {
    //             exercise: this.selectedExercise
    //         }
    //     });
    //
    //     this.editQuestionDialogRef.afterClosed().subscribe(result => {
    //         this.selectedExercise = result;
    //         // this.editQuestion(this.selectedExercise);
    //     });
    // }

    //get all exercise ids from myExercises, pushes to exerciseIDs
    getExerciseIDs() {
        for(var i = 0; i < this.myExercises.length; i++) {
            this.exerciseIDs.push(this.myExercises[i]._id);
        }
    }

    //push changes made to rehab plan to database
    putRehabilitationPlan(name: String, description: String, authorName: String, goal: String, timeframe: String) {
        this.getExerciseIDs();
        console.log("my exercises", this.myExercises);
        this.data = {
            name: name,
            authorName: authorName,
            description: description,
            goal: goal,
            timeFrameToComplete: timeframe,
            exercises: this.exerciseIDs
        };

        console.log("data: ",this.data);
        this.rehabilitationplanService.updateRehabilitationPlan(this.data, this.editID).subscribe(res =>
            {
                console.log("RESULT",res);
            }
        );
    }

    //gets all rehab plan information
    getRehabilitationPlans() {
        this.rehabilitationplanService.getRehabilitationPlans().subscribe(data =>
            {
                this.rehabilitationplans = data;
                console.log("REHABILITATION PLANS", this.rehabilitationplans);
                this.getExercises();
            }
        );
    }

    //gets specific rehab plan and it's exercises
    getExercises() {
        for(var i = 0; i < this.rehabilitationplans.rehabilitationPlan.length; i++) { //dadf
            if(this.rehabilitationplans.rehabilitationPlan[i]._id == localStorage.getItem('edit_rehabilitation_id')) {
                console.log("MATCH", this.rehabilitationplans.rehabilitationPlan[i]._id);
                this.rehabilitationplan = this.rehabilitationplans.rehabilitationPlan[i];
                console.log(this.rehabilitationplan);
            }

        }

        console.log("getting all exercises");

        console.log("getting all exercises");
        this.exerciseService.getAllExercises().subscribe(
            data => {
                console.log("all exercises retrieved! ",data.exercise, data.exercise.length);
                this.allExercises = data.exercise;

                console.log("exercises retrieved! ",data.exercise);
                let exercises = data.exercise;
                console.log("EXERCISES", data.exercise);
                this.allExercises = data.exercise;

                for(var i = 0; i < exercises.length; i++) {
                    for(var j = 0; j < this.rehabilitationplan.exercises.length; j++) {
                        console.log("ex test", exercises[i]._id, this.rehabilitationplan.exercises[j]);
                        if(exercises[i]._id == this.rehabilitationplan.exercises[j]) {
                            this.myExercises.push(exercises[i]);
                            this.allExercises.splice(i, 1);
                        }
                    }
                }
                console.log("EXERCISES", this.myExercises);
            },
            error => console.log(error)
        );

    }
}
