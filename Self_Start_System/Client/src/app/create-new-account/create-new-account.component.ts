import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import {AuthenticationService} from "../authentication.service";
import {CreateUserAccountService} from "../create-user-account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-new-account',
  templateUrl: './create-new-account.component.html',
  styleUrls: ['./create-new-account.component.scss'],
  providers: [CreateUserAccountService],

})
export class CreateNewAccountComponent implements OnInit {
  username;
  password;
  passwordVerify;
  patientProfile_id;
  physiotherapistProfile_id;
  administrator_id;
  userMade = false;

  constructor(
    private createUserAccountService: CreateUserAccountService,
    private router : Router
  ) { }

  ngOnInit() {
    this.userMade = false;
  }

  registerUserProfile() {
    //JSON object to hold user information
    const user = {
      familyName: "TestUserLeo",
      givenName: "Zhang",
      email: "leozhang47@Hotmail.com",
      DOB: "2014-02-10T10:50:42.389Z",
      postalCode: "N6J 1T6",
      address: "217 Sarnia Road",
      phone: "905-543-4879",
      others: "",
      account: null,
      treatments: null,
      payments: null,
      country: "5a679e0b734d1d7c679791c8",
      province: "5a9d6910f36d2805902517fc",
      city: "London",
      gender: "5a9d6e84f36d280590251e97",
      appointments: null
    }
    console.log(user);
    //Send user data to backend
    this.createUserAccountService.registerUserProfile(user).
    subscribe(
      user => {
        console.log("The following profile has been registered: " + JSON.stringify(user));
        this.patientProfile_id = user.patientProfile._id;
        console.log("Patient profile id " + this.patientProfile_id);
      },
      error => {
        console.log(error);
      });
    this.userMade = true;
  }

  registerUserAccount() {
    const account = {
      userAccountName: this.username,
      encryptedPassword: this.password,
      patientProfile: this.patientProfile_id,
      physiotherapist: this.physiotherapistProfile_id,
      administrator: this.administrator_id
    }
    console.log ("here is the account being registered", account)

    //Send account data to backend
    this.createUserAccountService.registerUserAccount(account).subscribe(
      user => {
        console.log("The following account has been registered: " + JSON.stringify(account));
      },
      error => {
        console.log(error);
      });
    setTimeout(() => {
      this.router.navigateByUrl('/login')},
      2000
    );

  }
}
