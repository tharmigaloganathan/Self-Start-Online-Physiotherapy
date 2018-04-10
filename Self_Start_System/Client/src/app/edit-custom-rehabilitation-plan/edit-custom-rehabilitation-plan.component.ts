import { Component, OnInit } from '@angular/core';
import { RehabilitationPlanService } from '../rehabilitation-plan.service';
import { ExerciseService } from '../services/exercise.service';
import { AssessmentTestService } from "../assessment-test.service";
import { ViewEncapsulation } from '@angular/core';
import {EditAssessmentTestDialogComponent} from "../edit-assessment-test-dialog/edit-assessment-test-dialog.component";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AuthenticationService } from "../authentication.service";
import { EditRecommendationDialogComponent } from "../edit-recommendation-dialog/edit-recommendation-dialog.component";
import { RecommendationService } from "../recommendation.service";
import { EditExerciseDialogComponent } from "../edit-exercise-dialog/edit-exercise-dialog.component";
import { Router } from '@angular/router';
import { FormService } from "../form.service";
import { EditQuestionDialogComponent } from "../edit-question-dialog/edit-question-dialog.component";
import { ManagePatientProfileService } from '../manage-patient-profile.service';
import { UserAccountListService } from '../user-account-list.service';
import { ConfirmDeleteDialogBoxComponent } from "../confirm-delete-dialog-box/confirm-delete-dialog-box.component";


@Component({
  selector: 'app-edit-custom-rehabilitation-plan',
  templateUrl: './edit-custom-rehabilitation-plan.component.html',
  styleUrls: ['./edit-custom-rehabilitation-plan.component.scss'],
  providers: [ UserAccountListService, RehabilitationPlanService, AuthenticationService, AssessmentTestService, ManagePatientProfileService, FormService ],
  encapsulation: ViewEncapsulation.None
})
export class EditCustomRehabilitationPlanComponent implements OnInit {
  showSidebar = true;
  data: any;
  treatment: any;
  newTreatment = false;

