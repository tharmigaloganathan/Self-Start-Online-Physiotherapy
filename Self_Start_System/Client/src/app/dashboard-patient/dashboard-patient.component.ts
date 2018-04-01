import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService} from "../authentication.service";
import { MessagesService } from '../messages.service';
import {Router} from "@angular/router";
import {NavbarPatientComponent} from "../navbar-patient/navbar-patient.component";

@Component({
  selector: 'app-dashboard-patient',
  templateUrl: './dashboard-patient.component.html',
  styleUrls: ['./dashboard-patient.component.scss'],
  providers:[MessagesService]
})
export class DashboardPatientComponent implements OnInit,OnDestroy {
    messages: Object[] = [];
    patientID: String;
    user;
    retrievedProfile;
    name = "";
    successCounter = 0;
    navbar;
    profileSubscription;

  constructor(
    private authService: AuthenticationService,
    private messagesService: MessagesService,
    private router: Router
  )
  {
    this.authService = authService;
    // this.successCounter = 0;
    // this.authService.getProfile().subscribe(res => {
    //   console.log("in login component: here's what getProfile returned: ", res);
    //   for (let result of res){
    //     console.log((result as any).success);
    //     if ((result as any).patientProfile){
    //       this.successCounter ++; //means at least one profile was returned
    //       this.user = (result as any).patientProfile;
    //       this.authService.setActiveProfile(this.user);
    //       this.authService.setActiveProfileType("patient");
    //       this.name = this.user.givenName;
    //       console.log(this.user);
    //       this.patientID = this.user._id; //gets id of the current patient that is logged in
    //       break;
    //     }
    //   }
    //   if (this.successCounter==0){
    //     this.authService.logout();
    //     this.router.navigate(['home']);
    //   }
    //   //functions after user is set goes here
    //   this.getMessages();
    // })
  }

  ngOnInit() {
    this.profileSubscription= this.authService.profileOb$.subscribe((profile) => {
      this.user = profile; console.log("subscription to auth service set profile returned: ", this.user);
    });
    this.getMessages()
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.profileSubscription.unsubscribe();
    console.log("subscription terminated");
  }
    setAllMessagesAsSeen() {
        //loop through messages array
        //do a put request with each _id
        //change the seenByPatient value
        //make put request
    }

    formatDate(date) {
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

    getMessages() {
        this.messagesService.getMessages().subscribe(data =>
            {
                let allMessages = data;
                for(var i = 0; i < allMessages.message.length; i++) {
                    if(allMessages.message[i].patientID == this.patientID) {
                        allMessages.message[i].time = this.formatDate(new Date(allMessages.message[i].time));
                        console.log(allMessages.message[i].time);
                        this.messages.push(allMessages.message[i]);
                    }
                }
                console.log(this.messages);
            }
        );
        //order the messages by date/time
    }

    addNewMessage(message: String) {
        console.log("NEW MESSAGE", message);
        //create message object
        //set seenByPatient to true
        //set message content
        //set patientID and physioID
        //call getMessages again
    }




}
