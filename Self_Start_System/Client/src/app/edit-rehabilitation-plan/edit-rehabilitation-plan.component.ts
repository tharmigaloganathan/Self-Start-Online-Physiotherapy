import { Component, OnInit } from '@angular/core';
import { RehabilitationPlanService } from '../rehabilitation-plan.service';
import { ExerciseService } from '../services/exercise.service';
import { ViewEncapsulation } from '@angular/core';
import { DndModule } from "ng2-dnd";
import { MatDialog, MatDialogRef } from "@angular/material";
import { EditExerciseDialogComponent } from "../edit-exercise-dialog/edit-exercise-dialog.component";
import { EditAssessmentTestDialogComponent } from "../edit-assessment-test-dialog/edit-assessment-test-dialog.component";
import { AuthenticationService } from "../authentication.service";
import { AssessmentTestService } from "../assessment-test.service";

@Component({
    selector: 'app-edit-rehabilitation-plan',
    templateUrl: './edit-rehabilitation-plan.component.html',
    styleUrls: ['./edit-rehabilitation-plan.component.scss'],
    providers: [ RehabilitationPlanService, AuthenticationService, AssessmentTestService ],
    encapsulation: ViewEncapsulation.None
})

export class EditRehabilitationPlanComponent implements OnInit {
    showSidebar = true;
    data: Object;

    rehabilitationplans = {rehabilitationPlan:[]}; //Temporary fix
    rehabilitationplan = { exerciseOrders: [], assessmentTests:[]}; //Temporary fix
    allExercises = [];//nullaaaaa
    myExercises = [];//nullasaaaa
    oldExercises = [];
    exerciseIDs = [];
    selectedExercise = {};
    newExercises = [];

    deleteList = [];
    editID = localStorage.getItem('edit_rehabilitation_id');
    moveList = [];
    editExerciseDialogRef: MatDialogRef<EditExerciseDialogComponent>

    user: any;

    //ASSESSMENT TEST RELATED
    editAssessmentTestDialogRef: MatDialogRef<EditAssessmentTestDialogComponent>

    assessmentTests = [];
    selectedAssessmentTest: any;
    //END OF ASSESSMENT TEST RELATED

  constructor(private rehabilitationplanService: RehabilitationPlanService,
              private exerciseService: ExerciseService,
              private assessmentTestService: AssessmentTestService,
              private dialog: MatDialog,
              private authService: AuthenticationService) {
      console.log("ID", this.editID)
  }

  ngOnInit() {
    this.getRehabilitationPlans();
    this.authService.getProfile().subscribe(
      res => {
        this.user = res;
      }
    );
  }


    openEditExerciseDialog(exercise){
        this.selectedExercise = exercise;
        // this.selectQuestion(exercise);
        this.editExerciseDialogRef = this.dialog.open(EditExerciseDialogComponent, {
            width: '50vw',
            data: {
                exercise: this.selectedExercise}
        });

        this.editExerciseDialogRef.afterClosed().subscribe(result => {
            this.selectedExercise = result;
            // this.editQuestion(this.selectedExercise);
        });
    }

