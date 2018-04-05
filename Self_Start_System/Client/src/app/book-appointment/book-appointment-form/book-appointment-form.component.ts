import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {SetFreeTimeService} from "../../set-free-time.service";
import {ExerciseService} from "../../services/exercise.service";
import {ManagePatientProfileService} from "../../manage-patient-profile.service";
import {AuthenticationService} from "../../authentication.service";
import { PatientCompleteAssessmentTestService } from "../../patient-complete-assessment-test.service";


import { environment } from "../../../environments/environment";
import {Response} from "@angular/http";
import {PaypalButtonComponent} from "../../paypal-button/paypal-button.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-book-appointment-form',
  templateUrl: './book-appointment-form.component.html',
  styleUrls: ['./book-appointment-form.component.scss'],
  providers: [AuthenticationService, ManagePatientProfileService,
    ExerciseService, SetFreeTimeService, PatientCompleteAssessmentTestService],
})
export class BookAppointmentFormComponent implements OnInit {

  questionWithDateInput = 'What was the date of your injury?';

  // Temporary client variable for testing
  patientProfileId = '5a9b3d11e8fb8bbac9887cdd';

  // View items
  startDate;
  startTime;
  endTime;
  assessmentTypeValue = "1";
  contactMethod = "phone";

  // Form validation
  maxEndTime;
  minStartTime;

  endDate;

  hasError : boolean = false;
  errorMsg : string = "";

  disableForm = true;

  // For Intake Form
  form;
  questions = [];
  answers = [];
  testResults = [];
  dateCompleted = new Date();

  // For view paypal
  payment;
  // Whether loading screen is displayed or not
  loading;

  constructor(public router : Router,
              private setFreeTimeService: SetFreeTimeService,
              private authenticationService:AuthenticationService,
              private assessmentTestService: PatientCompleteAssessmentTestService,
              public dialog: MatDialog) {

    // Start loading screen
    this.loading = true;
  }

  ngOnInit() {
    this.authenticationService.getProfile().subscribe(res => {
      console.log("in login component: here's what getProfile returned: ", res);
      for (let result of res){
        console.log((result as any).success);
        if ((result as any).patientProfile){
          this.patientProfileId = (result as any).patientProfile._id;
          console.log(this.patientProfileId);
          break;
        }
      }
      //any function following getting profile goes here
      this.getForm();
    });

    // this.authenticationService.getProfile().subscribe(data=>{
    //   this.patientProfileId = data.patientProfile._id;
    // },err=>{
    //   console.log(err);
    // });

    // Update View
    this.startDate = new Date(localStorage.getItem('book-appointment-start-time'));
    this.startTime = this.convertIntTimeToString(this.startDate.getHours(), this.startDate.getMinutes());
    this.endDate = new Date(this.startDate);

    // Store maximum end time
    this.maxEndTime = new Date(localStorage.getItem('book-appointment-end-time'));
    this.minStartTime = new Date(localStorage.getItem('book-appointment-start-time'));

    // Update time
    this.onStartTimeChange();
  }

  // //Get the Intake test form
  getForm() {
    this.assessmentTestService.getForm(environment.intakeFormOID).
    subscribe(
      data => {
        this.form = data;
        console.log("This is what was returned for the form" + JSON.stringify(data));
        this.getQuestions();

        // Stop loading screen
        this.loading = false;
      },
      error => {
        console.log("Error");

        // Stop loading screen
        this.loading = false;
      });
  }

  //Get the questions
  getQuestions() {
    // Initialize answers with empty strings
    for (let i = 0; i < this.form.questions.length; i++){
      this.answers.push("");
    }

    let questions = [];

    // Inner function to get the questions one by one
    let getSingleQuestion = i => {
      if (i<this.form.questions.length){
        this.assessmentTestService.getQuestion(this.form.questions[i])
          .subscribe(
          data => {
            questions.push(data);
            console.log("This is what was returned for the question" + JSON.stringify(data));
            getSingleQuestion(i + 1);
          },
          error => {
            console.log("Error");
          });
      } else {
        this.questions = questions;
      }
    };

    getSingleQuestion(0);
  }

  // Populate the test results object
  populateTestResults() {
    let questionAnswerToSend = [];
    for(var i = 0; i<this.questions.length; i++) {
      questionAnswerToSend.push({
        question: this.questions[i].questionText,
        answer: this.answers[i],
        assessmentTest: null
      });
    }

    this.setFreeTimeService.completeIntakeForm(this.patientProfileId, questionAnswerToSend)
      .subscribe(result=>{
        console.log(result);
        // Book the appointment after uploading form
        this.onClickBook();
        // this.testViewForm();
      }, err=>{
        console.log(err);
    });

    console.log(questionAnswerToSend);
  }

