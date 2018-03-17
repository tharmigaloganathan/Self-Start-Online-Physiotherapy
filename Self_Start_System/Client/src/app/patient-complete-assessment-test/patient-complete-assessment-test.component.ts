import { Component, OnInit } from '@angular/core';
import { PatientCompleteAssessmentTestService } from "../patient-complete-assessment-test.service";

@Component({
  selector: 'app-patient-complete-assessment-test',
  templateUrl: './patient-complete-assessment-test.component.html',
  styleUrls: ['./patient-complete-assessment-test.component.scss'],
	providers: [PatientCompleteAssessmentTestService],
})
export class PatientCompleteAssessmentTestComponent implements OnInit {

	assessmentTestService;
	assessmentTest_id = "5aab312320238f37441678a3";
	assessmentTest = {};
	form_id;
	form = {};
	questions = [];
	questionText = {};

  constructor(assessmentTestService: PatientCompleteAssessmentTestService) {
		this.assessmentTestService = assessmentTestService;
	}

  ngOnInit() {
		this.getAssessmentTest();
		console.log(this.assessmentTest);
  }

	//Gets the specific assessment test
	getAssessmentTest() {
		this.assessmentTestService.getAssessmentTest(this.assessmentTest_id).
		subscribe(
			data => {
				this.assessmentTest = data;
				this.form_id = this.assessmentTest.form;
				console.log("This is the form id: " + this.form_id);
				console.log("This is what was returned" + JSON.stringify(data));
				this.getForm();
			},
			error => {
				console.log("Error");
			});
	}

	//Get the assessment test form
	getForm() {
		console.log("Form id: " + this.form_id);
		this.assessmentTestService.getForm(this.form_id).
		subscribe(
			data => {
				this.form = data;
				this.questions = this.form.questions;
				this.getQuestions();
				console.log("Questions:" + this.questions);
				console.log("This is what was returned for the form" + JSON.stringify(data));
			},
			error => {
				console.log("Error");
			});
	}

	//Get the questions
	getQuestions() {
		for(var i = 0; i<this.questions.length; i++) {
			this.assessmentTestService.getQuestion(this.questions[i]).
			subscribe(
				data => {
					this.questions.push(i, data);
					console.log("Questions:" + JSON.stringify(this.questions[i]));
					console.log("This is what was returned for the question" + JSON.stringify(data));
				},
				error => {
					console.log("Error");
				});
		}
	}

}
