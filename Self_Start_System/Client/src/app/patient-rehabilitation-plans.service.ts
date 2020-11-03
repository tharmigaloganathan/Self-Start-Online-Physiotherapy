import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from './../environments/environment';
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class PatientRehabilitationPlansService {

	domain = environment.apiURL;
	options;
	authenticationService;

  constructor(private http: Http, authenticationService : AuthenticationService) {
		this.authenticationService = authenticationService;
	}

	//Get the specified assessment tests
	getAssessmentTest(id) {
		this.options = this.authenticationService.createAuthenticationHeaders();
		return this.http.get(this.domain+'/AssessmentTests/'+id, this.options)
		.map((response: Response) => {
		return response.json().assessmentTest;
    });
	}

	//Get the specific exercise
	getExercise(id) {
		this.options = this.authenticationService.createAuthenticationHeaders();
		return this.http.get(this.domain+'/Exercises/'+id, this.options)
		.map((response: Response) => {
		return response.json().exercise;
		});
	}

	//Get the specific rehab plan
	getRehabilitationPlan(id) {
		this.options = this.authenticationService.createAuthenticationHeaders();
		return this.http.get(this.domain+'/RehabilitationPlans/'+id, this.options)
		.map((response: Response) => {
		return response.json().rehabilitationPlan;
		});
	}

	//Get the treatments
	getTreatments() {
		return this.http.get(this.domain+'/Treatments/')
		.map((response: Response) => {
		return response.json().treatment;
		});
	}

	//Get a single patients profile
	getPatientProfile(id) {
			this.options = this.authenticationService.createAuthenticationHeaders();
			console.log("Options" + JSON.stringify(this.options));
			return this.http.get(this.domain+'/PatientProfiles/ActiveProfile', this.options)
			.map((response: Response) => {
				console.log("Patient profile" + response.json());
			return response.json().patientProfile;
		});
	}

}
