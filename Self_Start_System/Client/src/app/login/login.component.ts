import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";
import {AuthGuard} from "../guards/auth.guard";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username;
  password;
  triedLogin = false;
  statusMessage= false;
  patientProfile_id;
  physiotherapist_id;
  admin_id;
  previousUrl;


  constructor(private authService: AuthenticationService,
              private router: Router,
              private authGuard: AuthGuard) {
  }

  ngOnInit() {
    this.username = null;
    this.password = null;
    if (this.authGuard.redirectUrl){
      this.previousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined;
    }

  }

  submitLogin() {
    console.log("submitted username is ", this.username);
    console.log("submitted password is ", this.password);
    const user = {
      userAccountName: this.username,
      encryptedPassword: this.password,
    };

    this.authService.login(user).subscribe(
      data => {

        console.log("This is the user that tried logged in" + JSON.stringify(data));

        if(!data.success){
          //if password isn't right
          console.log(data.message);
          this.triedLogin=true;
          this.statusMessage = data.message;

        } else {
          this.triedLogin=true;
          this.statusMessage=false;

          //store user data
          this.authService.storeUserData(data.token, data.userAccount);
          console.log ("user's token: ", data.token);
          console.log("user being stored in local storage: ", data.userAccount);

          //navigate to appropriate home page after 2 second delay

          if (data.userAccount.patientProfile) {
            setTimeout(() => {
              if(this.previousUrl){
                this.router.navigate([this.previousUrl]);
              } else {
                this.router.navigate(['/patient']);
              }
            }, 2000);
          } else if (data.userAccount.administrator) {
            setTimeout(() => {
              if(this.previousUrl){
                this.router.navigate([this.previousUrl]);
              } else {
                this.router.navigate(['/admin']);
              }
            }, 2000);
          } else if (data.userAccount.physiotherapist){
            setTimeout(() => {
              if(this.previousUrl){
                this.router.navigate([this.previousUrl]);
              } else {
                this.router.navigate(['/physio']);
              }
            }, 2000);
          }
        }
      },
      error => {
        console.log(error);
      });
  }
}