  rehabilitationplans = {rehabilitationPlan:[]}; //Temporary fix
  rehabilitationplan: any = {exerciseOrders:[], assessmentTests:[]}; //Temporary fix
  allExercises = [];//nullaaaaa
  myExercises = [];//nullasaaaa
  oldExercises = [];//keeps track of the exercises that were here before any changes were made
  exerciseIDs = [];
  selectedExercise;
  newExercises = [];
  oldRehabPlan: any;
  selectedPatientName: string;
  loading = false;
  isDataAvailable: boolean = false;

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
              private userAccountListService: UserAccountListService,
              private assessmentTestService: AssessmentTestService,
              private dialog: MatDialog,
              private authService: AuthenticationService,
              private recommendationService: RecommendationService,
              private formService: FormService,
              private managePatientProfileService: ManagePatientProfileService,
              router: Router) {
    console.log("ID", this.editID);
    this.router = router;
    this.loading = true;

  }

  refresh(): void {
      // if(this.pageLoaded == false) {
      //     window.location.reload();
      //     this.pageLoaded = true;
      // }

      // var refresh = localStorage.getItem('refresh');
      //   console.log(refresh);
      //   if (refresh===null){
      //       window.location.reload();
      //       localStorage.setItem('refresh', "1");
      //   }

      if(location.search.indexOf('r') < 0){

        var hash = window.location.hash;
        var loc = window.location.href.replace(hash, '');

        loc += (loc.indexOf('?') < 0? '?' : '&') + 'r';
        // setTimeout(function(){window.location.href = loc + hash;}, 2000);
        window.location.href = loc + hash;
      }

    }

  ngOnInit() {
      let selectedPatient = JSON.parse(localStorage.getItem('selectedPatient'));
      this.selectedPatientName = selectedPatient.givenName + " " + selectedPatient.familyName;
      this.getPatientProfile();
    this.getRehabilitationPlans();
    this.authService.getProfile().subscribe(
      res => {
        this.user = res;
      }
    );
  }

  backToPatientProfile() {
      let selectedPatient = JSON.parse(localStorage.getItem('selectedPatient'));
      this.router.navigate(['/physio/patients/'+ selectedPatient.givenName +'-'+selectedPatient.familyName]);
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
          console.log(this.myExercises, result.data.myExercises);
           console.log(this.allExercises, result.data.allExercises);
           console.log(this.oldExercises, this.myExercises);
      });
  }

  //get all exercise ids from myExercises, pushes to exerciseIDs
  getExerciseIDs() {
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

  putRehabilitationPlan(){
      this.data = this.rehabilitationplan;
      this.rehabilitationplan.custom = true;

      //UPDATE THIS CURRENT REHABILITATION PLAN WITH NEW INFORMATION
      this.rehabilitationplanService.updateRehabilitationPlan(this.rehabilitationplan, this.rehabilitationplan._id).subscribe(res =>
        {
            console.log("end date updated: ", res);
        });

        //reset to null
      //Save all the complete AssessmentTests on the save button
      for(var i = 0; i < this.completeAssessmentTests.length; i++){
        this.assessmentTestService.editAssessmentTest(this.completeAssessmentTests[i]).subscribe(
          res => {
            console.log(res);
          },
          error => {
            console.log(error);
          }
        )
      }

      //Save all the changes to the incomplete AssessmentTests too
      for (var i = 0; i < this.incompleteAssessmentTests.length; i++){
        this.assessmentTestService.editAssessmentTest(this.incompleteAssessmentTests[i]).subscribe(
          res => {
            console.log(res);
          },
          error => {
            console.log(error);
          }
        )
      }

      let selectedPatient = JSON.parse(localStorage.getItem('selectedPatient'));
      this.router.navigate(['/physio/patients/'+ selectedPatient.givenName +'-'+selectedPatient.familyName]);
  }

  postRehabilitationPlan(){
      console.log("ASSESSMENTS", this.rehabilitationplan.assessmentTests);
      this.data = {
        name: this.rehabilitationplan.name,
        authorName: this.rehabilitationplan.authorName,
        description: this.rehabilitationplan.description,
        goal: this.rehabilitationplan.goal,
        assessmentTests: this.rehabilitationplan.assessmentTests,
        startDate: Date.now(),
        endDate: null,
        custom: true,
        timeFrameToComplete: this.rehabilitationplan.timeFrameToComplete,
        exerciseOrders: []
      };

      //UPDATE OLD REHABILITATION PLAN WITH NEW ENDDATE
      this.oldRehabPlan.endDate = Date.now();
      this.rehabilitationplanService.updateRehabilitationPlan(this.oldRehabPlan, this.oldRehabPlan._id).subscribe(res =>
        {
            console.log("end date updated: ", res);
        });

      this.rehabilitationplanService.addRehabilitationPlan(this.data).subscribe(res =>
        {
          console.log("RESULT",res);
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

      //Save all the complete AssessmentTests on the save button
      for(var i = 0; i < this.completeAssessmentTests.length; i++){
        this.assessmentTestService.editAssessmentTest(this.completeAssessmentTests[i]).subscribe(
          res => {
            console.log(res);
          },
          error => {
            console.log(error);
          }
        )
      }

      //Save all the changes to the incomplete AssessmentTests too
      for (var i = 0; i < this.incompleteAssessmentTests.length; i++){
        this.assessmentTestService.editAssessmentTest(this.incompleteAssessmentTests[i]).subscribe(
          res => {
            console.log(res);
          },
          error => {
            console.log(error);
          }
        )
      }

      let selectedPatient = JSON.parse(localStorage.getItem('selectedPatient'));
      this.router.navigate(['/physio/patients/'+ selectedPatient.givenName +'-'+selectedPatient.familyName]);
  }

  saveChanges() {
      let myExercises = JSON.stringify(this.myExercises);
      let oldExercises = JSON.stringify(this.oldExercises);
      localStorage.removeItem('new_treatment');
      console.log("old vs new exercises", myExercises, oldExercises, myExercises == oldExercises );
      console.log("newTreatment", this.newTreatment);
      if(myExercises == oldExercises) {
          console.log("putting the rehab plan")
          this.putRehabilitationPlan();
      } else {
          console.log("posting the rehab plan");
          this.postRehabilitationPlan();
      }
  }

  //gets all rehab plan information and extracts info for this specific rehab plan
  getRehabilitationPlans(){
    if(this.newTreatment != true) {
        console.log("key:", localStorage.getItem('edit_rehabilitation_id'));
        this.rehabilitationplanService.getOneRehabilitationPlan(localStorage.getItem('edit_rehabilitation_id')).subscribe( data => {
          this.rehabilitationplan = data.rehabilitationPlan;
          console.log("Nick this is the rehab plan", data);
          this.getExercises();
          this.getAssessmentTests();
          this.isDataAvailable = true;
          this.loading = false;
          this.refresh();
        });
        this.rehabilitationplanService.getOneRehabilitationPlan(localStorage.getItem('edit_rehabilitation_id')).subscribe( data => {
          this.oldRehabPlan = data.rehabilitationPlan;
        });
    }
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
              // if(localStorage.getItem('treatment_id') != null) {
              //     this.treatment = localStorage.getItem('treatment_id');
              // } else {
                  this.treatment = data.treatments[0];
              // }
              if(localStorage.getItem('new_treatment') != null) {
                  this.newTreatment = true;
              }
              console.log("TREATMENT",this.treatment);
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
      authorName: "Default",
      form: null,
      testResults: null,
      openDate: null,
      dateCompleted: null,
      recommendationDecision: null,
      recommendationEvaluation: null
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
    let dialogRef = this.dialog.open(ConfirmDeleteDialogBoxComponent, {
      width:'250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
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
    });
  }

  openEditAssessmentTestDialog(assessmentTest, newTestFlag: boolean){
    this.editAssessmentTestDialogRef = this.dialog.open(EditAssessmentTestDialogComponent, {
      width: '50vw',
      data: {
        assessmentTest,
        newTestFlag
      }
    });

    this.editAssessmentTestDialogRef.afterClosed().subscribe(result => {
      console.log("FORM YOU ARE GETTING", result);
      this.formService.getForm(result.form).subscribe(
        data => {
          var customForm = data.form;
          console.log("custom form:", customForm);
          delete customForm._id;
          customForm.type = "Custom";
          var testToBeSaved = result;
          console.log("TESTTOBESAVED", testToBeSaved);
          console.log("CUSTOM FORM", customForm);
          this.formService.createForm(customForm).subscribe(
            res=> {
              console.log("RES:", res);
                testToBeSaved.form = res.form._id;
              if (newTestFlag) {
                this.addAssessmentTest(testToBeSaved);
              } else {
                this.editAssessmentTest(result);
                console.log("REHABILITATION PLAN:", this.rehabilitationplan);
              }
              },
            error => {console.log(error)}
          );

        },
        error => console.log(error)
      );
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
        return true;
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

  addQuestion(){
    var q = {
      questionText: "Question Text",
      helpDescription: "Help Description",
      questionType: "Short Answer",
      form: [this.form._id],
      answerChoices: [],
      range: 0,
      type: "Custom"
    }

    this.editQuestionDialogRef = this.dialog.open(EditQuestionDialogComponent, {
      width: '50vw',
      data: {
        question: q
      }
    });

    this.editQuestionDialogRef.afterClosed().subscribe(result => {
      this.formService.addQuestion(result).subscribe(
        res=> {console.log("new question ID: ", res),
          this.form.questions.push(res.question._id),
          this.formQuestions.push(res.question),
          //reload all questions
          this.saveForm(),
          //need to then save form with the new ID in the questions list
          this.getAllQuestions();},
        error => {console.log(error)}
      );
    });
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

  // createRecommendation(){
  //   var recommendation = {
  //     timeStamp: Date.now(),
  //     decision: "The patient should...",
  //     assessmentTest: this.selectedCompleteAssessmentTest._id,
  //     evaluation: 5
  //   }
  //
  //   this.openEditRecommendationDialog(recommendation, true);
  // }
  // openEditRecommendationDialog(recommendation, newRecommendationFlag: boolean){
  //   this.editRecommendationDialogRef = this.dialog.open(EditRecommendationDialogComponent, {
  //     width: '50vw',
  //     data: {
  //       recommendation,
  //       newRecommendationFlag
  //     }
  //   });
  //
  //   this.editRecommendationDialogRef.afterClosed().subscribe( result => {
  //     if (newRecommendationFlag) {
  //       this.addRecommendation(result);
  //     } else {
  //       this.editRecommendation(result);
  //     }
  //   });
  // }
  selectCompleteAssessmentTest(test){
    this.selectedCompleteAssessmentTest = test;
    //this.getRecommendations();
    this.getTestResultsByAssessmentTestID(test);
  }

  // editRecommendation(recommendation){
  //   this.recommendationService.editRecommendation(recommendation).subscribe(
  //     res => {
  //       //Do something for when you edit a recommendation
  //       this.getRecommendations();
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }
  // addRecommendation(recommendation){
  //   this.recommendationService.addRecommendation(recommendation).subscribe(
  //     res => {
  //       this.selectedCompleteAssessmentTest.recommendation = res.recommendation._id;
  //       this.editAssessmentTest(this.selectedCompleteAssessmentTest);
  //       this.getRecommendations();
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }
  // getRecommendations(){
  //   this.allRecommendations = [];
  //   this.selectedAssessmentRecommendation = {};
  //   this.recommendationService.getAllRecommendations().subscribe(
  //     data => {
  //       this.allRecommendations = data.recommendation;
  //       console.log("ALL RECOS:", this.allRecommendations);
  //       console.log("selected complete:", this.selectedCompleteAssessmentTest);
  //       if(this.selectedCompleteAssessmentTest != null){
  //         for(let i = 0; i < this.allRecommendations.length; i++){
  //           if(this.selectedCompleteAssessmentTest.recommendations.includes(this.allRecommendations[i]._id)){
  //             this.selectedAssessmentRecommendation = this.allRecommendations[i];
  //           }
  //         }
  //       }
  //     }
  //   )
  //   console.log(this.allRecommendations);
  //   console.log(this.selectedAssessmentRecommendation);
  // }
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
