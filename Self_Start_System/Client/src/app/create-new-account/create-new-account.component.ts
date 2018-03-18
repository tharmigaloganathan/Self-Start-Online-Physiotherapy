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
  patientProfile_id = null;
  physiotherapistProfile_id = null;
  administrator_id = null;
  madePatient = false;
  madePhysio = false;
  madeAdmin = false;

  //variables to store filler family names to distringuish fake profiles for testing
  givenName = null;

  adminName;

  constructor(
    private createUserAccountService: CreateUserAccountService,
    private router : Router
  ) { }

  ngOnInit() {
    this.madePatient = false;
    this.madePhysio = false;
  }

  //makes a profile for the patient
  registerPatientProfile() {
    //JSON object to hold user information
    const testPatientUser = {
      familyName: "Zhang",
      givenName: this.givenName,
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
    console.log(testPatientUser);
    //Send user data to backend
    this.createUserAccountService.registerUserProfile(testPatientUser).
    subscribe(
      user => {
        console.log("The following patient has been registered: " + JSON.stringify(user));
        this.patientProfile_id = user.patientProfile._id;
        console.log("Patient profile id " + this.patientProfile_id);
      },
      error => {
        console.log(error);
      });
    this.madePatient = true;
  }

  //makes a profile for the physiotherapist
  registerPhysiotherapistProfile() {
    //JSON object to hold user information
    const testPhysioUser = {
      familyName: "Zhang",
      givenName: this.givenName,
      email: "leozhang47@Hotmail.com",
      dateHired: "2014-02-10T10:50:42.389Z",
      dateFinished: "2015-02-10T10:50:42.389Z",
      userAccount: null,
      treatments: null,
    }

    console.log(testPhysioUser);
    //Send user data to backend
    this.createUserAccountService.registerPhysiotherapist(testPhysioUser).
    subscribe(
      user => {
        console.log("The following physiotherapist has been registered: " + JSON.stringify(user));
        this.physiotherapistProfile_id = user.physiotherapist._id;
        console.log("Physiotherapist profile id " + this.physiotherapistProfile_id);
      },
      error => {
        console.log(error);
      });
    this.madePhysio = true;
  }

  //makes a profile for the admin
  registerAdministratorProfile() {
    //JSON object to hold user information
    const testAdminUser = {
      familyName: "Zhang",
      givenName: this.givenName,
      email: "leozhang47@Hotmail.com",
      dateHired: "2014-02-10T10:50:42.389Z",
      dateFinished: "2015-02-10T10:50:42.389Z",
      forms: [],
      userAccount: null,
    }

    console.log(testAdminUser);
    //Send user data to backend
    this.createUserAccountService.registerAdministrator(testAdminUser).
    subscribe(
      user => {
        console.log("The following administrator has been registered: " + JSON.stringify(user));
        this.administrator_id= user.administrator._id;
        console.log("Administrator profile id " + this.administrator_id);
      },
      error => {
        console.log(error);
      });
    this.madeAdmin = true;
  }

  //make the actual user account and password needed to log on
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
        //console.log("The following account has been registered: " + JSON.stringify(account));
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
