import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";
import {FlashMessagesModule,FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-navbar-patient',
  templateUrl: './navbar-patient.component.html',
  styleUrls: ['./navbar-patient.component.scss'],
  providers: [AuthenticationService]
})
export class NavbarPatientComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['home']);
    this.flashMessagesService.show('You have logged out!', { cssClass: 'alert-success', timeout: 3000 });
  }

}
