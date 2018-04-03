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
    messages: any[] = [];
    patientID: String;
    physioID: String;
    unreadMessages = 0;
    user;
    retrievedProfile;
    name = "";
    successCounter = 0;
    reload = false;
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
      this.getMessages();
    });
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
        console.log("this is false", this.messages.length);
        for(var i = 0; i < this.messages.length; i++) {

            if(this.messages[i].seenByPatient == false) {
                this.messages[i].seenByPatient == true;
                this.messagesService.putMessage(this.messages[i]._id, this.messages[i]).subscribe(data =>
                {
                    console.log("PUT REQUEST", data);
                });
            }
        }
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
        this.messages = [];
        this.messagesService.getMessages().subscribe(data =>
            {
                //FILTERS ALL MESSAGES FOR MESSAGES JUST BETWEEN THIS PATIENT AND HIS/HER PHYSIO
                let allMessages = data;
                for(var i = 0; i < allMessages.message.length; i++) {
                    if(allMessages.message[i].patientID == this.patientID) {
                        allMessages.message[i].time = this.formatDate(new Date(allMessages.message[i].time));
                        this.messages.push(allMessages.message[i]);
                    }
                }
                //SETS ALL MESSAGES AS SEEN ONLY IF USER HAS SENT A MESSAGE
                if(this.reload == true) {
                    for(var i = 0; i < this.messages.length; i++) {

                        if(this.messages[i].seenByPatient == false) {
                            this.messages[i].seenByPatient = true;
                            console.log("this was false", this.messages[i], i);
                            this.messagesService.putMessage(this.messages[i]._id, this.messages[i]).subscribe(data =>
                            {
                                console.log("PUT REQUEST", data);
                            });
                        }
                    }
                    this.reload = false;
                }
                //COUNTS NUMBER OF UNREAD MESSAGES
                this.unreadMessages = 0;
                for(var i = 0; i < this.messages.length; i++) {
                    if(this.messages[i].seenByPatient == false)
                        this.unreadMessages = this.unreadMessages + 1;
                }
                this.physioID = this.messages[0].physioID;
                console.log("Physio ID: ", this.physioID);
            }
        );
    }

    sendNewMessage(newMessage: String) {
        let myMessage = {
            patientID: this.patientID,
            physioID: this.physioID,
            message: newMessage,
            seenByPhysio: false,
            seenByPatient: true,
            sender: this.patientID
        }
        this.messagesService.postMessage(myMessage).subscribe(data =>
        {
            this.reload = true;
            this.getMessages();
        });
    }
}
