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
import { ManagePatientProfileService } from '../manage-patient-profile.service';
import { UserAccountListService } from '../user-account-list.service';


@Component({
  selector: 'app-edit-custom-rehabilitation-plan',
  templateUrl: './edit-custom-rehabilitation-plan.component.html',
  styleUrls: ['./edit-custom-rehabilitation-plan.component.scss'],
  providers: [ UserAccountListService, RehabilitationPlanService, AuthenticationService, AssessmentTestService, ManagePatientProfileService ],
  encapsulation: ViewEncapsulation.None
})
export class EditCustomRehabilitationPlanComponent implements OnInit {
  showSidebar = true;
  data: any;
  treatment: any;

  rehabilitationplans = {rehabilitationPlan:[]}; //Temporary fix
  rehabilitationplan = {exerciseOrders:[], assessmentTests:[]}; //Temporary fix
  allExercises = [];//nullaaaaa
  myExercises = [];//nullasaaaa
  oldExercises = [];
  exerciseIDs = [];
  selectedExercise;
  newExercises = [];

  deleteList = [];
  editID = localStorage.getItem('edit_rehabilitation_id');
  moveList = [];
  editExerciseDialogRef: MatDialogRef<EditExerciseDialogComponent>
  router;

  selectedRow;
  activeExercise;


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
              private userAccountListService: UserAccountListService,
              private assessmentTestService: AssessmentTestService,
              private dialog: MatDialog,
              private authService: AuthenticationService,
              private recommendationService: RecommendationService,
              private managePatientProfileService: ManagePatientProfileService,
              router: Router) {
    console.log("ID", this.editID);
    this.router = router;
  }

  ngOnInit() {
    this.getRehabilitationPlans();
    this.getPatientProfile();
    this.authService.getProfile().subscribe(
      res => {
        this.user = res;
      }
    );
  }

  //delete exercise from plan (move from myExercises to allExercises)
  deleteExercise() {
      console.log("selected exercise", this.activeExercise);
      for(var i = 0; i < this.myExercises.length; i++) {
          if(this.myExercises[i]._id == this.activeExercise._id) {
              this.allExercises.push(this.myExercises[i]);
              this.myExercises.splice(i,1);
          }
      }
      this.activeExercise = null;
  }

  //open exercise details when an exercise is clicked on the panel
  openExerciseDetails(index) {
      this.selectedRow = index;
      this.activeExercise = this.myExercises[index];
  }

  openEditExerciseDialog(){
      // this.selectQuestion(exercise);
      this.editExerciseDialogRef = this.dialog.open(EditExerciseDialogComponent, {
          width: '50vw',
          height: '75vh',
          data: {
              allExercises: this.allExercises,
              myExercises: this.myExercises,
              activeExercise: this.activeExercise,
              selectedRow: this.selectedRow
          }
      });

      this.editExerciseDialogRef.afterClosed().subscribe(result => {
          this.allExercises = result.data.allExercises;
          this.myExercises = result.data.myExercises;
          this.activeExercise = result.data.activeExercise;
          this.selectedRow = result.data.selectedRow;
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

  // putRehabilitationPlan(name: String, description: String, authorName: String, goal: String, timeframe: String) {
  //   // this.getExerciseIDs();
  //   console.log("my exercises", this.myExercises);
  //   this.data = {
  //     name: name,
  //     authorName: authorName,
  //     description: description,
  //     goal: goal,
  //     timeFrameToComplete: timeframe,
  //     exerciseOrders: this.myExercises
  //   };
  //
  //   console.log("data: ",this.data);
  //   this.rehabilitationplanService.updateRehabilitationPlan(this.data, this.editID).subscribe(res =>
  //     {
  //       console.log("RESULT",res);
  //     }
  //   );
  //   let patient_id = localStorage.getItem('patient_id')
  //   this.router.navigate(['physio/patient-plan-list/'+ patient_id]);
  // }

  saveChanges(name: String, description: String, authorName: String, goal: String, timeframe: String) {
    this.data = {
      name: name,
      authorName: authorName,
      description: description,
      goal: goal,
      custom: true,
      timeFrameToComplete: timeframe,
      exerciseOrders: []
    };

    this.rehabilitationplanService.addRehabilitationPlan(this.data).subscribe(res =>
      {
        console.log("RESULT",res.rehabilitationPlan._id);
        let rehabPlanID = res.rehabilitationPlan._id;
        let rehabPlan = res.rehabilitationPlan;
        this.treatment.rehabilitationPlan.push(rehabPlan);
        this.managePatientProfileService.updateTreatment(this.treatment, this.treatment._id).
        subscribe( data => {
            console.log("new treatment update", data);
        });
        let completedRequests = 0;
        for(var i = 0; i < this.myExercises.length; i++) { //create new copy of every exercise, add this new rehab plan as a FK
            this.myExercises[i] = {
                name: this.myExercises[i].name,
        		description: this.myExercises[i].description,
        		objectives: this.myExercises[i].objectives,
        		authorName: this.myExercises[i].authorName,
        		actionSteps: this.myExercises[i].actionSteps,
        		location: this.myExercises[i].location,
        		standard: false,
        		frequency: this.myExercises[i].frequency,
        		duration: this.myExercises[i].duration,
        		targetDate: this.myExercises[i].targetDate,
        		multimediaURL: this.myExercises[i].multimediaURL,
        		rehabilitationPlan: rehabPlan
            }
            let exercise: any;
            this.exerciseService.registerExercise(this.myExercises[i]).subscribe(resExercise =>
            {
                console.log("new exercise",resExercise);
                exercise = resExercise;
                exercise = exercise.exercise;
                this.data.exerciseOrders.push(exercise); //pushes new exercise id as it is created
                completedRequests++;
                console.log("I",i,completedRequests);
                if(this.myExercises.length == completedRequests) { //in last loop, push all exercses to the rehabplan
                    console.log("REACHED LAST LOOP");
                    this.rehabilitationplanService.updateRehabilitationPlan(this.data, rehabPlanID).subscribe(res =>
                    {
                        console.log("RESULT",res);
                    });
                }
            });
        }
      }
    );
    let selectedPatient = JSON.parse(localStorage.getItem('selectedPatient'));
    this.router.navigate(['/physio/patients/'+ selectedPatient.givenName +'-'+selectedPatient.familyName]);
  }

  //gets all rehab plan information and extracts info for this specific rehab plan
  getRehabilitationPlans(){
    this.rehabilitationplanService.getRehabilitationPlans().subscribe(data => {
      this.rehabilitationplans = data;
      for(var i = 0; i < this.rehabilitationplans.rehabilitationPlan.length; i++) { //dadf
          if(this.rehabilitationplans.rehabilitationPlan[i]._id == localStorage.getItem('edit_rehabilitation_id')) {
              this.rehabilitationplan = this.rehabilitationplans.rehabilitationPlan[i];
              console.log("rehabilitation plan",this.rehabilitationplan);
          }
      }
      this.getExercises();
      this.getAssessmentTests();
    });
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

  getPatientProfile() {
      let id: any;
      id = JSON.parse(localStorage.getItem('selectedPatient'));
      console.log(id);
      id = id._id;

      this.userAccountListService.getPatientProfile(id).subscribe(
          data => {
              console.log("data", data);
              this.treatment = data.treatments[0];
              console.log("TREATMENT",this.treatment);
              //this.age = (Date.parse(this.today) - Date.parse(this.user.DOB))/(60000 * 525600);
              //this.age = this.age[0] + " years";
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
      recommendations: [],
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
        this.selectedCompleteAssessmentTest.recommendations.push(res.recommendation._id);
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
    this.selectedAssessmentRecommendations = [];
    this.recommendationService.getAllRecommendations().subscribe(
      data => {
        this.allRecommendations = data.recommendation;
        console.log("ALL RECOS:", this.allRecommendations);

        if(this.selectedCompleteAssessmentTest != null){
          for(let i = 0; i < this.allRecommendations.length; i++){
            if(this.selectedCompleteAssessmentTest.recommendations.includes(this.allRecommendations[i]._id)){
              this.selectedAssessmentRecommendations.push(this.allRecommendations[i]);
            }
          }
        }
      }
    )
    console.log(this.allRecommendations);
    console.log(this.selectedAssessmentRecommendations);
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
