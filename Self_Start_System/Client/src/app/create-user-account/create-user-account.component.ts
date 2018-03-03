import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-user-account',
  templateUrl: './create-user-account.component.html',
  styleUrls: ['./create-user-account.component.scss']
})
export class CreateUserAccountComponent implements OnInit {
	personalInfoValid = false;
	accountInforValid = false;
	//Gender dropdown
	genders = [
		{value: 'Male', viewValue: 'Male'},
		{value: 'Female', viewValue: 'Female'},
		{value: 'Other', viewValue: 'Other'},
	];
	//Province dropdown
	provinces = [
		{value: 'AB', viewValue: 'AB'},
		{value: 'BC', viewValue: 'BC'},
		{value: 'MB', viewValue: 'MB'},
		{value: 'NB', viewValue: 'NB'},
		{value: 'NL', viewValue: 'NL'},
		{value: 'NS', viewValue: 'NS'},
		{value: 'NT', viewValue: 'NT'},
		{value: 'NU', viewValue: 'NU'},
		{value: 'ON', viewValue: 'ON'},
		{value: 'PE', viewValue: 'PE'},
		{value: 'QC', viewValue: 'QC'},
		{value: 'SK', viewValue: 'SK'},
		{value: 'YT', viewValue: 'YT'},
	]
	//User input fields
	familyName;
	givenName;
	gender;
	DOB;
	address;
	city;
	province;
	postalCode;
	email;
	phone;
	userName;
	password;
	passwordVerify;

  constructor() { }


    ngOnInit() {
    }

	registerUser() {
		const user = {
			userAccountName: this.userName,
			encryptedPassword: this.password,
			administrator: null,
			physiotherapist: null,
			patientProfile: {
				familyName: this.familyName,
				givenName: this.givenName,
				email: this.email,
				DOB: this.DOB,
				postalCode: this.postalCode,
				address: this.address,
				phone: this.phone,
				others: null,
				account: null,
				treatments: null,
				payments: null,
				country: "Canada",
				province: this.province,
				city: this.city,
				gender: this.gender,
				appointments: null
			}
		}
		console.log(user);
	}

}
