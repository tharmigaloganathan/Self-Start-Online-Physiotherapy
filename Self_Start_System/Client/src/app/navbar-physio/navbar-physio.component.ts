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
  userType;
  user;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.user = this.authService.getActiveProfile();
    this.userType = this.authService.getActiveProfileType();
    this.name = this.user.givenName;

  }

  logout(){
    this.authService.logout();
    this.router.navigate(['home']);
    this.flashMessagesService.show('You have logged out!', { cssClass: 'alert-success', timeout: 3000 });
  }
}
