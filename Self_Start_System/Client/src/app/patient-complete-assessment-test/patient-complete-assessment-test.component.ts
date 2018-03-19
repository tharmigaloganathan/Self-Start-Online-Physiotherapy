import { Component, OnInit } from '@angular/core';
import { PatientCompleteAssessmentTestService } from "../patient-complete-assessment-test.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-complete-assessment-test',
  templateUrl: './patient-complete-assessment-test.component.html',
  styleUrls: ['./patient-complete-assessment-test.component.scss'],
	providers: [PatientCompleteAssessmentTestService],
})
export class PatientCompleteAssessmentTestComponent implements OnInit {

	router;
	assessmentTestService;
	assessmentTest_id;
	assessmentTest = {};
	form_id;
	form = {};
	question_id = [];
	questions = [];
	answers = [];
	testResults = [];
	dateCompleted = new Date();
	loading = false;
	rehabilitationPlan =[];
	newAssessmentTest_id;

  constructor(assessmentTestService: PatientCompleteAssessmentTestService, router: Router) {
		this.router = router;
		this.assessmentTestService = assessmentTestService;
	}
  //
  ngOnInit() {
		// this.assessmentTest = JSON.parse(localStorage.getItem('assessmentTest'));
		// this.assessmentTest_id = this.assessmentTest._id;
		// this.form_id = this.assessmentTest.form;
		// this.getForm();
		// this.rehabilitationPlan = JSON.parse(localStorage.getItem('rehabPlan'));
  }
  //
	// //Gets the specific assessment test
	// getAssessmentTest() {
	// 	this.assessmentTest = localStorage.getItem('assessmentTest');
	// 	this.assessmentTest_id = this.assessmentTest._id;
	// 	this.assessmentTestService.getAssessmentTest(this.assessmentTest_id).
	// 	subscribe(
	// 		data => {
	// 			this.assessmentTest = data;
	// 			this.form_id = this.assessmentTest.form;
	// 			console.log("This is the form id: " + this.form_id);
	// 			console.log("This is what was returned" + JSON.stringify(data));
	// 			this.getForm();
	// 		},
	// 		error => {
	// 			console.log("Error");
	// 		});
	// }
  //
	// //Get the assessment test form
	// getForm() {
	// 	console.log("Form id: " + this.form_id);
	// 	this.assessmentTestService.getForm(this.form_id).
	// 	subscribe(
	// 		data => {
	// 			this.form = data;
	// 			this.question_id = this.form.questions;
	// 			this.getQuestions();
	// 			console.log("Questions:" + this.question_id);
	// 			console.log("This is what was returned for the form" + JSON.stringify(data));
	// 		},
	// 		error => {
	// 			console.log("Error");
	// 		});
	// }
  //
	// //Get the questions
	// getQuestions() {
	// 	for(var i = 0; i<this.question_id.length; i++) {
	// 		this.assessmentTestService.getQuestion(this.question_id[i]).
	// 		subscribe(
	// 			data => {
	// 				this.questions.push(data);
	// 				console.log("Questions:" + JSON.stringify(this.questions[i]));
	// 				console.log("This is what was returned for the question" + JSON.stringify(data));
	// 			},
	// 			error => {
	// 				console.log("Error");
	// 			});
	// 		}
	// 	}
  //
	// 	//Update the assessment test information
	// 	updateAssessmentTest() {
	// 		const data = {
	// 			//_id: this.assessmentTest_id,
	// 			name: this.assessmentTest.name,
	// 			authorName: this.assessmentTest.authorName,
	// 			description: this.assessmentTest.description,
	// 			recommendations: this.assessmentTest.recommendations,
	// 			form: this.form_id,
	// 			testResults: this.testResults,
	// 			openDate: this.assessmentTest.openDate,
	// 			dateCompleted: this.dateCompleted,
	// 		}
	// 		console.log("This is the data being sent for assessment test: " + JSON.stringify(data));
	// 		this.assessmentTestService.completeAssessmentTest(data).
	// 		subscribe(
	// 			data => {
	// 				console.log("Update Assessment Test: " + JSON.stringify(data));
	// 				this.newAssessmentTest_id = data._id;
	// 				console.log("New assessment test id" + this.newAssessmentTest_id);
	// 				this.removeOldTest();
  //
	// 			},
	// 			error => {
	// 				console.log("Error");
	// 			});
	// 	}
  //
	// 	//Popultate the test results object
	// 	populateTestResults() {
	// 		for(var i = 0; i<this.question_id.length; i++) {
	// 			const result = {
	// 				question: this.questions[i].questionText,
	// 				answer: this.answers[i],
	// 				assessmentTest: this.assessmentTest_id
	// 			}
	// 			console.log("This is the data being sent: " + JSON.stringify(result));
	// 			this.assessmentTestService.addTestResult(result).
	// 			subscribe(
	// 				data => {
	// 					this.testResults.push(data);
	// 					console.log("Test results: " + this.testResults);
	// 					this.updateAssessmentTest();
	// 				},
	// 				error => {
	// 					console.log("Error");
	// 				});
	// 		}
	// 	}
  //
	// 	//Submit assessment test
	// 	submit() {
	// 		//this.loading = true;
	// 		this.populateTestResults();
	// 		this.router.navigate[('/patient/home')];
	// 	}
  //
	// 	//Route back to the user rehab plans page
	// 	back() {
	// 		this.router.navigate(['/patient/rehabilitation-plans']);
	// 	}
  //
	// 	//Update rehabPlan
	// 	updateRehabPlan() {
	// 		this.assessmentTestService.updateRehabPlan(this.rehabilitationPlan._id, this.rehabilitationPlan).
	// 		subscribe(
	// 			data => {
	// 				console.log("New rehab plan: " + data);
	// 			},
	// 			error => {
	// 				console.log("Error");
	// 			});
	// 	}
  //
	// 	//Remove old test from rehab plan
	// 	removeOldTest() {
	// 		var index = this.rehabilitationPlan.assessmentTests.indexOf(this.assessmentTest_id);
	// 		if(index > -1) {
	// 			this.rehabilitationPlan.assessmentTests.splice(index, 1);
	// 		}
	// 		this.rehabilitationPlan.assessmentTests.push(this.newAssessmentTest_id);
	// 		this.updateRehabPlan();
	// 	}
}
