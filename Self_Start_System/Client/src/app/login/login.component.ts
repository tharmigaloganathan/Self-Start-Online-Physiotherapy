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
      user => {
        console.log("This is what was returned" + JSON.stringify(user));

        if (user.admin_id) {
          this.admin_id = user.admin_id;
          console.log("Admin id " + this.admin_id);
        } else if (this.physiotherapist_id) {
          this.physiotherapist_id = user.physiotherapist_id;
          console.log("Physiotherapist profile id " + this.patientProfile_id);
        } else if (this.patientProfile_id) {
          this.patientProfile_id = user.patientProfile._id;
          console.log("Patient profile id " + this.patientProfile_id);
        }
      },
      error => {
        console.log(error);
      });
  }
}


