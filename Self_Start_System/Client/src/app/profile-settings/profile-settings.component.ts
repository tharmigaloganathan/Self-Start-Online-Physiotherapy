import { Component, OnInit, Directive, ViewContainerRef,ComponentFactoryResolver } from '@angular/core';
import {EditProfileService} from "../edit-profile.service";
import {AuthenticationService} from "../authentication.service";
import {CreateUserAccountService} from "../create-user-account.service";
import {UserAccountListService} from "../user-account-list.service";
import {MatSnackBar} from "@angular/material";
import {Router} from "@angular/router";
declare var require: any;
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS


import {NavbarPhysioComponent} from "../navbar-physio/navbar-physio.component";
import {NavbarPatientComponent} from "../navbar-patient/navbar-patient.component";

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
  providers: []
})


export class ProfileSettingsComponent implements OnInit {

  user;
  originalUser;
  profileType;
  isChanged;
  profileSubscription;
  authService;
  createUserAccountService;
  userAccountListService;
  account;
  countrySelected;

  //foreign keys that need to be populated
  genders;
  provinces;
  countries;
  appointments;

  isPatient;
  isPhysio;
  constructor(private editProfileService: EditProfileService,
              authService: AuthenticationService,
              createUserAccountService: CreateUserAccountService,
              userAccountListService: UserAccountListService,
              private snackBar: MatSnackBar,
              public viewContainerRef :ViewContainerRef,
              private router: Router) {
    this.authService = authService;
    this.createUserAccountService = createUserAccountService;
    this.userAccountListService = userAccountListService;
  }

  ngOnInit() {
    let type = this.authService.checkRole();
    if (type == "patient"){
      this.isPatient = true;
    } else if (type = "physiotherapist"){
      this.isPhysio = true;
    }

      this.profileSubscription = this.authService.profileOb$.subscribe((profile) => {
        this.user = profile; console.log("subscription to auth service setProfile returned: ", this.user);
        this.originalUser = this.user;
        this.profileType = this.authService.getActiveProfileType();
        if(type = "patient") {
          this.populateCountries();
          console.log("current country is: ", this.user.country);
          this.populateProvinces(this.user.country._id);
          this.populateGenders();
        }
      });

      this.authService.getUserAccount().subscribe(account =>{
        console.log("from subscription to auth service getUserAccount ",account);
        this.account = account;
      });
    }


  editPatientInfo(){
    this.isChanged = true;
  }

  savePatientInfo(){
//Update the patients information
      const patientProfile = {
        familyName: this.user.familyName,
        givenName: this.user.givenName,
        email: this.user.email,
        DOB: this.user.DOB,
        postalCode: this.user.postalCode,
        phone: this.user.phone,
        address: this.user.address,
        others: this.user.others,
        account: this.user.account,
        treatments: this.user.treatments,
        payments: this.user.payments,
        country: this.user.country,
        province:  this.user.province,
        city:  this.user.city,
        gender: this.user.gender,
        appointments: this.user.appointments
      }
      console.log(patientProfile);
      this.userAccountListService.updatePatient(this.user._id, patientProfile).
      subscribe(
        user => {
          this.user = user;
          console.log("This was returned for the patient" + JSON.stringify(user));
          this.snackBar.open("Information updated sucessfully!", "", {
            duration: 1500
          });
          this.isChanged = false;
        },
        error => {
          console.log("Error");
          this.snackBar.open("Error!" + error, "", {
            duration: 1500
          });
        });
    }

  editPhysioInfo(){
    this.isChanged = true;
  }

  savePhysioInfo(){
    const physiotherapist = {
      familyName: this.user.familyName,
      givenName: this.user.givenName,
      email: this.user.email,
      dateHired: this.user.dateHired,
      dateFinished: this.user.dateFinished,
      treatments: this.user.treatments,
      userAccount: this.user.userAccount,
      availableTimeSlots: this.user.availableTimeSlots,
      appointments: this.user.appointments,
    }
    console.log(physiotherapist);
    this.userAccountListService.updatePhysiotherapist(this.user._id, physiotherapist).
    subscribe(
      user => {
        this.user = user;
        console.log("This was returned for the physiotherapist" + JSON.stringify(user));
        this.snackBar.open("Information updated sucessfully!", "", {
          duration: 1500
        });
        this.isChanged = false;
      },
      error => {
        console.log("Error");
        this.snackBar.open("Error!" + error, "", {
          duration: 1500
        });
      });

  }

  resetPassword(){
    const account = {
      _id: this.account._id,
      userAccountName: this.account.userAccountName,
      encryptedPassword: "password",
      administrator: this.account.administrator,
      physiotherapist: this.account.physiotherapist,
      patientProfile: this.account.patientProfile,
      activated: this.account.activated,
      hasPaid: this.account.hasPaid,
      passwordReset: true,
    };
    console.log("in component-updateUserAccount: ", account);
    this.userAccountListService.updateUserPassword(this.account._id, account).subscribe( account => {
      this.snackBar.open("Password has been reset to 'password'! Please log in again to change your password!", "", {
        duration: 3000
      });
      this.authService.logout();
      this.router.navigate(['/home']);
    })
  }
  cancelEdit(){
    this.isChanged = false;
    this.user = this.originalUser;
  }

  //Get all the genders
  populateGenders() {
    this.genders = this.createUserAccountService.getGenders().subscribe(
      data => {
        this.genders = data;
        console.log("This is what was returned for get all genders" + JSON.stringify(data));
      },
      error => {
        console.log("Error");
      });
  }

  //Get all provinces
  //enable selection of provinces and populate provinces based on selection of country. Only Canada works for now.
  populateProvinces(countryID){
    this.countrySelected = true;
    this.provinces = this.createUserAccountService.getProvinces().subscribe(
      data => {
        console.log("This is what was returned" + JSON.stringify(data));
        function belongToCountry(element, index, array){
          return (element.country == countryID )
        }

        this.provinces = data.filter(belongToCountry);
        console.log("here is the list of provinces", this.provinces);
      },
      error => {
        console.log("Error");
      });
    console.log(this.provinces);
  }

  //Get all countries
  populateCountries() {
    //populate countries
    this.countries = this.createUserAccountService.getCountries().subscribe(
      data => {
        this.countries = data;
        console.log("This is what was returned for get all countries" + JSON.stringify(data));
      },
      error => {
        console.log("Error");
      });
  }


}