  // testViewForm =()=>{
  //   this.setFreeTimeService.viewIntakeForm(this.patientProfileId)
  //     .subscribe(result=>{
  //       console.log("result ", result);
  //       for (let object of result.intakeFormQuestionsAndAnswers){
  //         console.log(object);
  //       }
  //     }, err=>{
  //       console.log(err);
  //     });
  // };

  ///// Event Listeners ////////

  //Submit assessment test
  submit() {
    this.populateTestResults();
  }

  // If follow-up treatment, add 1 hour. If initial assessment, add 1.5 hours
  onStartTimeChange = () => {
    // Update Start Date
    this.startDate.setHours(this.startTime.substring(0,2), this.startTime.substring(3,5));

    // Update End Time
    this.updateEndTime();

    // Validate the start time change
    this.validateEntry();
  };

  // Update assessment type and recalculate ending time
  onChangeRadioGroup = (detail) => {
    this.assessmentTypeValue = detail.value;
    console.log(this.assessmentTypeValue);

    // Update time
    this.onStartTimeChange();
  };

  // Cancel the form: go back
  onClickCancel = () => {
    this.router.navigate(['/patient/book-appointment']);
  };

  //
  onClickBook = () => {
    console.log("Book clicked");
    if (!this.hasError){
      this.setFreeTimeService.addNewAppointment(
        this.patientProfileId,
        this.startDate,
        this.endDate,
        'Testing Reason',
        'Testing Other',
        localStorage.getItem('book-appointment-mongoId'),
        localStorage.getItem('book-appointment-physioId'),
      ).subscribe(response=>{
        console.log(response);

        // Go back to prev page
        this.onClickCancel();
      }, err=>{
        console.log(err);
      });
    }
  };

  onClickOpenForms = () => {
    this.disableForm = !this.disableForm;
  };

  ////// Helper functions /////
  addByHour = (startTime : string, hourToAdd : number, minuteToAdd : number) => {
    let hour = parseInt(startTime.substring(0, 2));
    let minute = parseInt(startTime.substring(3, 5));
    minute += minuteToAdd;
    hour += Math.floor(minute / 60) + hourToAdd;
    minute %= 60;

    return this.convertIntTimeToString(hour, minute);
  };

  /*
    Converts time from 1:4 format into "01:04" format
  */
  convertIntTimeToString = (hour, minute) => {
    let strHour = hour.toString();
    let strMinute = minute.toString();

    if (strHour.length < 2)
      strHour = "0" + strHour;

    if (strMinute.length < 2)
      strMinute = "0" + strMinute;

    return strHour + ":" + strMinute;
  };

  // If the end date is out of bounds, update the error
  validateEntry = () => {
    if (this.endDate.getTime() > this.maxEndTime.getTime()){
      this.hasError = true;
      this.errorMsg = 'Sorry, your timeslot is not available. Please select an earlier start time.';
    } else if (this.startDate.getTime() < this.minStartTime.getTime()){
      this.hasError = true;
      this.errorMsg = 'Sorry, your timeslot is not available. Please select an later start time.';
    } else {
      this.hasError = false;
    }
  };

  // Update the ending time and date
  updateEndTime = () => {
    // Update endTime
    if (this.assessmentTypeValue === "1")
      this.endTime = this.addByHour(this.startTime, 1, 0);
    else if (this.assessmentTypeValue === "2")
      this.endTime = this.addByHour(this.startTime, 1, 30 );

    // Update End Date
    this.endDate = new Date(this.startDate);
    this.endDate.setHours(this.endTime.substring(0,2), this.endTime.substring(3,5));
  };

  openPaypalDialog(event): void {
    // Prevent submit
    event.preventDefault();

    // Open the dialog box
    let dialogRef = this.dialog.open(PaypalButtonComponent);

    // After the dialog box is closed, see if the transaction is set
    dialogRef.afterClosed().subscribe(result => {
      // Get the trasaction object
      let transaction = JSON.parse(sessionStorage.getItem("transaction"));
      console.log("transaction: ", transaction);

      // If the transaction is approved, set the payment option to paid
      if (transaction && transaction.state === "approved") {
        // console.log(transaction.transactions[0]);
        // console.log(transaction.transactions[0].amount);
        // console.log(transaction.transactions[0].amount.total);

        this.setFreeTimeService.submitPayment(this.patientProfileId,
          transaction.transactions[0].amount.total,
          "Sample note")
          .subscribe(result=>{
            console.log(result);
          }, err=>{
            console.log(err);
          });

        this.payment='Paid';
      } else {
        this.payment=null;
      }
      // Reset session storage to avoid replay attack
      sessionStorage.setItem("transaction", null);
    });
  }

  onImageUpload(event, i){
    console.log(event.file);
    console.log(i);
    console.log(this.answers);
    this.answers[i] = environment.apiURLForUploadingPictures + event.file;
  }
}
