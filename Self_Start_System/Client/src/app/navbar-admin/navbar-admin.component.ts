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

  user;
  name = "";
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(res => {
      console.log("nav-bar admin, here's what getProfile returned: ", res);
      for (let result of res){
        console.log((result as any).success);
        if ((result as any).administrator){
          this.user = (result as any).administrator;
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
