import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from './../environments/environment';

import { AuthenticationService } from "./authentication.service";

@Injectable()
export class UserAccountListService {

	domain = environment.apiURL;
	options;
	authenticationService;

  constructor(private http: Http, authenticationService : AuthenticationService) {
    this.authenticationService = authenticationService;
  }

  checkForgotPasswordEmail(id, role){
    if (role == "patient"){
      return this.http.get(this.domain+'/PatientProfile/getEmail/'+id)
        .map((response: Response) => {
          return response.json().email;
        });
    } else if (role == "physiotherapist") {
      return this.http.get(this.domain+'/Physiotherapist/getEmail/'+id)
        .map((response: Response) => {
          return response.json().email;
        });
    }

  }

	//Get a single users account
	getUserAccount(id) {
			this.options = this.authenticationService.createAuthenticationHeaders();
			return this.http.get(this.domain+'/UserAccounts/id/'+id, this.options)
			.map((response: Response) => {
			return response.json().userAccount;
		});
	}

	//Update user account
	updateUserAccount(id, user) {
		this.options = this.authenticationService.createAuthenticationHeaders();
		return this.http.put(this.domain+'/UserAccounts/id/'+id, user, this.options)
			.map((response: Response) => {
			return response.json().userAccount;
		});
	}

	//Get all patients
	getAllPatients() {

		this.options = this.authenticationService.createAuthenticationHeaders();
		return this.http.get(this.domain+'/PatientProfiles', this.options)
			.map((response: Response) => {
			return response.json().patientProfile;
		});
	}

	//Get all physiotherapists
	getAllPhysiotherapists() {
    this.options = this.authenticationService.createAuthenticationHeaders();
			return this.http.get(this.domain+'/Physiotherapists',this.options)
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

	updatePhysiotherapist(id,user){
    this.options = this.authenticationService.createAuthenticationHeaders();
    return this.http.put(this.domain+'/Physiotherapists/'+id ,user, this.options)
      .map((response: Response) => {
        return response.json().physiotherapist;
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

	//Get a single patients profile
	getPatientProfile(id) {
			this.options = this.authenticationService.createAuthenticationHeaders();
			console.log("Options" + JSON.stringify(this.options));
			return this.http.get(this.domain+'/PatientProfiles/'+id, this.options)
			.map((response: Response) => {
			return response.json().patientProfile;
		});
	}

	//Get all appointments for a patient
	getAppointments(id) {
			this.options = this.authenticationService.createAuthenticationHeaders();
			return this.http.get(this.domain+'/PatientProfiles/get-all-appointments/'+id, this.options)
			.map((response: Response) => {
			return response.json().appointments;
		});
	}

	//Get a single appointment for a patient
	getSingleAppointment(id) {
			this.options = this.authenticationService.createAuthenticationHeaders();
			return this.http.get(this.domain+'/Appointments/'+id, this.options)
			.map((response: Response) => {
				return response.json();
		});
	}

	//Get a single exercise
	getExercise(id) {
			this.options = this.authenticationService.createAuthenticationHeaders();
			return this.http.get(this.domain+'/Exercises/'+id, this.options)
			.map((response: Response) => {
			return response.json().exercise;
		});
	}

	//Get a single assessment test
	getAssessmentTest(id) {
			this.options = this.authenticationService.createAuthenticationHeaders();
			return this.http.get(this.domain+'/AssessmentTests/'+id, this.options)
			.map((response: Response) => {
			return response.json().assessmentTest;
		});
	}

	//The the physiotherapist
	getPhysio(id) {
			this.options = this.authenticationService.createAuthenticationHeaders();
			return this.http.get(this.domain+'/Physiotherapists/'+id, this.options)
			.map((response: Response) => {
			return response.json().physiotherapist;
		});
	}


}
