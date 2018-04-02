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
import { EditExerciseDialogComponent } from "../edit-exercise-dialog/edit-exercise-dialog.component";
import { Router } from '@angular/router';
import { FormService } from "../form.service";
import { EditQuestionDialogComponent } from "../edit-question-dialog/edit-question-dialog.component";


@Component({
  selector: 'app-edit-custom-rehabilitation-plan',
  templateUrl: './edit-custom-rehabilitation-plan.component.html',
  styleUrls: ['./edit-custom-rehabilitation-plan.component.scss'],
  providers: [ RehabilitationPlanService, AuthenticationService, AssessmentTestService, FormService ],
  encapsulation: ViewEncapsulation.None
})
export class EditCustomRehabilitationPlanComponent implements OnInit {
  showSidebar = true;
  data: Object;

  rehabilitationplans = {rehabilitationPlan:[]}; //Temporary fix
  rehabilitationplan = {exerciseOrders:[], assessmentTests:[]}; //Temporary fix
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
  router;


  user: any;

  //ASSESSMENT TEST RELATED
  editAssessmentTestDialogRef: MatDialogRef<EditAssessmentTestDialogComponent>

  incompleteAssessmentTests = [];
  completeAssessmentTests = [];
  selectedCompleteAssessmentTest: any;
  selectedIncompleteIndex = 0;
  selectedCompleteIndex = 0;
  form: any;
  formQuestions = [];
  allQuestions: any[];

  editQuestionDialogRef: MatDialogRef<EditQuestionDialogComponent>
  editRecommendationDialogRef: MatDialogRef<EditRecommendationDialogComponent>

  allRecommendations = [];
  selectedAssessmentRecommendation: any;
  allResults = [];
  selectedAssessmentResult = [];

  //END OF ASSESSMENT TEST RELATED

