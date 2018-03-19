import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SetFreeTimeService } from "../../set-free-time.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../authentication.service";

@Component({
  selector: 'app-create-new-event',
  templateUrl: './create-new-event.component.html',
  styleUrls: ['./create-new-event.component.scss'],
  providers: [AuthenticationService,SetFreeTimeService]
})
export class CreateNewEventComponent implements OnInit {

  // temp PhysioTherapistID, for testing
  physioID = '5aa9fa5b0f39cbb0213e2182';

  numWeek = 1;
  startDate;
  startTime;
  endDate;
  endTime;

  numWeeksSentToBackend = 0;

  constructor(private setFreeTimeService : SetFreeTimeService,
              private router : Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.getProfile().subscribe(data=>{
      this.physioID = data.physiotherapist._id;
      this.initializeCurrentTime();
    }, err=>{
      console.log(err);
    });
  }

  initializeCurrentTime = () => {
    let now = new Date();
    let currentHour = now.getHours();
    let currentMinute = now.getMinutes();

    this.startDate = new Date();
    this.startTime = this.convertIntTimeToString(currentHour, currentMinute);

    this.endDate = new Date();
    this.endTime = this.convertIntTimeToString(currentHour+1, currentMinute);
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

    this.sendTimeSlots();
  };

  /// Helper Function ///

  sendTimeSlots = () => {
    // Send message and increment if more weeks to send
    if (this.numWeeksSentToBackend++ < this.numWeek) {
      // Send free time to backend
      this.setFreeTimeService.addTimeSlot(
        this.physioID,
        this.startDate,
        this.endDate
      )
        .subscribe(response => {
          console.log(response);
          this.sendTimeSlots();
        }, error => {
          console.log(error);
        });
      console.log(
        this.startDate,
        this.endDate
      );

      this.startDate.setDate(this.startDate.getDate() + 7);
      this.endDate.setDate(this.endDate.getDate() + 7);
    } else {
      // Switch pages if done
      this.router.navigate(['/physio/set-free-time/']);
    }
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

  // // Switch pages only if all the weeks have been sent
  // switchPageIfDone = () => {
  //   if (++this.numWeeksSentToBackend >= this.numWeek){
  //     // Navigate to previous page when done
  //     this.router.navigate(['/physio/set-free-time/']);
  //     this.router.navigate(['/physio/set-free-time/']);
  //   }
  // };
}
