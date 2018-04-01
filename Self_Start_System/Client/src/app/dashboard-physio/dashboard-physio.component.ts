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

  constructor(private authService: AuthenticationService,private router: Router) {
    this.authService = authService;
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
          break;
        }
      }
      if (this.successCounter==0){
        this.authService.logout();
        this.router.navigate(['home']);
      }
      //other init functions go below here after user is set

    })
  }
}
