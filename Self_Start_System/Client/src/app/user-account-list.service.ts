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
			console.log("Inside service" + response.json().userAccount);
			return response.json().userAccount;
		});
	}

	//Get all user accounts
	getAllUserAccounts() {}

	//Get all patients
	getAllPatients() {
			return this.http.get(this.domain+'/PatientProfiles')
			.map((response: Response) => {
			console.log("Inside new service" + response.json().patientProfile);
			return response.json().patientProfile;
		});
	}

	//Get all physiotherapists
	getAllPhysiotherapists() {
			return this.http.get(this.domain+'/Physiotherapists')
			.map((response: Response) => {
			console.log("Inside physio service" + response.json().physiotherapist;
			return response.json().physiotherapist;
		});
	}

}
