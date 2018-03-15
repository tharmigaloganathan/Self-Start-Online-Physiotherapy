import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { ExerciseService } from "../services/exercise.service";
import {ManagePatientProfileService} from "../manage-patient-profile.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-set-free-time',
  templateUrl: './set-free-time.component.html',
  styleUrls: ['./set-free-time.component.scss'],
  providers: [ManagePatientProfileService, ExerciseService],
})
export class SetFreeTimeComponent implements OnInit {

  calendarOptions: Options;

  @ViewChild('ucCalendar') ucCalendar: CalendarComponent;
  constructor(private rd: Renderer2, private router : Router) {}

  ngOnInit() {
    this.setUpCalendarOptions();
  }

  // Set up calendar options
  setUpCalendarOptions = () => {
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

      events: [{
        title: 'Available',
        start: '2018-03-09T09:30:00-05:00',
        end: '2018-03-09T17:30:00-05:00',
        allDay: false,
      }]
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
    console.log(detail);
  };
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
