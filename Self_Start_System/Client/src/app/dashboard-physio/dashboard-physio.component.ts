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
    this.authService.getProfile().subscribe(res => {
      console.log("in login component: here's what getProfile returned: ", res);
      for (let result of res){
        console.log((result as any).success);
        if ((result as any).physiotherapist){
          this.user = (result as any).physiotherapist;
          console.log(this.user);
          break;
        }
      }
    })
  }
}
