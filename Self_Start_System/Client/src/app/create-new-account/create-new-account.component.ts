import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import {AuthenticationService} from "../authentication.service";
import {CreateUserAccountService} from "../create-user-account.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormBuilder, Validators, AsyncValidatorFn, AbstractControl} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import { of} from "rxjs/observable/of";
import {VALID} from "@angular/forms/src/model";


@Component({
  selector: 'app-create-new-account',
  templateUrl: './create-new-account.component.html',
  styleUrls: ['./create-new-account.component.scss'],
  providers: [CreateUserAccountService],

})
export class CreateNewAccountComponent implements OnInit {
  personalInfoValid = false;
  accountInforValid = false;
  isLinear = true; //for stepper navigation
  type;
  //for filling selection dropdowns
  genders; //Populates gender dropdown
  provinces; //Populates province dropdown
  countries;
  createUserAccountService;
  router;

  //control access to provinces
  countrySelected = false;
  //forms
  personalInfoForm: FormGroup;
  accountInfoForm: FormGroup;

  toolTipPosition = "above";
  previousStepsEditable = true;

  receivedGenders = false;
  receivedCountries = false;


  //for passing profile ids to useraccount
  patientProfile_id = null;
  physiotherapistProfile_id = null;
  administratorProfile_id= null;



  constructor(createUserAccountService: CreateUserAccountService, router: Router, private fb: FormBuilder) {
    this.createPersonalInfoForm();
    this.createAccountInfoForm();
    this.createUserAccountService = createUserAccountService;
    this.router = router;
  }

  createPersonalInfoForm(){
    this.personalInfoForm = this.fb.group({
      familyName: ['', Validators.compose([Validators.required, this.validateName] )],
      givenName: ['', Validators.compose([Validators.required, this.validateName] )],
      gender: ['',  Validators.compose([Validators.required] )],
      DOB: ['', Validators.compose([Validators.required] )],
      address: ['', Validators.compose([Validators.required, this.validateAddress] )],
      city: ['', Validators.compose([Validators.required, this.validateName] )],
      country: ['', [Validators.required]],
      province: ['', Validators.compose([Validators.required] )],
      postalCode: ['', Validators.compose([Validators.required, this.validateAddress] )],
      email: ['', Validators.compose([Validators.required, Validators.email] )],
      phone: ['', Validators.compose([Validators.required, this.validatePhoneNumber, Validators.minLength(10)] )],
    });
  }

  createAccountInfoForm(){
    this.accountInfoForm = this.fb.group({
      userName: ['', [Validators.required, this.validateUsername, Validators.minLength(5), Validators.maxLength(10)], [this.validateUniqueUserName.bind(this)]],
      passwords: this.fb.group({
        password: ['', Validators.compose([Validators.required, this.validatePassword, Validators.maxLength(15), Validators.minLength(6)])],
        passwordVerify: ['',[Validators.required]]
      }, {validator: this.validateMatchingPasswords('password', 'passwordVerify')})
    })
  }

  ngOnInit() {
    //Populate genders
    this.genders = this.createUserAccountService.getGenders().subscribe(
      data => {
        this.genders = data;
        console.log("This is what was returned for get all genders" + JSON.stringify(data));
        this.receivedGenders = true;
      },
      error => {
        console.log("Error");
      });
    //populate countries
    this.countries = this.createUserAccountService.getCountries().subscribe(
      data => {
        this.countries = data;
        console.log("This is what was returned for get all countries" + JSON.stringify(data));
        this.receivedCountries = true;
      },
      error => {
        console.log("Error");
      });
  }

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



  validateName(controls){
    const regExp = new RegExp(/^[a-zA-Z\s]+$/);
    if (regExp.test(controls.value)){
      return null;
    } else {
      return {'validateName': true}
    }
  }
  getNameErrorMessage(field) {
    return field.hasError('required') ? 'This field is required' :
      field.hasError('validateName') ? 'Not valid! Please try again!' :
        '';
  }


  //numbers, letter,s and spaces
  validateAddress(controls){
    const regExp = new RegExp (/^[\w\-\s]+$/);
    if (regExp.test(controls.value)){
      return null;
    } else {
      return {'validateAddress': true}
    }
  }

  getAddressErrorMessage(field) {
    return field.hasError('required') ? 'This field is required' :
      field.hasError('validateAddress') ? 'Not valid! Please try again!' :
        '';
  }

  validatePhoneNumber(controls){
    const regExp = new RegExp (/^[0-9]+$/);
    if (regExp.test(controls.value)){
      return null;
    } else {
      return {'validatePhoneNumber': true}
    }
  }
  getPhoneErrorMessage(field){
    return field.hasError('required') ? 'This field is required' :
      field.hasError('validatePhoneNumber') ? 'Invalid phone number! Please try again!' :
        field.hasError('minlength')? 'Your phone number must be at least 10 digits long':

          '';
  }

  getEmailErrorMessage(field){
    return field.hasError('required') ? 'This field is required' :
      field.hasError('email') ? 'Invalid email! Please try again!' :
        '';
  }

