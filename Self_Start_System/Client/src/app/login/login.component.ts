import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username;
  password;
  patientProfile_id;
  physiotherapist_id;
  admin_id


  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    this.username = null;
    this.password = null;
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
        console.log(data);
        console.log(data.userAccount["patientProfile_id"]);
        var acc = data["userAccount"];
        console.log(acc["patientProfile_id"]);
        console.log("This is the user that has logged in" + JSON.stringify(data));

        if(!data.success){
          console.log(data.message);
        } else {
          //store user data
          this.authService.storeUserData(data.token, data.userAccount);
          console.log ("user's token: ", data.token);
          console.log("user being stored in local storage: ", data.userAccount);

          //navigate to appropriate home page after 2 second delay
          console.log(data.userAccount.patientProfile_id);
          if (data.userAccount.patientProfile_id) {
            setTimeout(() => {
              this.router.navigate(['/patient']);
            }, 1000);
          } else if (data.userAccount.admin_id) {
            setTimeout(() => {
              this.router.navigate(['/admin']);
            }, 1000);
          } else if (data.userAccount.physiotherapist_id){
            setTimeout(() => {
              this.router.navigate(['/physio']);
            }, 1000);
          }
        }
      },
      error => {
        console.log(error);
      });
  }
}


