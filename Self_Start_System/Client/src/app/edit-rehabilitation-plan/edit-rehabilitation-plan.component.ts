import { Component, OnInit } from '@angular/core';
import { RehabilitationPlanService } from '../rehabilitation-plan.service';
import { ExerciseService } from '../services/exercise.service';
import { AssessmentTestService } from "../assessment-test.service";
import { ViewEncapsulation } from '@angular/core';
import {EditAssessmentTestDialogComponent} from "../edit-assessment-test-dialog/edit-assessment-test-dialog.component";
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
    rehabilitationplan = {exercises:[], assessmentTests:[]}; //Temporary fix
    allExercises = [];//nullaaaaa
    myExercises = [];//nullasaaaa
    exerciseIDs = [];

    deleteList = [];
    editID = localStorage.getItem('edit_rehabilitation_id');
    moveList = [];

  //ASSESSMENT TEST RELATED
  editAssessmentTestDialogRef: MatDialogRef<EditAssessmentTestDialogComponent>

  assessmentTests = [];
  selectedAssessmentTest: any;
  //END OF ASSESSMENT TEST RELATED

  constructor(private rehabilitationplanService: RehabilitationPlanService,
              private exerciseService: ExerciseService,
              private assessmentTestService: AssessmentTestService,
              private dialog: MatDialog) {
      console.log("ID", this.editID)
  }

  ngOnInit() {
    this.getRehabilitationPlans();
    this.getExercises();
    this.getAssessmentTests();
  }

  getExerciseIDs() {
      for(var i = 0; i < this.myExercises.length; i++) {
          this.exerciseIDs.push(this.myExercises[i]._id);
      }
  }

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

  addExercise(name: String) {
      console.log(this.allExercises);
      console.log(name);
      for(var i = 0; i < this.allExercises.length; i++) {
          if(this.allExercises[i].name == name) {
              this.myExercises.push(this.allExercises[i]);
              this.allExercises.splice(i,1);
              console.log(this.myExercises);
          }
      }
      console.log("my exercises", this.myExercises);
  }

  addToDeleteList(id: String) {
      for(var i = 0 ; i < this.deleteList.length; i++) {
          //if the exercise is already in the delete list, remove it from the list
          if(this.deleteList[i] == id) {
              this.deleteList.splice(i,1);
              return;
          }
      }
      this.deleteList.push(id);
      console.log("my exercises", this.myExercises);
  }

  addToMoveList(id: String) {
      for(var i = 0 ; i < this.moveList.length; i++) {
          //if the exercise is already in the delete list, remove it from the list
          if(this.moveList[i] == id) {
              console.log(this.moveList[i], id);
              this.moveList.splice(i,1);
              return;
          }
      }
      this.moveList.push(id);
      console.log("my exercises", this.myExercises);
  }

  moveSelectedUp() {
      if(this.moveList.length == 1) {
          let index = 0;

          for(var i = 0; i < this.myExercises.length; i++) {
              if(this.moveList[this.moveList.length-1] == this.myExercises[i]._id) {

                  index = i;
              }
          }
          if(index > 0) {
              let temp = this.myExercises[index];
              let newIndex = index-1;
              this.myExercises[index] = this.myExercises[newIndex];
              this.myExercises[newIndex] = temp;
          }
      }
      console.log("my exercises", this.myExercises);
  }

  moveSelectedDown() {
      if(this.moveList.length == 1) {
          let index = 0;

          for(var i = 0; i < this.myExercises.length; i++) {
              if(this.moveList[this.moveList.length-1] == this.myExercises[i]._id) {

                  index = i;
              }
          }
          if(index < (this.myExercises.length-1)) {
              let temp = this.myExercises[index];
              let newIndex = index+1;
              this.myExercises[index] = this.myExercises[newIndex];
              this.myExercises[newIndex] = temp;
          }
      }
      console.log("my exercises", this.myExercises);

  }

  // deleteExercises(id: any) {
  //     console.log(id);
  //     // for(var i = 0; i < this.myExercises.length; i++) {
  //     //     if(this.myExercises[i]._id == id) {
  //     //         this.myExercises.splice(i, 1);
  //     //     }
  //     // }
  // }


  deleteExercises(){
      for (var i = 0; i < this.deleteList.length; i++) {
        for (var j = 0; j < this.myExercises.length; j++) {
          if (this.myExercises[j]._id == this.deleteList[i]) {
            this.allExercises.push(this.myExercises[j]);
            this.myExercises.splice(j, 1);
          }
        }
      }
      this.deleteList = [];
      console.log(this.deleteList);
      console.log("my exercises", this.myExercises);
    }

  getRehabilitationPlans(){
      this.rehabilitationplanService.getRehabilitationPlans().subscribe(data => {
          this.rehabilitationplans = data;
          console.log("REHABILITATION PLANS", this.rehabilitationplans);
          this.getExercises();
      });
  }

  getExercises(){
      for (var i = 0; i < this.rehabilitationplans.rehabilitationPlan.length; i++) { //dadf
        if (this.rehabilitationplans.rehabilitationPlan[i]._id == localStorage.getItem('edit_rehabilitation_id')) {
          console.log("MATCH", this.rehabilitationplans.rehabilitationPlan[i]._id);
          this.rehabilitationplan = this.rehabilitationplans.rehabilitationPlan[i];
          console.log(this.rehabilitationplan);
        }
      }

      console.log("getting all exercises");

      console.log("getting all exercises");
      this.exerciseService.getAllExercises().subscribe(
        data => {
          console.log("all exercises retrieved! ", data.exercise, data.exercise.length);
          this.allExercises = data.exercise;

          console.log("exercises retrieved! ", data.exercise);
          let exercises = data.exercise;
          console.log("EXERCISES", data.exercise);
          this.allExercises = data.exercise;

          for (var i = 0; i < exercises.length; i++) {
            for (var j = 0; j < this.rehabilitationplan.exercises.length; j++) {
              console.log("ex test", exercises[i]._id, this.rehabilitationplan.exercises[j]);
              if (exercises[i]._id == this.rehabilitationplan.exercises[j]) {
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

  editRehabiliationPlan(){
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
    var assessTest = {
      name: "Name",
      description: "Description",
      authorName: "Author",
      recommendations: null,
      form: null,
      testResults: null,
      rehabilitationPlan: this.editID,
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
        this.editRehabiliationPlan();
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
          if (allAssessmentTests[i].rehabilitationPlan = this.editID) {
            this.assessmentTests.push(allAssessmentTests[i]);
          }
        }
      }
    )
  }
  //==================================
  //ASSESSMENT TEST ENDS

}
