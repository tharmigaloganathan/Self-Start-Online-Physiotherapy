import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ManagePatientProfileService {
  private baseURL = 'http://localhost:3700/PatientProfiles';

	constructor(private http: Http) {}

  	//Function to get all patients
	getPatients() {
  		return this.http.get(this.baseURL)
  		.map((response: Response) => {
	 	return response.json().patientProfile;
  		});
	}

  // Function to get all patients
  getPatient(patientID) {
    return this.http.get(this.baseURL + '/' + patientID)
      .map((response: Response) => {
        return response.json().patientProfile;
      });
  }

	//Function to update patient
	updatePatient(patient: any) {
		return this.http.put('http://localhost:3700/PatientProfiles/', patient)
		.map((response: Response) => {
		return response.json();
		});
	}

	//Function to set the selected patient
	setSelectedPatient(patient: any) {
		//Temporay fix to pass selected patient
		localStorage.setItem('selectedPatient', JSON.stringify(patient));
	}

}
