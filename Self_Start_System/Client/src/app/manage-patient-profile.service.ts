import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ManagePatientProfileService {

  	constructor(private http: Http) {
	}

  	//Function to get all patients
	getPatients() {
  		return this.http.get('http://localhost:3700/PatientProfiles')
  		.map((response: Response) => {
	 	return response.json().patientProfile;
  		});
	}

	//Function to set the selected patient
	setSelectedPatient(patient: any) {
		//Temporay fix to pass selected patient
		localStorage.setItem('selectedPatient', JSON.stringify(patient));
	}

}
