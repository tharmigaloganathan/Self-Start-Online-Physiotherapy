import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from "../authentication.service";
import { MessagesService } from '../messages.service';

@Component({
    selector: 'app-dashboard-patient',
    templateUrl: './dashboard-patient.component.html',
    styleUrls: ['./dashboard-patient.component.scss'],
    providers:[AuthenticationService,MessagesService]
})
export class DashboardPatientComponent implements OnInit {
    messages =
    [];
    patientID: String;
    physioID: String;
    unreadMessages = 0;
    user;
    reload = false;

    //if messages.length = 0 contact site admin 

    constructor( private authService: AuthenticationService, private messagesService: MessagesService)
    {
        this.authService = authService;
    }

    ngOnInit() {
        this.authService.getProfile().subscribe(profile => {
            // console.log(profile);
            this.user = profile.patientProfile;
            // console.log("The current user is: ", this.user);
            this.patientID = this.user._id; //gets id of the current patient that is logged in
            this.getMessages();
        });
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
