import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from "../authentication.service";
import { MessagesService } from '../messages.service';
import {Router} from "@angular/router";

@Component({
    selector: 'app-patient-messages',
    templateUrl: './patient-messages.component.html',
    styleUrls: ['./patient-messages.component.scss'],
    providers: [ AuthenticationService, MessagesService ]
})
export class PatientMessagesComponent implements OnInit {
    messages = [];
    patientID: String;
    successCounter = 0;
    physioID: String;
    unreadMessages = 0;
    user;
    reload = false;

    constructor(private authService: AuthenticationService,
        private messagesService: MessagesService,
        private router: Router) {
        this.authService = authService
    }

    ngOnInit() {
        this.successCounter = 0;
        this.authService.getProfile().subscribe(res => {
          console.log("in login component: here's what getProfile returned: ", res);
          for (let result of res){
            console.log((result as any).success);
            if ((result as any).physiotherapist){
              this.successCounter++;//means at least one profile was returned
              this.user = (result as any).physiotherapist;
              console.log(this.user);
              this.getMessages();
              break;
            }
          }
          if (this.successCounter==0){
            this.authService.logout();
            this.router.navigate(['home']);
          }

      });
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
