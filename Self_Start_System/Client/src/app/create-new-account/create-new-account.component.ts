import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import {AuthenticationService} from "../authentication.service";
import {CreateUserAccountService} from "../create-user-account.service";
import {Router} from "@angular/router";
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-create-new-account',
  templateUrl: './create-new-account.component.html',
  styleUrls: ['./create-new-account.component.scss'],
  providers: [CreateUserAccountService],

})
export class CreateNewAccountComponent implements OnInit {
  personalInfoValid = false;
  accountInforValid = false;
  isLinear = true;
  type;
  genders; //Populates gender dropdown
  provinces; //Populates province dropdown
  createUserAccountService;
  router;

  //User input fields
  personalInfoForm: FormGroup;
  accountInfoForm: FormGroup;
  userAccounts;

  //form status tools
  processing = false;

  patientProfile_id = null;
  physiotherapistProfile_id = null;



  constructor(createUserAccountService: CreateUserAccountService, router: Router, private fb: FormBuilder) {
    this.createPersonalInfoForm();
    this.createAccountInfoForm();
    this.createUserAccountService = createUserAccountService;
    this.router = router;
    this.userAccounts=[];
  }

  createPersonalInfoForm(){
    this.personalInfoForm = this.fb.group({
      familyName: ['', Validators.compose([Validators.required, this.validateName] )],
      givenName: ['', Validators.compose([Validators.required, this.validateName] )],
      gender: ['',  Validators.compose([Validators.required] )],
      DOB: ['', Validators.compose([Validators.required] )],
      address: ['', Validators.compose([Validators.required, this.validateAddress] )],
      city: ['', Validators.compose([Validators.required, this.validateName] )],
      province: ['', Validators.compose([Validators.required, this.validateAddress] )],
      postalCode: ['', Validators.compose([Validators.required, this.validateAddress] )],
      email: ['', Validators.compose([Validators.required, Validators.email] )],
      phone: ['', Validators.compose([Validators.required, this.validatePhoneNumber] )],
    });
  }

  createAccountInfoForm(){
    this.accountInfoForm = this.fb.group({
      userName:  ['', Validators.compose([Validators.required, this.validateAlphanumeric,this.validateUniqueUserName.bind(this)] )],
      password: ['', Validators.compose([Validators.required, this.validatePassword] )],
      passwordVerify:  ['', Validators.compose([Validators.required, this.validateMatchingPasswords.bind(this)] )],
    });
  }

  ngOnInit() {
    //Populate provinces
    this.provinces = this.createUserAccountService.getProvinces().subscribe(
      data => {
        this.provinces = data;
        console.log("This is what was returned" + JSON.stringify(data));
      },
      error => {
        console.log("Error");
      });
    console.log(this.provinces);
    //Populate genders
    this.genders = this.createUserAccountService.getGenders().subscribe(
      data => {
        this.genders = data;
        console.log("This is what was returned" + JSON.stringify(data));
      },
      error => {
        console.log("Error");
      });
    console.log(this.genders);


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
    return field.hasError('required') ? 'You must enter a value!' :
      field.hasError('validateName') ? 'Not valid! Please try again!' :
        '';
  }

  validateAlphanumeric(controls){
    const regExp = new RegExp (/^[a-zA-Z0-9]+$/);
    if (regExp.test(controls.value)){
      return null;
    } else {
      return {'validateAlphanumeric': true}
    }
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
    return field.hasError('required') ? 'You must enter a value!' :
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
    return field.hasError('required') ? 'You must enter a value!' :
      field.hasError('validatePhoneNumber') ? 'Invalid phone number! Please try again!' :
        '';
  }

  getEmailErrorMessage(field){
    return field.hasError('required') ? 'You must enter a value!' :
      field.hasError('email') ? 'Invalid email! Please try again!' :
        '';
  }

