import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from './../environments/environment';
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class UserAccountListService {

	domain = environment.apiURL;
	options;
	authService;

  constructor(private http: Http, authService : AuthenticationService) {
    this.authService = authService;
  }

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
    this.options = this.authService.createAuthenticationHeaders();
    return this.http.get(this.domain+'/PatientProfiles',this.options)
			.map((response: Response) => {
			return response.json().patientProfile;
		});
	}

	//Get all physiotherapists
	getAllPhysiotherapists() {
    this.options = this.authService.createAuthenticationHeaders();
			return this.http.get(this.domain+'/Physiotherapists',this.options)
			.map((response: Response) => {
			return response.json().physiotherapist;
		});
	}
}
