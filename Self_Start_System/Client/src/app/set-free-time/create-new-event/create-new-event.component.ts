import {Component, Input, Output, EventEmitter, OnInit, ViewContainerRef} from '@angular/core';
import { SetFreeTimeService } from "../../set-free-time.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../authentication.service";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-create-new-event',
  templateUrl: './create-new-event.component.html',
  styleUrls: ['./create-new-event.component.scss'],
  providers: [AuthenticationService,SetFreeTimeService]
})
export class CreateNewEventComponent implements OnInit {

  // temp PhysioTherapistID, for testing
  physioID;

  numWeek = 1;
  startDate;
  startTime;
  endDate;
  endTime;

  numWeeksSentToBackend = 0;

  profileSubscription;

  // For controlling loading screen
  serviceLoading;
  dateLoading;

  constructor(private setFreeTimeService : SetFreeTimeService,
              private router : Router,
              private authenticationService: AuthenticationService,
              public toastr: ToastsManager,
              vcr: ViewContainerRef
  ) {
    this.dateLoading = true;
    this.serviceLoading = false;
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.authenticationService.getProfile().subscribe(res => {
      this.profileSubscription = this.authenticationService.profileOb$.subscribe((profile) => {
        this.physioID = profile._id; console.log("subscription to auth service set profile returned: ", profile);

        this.serviceLoading = false;
      });
      //any function following getting profile goes here
      this.initializeCurrentTime();
    })
  }

  ngOnDestroy(){
    this.profileSubscription.unsubscribe();
    console.log("subscription terminated")
  }

  initializeCurrentTime = () => {
    let now = new Date();
    let currentHour = now.getHours();
    let currentMinute = now.getMinutes();

    this.startDate = new Date();
    this.startTime = this.convertIntTimeToString(currentHour, currentMinute);

    this.endDate = new Date();
    this.endTime = this.convertIntTimeToString(currentHour+1, currentMinute);

    // Stop loading
    this.dateLoading = false;
  };

  //////////// Event Listeners ////////////

  // Weeks can never go below zero
  onChangeWeekNum = () => {
    console.log("Hello");
    this.numWeek = Math.max(0, this.numWeek);
    console.log(this.numWeek);
  };

  onClickSubmit = () => {
    // console.log(typeof(this.startTime));
    // Check if the end time time is after the start time
    if (Date.parse(`01/01/2011 ${this.startTime}`) >= Date.parse(`01/01/2011 ${this.endTime}`)){
      // Display an info toast with no title
      this.toastr.error('End time must be after start time', 'Oops!');
      return
    }

    // If the number of weeks is not greater than 0, display an error toast
    if (!(this.numWeek > 0)){
      // Display an info toast
      this.toastr.error('Number of weeks must be an integer greater than 0', 'Oops!');
      return
    }

    // Create endDate variable on the same day as the startDate
    this.endDate = new Date(this.startDate);
    this.startDate.setHours(this.startTime.substring(0, 2),this.startTime.substring(3, 5));
    this.endDate.setHours(this.endTime.substring(0, 2),this.endTime.substring(3, 5));

    this.sendTimeSlots();
  };

  onClickCancel = () => {
    // Switch pages if done
    this.router.navigate(['/physio/set-free-time/']);
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
