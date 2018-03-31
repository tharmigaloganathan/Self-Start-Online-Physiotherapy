import { Component, Inject, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { ExerciseService } from "../services/exercise.service";
import {ManagePatientProfileService} from "../manage-patient-profile.service";
import { Router } from '@angular/router';
import { SetFreeTimeService } from "../set-free-time.service";
import { AuthenticationService } from "../authentication.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {ConfirmDeleteDialogBoxComponent} from "../confirm-delete-dialog-box/confirm-delete-dialog-box.component";

import * as moment from 'moment';

@Component({
  selector: 'app-set-free-time',
  templateUrl: './set-free-time.component.html',
  styleUrls: ['./set-free-time.component.scss'],
  providers: [AuthenticationService, ManagePatientProfileService, ExerciseService, SetFreeTimeService],
})
export class SetFreeTimeComponent implements OnInit {

  // temp PhysioTherapistID, for testing
  physioID = '5aa9fa5b0f39cbb0213e2182';

  eventType = ["freeTime", "appointments"];

  calendarOptions: Options;

  @ViewChild('ucCalendar') ucCalendar: CalendarComponent;
  constructor(private rd: Renderer2,
              private router : Router,
              private setFreeTimeService: SetFreeTimeService,
              private authenticationService: AuthenticationService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.authenticationService.getProfile().subscribe(data =>{
      console.log("Authen", data);
      this.physioID = data.physiotherapist._id;
      this.getCurrentAvailability();
    }, err => {
      console.log(err);
    });
  }

  getCurrentAvailability = () => {
    // Send free time to backend
    this.setFreeTimeService.getPhysioTherapist(
      this.physioID
    )
      .subscribe(response => {
        console.log(response);
        let eventslist = this.generateEventsList(response.physiotherapist.availableTimeSlots);
        this.getBookedTimeSlots(eventslist);
      }, error => {
        console.log(error);
      });
  };

  getBookedTimeSlots = (eventslist) => {
    // Retrieve all booked times from backend
    this.setFreeTimeService.retrieveAllAppointmentsForPhysio(this.physioID)
      .subscribe(response => {
        console.log(response);
        eventslist.push(...this.generateEventsListAppointment(response.appointments));

        this.setUpCalendarOptions(eventslist);
      }, error => {
        console.log(error);
      });
  };

  generateEventsList = (eventslist) => {
    let formatedEventsList = new Array();

    for (let event of eventslist){
      if(event){
        formatedEventsList.push({
            title: 'Available',
            start: moment(event.startDate),
            end: moment(event.endDate),
            mongoId: event._id,
            allDay: false,
            eventType: this.eventType[0]
        });
      }
    }

    return formatedEventsList;
  };

  generateEventsListAppointment = (appointmentList) => {
    let formatedEventsList = [];

    for (let appointment of appointmentList){
      if(appointment){
        formatedEventsList.push({
          title: `${appointment.fullPatientProfile.givenName} ${appointment.fullPatientProfile.familyName}`,
          start: moment(appointment.appointment.date),
          end: moment(appointment.appointment.endDate),
          mongoId: appointment.appointment._id,
          allDay: false,
          color: '#FDA92A',
          eventType: this.eventType[1],
          editable: false
        });
      }
    }

    return formatedEventsList;
  };

  alerts = () => {
    alert("hello")
  };

  // Set up calendar options
  setUpCalendarOptions = (eventsList) => {
    this.calendarOptions = {

      customButtons: {
        createNewButton: {
          text: 'Create New',
          click: this.createNewEvent
        }
      },

      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth createNewButton'
      },
      selectable: true,
      // selectHelper: true,
      editable: true,
      eventLimit: true,
      events: eventsList,

    };
  };

  // Navigate to new free time page to add event
  clickButton = (detail) => {
    if (detail.buttonType === "createNewButton"){
      this.router.navigate(['/physio/set-free-time/create-new-free-time']);
    }
    console.log(detail);
  };
  createNewEvent = () => {
    this.router.navigate(['/physio/set-free-time/create-new-free-time']);
  };

  updateEvent = (detail) => {
    // console.log(detail);
    // Send new details to backend
    this.setFreeTimeService.changeOneTimeSlot(
      this.physioID,
      detail.event.mongoId,
      detail.event.start,
      detail.event.end
    )
      .subscribe(response => {
        console.log(response);
        let eventslist = this.generateEventsList(response.physiotherapist.availableTimeSlots);
        this.setUpCalendarOptions(eventslist);
      }, error => {
        console.log(error);
      });
  };

  eventClick = detail => {
    let event = detail.event;

    // If clicked item was free time, give option to delete
    if (event.eventType === this.eventType[0]){
      this.openDialog(event.mongoId);
    }
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
        this.setFreeTimeService.deleteOneTimeSlot(this.physioID,mongoId).subscribe(
          data=>{
            console.log("deleteOne return data", data);
            location.reload();
          }, err=>{
            console.log(err);
          });
      }
    });
  }
}


// ngAfterViewInit() {
  // console.log(this.rd);
  // console.log(this.ucCalendar);
  //
  // // Example availability data for physiotherapist
  // let el = {
  //   title: 'Available',
  //   start: '2018-03-10T08:00:00+05:00',
  //   end: '2018-03-10T18:00:00+05:00',
  //   allDay: false,
  // };
  // this.ucCalendar.fullCalendar({
  //   eventClick: function(calEvent, jsEvent, view){
  //     console.log(calEvent);
  //   }
  // });
  //
  // this.ucCalendar.fullCalendar('renderEvent', el);
  // this.ucCalendar.fullCalendar('rerenderEvents');
// }
