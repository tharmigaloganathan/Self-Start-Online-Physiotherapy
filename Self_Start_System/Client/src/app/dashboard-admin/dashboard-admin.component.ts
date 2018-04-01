import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthenticationService} from "../authentication.service";
import { Router} from "@angular/router";


@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss'],
  providers:[]
})
export class DashboardAdminComponent implements OnInit, OnDestroy{

  user;
  successCounter = 0;
  profileSubscription;
  constructor(
    private authService: AuthenticationService,
    private router: Router)
  {
    this.authService = authService;
  }

  ngOnInit() {
    this.profileSubscription= this.authService.profileOb$.subscribe((profile) => {
      this.user = profile; console.log("subscription to auth service set profile returned: ", this.user);
    });

    // this.authService.getProfile().subscribe(res => {
    //   console.log("in login component: here's what getProfile returned: ", res);
    //   for (let result of res){
    //     console.log((result as any).success);
    //     if ((result as any).administrator){
    //       this.successCounter++; //a profile was returned
    //       this.user = (result as any).administrator;
    //       this.authService.setActiveProfile(this.user);
    //       this.authService.setActiveProfileType("administrator");
    //       console.log(this.user);
    //       break;
    //     }
    //   }
    //   if (this.successCounter==0){
    //     this.authService.logout();
    //     this.router.navigate(['home']);
    //   }
    //   //functions after user is set goes here
    //
    // })
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.profileSubscription.unsubscribe();
    console.log("subscription terminated");
  }
}
