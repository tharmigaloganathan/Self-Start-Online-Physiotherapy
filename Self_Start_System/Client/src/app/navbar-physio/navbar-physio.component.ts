import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";
import {FlashMessagesModule, FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-navbar-physio',
  templateUrl: './navbar-physio.component.html',
  styleUrls: ['./navbar-physio.component.scss'],
  providers: []

})
export class NavbarPhysioComponent implements OnInit {

  name = "";
  profileType;
  user;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private flashMessagesService: FlashMessagesService) {


  }

  ngOnInit() {

    this.user = this.authService.getActiveProfile(); // this would execute if window was never close

    if(this.user) {
      console.log("nav bar patient ",this.user);
      this.authService.setActiveProfile(this.user); //trigger subscribers again
    }

    //below would execute if site was closed and opened again and still logged in
    if (!this.user) {
      this.authService.getProfile().subscribe(res => {
        console.log("in nav-bar physiotherapist: here's what getProfile returned: ", res);
        for (let result of res) {
          console.log((result as any).success);
          if ((result as any).physiotherapist) {
            this.profileType = "physiotherapist";
            this.user = (result as any).physiotherapist;
            this.authService.setActiveProfile(this.user);
            this.authService.setActiveProfileType("physiotherapist");
            console.log(this.user);
            break;
          }
        }
        //functions after user is set goes here

      })
    }
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['home']);
  }


  editProfile(){
    this.router.navigate(['settings']);
  }

  logoClicked(){
    this.router.navigate(['home']);
  }
}
