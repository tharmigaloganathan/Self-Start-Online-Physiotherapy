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
	patientProfile_id;

  constructor(createUserAccountService: CreateUserAccountService, router: Router) {
	  this.createUserAccountService = createUserAccountService;
		this.router = router;
		this.genders = this.createUserAccountService.getGenders();
		this.provinces = this.createUserAccountService.getProvinces();
  }

	ngOnInit() {
    }

	//Go back to account list
	viewAccountList() {
		this.router.navigate(['/admin/user-accounts']);
	}

	registerUser() {
		//JSON object to hold user information
		const user = {
			userAccountName: this.userName,
			encryptedPassword: this.password,
			patientProfile: [{
				familyName: this.familyName,
				givenName: this.givenName,
				email: this.email,
				DOB: this.DOB,
				postalCode: this.postalCode,
				address: this.address,
				phone: this.phone,
				others: "",
				account: "",
				treatments: "",
				payments: "",
				country: "Canada",
				province: this.province,
				city: this.city,
				gender: this.gender,
				appointments: ""
				}]
			}
		console.log(user);
		//Send user data to backend
		this.createUserAccountService.registerUserProfile(user).
		subscribe(
			user => {
				console.log("This is what was returned" + user);
			},
			error => {
				console.log("Error");
			});
	}

}
