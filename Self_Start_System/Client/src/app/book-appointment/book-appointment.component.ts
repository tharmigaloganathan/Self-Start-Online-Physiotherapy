import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

import { Router } from "@angular/router";

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})
export class BookAppointmentComponent implements OnInit {
  calendarOptions: Options;

  @ViewChild('ucCalendar') ucCalendar: CalendarComponent;
  constructor(private rd: Renderer2, private router : Router) {}

  ngOnInit() {
    this.setUpCalendarOptions();
  }

  // Set up calendar options
  setUpCalendarOptions = () => {
    this.calendarOptions = {
      editable: false,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'agendaWeek,agendaDay,listMonth'
      },
      defaultView: 'agendaWeek',
      events: [{
        title: 'Available',
        start: '2018-03-09T09:30:00-05:00',
        end: '2018-03-09T17:30:00-05:00',
        color: '#000',
        allDay: false,
      }]
    };
  };

  // Event listeners
  eventClick = (detail) => {
    console.log(detail);
    let startDate = detail.event.start.toDate();
    let endDate = detail.event.end.toDate();
    console.log(startDate, endDate);
    localStorage.setItem('book-appointment-start-time', startDate.toString());
    localStorage.setItem('book-appointment-end-time', endDate.toString());

    this.router.navigate(['/patient/book-appointment/form']);

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
