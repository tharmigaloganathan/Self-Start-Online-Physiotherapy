import { Component, OnInit } from '@angular/core';
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
export class DashboardPhysioComponent implements OnInit {
    user;
    treatments = [];
    patients: any[] = [];
    successCounter = 0;
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
        this.successCounter = 0;
        this.authService.getProfile().subscribe(res => {
            console.log("in login component: here's what getProfile returned: ", res);
            for (let result of res){
                console.log((result as any).success);
                if ((result as any).physiotherapist){
                    this.successCounter++;//means at least one profile was returned
                    this.user = (result as any).physiotherapist;
                    console.log(this.user);
                    this.getTreatments();
                    break;
                }
            }
            if (this.successCounter==0){
                this.authService.logout();
                this.router.navigate(['home']);
            }

        })
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

		// this.userAccountListService.getPatientProfile(id).subscribe(
		// 	data => {
		// 		this.user = data;
		// 		this.treatments = this.user.treatments;
        //         console.log("TREATMENTS",this.treatments);
		// 		//this.age = (Date.parse(this.today) - Date.parse(this.user.DOB))/(60000 * 525600);
		// 		//this.age = this.age[0] + " years";
		// 		console.log(this.user);
		// 	});

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
        //need an array of patients that each hold a messages array attribute
        //get messages, for loop
            //if physioID = our ID, loop through patient list push message to their array

        //loop through messages, if there are unread messsages, splice, and enter at index0
        this.messagesService.getMessages().subscribe(data =>
            {
                //LOOPS THROUGH ALL MESSAGES AND ASSIGNS ANY MESSAGES TO THE CORRECT PATIENT
                let allMessages = data.message;
                console.log(this.patients[10]);
                for(var i = 0; i < allMessages.length; i++) {
                    console.log(allMessages[i].message);
                    for(var j = 0; j < this.patients.length; j++){
                        // console.log("physio ", allMessages[i].physioID == this.user._id, allMessages[i].physioID, this.user._id );
                        // console.log("patient ", allMessages[i].patientID == this.patients[j]._id, allMessages[i].patientID, this.patients[j]._id)
                        // console.log(this.patients[j]._id == "5aae0459b5693639c9aad8ba", this.patients[j]._id, "5aae0459b5693639c9aad8ba")
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
                console.log(this.patientsWithMessages);
                console.log("FINAL PATIENTS",this.patients);
            }
        );
    }
}
