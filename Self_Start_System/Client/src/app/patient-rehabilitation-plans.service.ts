import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from './../environments/environment';

@Injectable()
export class PatientRehabilitationPlansService {

	domain = environment.apiURL;

  constructor(private http: Http) {}

	//Get the specified assessment tests
	getAssessmentTest(id) {
		return this.http.get(this.domain+'/AssessmentTests/'+id)
		.map((response: Response) => {
		return response.json().assessmentTest;
<<<<<<< HEAD
		});
=======
    });
>>>>>>> c19f2024da392429d32ccb4f886ed5a1983b7913
	}

	//Get the specific exercise
	getExercise(id) {
		return this.http.get(this.domain+'/Exercises/')
		.map((response: Response) => {
		return response.json().exercise;
		});
	}

	//Get the specific rehab plan
	getRehabilitationPlan(id) {
		return this.http.get(this.domain+'/RehabilitationPlans/'+id)
		.map((response: Response) => {
		return response.json().rehabilitationPlan;
		});
	}

	//Get the treatments
	getTreatments() {
		return this.http.get(this.domain+'/Treatments/')
		.map((response: Response) => {
		return response.json().treatment;
<<<<<<< HEAD
	});
=======
		});
>>>>>>> c19f2024da392429d32ccb4f886ed5a1983b7913
	}

}
