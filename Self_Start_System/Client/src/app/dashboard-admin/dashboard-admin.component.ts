import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from "../authentication.service";
import { Router} from "@angular/router";


@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss'],
  providers:[AuthenticationService]
})
export class DashboardAdminComponent implements OnInit {

  user;
  successCounter = 0;
  constructor(
    private authService: AuthenticationService,
    private router: Router)
  {
    this.authService = authService;
  }

  ngOnInit() {
    // this.authService.getProfile().subscribe(profile => {
    //   console.log(profile);
    //   this.user = profile.administrator;
    //   console.log("The current user is: ", this.user);
    //
    // });

    this.authService.getProfile().subscribe(res => {
      console.log("in login component: here's what getProfile returned: ", res);
      for (let result of res){
        console.log((result as any).success);
        if ((result as any).administrator){
          this.successCounter++; //a profile was returned
          this.user = (result as any).administrator;
          console.log(this.user);
          break;
        }
      }
      if (this.successCounter==0){
        this.authService.logout();
        this.router.navigate(['home']);
      }
      //functions after user is set goes here

    })
  }

}
