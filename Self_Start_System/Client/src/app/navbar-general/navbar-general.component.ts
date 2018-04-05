import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-navbar-general',
  templateUrl: './navbar-general.component.html',
  styleUrls: ['./navbar-general.component.scss'],
  providers: []

})
export class NavbarGeneralComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }

  clickedLogin(){
    this.router.navigate(['login']);
    this.authService.refreshLogin();
  }

  logoClicked(){
    this.router.navigate(['home']);
  }

}