  constructor(private rehabilitationplanService: RehabilitationPlanService,
              private exerciseService: ExerciseService,
              private assessmentTestService: AssessmentTestService,
              private dialog: MatDialog,
              private authService: AuthenticationService,
              private recommendationService: RecommendationService,
              private formService: FormService,
              router: Router) {
    console.log("ID", this.editID);
    this.router = router;
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

  putRehabilitationPlan(name: String, description: String, authorName: String, goal: String, timeframe: String) {
    this.getExerciseIDs();
    console.log("my exercises", this.myExercises);
    this.data = {
      name: name,
      authorName: authorName,
      description: description,
      goal: goal,
      timeFrameToComplete: timeframe,
      exerciseOrders: this.exerciseIDs
    };

    console.log("data: ",this.data);
    this.rehabilitationplanService.updateRehabilitationPlan(this.data, this.editID).subscribe(res =>
      {
        console.log("RESULT",res);
      }
    );
    let patient_id = localStorage.getItem('patient_id')
    this.router.navigate(['physio/patient-plan-list/'+ patient_id]);
  }

  //gets all rehab plan information and extracts info for this specific rehab plan
  getRehabilitationPlans(){
    // this.rehabilitationplanService.getRehabilitationPlans().subscribe(data => {
    //   this.rehabilitationplans = data;
    //   for(var i = 0; i < this.rehabilitationplans.rehabilitationPlan.length; i++) { //dadf
    //       if(this.rehabilitationplans.rehabilitationPlan[i]._id == localStorage.getItem('edit_rehabilitation_id')) {
    //           this.rehabilitationplan = this.rehabilitationplans.rehabilitationPlan[i];
    //       }
    //   }
    //   this.getExercises();
    //   this.getAssessmentTests();
    // });

    console.log("key:", localStorage.getItem('edit_rehabilitation_id'));
    this.rehabilitationplanService.getOneRehabilitationPlan(localStorage.getItem('edit_rehabilitation_id')).subscribe( data => {
      this.rehabilitationplan = data.rehabilitationPlan;
      console.log("Nick this is the rehab plan", data);
      this.getExercises();
      this.getAssessmentTests();
    })
  }
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
      authorName: "Default",
      recommendations: {},
      form: null,
      testResults: null,
      openDate: null,
      dateCompleted: null
    }
    this.openEditAssessmentTestDialog(assessTest, true);
  }

  editAssessmentTest(assessmentTest){
    console.log("Assessment test send to back-end:", assessmentTest)
    this.assessmentTestService.editAssessmentTest(assessmentTest).subscribe(
      res => {
        console.log("Edit assessment test response", res),
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
    this.completeAssessmentTests = [];
    this.assessmentTestService.getAllAssessmentTests().subscribe(
      data => {
        console.log("ASSESSMENTS TESTS", data.assessmentTest);
        console.log("editID:", this.editID);
        let allAssessmentTests = data.assessmentTest;

        for (let i = 0; i < allAssessmentTests.length; i++) {
          if (this.rehabilitationplan.assessmentTests.includes(allAssessmentTests[i]._id)) {
            if(allAssessmentTests[i].dateCompleted == null){ this.incompleteAssessmentTests.push(allAssessmentTests[i]); }
            else { this.completeAssessmentTests.push(allAssessmentTests[i]); }
          }
        }
        this.getForm();
        this.selectedCompleteAssessmentTest = this.completeAssessmentTests[this.selectedCompleteIndex];
      }
    )
  }
  //==================================
  //ASSESSMENT TEST ENDS

  //RECOMMENDATIONS STARTS
  //==================================
  setActiveIncompleteTest(i){
    this.selectedIncompleteIndex = i;
    this.getForm();
  }

  setActiveCompleteTest(i){
    this.selectedCompleteIndex = i;
    this.selectCompleteAssessmentTest(this.completeAssessmentTests[i]);
  }

  getForm(){
    this.formService.getForm(this.incompleteAssessmentTests[this.selectedIncompleteIndex].form).subscribe(
      data => {
        console.log("specific form received! ", data);
        this.form = data.form;
        this.getAllQuestions();
      },
      error => console.log(error)
    );
  }

  getAllQuestions(){
    //Set to nothing so that it doesn't get double-populated
    this.formQuestions = [];
    this.allQuestions = [];
    this.formService.getAllQuestions().subscribe(
      data => {
        let questions = data.question;
        this.allQuestions = data.question;

        //Places the formQuestion objects in order, splices it out of rest of questions
        for (let i = 0; i < this.form.questions.length; i++) {
          for (let j = 0; j < this.allQuestions.length; j++){
            if(this.form.questions[i] == questions[j]._id) {
              this.formQuestions.push(questions[j]);
            }
          }
        }
      },
      error => console.log(error)
    );
  }

  openEditQuestionDialog(q){
    this.editQuestionDialogRef = this.dialog.open(EditQuestionDialogComponent, {
      width: '50vw',
      data: {
        question: q
      }
    });

    this.editQuestionDialogRef.afterClosed().subscribe(result => {
      this.editQuestion(result);
    });
  }

  editQuestion(selectedQuestion) {
    if(selectedQuestion.type == "Standard"){

    }
    this.formService.editQuestion(selectedQuestion).subscribe(
      res => {
        //First save the form in case there were changes to it
        this.saveForm(),
          //reload all questions
          this.getAllQuestions();
      },
      error => {
        console.log(error)
      }
    )
  }

  saveForm(){
    this.formService.saveForm(this.form).subscribe(
      res => {
        console.log("response received: ", res)
      },
      error => {
        console.log(error)
      }
    )
  }

  createRecommendation(){
    var recommendation = {
      timeStamp: Date.now(),
      decision: "The patient should...",
      assessmentTest: this.selectedCompleteAssessmentTest._id,
      evaluation: 5
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
    this.getTestResultsByAssessmentTestID(test);
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
        this.selectedCompleteAssessmentTest.recommendation = res.recommendation._id;
        this.editAssessmentTest(this.selectedCompleteAssessmentTest);
        this.getRecommendations();
      },
      error => {
        console.log(error);
      }
    )
  }

  getRecommendations(){
    this.allRecommendations = [];
    this.selectedAssessmentRecommendation = {};
    this.recommendationService.getAllRecommendations().subscribe(
      data => {
        this.allRecommendations = data.recommendation;
        console.log("ALL RECOS:", this.allRecommendations);
        console.log("selected complete:", this.selectedCompleteAssessmentTest);
        if(this.selectedCompleteAssessmentTest != null){
          for(let i = 0; i < this.allRecommendations.length; i++){
            if(this.selectedCompleteAssessmentTest.recommendations.includes(this.allRecommendations[i]._id)){
              this.selectedAssessmentRecommendation = this.allRecommendations[i];
            }
          }
        }
      }
    )
    console.log(this.allRecommendations);
    console.log(this.selectedAssessmentRecommendation);
  }

  //===================================
  //RECOMMENDATIONS ENDS

  //TEST RESULTS STARTS
  //===================================

  getTestResultsByAssessmentTestID(test){
    this.assessmentTestService.getTestResultsByAssessmentTestID(test).subscribe(
      data => {
        console.log("DATA:", data);
        this.allResults = data.testResult;
        console.log("RESULTS:", this.allResults);
      }
    )
  }

  //===================================
  //TEST RESULTS ENDS
}
