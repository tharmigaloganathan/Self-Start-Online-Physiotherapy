import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-new-event',
  templateUrl: './create-new-event.component.html',
  styleUrls: ['./create-new-event.component.scss']
})
export class CreateNewEventComponent implements OnInit {

  numWeek = 1;
  startDate;
  startTime;
  endDate;
  endTime;

  constructor() { }

  ngOnInit() {
    this.initializeCurrentTime()
  }

  initializeCurrentTime = () => {
    let now = new Date();
    let currentHour = now.getHours();
    let currentMinute = now.getMinutes();

    this.startDate = new Date();
    this.startTime = (currentHour+":"+currentMinute);

    this.endDate = new Date();
    this.endTime = (currentHour+1+":"+currentMinute);
  };

  //////////// Event Listeners ////////////

  // Weeks can never go below zero
  onChangeWeekNum = () => {
    console.log("Hello");
    this.numWeek = Math.max(0, this.numWeek);
    console.log(this.numWeek);
  };

  onClickSubmit = () => {
    this.startDate.setHours(this.startTime.substring(0, 2),this.startTime.substring(3, 5));
    this.endDate.setHours(this.endTime.substring(0, 2),this.endTime.substring(3, 5));

    console.log(
      this.startDate,
      this.endDate
    );
  };
}
