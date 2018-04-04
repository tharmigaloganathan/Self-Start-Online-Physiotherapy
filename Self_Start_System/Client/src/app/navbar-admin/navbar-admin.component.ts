import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from "../authentication.service";
import { Router } from "@angular/router";
import { FlashMessagesModule, FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss'],
  providers: []
})
export class NavbarAdminComponent implements OnInit {
  account;
  user;
  userType;
  name = "";
  profileType;
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
        console.log("in nav-bar admin: here's what getProfile returned: ", res);
        for (let result of res) {
          console.log((result as any).success);
          if ((result as any).administrator) {
            this.profileType = "administrator";
            this.user = (result as any).administrator;
            this.authService.setActiveProfile(this.user);
            this.authService.setActiveProfileType("administrator");
            this.name = this.user.givenName;
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
    this.flashMessagesService.show('You have logged out!', { cssClass: 'alert-success', timeout: 3000 });
  }

  editProfile(){

  }

  logoClicked(){
    this.router.navigate(['home']);
  }

}
