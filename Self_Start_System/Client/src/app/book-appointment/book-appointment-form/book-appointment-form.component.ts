import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {SetFreeTimeService} from "../../set-free-time.service";
import {ExerciseService} from "../../services/exercise.service";
import {ManagePatientProfileService} from "../../manage-patient-profile.service";

@Component({
  selector: 'app-book-appointment-form',
  templateUrl: './book-appointment-form.component.html',
  styleUrls: ['./book-appointment-form.component.scss'],
  providers: [ManagePatientProfileService, ExerciseService, SetFreeTimeService],
})
export class BookAppointmentFormComponent implements OnInit {

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

  constructor(public router : Router,
              private setFreeTimeService: SetFreeTimeService) { }

  ngOnInit() {
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

  ///// Event Listeners ////////

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
        this.onClickCancel();
      }, err=>{
        console.log(err);
      });

      // console.log(
      //   this.startDate,
      //   this.endDate,
      //   this.assessmentTypeValue,
      //   this.contactMethod,
      //   localStorage.getItem('book-appointment-mongoId'),
      //   localStorage.getItem('book-appointment-physioId')
      // );

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
    this.endDate.setHours(this.endTime.substring(0,2), this.endTime.substring(3,5));
  };
}
