import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

import { Router } from "@angular/router";

import * as moment from 'moment';
import {SetFreeTimeService} from "../set-free-time.service";
import {ExerciseService} from "../services/exercise.service";
import {ManagePatientProfileService} from "../manage-patient-profile.service";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss'],
  providers: [AuthenticationService, ManagePatientProfileService, ExerciseService, SetFreeTimeService],
})
export class BookAppointmentComponent implements OnInit {
  // Temporary client variable for testing
  patientProfileId = '5a9b3d11e8fb8bbac9887cdd';

  calendarOptions: Options;

  @ViewChild('ucCalendar') ucCalendar: CalendarComponent;
  constructor(private rd: Renderer2,
              private router : Router,
              private setFreeTimeService: SetFreeTimeService,
              private authenticationService:AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.getProfile().subscribe(data=>{
      this.patientProfileId = data.patientProfile._id;
      this.getCurrentAvailability();
    }, err=>{
      console.log(err);
    });

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
          canClick: true
        });
      }
    }

    return formatedEventsList;
  };

  generateEventsListAppointment = (appointmentList) => {
    let formatedEventsList = new Array();

    for (let appointment of appointmentList){
      formatedEventsList.push({
        title: "Booked Appointment",
        start: moment(appointment.date),
        end: moment(appointment.endDate),
        mongoId: appointment._id,
        allDay: false,
        color: '#FDA92A',
        canClick: false
      });
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
    if (detail.event.canClick){
      console.log(detail);
      let startDate = detail.event.start.toDate();
      let endDate = detail.event.end.toDate();
      console.log(startDate, endDate);
      localStorage.setItem('book-appointment-start-time', startDate.toString());
      localStorage.setItem('book-appointment-end-time', endDate.toString());
      localStorage.setItem('book-appointment-mongoId', detail.event.mongoId);
      localStorage.setItem('book-appointment-physioId', detail.event.physioId);

      this.router.navigate(['/patient/book-appointment/form']);
    } else {
      // NTD: Maybe allow edit or delete?
    }
  };

  clickButton = (detail) => {
    console.log(detail);
  };
}
