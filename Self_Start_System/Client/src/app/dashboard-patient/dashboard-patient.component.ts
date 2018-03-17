import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-dashboard-patient',
  templateUrl: './dashboard-patient.component.html',
  styleUrls: ['./dashboard-patient.component.scss'],
  providers:[AuthenticationService]
})
export class DashboardPatientComponent implements OnInit {

  user;

  constructor(
    private authService: AuthenticationService)
  {
    this.authService = authService;
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      console.log(profile);
      this.user = profile.patientProfile;
      console.log("The current user is: ", this.user);

    });
  }

}
