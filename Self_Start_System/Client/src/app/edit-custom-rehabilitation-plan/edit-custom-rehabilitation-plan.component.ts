import { Component, OnInit } from '@angular/core';
import { RehabilitationPlanService } from '../rehabilitation-plan.service';
import { ExerciseService } from '../services/exercise.service';
import { AssessmentTestService } from "../assessment-test.service";
import { ViewEncapsulation } from '@angular/core';
import {EditAssessmentTestDialogComponent} from "../edit-assessment-test-dialog/edit-assessment-test-dialog.component";
import { MatDialog, MatDialogRef } from "@angular/material";
import { AuthenticationService } from "../authentication.service";
import { EditRecommendationDialogComponent } from "../edit-recommendation-dialog/edit-recommendation-dialog.component";
import { RecommendationService } from "../recommendation.service";

@Component({
  selector: 'app-edit-custom-rehabilitation-plan',
  templateUrl: './edit-custom-rehabilitation-plan.component.html',
  styleUrls: ['./edit-custom-rehabilitation-plan.component.scss'],
  providers: [ RehabilitationPlanService, AuthenticationService, AssessmentTestService ],
  encapsulation: ViewEncapsulation.None
})
export class EditCustomRehabilitationPlanComponent implements OnInit {
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

  user: any;

  //ASSESSMENT TEST RELATED
  editAssessmentTestDialogRef: MatDialogRef<EditAssessmentTestDialogComponent>

  incompleteAssessmentTests = [];
  completeAssessmentTests = [];
  selectedCompleteAssessmentTest: any;

  editRecommendationDialogRef: MatDialogRef<EditRecommendationDialogComponent>

  allRecommendations = [];
  selectedAssessmentRecommendations = [];
  allResults = [];
  selectedAssessmentResult = [];

  //END OF ASSESSMENT TEST RELATED

  constructor(private rehabilitationplanService: RehabilitationPlanService,
              private exerciseService: ExerciseService,
              private assessmentTestService: AssessmentTestService,
              private dialog: MatDialog,
              private authService: AuthenticationService,
              private recommendationService: RecommendationService) {
    console.log("ID", this.editID)
  }

  ngOnInit() {
    this.getRehabilitationPlans();
    this.getExercises();
    this.authService.getProfile().subscribe(
      res => {
        this.user = res;
      }
    );
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
      this.getAssessmentTests();
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
    this.incompleteAssessmentTests = [];
    this.assessmentTestService.getAllAssessmentTests().subscribe(
      data => {
        console.log("ASSESSMENTS TESTS", data.assessmentTest);
        console.log("editID:", this.editID);
        let allAssessmentTests = data.assessmentTest;

        for (let i = 0; i < allAssessmentTests.length; i++) {
          if (this.rehabilitationplan.assessmentTests.includes(allAssessmentTests[i]._id)) {
            if(allAssessmentTests[i].dateCompleted != null){ this.incompleteAssessmentTests.push(allAssessmentTests[i]); }
            else { this.completeAssessmentTests.push(allAssessmentTests[i]); }
          }
        }
      }
    )
  }
  //==================================
  //ASSESSMENT TEST ENDS

  //RECOMMENDATIONS STARTS
  //==================================
  createRecommendation(){
    var recommendation = {
      timeStamp: Date.now(),
      decision: "The patient should...",
      assessmentTest: this.selectedCompleteAssessmentTest._id
    }

    this.openEditRecommendationDialog(recommendation, true);
  }

  openEditRecommendationDialog(recommendation, newRecommendationFlag: boolean){
    this.editRecommendationDialogRef = this.dialog.open(EditRecommendationDialogComponent, {
      width: '50vw',
      data: {
        recommendation,
        newRecommendationFlag
      }
    });

    this.editRecommendationDialogRef.afterClosed().subscribe( result => {
      if (newRecommendationFlag) {
        this.addRecommendation(result);
      } else {
        this.editRecommendation(result);
      }
    });
  }

  selectCompleteAssessmentTest(test){
    this.selectedCompleteAssessmentTest = test;
    this.getRecommendations();
  }

  editRecommendation(recommendation){
    this.recommendationService.editRecommendation(recommendation).subscribe(
      res => {
        //Do something for when you edit a recommendation
        this.getRecommendations();
      },
      error => {
        console.log(error);
      }
    )
  }

  addRecommendation(recommendation){
    this.recommendationService.addRecommendation(recommendation).subscribe(
      res => {
        this.selectedCompleteAssessmentTest.push(res.recommendation._id);
        this.editAssessmentTest(this.selectedCompleteAssessmentTest);
        this.getAssessmentTests();
        this.getRecommendations();
      },
      error => {
        console.log(error);
      }
    )
  }

  getRecommendations(){
    this.allRecommendations = [];
    this.selectedAssessmentRecommendations = [];
    this.recommendationService.getAllRecommendations().subscribe(
      data => {
        this.allRecommendations = data.recommendation;

        if(this.selectedCompleteAssessmentTest != null){
          for(let i = 0; i < this.allRecommendations.length; i++){
            if(this.selectedCompleteAssessmentTest.recommendation.includes(this.allRecommendations[i]._id)){
              this.selectedAssessmentRecommendations.push(this.allRecommendations[i]);
            }
          }
        }
      }
    )
  }

  //===================================
  //RECOMMENDATIONS ENDS

  //TEST RESULTS STARTS
  //===================================

  //COMPLETE THIS FUNCTION IN THE MORNING
  getTestResults(){
    this.assessmentTestService.getTestResults().subscribe(
      data => {
        this.allResults = data.testResults;
      }
    )
  }

  //===================================
  //TEST RESULTS ENDS
}