  validateUniqueUserName(controls) {
      this.userAccounts = this.createUserAccountService.getAllUserAccounts().subscribe(
        UserAccount => {
          console.log("Retrieved all UserAccounts: " + JSON.stringify(UserAccount));
          this.userAccounts = UserAccount;
          for (let account of this.userAccounts) {
            if (account.userAccountName === controls.value) {
              return {validateUniqueUserName: true};
            }
          }
        },
        error => {
          console.log(error);
          return null;
        });
      return null;
  }

  getUserNameErrorMessage(field){
    return field.hasError('required')? 'You must enter a value!' :
      field.hasError('validateAlphanumeric') ? 'Invalid username! Please try again!' :
        field.hasError('validateUniqueUserName') ? 'Sorry, username is already taken! Please try again':
          ''
  }

  validatePassword(controls){
    //minimum 6 chars, at least one lowercase, one uppecase, and 1 number,
    const regExp = new RegExp (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/);
    if (regExp.test(controls.value)){
      return null;
    } else {
      return {'validatePassword': true}
    }
  }

  getPasswordErrorMessage(field){
    return field.hasError('required')? 'You must enter a password!' :
      field.hasError('validatePassword') ? 'Invalid password formate! Please try again':
        ''
  }

  validateMatchingPasswords(controls){
      if (controls.value === this.accountInfoForm.controls.password){
        return {'matchingPasswords': true}
      } else {
        return null;
      }
  }

  getPasswordVerifyErrorMessage(field){
    return field.hasError('required')? 'You must enter a password!' :
      field.hasError('validatePassword') ? 'Invalid password format! Please try again':
        field.hasError('validateMatchingPasswords') ? 'Sorry, your passwords do not match! Please try again':
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
      province: [''],
      postalCode: [''],
      email: [''],
      phone: [''],
    });

    this.accountInfoForm .reset({
      userName:  [''],
      password: [''],
      passwordVerify:  [''],
    });
  }


    // //JSON object to hold user information
    // const user = {
    //   familyName: this.familyName,
    //   givenName: this.givenName,
    //   email: this.email,
    //   DOB: this.DOB,
    //   postalCode: this.postalCode,
    //   address: this.address,
    //   phone: this.phone,
    //   others: "",
    //   account: null,
    //   treatments: null,
    //   payments: null,
    //   country: "5a679e0b734d1d7c679791c8",
    //   province: this.province,
    //   city: this.city,
    //   gender: this.gender,
    //   appointments: null
    // }
    // console.log(user);
    // //Send user data to backend
    // this.createUserAccountService.registerUserProfile(user).subscribe(
    //   user => {
    //     console.log("This is what was returned" + JSON.stringify(user));
    //     this.patientProfile_id = user.patientProfile._id;
    //     console.log("Patient profile id " + this.patientProfile_id);
    //   },
    //   error => {
    //     console.log("Error");
    //   });


  //Register user accounts
  registerUserAccount() {
    // const account = {
    //   userAccountName: this.userName,
    //   encryptedPassword: this.password,
    //   patientProfile: this.patientProfile_id,
    //   physiotherapist: this.physiotherapistProfile_id
    // }
    // //Send account data to backend
    // this.createUserAccountService.registerUserAccount(account).subscribe(
    //   user => {
    //     console.log("This is what was returned" + JSON.stringify(account));
    //   },
    //   error => {
    //     console.log("Error");
    //   });
  }
}

