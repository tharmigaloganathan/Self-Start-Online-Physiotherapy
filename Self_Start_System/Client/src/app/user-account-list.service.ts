import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from './../environments/environment';

@Injectable()
export class UserAccountListService {

	domain = environment.apiURL;

  constructor(private http: Http) {}

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
}
