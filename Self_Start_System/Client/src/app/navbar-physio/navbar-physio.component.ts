import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";
import {FlashMessagesModule, FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-navbar-physio',
  templateUrl: './navbar-physio.component.html',
  styleUrls: ['./navbar-physio.component.scss'],
  providers: [AuthenticationService]

})
export class NavbarPhysioComponent implements OnInit {

  name = "";
  user;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private flashMessagesService: FlashMessagesService) { }
  ngOnInit() {
    this.authService.getProfile().subscribe(res => {
      console.log("nav-bar physio, here's what getProfile returned: ", res);
      for (let result of res){
        console.log((result as any).success);
        if ((result as any).physiotherapist){
          this.user = (result as any).physiotherapist;
          this.name = this.user.givenName;
          console.log(this.user);
          break;
        }
      }
      //functions after user is set goes here

    })
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['home']);
    this.flashMessagesService.show('You have logged out!', { cssClass: 'alert-success', timeout: 3000 });
  }
}
