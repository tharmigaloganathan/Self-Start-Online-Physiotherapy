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

  constructor(private authService: AuthenticationService) {
    this.authService = authService;
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      console.log(profile);
      this.user = profile.physiotherapist;
      console.log("The current user is: ", this.user);
      console.log(this.user.givenName);

    });
  }

}
