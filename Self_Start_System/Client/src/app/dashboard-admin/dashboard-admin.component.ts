import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from "../authentication.service";


@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss'],
  providers:[AuthenticationService]
})
export class DashboardAdminComponent implements OnInit {

  user;

  constructor(
    private authService: AuthenticationService)
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
          this.user = (result as any).administrator;
          console.log(this.user);
          break;
        }
      }
      //functions after user is set goes here

    })
  }

}
