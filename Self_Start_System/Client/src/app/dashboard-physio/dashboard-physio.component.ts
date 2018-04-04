import { Component, OnInit,OnDestroy} from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";
import { ManagePatientProfileService } from '../manage-patient-profile.service';
import { UserAccountListService } from '../user-account-list.service';
import { MessagesService } from '../messages.service';

@Component({
    selector: 'app-dashboard-physio',
    templateUrl: './dashboard-physio.component.html',
    styleUrls: ['./dashboard-physio.component.scss'],
    providers:[AuthenticationService, UserAccountListService, ManagePatientProfileService, MessagesService]
})
export class DashboardPhysioComponent implements OnInit, OnDestroy {
    user;
    successCounter = 0;
    profileSubscription;
    treatments = [];
    appointments = [];
    patients: any[] = [];
    patientList: Array<{
      patientID: string,
      patientGivenName: string,
      patientSurname: string,
      messages: string[]
    }> = [];
    patientsWithMessages: any[] = [];

    constructor(
        private authService: AuthenticationService,
        private router: Router,
        private userAccountListService: UserAccountListService,
        private messagesService: MessagesService,
        private managePatientProfileService: ManagePatientProfileService,
        )
    { this.authService = authService;}

    ngOnInit() {
      this.profileSubscription = this.authService.profileOb$.subscribe((profile) => {
        this.user = profile; console.log("subscription to auth service set profile returned: ", this.user);
        this.getTreatments();
        });
    }

    orderPatientsWithMessages(){
        //patientsWithMessages
        //if unreadMessages > 0, push to top of the list
        //otherwise doesn't matter
    }

    findNumberOfMessagesUnread() {
        for(var i = 0; i < this.patients.length; i++) {
            this.patients[i].unreadMessages = 0;
            for(var j = 0; j < this.patients[i].messages.length; j++) {
                if(this.patients[i].messages[j].seenByPhysio == false) {
                    this.patients[i].unreadMessages++;
                }
            }
        }
    }

    selectPatient(index) {
        localStorage.setItem("selectedPatient",JSON.stringify(this.patients[index]));
        this.router.navigate(['/physio/patients/'+ this.patients[index].givenName +'-'+this.patients[index].familyName]);
    }

    selectMessage(index) {
        localStorage.setItem("messageSelected",index);
        localStorage.setItem("messages", JSON.stringify(this.patientsWithMessages));
        this.router.navigate(['/physio/messages']);
    }
    getTreatments() {
        //get physiotherapist ID
        console.log(this.user._id);
        this.managePatientProfileService.getTreatments().subscribe(res => {
            console.log("TREATMENTS", res);
            for(var i = 0 ; i < res.treatment.length; i++) {
                if(res.treatment[i].physiotherapist == this.user._id)
                    this.treatments.push(res.treatment[i]);
            }
            console.log(this.treatments);
            this.getPatients();
        });
    }

    getPatients() {
        let requestCounter = 0;
        for(var i = 0; i < this.treatments.length ; i++){
            this.userAccountListService.getPatientProfile(this.treatments[i].patientProfile).subscribe(
			data => {
                data.messages = [];
                this.patients.push(data);
                requestCounter++;
                if(requestCounter == (this.treatments.length - 1)) {
                    console.log(this.patients);
                    this.getMessages();
                }
			});
        }
    }

    getAppointments() {
        //get appointments, match physiotherapist
        //order array by date nearest first
      this.messagesService.getAppointments(this.user._id).subscribe(
        data => {
          console.log(data);
          data.appointment.sort((a,b)=>{
            if(a.date < b.date){
              return -1;
            }
            if(a.date > b.date){
              return 1;
            }
            return 0;
          });
          this.appointments = data.appointment;
        },
        error => console.log(error)
      );
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
                //LOOPS THROUGH ALL MESSAGES AND ASSIGNS ANY MESSAGES TO THE CORRECT PATIENT
                let allMessages = data.message;
                console.log(this.patients[10]);
                for(var i = 0; i < allMessages.length; i++) {
                    console.log(allMessages[i].message);
                    for(var j = 0; j < this.patients.length; j++){
                        if(allMessages[i].physioID == this.user._id && allMessages[i].patientID == this.patients[j]._id){
                            allMessages[i].time = this.formatDate(new Date(allMessages[i].time));
                            this.patients[j].messages.push(allMessages[i]);
                        }
                    }
                }
                for(var i = 0; i< this.patients.length; i ++) {
                    if(this.patients[i].messages.length > 0)
                        this.patientsWithMessages.push(this.patients[i]);
                }
                this.findNumberOfMessagesUnread();
                console.log(this.patientsWithMessages);
                console.log("FINAL PATIENTS",this.patients);
            }
        );
    }

    ngOnDestroy() {
      // prevent memory leak when component is destroyed
      this.profileSubscription.unsubscribe();
      console.log("subscription terminated");
    }
}
