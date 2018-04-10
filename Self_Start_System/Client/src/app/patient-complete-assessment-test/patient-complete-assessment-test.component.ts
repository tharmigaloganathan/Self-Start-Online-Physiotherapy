import {Component, OnInit, Output, EventEmitter, ViewContainerRef} from '@angular/core';
import { PatientCompleteAssessmentTestService } from "../patient-complete-assessment-test.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../environments/environment';
import {ToastsManager} from "ng2-toastr";

const URL = environment.apiURL + '/Photos';

@Component({
  selector: 'app-patient-complete-assessment-test',
  templateUrl: './patient-complete-assessment-test.component.html',
  styleUrls: ['./patient-complete-assessment-test.component.scss'],
	providers: [PatientCompleteAssessmentTestService],
})
export class PatientCompleteAssessmentTestComponent implements OnInit {

	isDataLoaded;
	loading;
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

	//Brians image uploader
	public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
	@Output() uploadedURL: EventEmitter<any>;

  constructor(assessmentTestService: PatientCompleteAssessmentTestService,
							router: Router,
							public toastr : ToastsManager,
              public vcr: ViewContainerRef) {
		this.router = router;
		this.assessmentTestService = assessmentTestService;
		this.isDataLoaded = false;
		this.loading = true;
		this.uploadedURL = new EventEmitter<any>();
		this.toastr.setRootViewContainerRef(vcr);
	}

  ngOnInit() {
		this.assessmentTest = JSON.parse(localStorage.getItem('assessmentTest'));
		console.log(this.assessmentTest);
		console.log("Form id" + this.assessmentTest.form);
		this.rehabilitationPlan = JSON.parse(localStorage.getItem('rehabPlan'));
		//console.log(this.rehabilitationPlan);
		this.getForm();

		//Image Uploader from Brians Component
		//override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
		this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
		//overide the onCompleteItem property of the uploader so we are
		//able to deal with the server response.
		this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
			let responseObj = JSON.parse(response);
			if (responseObj.success){
				// Open toast to show success
				this.toastr.success("Upload completed!","Success!");
			} else {
				// Open toast to show failure
				this.toastr.error('Image upload failed', 'Failed!');
			}
			console.log("ImageUpload:uploaded:", item, status, responseObj);
			console.log("ImageUpload:uploaded: response", response, responseObj.file);
			this.uploadedURL.emit(responseObj);
		};

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
					this.isDataLoaded = true;
					this.loading = false;
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
			this.assessmentTestService.updateAssessmentTest(this.assessmentTest._id, data).
			subscribe(
				data => {
					console.log("The rehab plan", this.rehabilitationPlan);
					console.log("This was saved", data);
					this.loading = true;
					this.toastr.success("Assessment Test Completed!","Success!");
					//	.then((toast: Toast) => {
								setTimeout(() => {
										//this.toastr.dismissToast(toast);
										this.loading = false;
								}, 1000);
					//	});
				},
				error => {
					console.log("Error");
					this.loading = true;
					this.toastr.error("Opps something went wrong!","Failure!");
					//.then((toast: Toast) => {
							setTimeout(() => {
									//this.toastr.dismissToast(toast);
									this.loading = false;
							}, 1000);
					//});
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
	 			console.log("This is the data being sent: ", result);
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

		//Function to get the file
		onImageUpload(event, i){
			console.log(event.file);
			console.log(i);
			console.log(this.answers);
			this.answers[i] = environment.apiURLForUploadingPictures + event.file;
		}
}
