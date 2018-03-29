import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";

@Component({
    selector: 'app-dashboard-physio',
    templateUrl: './dashboard-physio.component.html',
    styleUrls: ['./dashboard-physio.component.scss'],
    providers:[AuthenticationService]
})
export class DashboardPhysioComponent implements OnInit {
    user;
    patientList: Array<{
        patientID: string,
        patientGivenName: string,
        patientSurname: string,
        messages: string[]
    }> = [];

    constructor(
        private authService: AuthenticationService,
        )
    { this.authService = authService;}

    ngOnInit() {
        this.authService.getProfile().subscribe(profile => {
            console.log(profile);
            this.user = profile.physiotherapist;
            console.log("The current user is: ", this.user);
            console.log(this.user.givenName);
        });
    }

    getPatients() {
        //get treatments loop through treatment
        //if physioID = our ID, add patientID to our array

    }

    getAppointments() {
        
    }

    getMessages() {
        //need an array of patients that each hold a messages array attribute
        //get messages, for loop
            //if physioID = our ID, loop through patient list push message to their array

    }
}
