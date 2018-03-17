import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from './../environments/environment';

@Injectable()
export class PatientCompleteAssessmentTestService {

	domain = environment.apiURL;

  constructor(private http: Http) {}

	//Get the assessment test data
	getAssessmentTest(id) {
		return this.http.get(this.domain+'/AssessmentTests/'+id)
		.map((response: Response) => {
		return response.json().assessmentTest;
		});
	}

	//Get the form data
	getForm(id) {
		return this.http.get(this.domain+'/Forms/'+id)
		.map((response: Response) => {
		return response.json().form;
		});
	}

	//Ge the questions
	getQuestion(id) {
		return this.http.get(this.domain+'/Questions/'+id)
		.map((response: Response) => {
		return response.json().question;
		});
	}

}
