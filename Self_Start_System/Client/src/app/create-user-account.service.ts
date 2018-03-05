import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

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

  constructor(private http: Http) {}

	//Return all genders
	getGenders() {
		return this.genders;
	}

	//Return all provinces
	getProvinces() {
		return this.provinces;
	}

	//Create a new user account
	registerUser(user: any) {
		return this.http.post('http://localhost:3700/UserAccounts', user)
		.map((response: Response) => {
			return response.json();
		});
	}

}
