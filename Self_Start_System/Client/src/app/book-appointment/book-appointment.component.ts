import { Component, OnInit, ViewChild, ElementRef, Renderer2,OnDestroy } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

import { Router } from "@angular/router";

import * as moment from 'moment';
import {SetFreeTimeService} from "../set-free-time.service";
import {ExerciseService} from "../services/exercise.service";
import {ManagePatientProfileService} from "../manage-patient-profile.service";
import {AuthenticationService} from "../authentication.service";
import {ConfirmDeleteDialogBoxComponent} from "../confirm-delete-dialog-box/confirm-delete-dialog-box.component";

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss'],
  providers: [AuthenticationService, ManagePatientProfileService, ExerciseService, SetFreeTimeService],
})
export class BookAppointmentComponent implements OnInit, OnDestroy{
  // Temporary client variable for testing
  patientProfileId = '5a9b3d11e8fb8bbac9887cdd';
  user;
  calendarOptions: Options;
  profileSubscription;

  eventType = ["freeTime", "appointments"];

  @ViewChild('ucCalendar') ucCalendar: CalendarComponent;
  constructor(private rd: Renderer2,
              private router : Router,
              private setFreeTimeService: SetFreeTimeService,
              private authenticationService:AuthenticationService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.profileSubscription= this.authenticationService.profileOb$.subscribe((profile) => {
      this.user = profile; console.log("subscription to auth service set profile returned: ", this.user);
      this.patientProfileId = this.user._id;
      this.getCurrentAvailability();
    });
    // this.authenticationService.getProfile().subscribe(data=>{
    //   this.patientProfileId = data.patientProfile._id;
    //   this.getCurrentAvailability();
    // }, err=>{
    //   console.log(err);
    // });
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.profileSubscription.unsubscribe();
    console.log("subscription terminated");
  }

  getCurrentAvailability = () => {
    // Retrieve all free times from backend
    this.setFreeTimeService.getAllPhysioTherapist()
      .subscribe(response => {
        console.log(response);
        this.getBookedTimeSlots(response.physiotherapist);
      }, error => {
        console.log(error);
      });
  };

  getBookedTimeSlots = (physiotherapists) => {
    // Retrieve all booked times from backend
    this.setFreeTimeService.retrieveAllAppointmentsForPatient(this.patientProfileId)
      .subscribe(response => {
        console.log(response);
        // Generate both times into a list
        let eventslist = this.generateEventsList(physiotherapists);
        eventslist.push(...this.generateEventsListAppointment(response.appointments));

        this.setUpCalendarOptions(eventslist);
      }, error => {
        console.log(error);
      });
  };

  // Generates a list of events from the server
  generateEventsList = (physioList) => {
    let formatedEventsList = new Array();

    for (let physiotherapist of physioList){
      for (let event of physiotherapist.availableTimeSlots){
        formatedEventsList.push({
          title: physiotherapist.givenName + " " + physiotherapist.familyName,
          start: moment(event.startDate),
          end: moment(event.endDate),
          mongoId: event._id,
          physioId: physiotherapist._id,
          allDay: false,
          eventType: this.eventType[0]
        });
      }
    }

    return formatedEventsList;
  };

  generateEventsListAppointment = (appointmentList) => {
    let formatedEventsList = new Array();

    for (let appointment of appointmentList){
      if(appointment){
        formatedEventsList.push({
          title: "Booked Appointment",
          start: moment(appointment.date),
          end: moment(appointment.endDate),
          mongoId: appointment._id,
          allDay: false,
          color: '#FDA92A',
          eventType: this.eventType[1]
        });
      }
    }

    return formatedEventsList;
  };

  // Set up calendar options
  setUpCalendarOptions = (eventslist) => {
    this.calendarOptions = {
      editable: false,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'agendaWeek,agendaDay,listMonth'
      },
      defaultView: 'agendaWeek',
      events: eventslist
    };
  };

  // Event listeners
  eventClick = (detail) => {
    // If click was a free time event, the start booking form
    if (detail.event.eventType === this.eventType[0]){
      // Calculate the start and end date of the event clicked
      console.log(detail);
      let startDate = detail.event.start.toDate();
      let endDate = detail.event.end.toDate();
      console.log(startDate, endDate);

      // Store items in local storage for the next component
      localStorage.setItem('book-appointment-start-time', startDate.toString());
      localStorage.setItem('book-appointment-end-time', endDate.toString());
      localStorage.setItem('book-appointment-mongoId', detail.event.mongoId);
      localStorage.setItem('book-appointment-physioId', detail.event.physioId);

      // Navigate to the next component
      this.router.navigate(['/patient/book-appointment/form']);
    // If event was an appointment, open dialog box to delete.
    } else if (detail.event.eventType === this.eventType[1]){
      this.openDialog(detail.event.mongoId);
    } else { // It shouldn't be possible to each this point. Something is wrong if it did.
      console.log("Invalid event", detail);
    }
  };

  clickButton = (detail) => {
    console.log(detail);
  };

  // Helper functions for dialog box //
  openDialog(mongoId): void {
    let dialogRef = this.dialog.open(ConfirmDeleteDialogBoxComponent, {
      width: '250px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(mongoId);
        // Delete the event and reload the page
        this.setFreeTimeService.deleteAppointment(this.patientProfileId, mongoId)
          .subscribe(data=>{
            console.log("delete service",data);
            location.reload();
          }, err=>{
            console.log(err);
          });
      }
    });
  }
}
