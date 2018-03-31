import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";
import {FlashMessagesModule,FlashMessagesService} from "angular2-flash-messages";
import {EditProfileService} from "../edit-profile.service";

@Component({
  selector: 'app-navbar-patient',
  templateUrl: './navbar-patient.component.html',
  styleUrls: ['./navbar-patient.component.scss'],
  providers: [],
})
export class NavbarPatientComponent implements OnInit {

  user;
  name;
  profileType;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private flashMessagesService: FlashMessagesService,
    private editProfileService: EditProfileService) { }

  ngOnInit() {
    // this.authService.getProfile().subscribe(res => {
    //   console.log("in nav-bar patient: here's what getProfile returned: ", res);
    //   for (let result of res){
    //     console.log((result as any).success);
    //     if ((result as any).patientProfile){
    //       this.profileType = "patient";
    //       this.user = (result as any).patientProfile;
    //       this.name = this.user.givenName;
    //       console.log(this.user);
    //       break;
    //     }
    //   }
    //   //functions after user is set goes here
    //
    // }
    console.log(this.authService.getActiveProfile());
    this.user = this.authService.getActiveProfile();
    this.name = this.user.givenName;
    console.log(this.user);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['home']);
    this.flashMessagesService.show('You have logged out!', { cssClass: 'alert-success', timeout: 3000 });
  }

  editProfile(){
    this.editProfileService.passProfile(this.user, this.profileType);

  }



}
