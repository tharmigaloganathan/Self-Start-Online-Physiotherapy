import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateUserAccountService } from '../create-user-account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user-account',
  templateUrl: './create-user-account.component.html',
  styleUrls: ['./create-user-account.component.scss'],
  providers: [CreateUserAccountService],
})
export class CreateUserAccountComponent implements OnInit {
	personalInfoValid = false;
	accountInforValid = false;
	type;
	isPhysio;
	genders; //Populates gender dropdown
	provinces; //Populates province dropdown
	createUserAccountService;
	router;
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
	patientProfile_id = null;
	physiotherapistProfile_id = null;
	//User input fields for physio
	dateHired;

  constructor(createUserAccountService: CreateUserAccountService, router: Router) {
	  this.createUserAccountService = createUserAccountService;
		this.router = router;

  }

	ngOnInit() {
		//Populate provinces
		this.provinces = this.createUserAccountService.getProvinces().
		subscribe(
			data => {
				this.provinces = data;
				console.log("This is what was returned" + JSON.stringify(data));
			},
			error => {
				console.log("Error");
			});
			console.log(this.provinces);
			//Populate genders
			this.genders = this.createUserAccountService.getGenders().
			subscribe(
				data => {
					this.genders = data;
					console.log("This is what was returned" + JSON.stringify(data));
				},
				error => {
					console.log("Error");
				});
				console.log(this.genders);
    }

	//Go back to account list
	viewAccountList() {
		this.router.navigate(['/admin/user-accounts']);
	}

	//Set the account
	setAccountType() {
		if(this.type == "patient") {
			this.isPhysio = false;
		} if(this.type == "physiotherapist") {
			this.isPhysio = true;
		}
		console.log(this.type);
		console.log(this.isPhysio);
	}

	registerUserProfile() {
		//JSON object to hold user information
		const user = {
				familyName: this.familyName,
				givenName: this.givenName,
				email: this.email,
				DOB: this.DOB,
				postalCode: this.postalCode,
				address: this.address,
				phone: this.phone,
				others: "",
				account: null,
				treatments: null,
				payments: null,
				country: "5a679e0b734d1d7c679791c8",
				province: this.province,
				city: this.city,
				gender: this.gender,
				appointments: null
			}
		console.log(user);
		//Send user data to backend
		this.createUserAccountService.registerUserProfile(user).
		subscribe(
			user => {
				console.log("This is what was returned" + JSON.stringify(user));
				this.patientProfile_id = user.patientProfile._id;
				console.log("Patient profile id " + this.patientProfile_id);
			},
			error => {
				console.log("Error");
			});
	}

	//Register the phyiotherpists account
	registerPhyioProfile() {
		const physiotherapist = {
			familyName: this.familyName,
			givenName: this.givenName,
			email: this.email,
			dateHired: this.dateHired,
			dateFinished: this.dateHired,
			treatments: null,
			userAccount: null
		}
		//Send data to backend
		this.createUserAccountService.registerPhysiotherapist(physiotherapist).
		subscribe(
			user => {
				console.log("This is what was returned" + JSON.stringify(user));
				this.physiotherapistProfile_id = user.physiotherapist._id;
			},
			error => {
				console.log("Error");
			});
	}

	//Register user accounts
	registerUserAccount() {
		const account = {
			userAccountName: this.userName,
			encryptedPassword: this.password,
			patientProfile: this.patientProfile_id,
			physiotherapist: this.physiotherapistProfile_id
		}
		//Send account data to backend
		this.createUserAccountService.registerUserAccount(account).
		subscribe(
			user => {
				console.log("This is what was returned" + JSON.stringify(account));
			},
			error => {
				console.log("Error");
			});
	}




}
