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
	assessmentTest;
	form;
	questions = [];
	answers = [];
	testResults = [];
	dateCompleted = new Date();
	rehabilitationPlan;
	newAssessmentTest_id;

  constructor(assessmentTestService: PatientCompleteAssessmentTestService, router: Router) {
		this.router = router;
		this.assessmentTestService = assessmentTestService;
	}

  ngOnInit() {
		this.assessmentTest = JSON.parse(localStorage.getItem('assessmentTest'));
		console.log(this.assessmentTest);
		console.log("Form id" + this.assessmentTest.form);
		this.rehabilitationPlan = JSON.parse(localStorage.getItem('rehabPlan'));
		//console.log(this.rehabilitationPlan);
		this.getForm();
	}

	// //Get the assessment test form
	getForm() {
		this.assessmentTestService.getForm(this.assessmentTest.form).
	 	subscribe(
	 		data => {
	 			this.form = data;
				console.log("This is what was returned for the form" + JSON.stringify(data));
				this.getQuestions();
	 		},
	 		error => {
	 			console.log("Error");
	 		});
	 }

	//Get the questions
	getQuestions() {
 		for(var i = 0; i<this.form.questions.length; i++) {
	 		this.assessmentTestService.getQuestion(this.form.questions[i]).
	 		subscribe(
	 			data => {
	 				this.questions.push(data);
	 				console.log("This is what was returned for the question" + JSON.stringify(data));
	 			},
	 			error => {
	 				console.log("Error");
	 			});
 			}
	 	}

	 	//Update the assessment test information
	 	updateAssessmentTest() {
			console.log("Update assessment test has been called");
	 		const data = {
	 			name: this.assessmentTest.name,
	 			authorName: this.assessmentTest.authorName,
	 			description: this.assessmentTest.description,
	 			recommendations: this.assessmentTest.recommendations,
	 			form: this.assessmentTest.form,
	 			testResults: this.testResults,
	 			openDate: this.assessmentTest.openDate,
	 			dateCompleted: this.dateCompleted,
	 		}
	 		console.log("This is the data being sent for assessment test: " + JSON.stringify(data));
			/*
			this.assessmentTestService.completeAssessmentTest(data).
	 		subscribe(
	 			data => {
	 				console.log("Update Assessment Test: " + JSON.stringify(data));
	 				this.newAssessmentTest_id = data._id;
	 				console.log("New assessment test id" + this.newAssessmentTest_id);
	 				this.removeOldTest();
	 			},
	 			error => {
	 				console.log("Error");
	 			});
				*/
				this.assessmentTestService.updateAssessmentTest(this.assessmentTest._id, data).
				subscribe(
					data => {
						console.log("This was saved", data);
						
					},
					error => {
						console.log("Error");
					});
	 	}

	 	//Popultate the test results object
	 	populateTestResults() {
	 		for(var i = 0; i<this.questions.length; i++) {
	 			const result = {
	 				question: this.questions[i].questionText,
	 				answer: this.answers[i],
	 				assessmentTest: this.assessmentTest._id
	 			}
	 			console.log("This is the data being sent: " + JSON.stringify(result));
	 			this.assessmentTestService.addTestResult(result).
	 			subscribe(
	 				data => {
	 					this.testResults.push(data);
	 					console.log("Test results: " + this.testResults);
						//Only update in after the last test result
						console.log("Test results "+ this.testResults.length + "questions " + this.questions.length);
						if(this.testResults.length  == this.questions.length) {
							this.updateAssessmentTest();
						}
	 				},
	 				error => {
	 					console.log("Error");
	 				});
	 		}
	 	}

	 	//Submit assessment test
	 	submit() {
	 		this.populateTestResults();
			this.router.navigate(['/patient/rehabilitation-plans']);
	 	}

	 	//Route back to the user rehab plans page
	 	back() {
	 		this.router.navigate(['/patient/rehabilitation-plans']);
	 	}

 	//Update rehabPlan
	 	updateRehabPlan() {
	 		this.assessmentTestService.updateRehabPlan(this.rehabilitationPlan._id, this.rehabilitationPlan).
	 		subscribe(
	 			data => {
	 				console.log("New rehab plan: " + JSON.stringify(data));
	 			},
	 			error => {
	 				console.log("Error");
	 			});
	 	}

	 	//Remove old test from rehab plan
	 	removeOldTest() {
	 		var index = this.rehabilitationPlan.assessmentTests.indexOf(this.assessmentTest._id);
	 		if(index > -1) {
	 			this.rehabilitationPlan.assessmentTests.splice(index, 1);
	 		}
	 		this.rehabilitationPlan.assessmentTests.push(this.newAssessmentTest_id);
	 		this.updateRehabPlan();
	 	}

}
