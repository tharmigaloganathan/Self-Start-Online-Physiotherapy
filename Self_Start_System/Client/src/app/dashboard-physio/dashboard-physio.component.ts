import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";


@Component({
    selector: 'app-dashboard-physio',
    templateUrl: './dashboard-physio.component.html',
    styleUrls: ['./dashboard-physio.component.scss'],
    providers:[AuthenticationService]
})
export class DashboardPhysioComponent implements OnInit {
    user;
    successCounter = 0;
    patientList: Array<{
        patientID: string,
        patientGivenName: string,
        patientSurname: string,
        messages: string[]
    }> = [];

    constructor(
        private authService: AuthenticationService,
        private router: Router
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
              break;
            }
          }
          if (this.successCounter==0){
            this.authService.logout();
            this.router.navigate(['home']);
          }

        })
    }

    getPatients() {
        //get treatments loop through treatment
        //if physioID = our ID, add patientID to our array

    }

    getAppointments() {
        //get appointments, match physiotherapist
        //order array by date nearest first
    }

    getMessages() {
        //need an array of patients that each hold a messages array attribute
        //get messages, for loop
            //if physioID = our ID, loop through patient list push message to their array

        //loop through messages, if there are unread messsages, splice, and enter at index0
    }
}
