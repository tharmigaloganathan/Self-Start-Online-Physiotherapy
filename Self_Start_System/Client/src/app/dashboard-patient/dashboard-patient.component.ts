import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';

@Component({
    selector: 'app-dashboard-patient',
    templateUrl: './dashboard-patient.component.html',
    styleUrls: ['./dashboard-patient.component.scss'],
    providers: [ MessagesService ]
})
export class DashboardPatientComponent implements OnInit {
    messages: Object[] = [];
    patientID: String;

    constructor(private messagesService: MessagesService) {
        this.patientID = "5a80aae5734d1d0d42e9f930";
        this.getMessages();
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

    getPatientIDFromLocalStorage() {

    }

    addNewMessage(message: String) {
        console.log("NEW MESSAGE", message);
        //create message object
        //set seenByPatient to true
        //set message content
        //set patientID and physioID
        //call getMessages again
    }

    ngOnInit() {
    }

}