    //get all exercise ids from myExercises, pushes to exerciseIDs
    getExerciseIDs() {
        //compare myExercises to oldExercises
        //for every element in myExercises, but not in oldExercises
            //do a post request to exercises, get the returning ID
        if(this.myExercises.length > 100) {
            for(var i = 0; i < this.myExercises.length; i++) {
                for(var j = 0; j < this.oldExercises.length; j++){
                    if(this.myExercises[i] == this.oldExercises[j]) {
                        this.newExercises.push(this.myExercises[i]);
                        continue;
                    }
                }
                this.exerciseService.registerExercise(this.myExercises[i]).subscribe(
                  res=> {console.log("response received: ", res), this.newExercises.push(res);},
                  error => {console.log(error)}
                );
            }
        } else {
            for(var i = 0; i < this.myExercises.length; i++) {
                this.exerciseIDs.push(this.myExercises[i]._id);
            }
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
        this.rehabilitationplanService.getRehabilitationPlans().subscribe(data => {
                this.rehabilitationplans = data;
                for(var i = 0; i < this.rehabilitationplans.rehabilitationPlan.length; i++) { //dadf
                    if(this.rehabilitationplans.rehabilitationPlan[i]._id == localStorage.getItem('edit_rehabilitation_id')) {
                        this.rehabilitationplan = this.rehabilitationplans.rehabilitationPlan[i];
                    }
                }
                this.getExercises();
                this.getAssessmentTests();
         });
    }

  editRehabilitationPlan(){
      this.rehabilitationplanService.updateRehabilitationPlan(this.rehabilitationplan, this.editID).subscribe(
        res => {
          console.log(res)
        },
        error => {
          console.log(error);
        }
      );
  }

  //ASSESSMENT TEST STARTS
  //==================================

  createAssessmentTest(){
    console.log("NICK YOUR USER:", this.user);
    var assessTest = {
      name: "Name",
      description: "Description",
      authorName: this.user.physiotherapist.familyName,
      recommendations: null,
      form: null,
      testResults: null,
      openDate: null,
      dateCompleted: null
    }
    this.openEditAssessmentTestDialog(assessTest, true);
  }

  editAssessmentTest(assessmentTest){
    this.assessmentTestService.editAssessmentTest(assessmentTest).subscribe(
      res => {
        //Do something for when you edit a new assessment test
        this.getAssessmentTests();
      },
      error => {
        console.log(error);
      }
    )
  }

  addAssessmentTest(assessmentTest){
    this.assessmentTestService.addAssessmentTest(assessmentTest).subscribe(
      res => {
        console.log("LOOK AT THIS RESPONSE:", res);
        this.rehabilitationplan.assessmentTests.push(res.assessmentTest._id);
        this.editRehabilitationPlan();
        this.getAssessmentTests();
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteAssessmentTest(assessmentTest){
    for (let i = 0; i < this.rehabilitationplan.assessmentTests.length; i++){
      if(this.rehabilitationplan.assessmentTests[i] == assessmentTest._id){
        this.rehabilitationplan.assessmentTests.splice(i, 1);
      }
    }
    this.editRehabilitationPlan();
    this.assessmentTestService.deleteAssessmentTest(assessmentTest).subscribe(
      res => {
        this.getAssessmentTests();
      },
      error => {
        console.log(error);
      }
    )
  }

  openEditAssessmentTestDialog(assessmentTest, newQuestionFlag: boolean){
    this.editAssessmentTestDialogRef = this.dialog.open(EditAssessmentTestDialogComponent, {
      width: '50vw',
      data: {
        assessmentTest,
        newQuestionFlag
      }
    });

    this.editAssessmentTestDialogRef.afterClosed().subscribe(result => {
      console.log("AssessmentTest: ", result);
      if (newQuestionFlag) {
        this.addAssessmentTest(result);
      } else {
        this.editAssessmentTest(result);
        console.log("REHABILITATION PLAN:", this.rehabilitationplan);
      }
    });
  }

  getAssessmentTests(){
    this.assessmentTests = [];
    this.assessmentTestService.getAllAssessmentTests().subscribe(
      data => {
        console.log("ASSESSMENTS TESTS", data.assessmentTest);
        console.log("editID:", this.editID);
        let allAssessmentTests = data.assessmentTest;

        for (let i = 0; i < allAssessmentTests.length; i++) {
          if (this.rehabilitationplan.assessmentTests.includes(allAssessmentTests[i]._id)) {
            this.assessmentTests.push(allAssessmentTests[i]);
          }
        }
      }
    )
  }
  //==================================
  //ASSESSMENT TEST ENDS

    //gets exercises of this rehab plan
    getExercises() {
        this.myExercises = [];
        this.exerciseService.getAllExercises().subscribe(
            data => {
                this.allExercises = data.exercise;
                this.exerciseService.getAllExercises().subscribe(
                    data2 => {
                        let exercises = data2.exercise;
                        let k = 0; //keeps track of the number of objects deleted from this.allExercises
                        console.log(this.myExercises);
                        for(var i = 0; i < this.rehabilitationplan.exerciseOrders.length; i++) {
                            console.log(exercises.length);
                            for(var j = 0; j < exercises.length; j++) {
                                console.log(j,exercises[j]._id, this.rehabilitationplan.exerciseOrders[i]);
                                if(exercises[j]._id == this.rehabilitationplan.exerciseOrders[i]) {
                                    this.myExercises.push(exercises[j]);
                                    console.log(this.myExercises);
                                    this.allExercises.splice(j-k, 1); //should be j?
                                    console.log(exercises, j);
                                    k++;
                                }
                            }
                        }

                        //keep a copy of all myExercises in the begining in oldExercises
                        for(var i = 0; i < this.rehabilitationplan.exerciseOrders.length; i++) {
                            for(var j = 0; j < exercises.length; j++) {
                                if(exercises[j]._id == this.rehabilitationplan.exerciseOrders[i]) {
                                    this.oldExercises.push(exercises[j]);
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
