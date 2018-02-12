import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ManagePatientProfileService {

	public selectedPatient = new Subject<any>();

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
		//console.log("Inside service: " + JSON.stringify(patient));
		//this.selectedPatient.next(patient);
		//Temporay fix to pass selected patient
		localStorage.setItem('selectedPatient', JSON.stringify(patient));
	}

	//Function to get the selected patient
	getSelectedPatient() {
		console.log("Inside service: " + this.selectedPatient);
		return this.selectedPatient;
	}

}
