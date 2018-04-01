import { Component, OnInit,OnDestroy} from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-dashboard-physio',
  templateUrl: './dashboard-physio.component.html',
  styleUrls: ['./dashboard-physio.component.scss'],
  providers:[]
})
export class DashboardPhysioComponent implements OnInit, OnDestroy {
  user;
  successCounter = 0;
  profileSubscription;

  constructor(private authService: AuthenticationService,private router: Router) {
    this.authService = authService;
  }

  ngOnInit() {
    this.profileSubscription = this.authService.profileOb$.subscribe((profile) => {
      this.user = profile; console.log("subscription to auth service set profile returned: ", this.user);
    });
    // this.successCounter = 0;
    // this.authService.getProfile().subscribe(res => {
    //   console.log("in login component: here's what getProfile returned: ", res);
    //   for (let result of res){
    //     console.log((result as any).success);
    //     if ((result as any).physiotherapist){
    //       this.successCounter++;//means at least one profile was returned
    //       this.user = (result as any).physiotherapist;
    //       this.authService.setActiveProfile(this.user);
    //       this.authService.setActiveProfileType("physiotherapist");
    //       console.log(this.user);
    //       break;
    //     }
    //   }
    //   if (this.successCounter==0){
    //     this.authService.logout();
    //     this.router.navigate(['home']);
    //   }
    //   //other init functions go below here after user is set
    //
    // })
  }
  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.profileSubscription.unsubscribe();
    console.log("subscription terminated");
  }
}