  validateUsername(controls){
    const regExp = new RegExp (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/);
    if (regExp.test(controls.value)){
      return null;
    } else {
      return {'validateUsername': true}
    }
  }

  validateUniqueUserName(control: FormControl) {
    const q = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.createUserAccountService.getUserAccountByName(control.value).subscribe(result => {
          console.log("in component, result success is : ", result.success)
          if (!result.success) {
            resolve(null);
          } else if (result.success) {
            resolve({ 'notUnique': true });
          }
        })
      }, 500);
    });
    return q;
  }

  getUserNameErrorMessage(field){
    return field.hasError('required')? 'This field is required' :
      field.hasError('validateUsername') ? 'Invalid username! Your username must contain least one letter and one number!' :
        field.hasError('minlength')? 'Invalid username! Your username must be at least 5 characters long':
          field.hasError('maxlength')? 'Invalid username! Your username must be less than 10 characters in length':
            field.hasError('notUnique') ? 'Sorry, username is already taken! Please try again':
              ''
  }

  validatePassword(controls){
    //minimum 6 chars, at least one lowercase, one uppecase, and 1 number,
    const regExp = new RegExp (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/);
    if (regExp.test(controls.value)){
      return null;
    } else {
      return {'validatePassword': true}
    }
  }

  getPasswordErrorMessage(field){
    return field.hasError('required')? 'This field is required' :
      field.hasError('validatePassword') ? 'Invalid password! Your password must containt at least one uppercase letter, one lowercase letter, and one number':
        field.hasError('minlength')? 'Invalid password! Your password must be at least 6 characters long':
          field.hasError('maxlength')? 'Invalid password! Your password must be less than 15 characters in length':
            ''
  }
  validateMatchingPasswords(password, confirm){
    return function(group: FormGroup) {
      if ((!group.controls[password].value) ||(!group.controls[confirm].value)){
        return null;
      }
      else if (group.controls[password].value === group.controls[confirm].value){
        console.log("The two passwords: ", group.controls[password].value, " ", group.controls[confirm].value)
        console.log('passwords match!');
        return null;
      } else {
        console.log('passwords do not match!');
        group.controls[confirm].setErrors({notMatching : true});
      }
    };
  }
  getPasswordVerifyErrorMessage(){
    return this.accountInfoForm.get('passwords').get('passwordVerify').hasError('required')? 'This field is required' :
      this.accountInfoForm.get('passwords').get('passwordVerify').hasError('notMatching')? 'Passwords do not match! Please try again!':
        ''
  }

  onSubmitPersonalInfo(){};

  registerUserProfile() {};

  rebuildForm() {
      this.personalInfoForm.reset({
        familyName: [''],
        givenName: [''],
        gender: [''],
        DOB: [''],
        address: [''],
        city: [''],
        country: [''],
        province: [''],
        postalCode: [''],
        email: [''],
        phone: [''],
      });
  }

  registerPatient(){
    this.registerPatientProfile();
  }

  registerPatientProfile() {
    //JSON object to hold user information
    const tempPatientProfile = {
      familyName: this.personalInfoForm.get('familyName').value,
      givenName: this.personalInfoForm.get('givenName').value,
      email: this.personalInfoForm.get('email').value,
      DOB: this.personalInfoForm.get('DOB').value,
      postalCode: this.personalInfoForm.get('postalCode').value,
      address: this.personalInfoForm.get('address').value,
      phone: this.personalInfoForm.get('phone').value,
      others: "",
      account: null,
      treatments: [],
      payments: [],
      country: this.personalInfoForm.get('country').value,
      province: this.personalInfoForm.get('province').value,
      city: this.personalInfoForm.get('city').value,
      gender: this.personalInfoForm.get('gender').value,
      appointments: [],
      intakeFormAnswers: []
    };

    console.log("in component, registerPatientProfile, here's the tempPatientProfile: ", tempPatientProfile);
    //Send user data to backend
    this.createUserAccountService.registerUserProfile(tempPatientProfile).subscribe(
      user => {
        console.log("The following patient has been registered: " + JSON.stringify(user));
        this.patientProfile_id = user.patientProfile._id;
        console.log("Patient profile id: ", this.patientProfile_id);
        this.registerUserAccount();
      },
      error => {
        console.log(error);
      });
  }

  //make the actual user account and password needed to log on
  registerUserAccount() {
    const account = {
      userAccountName: this.accountInfoForm.get('userName').value,
      encryptedPassword: this.accountInfoForm.get('passwords').get('password').value,
      patientProfile: this.patientProfile_id,
      physiotherapist: this.physiotherapistProfile_id,
      administrator: this.administratorProfile_id,
      activated: true,
      hasPaid: false,
      passwordReset: false,
    }

    console.log ("In component, registerUserAccount, here is the account being registered", account);

    //Send account data to backend
    this.createUserAccountService.registerUserAccount(account).subscribe(
      user => {
        console.log("From component, the following account has been registered: " + JSON.stringify(user));
        this.previousStepsEditable=false;
      },
      error => {
        console.log(error);
      });
    setTimeout(() => {
      1000
    });

  }
}
