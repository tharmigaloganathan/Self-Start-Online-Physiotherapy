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

	//Create a new patient profile
	registerUserProfile(user: any) {
    console.log("within service")
		return this.http.post(this.domain+'/PatientProfiles', user)
		.map((response: Response) => {
			return response.json();
		});
	}

	//Create a new physiotherapist profile
	registerPhysiotherapist(physiotherapist: any) {
		return this.http.post(this.domain+'/Physiotherapists', physiotherapist)
		.map((response: Response) => {
			return response.json();
		});
	}

	//Create a new administrator profile
	registerAdministrator(administrator: any){
    return this.http.post(this.domain+'/Administrators', administrator).map((response: Response) => {
      return response.json();
    });
  }

	//Create a new user account
	registerUserAccount(account: any) {
    console.log("within service, in registerUserAccount function ");
		return this.http.post(this.domain+'/UserAccounts', account)
		.map((response: Response) => {
      console.log("The account has been registered! ", response.json());
      return response.json();
		});
	}

	//Get all user Accounts
	getAllUserAccounts() {
    console.log("within service, in get all user accounts function ");
    return this.http.get(this.domain+'/UserAccounts')
			.map((response: Response) => {
			return response.json().userAccount;
		});
	}

	//Get a single users accounts
	getUserAccount(id) {
		return this.http.get(this.domain+'/UserAccounts/'+id)
		.map((response: Response) => {
		console.log("Inside service" + response.json().userAccount);
		return response.json().userAccount;
		});
	}

}
