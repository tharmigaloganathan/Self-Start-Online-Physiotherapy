import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from './../environments/environment';

@Injectable()
export class CreateUserAccountService {

	genders = [
		{value: 'Male', viewValue: 'Male'},
		{value: 'Female', viewValue: 'Female'},
		{value: 'Other', viewValue: 'Other'},
	];

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
	];

	domain = environment.apiURL;

  constructor(private http: Http) {}

	//Return all genders
	getGenders() {
		return this.http.get(this.domain+'/Genders')
		.map((response: Response) => {
			return response.json().gender;
		});
	}

	//Return all provinces
	getProvinces() {
		return this.http.get(this.domain+'/Provinces')
		.map((response: Response) => {
			return response.json().province;
		});
	}

<<<<<<< HEAD
	//Create a new patient profile
	registerUserProfile(user: any) {
		return this.http.post(this.domain+'/PatientProfiles', user)
=======
	//Create a new user account
	registerUser(user: any) {
		return this.http.post('http://localhost:3700/UserAccounts', user)
>>>>>>> ead21bd18624d1d160068fd2a9db6038cd2fb896
		.map((response: Response) => {
			return response.json();
		});
	}

	registerUserAccount(account: any) {
		return this.http.post(this.domain+'/UserAccounts', account)
		.map((response: Response) => {
			return response.json();
		});
	}

	// THIS FUNCTION IS NOT DONE IT SHOULD GETTING UserAccounts NOT PatientProfiles
	//Get all user Accounts
	getAllUserAccounts() {
			return this.http.get(this.domain+'/PatientProfiles')
			.map((response: Response) => {
			console.log("Inside service" + response.json().patientProfile);
			return response.json().patientProfile;
		});
	}

	//Get a single users accounts
	getuserAccount(id) {
		return this.http.get(this.domain+'/UserAccounts/'+id)
		.map((response: Response) => {
		console.log("Inside service" + response.json().userAccount);
		return response.json().userAccount;
		});
	}

}
