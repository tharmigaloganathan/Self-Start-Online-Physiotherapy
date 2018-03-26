import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from './../environments/environment';
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class UserAccountListService {

	domain = environment.apiURL;
	options;

  constructor(private http: Http, private authenticationService: AuthenticationService) {}

	//Get a single users account
	getUserAccount(id) {
			return this.http.get(this.domain+'/UserAccounts/'+id)
			.map((response: Response) => {
			return response.json().userAccount;
		});
	}

	//Get all user accounts
	getAllUserAccounts() {}

	//Update user account
	updateUserAccount(id, user) {
		return this.http.put(this.domain+'/UserAccounts/'+id, user)
			.map((response: Response) => {
			return response.json().userAccount;
		});
	}

	//Get all patients
	getAllPatients() {
		return this.http.get(this.domain+'/PatientProfiles')
			.map((response: Response) => {
			return response.json().patientProfile;
		});
	}

	//Get all physiotherapists
	getAllPhysiotherapists() {
		return this.http.get(this.domain+'/Physiotherapists')
			.map((response: Response) => {
			return response.json().physiotherapist;
		});
	}

	//Update patients information
	updatePatient(id, user) {
		this.options = this.authenticationService.createAuthenticationHeaders();
		return this.http.put(this.domain+'/PatientProfiles/'+id ,user, this.options)
			.map((response: Response) => {
				return response.json().patientProfile;
		});
	}

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

		//Return all countries
		getCountries() {
			return this.http.get(this.domain+'/Countries')
			.map((response: Response) => {
			return response.json().country;
		});
	}

}
