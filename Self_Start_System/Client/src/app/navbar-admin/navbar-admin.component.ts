import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from "../authentication.service";
import { Router } from "@angular/router";
import { FlashMessagesModule, FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss'],
  providers: [AuthenticationService]
})
export class NavbarAdminComponent implements OnInit {

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