//   username;
//   password;
//   passwordVerify;
//   patientProfile_id = null;
//   physiotherapistProfile_id = null;
//   administrator_id = null;
//   madePatient = false;
//   madePhysio = false;
//   madeAdmin = false;
//
//   //variables to store filler family names to distringuish fake profiles for testing
//   givenName = null;
//   familyName;
//   gender;
//
//   adminName;
//
//   constructor(
//     private createUserAccountService: CreateUserAccountService,
//     private router : Router
//   ) { }
//
//   ngOnInit() {
//     this.madePatient = false;
//     this.madePhysio = false;
//   }
//
//   //makes a profile for the patient
//   registerPatientProfile() {
//     //JSON object to hold user information
//     const testPatientUser = {
//       familyName: "Zhang",
//       givenName: this.givenName,
//       email: "leozhang47@Hotmail.com",
//       DOB: "2014-02-10T10:50:42.389Z",
//       postalCode: "N6J 1T6",
//       address: "217 Sarnia Road",
//       phone: "905-543-4879",
//       others: "",
//       account: null,
//       treatments: [],
//       payments: [],
//       country: "5a679e0b734d1d7c679791c8",
//       province: "5a9d6910f36d2805902517fc",
//       city: "London",
//       gender: "5a9d6e84f36d280590251e97",
//       appointments: []
//     }
//     console.log(testPatientUser);
//     //Send user data to backend
//     this.createUserAccountService.registerUserProfile(testPatientUser).
//     subscribe(
//       user => {
//         console.log("The following patient has been registered: " + JSON.stringify(user));
//         this.patientProfile_id = user.patientProfile._id;
//         console.log("Patient profile id " + this.patientProfile_id);
//       },
//       error => {
//         console.log(error);
//       });
//     this.madePatient = true;
//   }
//
//   //makes a profile for the physiotherapist
//   registerPhysiotherapistProfile() {
//     //JSON object to hold user information
//     const testPhysioUser = {
//       familyName: "Zhang",
//       givenName: this.givenName,
//       email: "leozhang47@Hotmail.com",
//       dateHired: "2014-02-10T10:50:42.389Z",
//       dateFinished: "2015-02-10T10:50:42.389Z",
//       userAccount: null,
//       treatments: [],
//       availableTimeSlots: [],
//     };
//
//     console.log(testPhysioUser);
//     //Send user data to backend
//     this.createUserAccountService.registerPhysiotherapist(testPhysioUser).
//     subscribe(
//       user => {
//         console.log("The following physiotherapist has been registered: " + JSON.stringify(user));
//         this.physiotherapistProfile_id = user.physiotherapist._id;
//         console.log("Physiotherapist profile id " + this.physiotherapistProfile_id);
//       },
//       error => {
//         console.log(error);
//       });
//     this.madePhysio = true;
//   }
//
//   //makes a profile for the admin
//   registerAdministratorProfile() {
//     //JSON object to hold user information
//     const testAdminUser = {
//       familyName: "Zhang",
//       givenName: this.givenName,
//       email: "leozhang47@Hotmail.com",
//       dateHired: "2014-02-10T10:50:42.389Z",
//       dateFinished: "2015-02-10T10:50:42.389Z",
//       forms: [],
//       userAccount: null,
//     }
//
//     console.log(testAdminUser);
//     //Send user data to backend
//     this.createUserAccountService.registerAdministrator(testAdminUser).
//     subscribe(
//       user => {
//         console.log("The following administrator has been registered: " + JSON.stringify(user));
//         this.administrator_id= user.administrator._id;
//         console.log("Administrator profile id " + this.administrator_id);
//       },
//       error => {
//         console.log(error);
//       });
//     this.madeAdmin = true;
//   }
//
//   //make the actual user account and password needed to log on
//   registerUserAccount() {
//     const account = {
//       userAccountName: this.username,
//       encryptedPassword: this.password,
//       patientProfile: this.patientProfile_id,
//       physiotherapist: this.physiotherapistProfile_id,
//       administrator: this.administrator_id
//     }
//     console.log ("here is the account being registered", account)
//
//     //Send account data to backend
//     this.createUserAccountService.registerUserAccount(account).subscribe(
//       user => {
//         //console.log("The following account has been registered: " + JSON.stringify(account));
//       },
//       error => {
//         console.log(error);
//       });
//     setTimeout(() => {
//       this.router.navigateByUrl('/login')},
//       2000
//     );
//
//   }
// }
