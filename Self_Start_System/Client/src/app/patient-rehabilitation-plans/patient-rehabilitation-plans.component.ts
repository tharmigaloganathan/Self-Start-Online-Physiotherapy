import { Component, OnInit } from '@angular/core';
import { PatientRehabilitationPlansService } from '../patient-rehabilitation-plans.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-rehabilitation-plans',
  templateUrl: './patient-rehabilitation-plans.component.html',
  styleUrls: ['./patient-rehabilitation-plans.component.scss'],
	providers: [PatientRehabilitationPlansService]
})
export class PatientRehabilitationPlansComponent implements OnInit {

	router;
	rehabilitationPlansService;
	showDetails = 1;
	showExercises = 0;
	showAssessmentTest = 0;
	account = [];
	data = ["5a817b6d734d1d0d42ea62c6"];
	treatments = [];
	rehabilitationPlans = [];
	exercises = [];
	assessmentTests = [];
	selected = [];

  constructor(rehabilitationPlansService: PatientRehabilitationPlansService, router: Router) {
		this.router = router;
		this.rehabilitationPlansService = rehabilitationPlansService;
	}

  ngOnInit() {
		this.account = localStorage.getItem("userAccount");
		//this.getTreatments();
		this.getRehabilitationPlans();
  }

	//Show the plan details
	viewPlanDetails() {
	this.showAssessmentTests = 0;
	this.showDetails = 1;
	this.showExercises = 0;
	}

	//Get rehabilitation plans
	getRehabilitationPlans(){
		for(var i=0; i<this.data.length; i++) {
			this.rehabilitationPlansService.getRehabilitationPlan(this.data[i]).
			subscribe(
				data => {
					console.log("Rehab Plan: " + JSON.stringify(data));
					this.rehabilitationPlans.push(data);
					this.selected = this.rehabilitationPlans[0];
					console.log("This is the selected plan"+ this.selected);
				},
				error => {
					console.log("Error");
				});
		}
	}

	//Get exercises
	getExercises() {
		console.log(:"Get exercises clicked");
		console.log(this.selected.exercises);
		console.log(this.selected.exercises.length);
		for(var i=0; i<this.selected.exercises.length; i++) {
			this.rehabilitationPlansService.getExercise(this.selected.exercises[i]).
			subscribe(
				data => {
					console.log("Exercise: " + JSON.stringify(data));
					this.exercises.push(data);
					console.log(this.exercises);
				},
				error => {
					console.log("Error");
				});
		}
	}

	//Get assessment tests
	getAssessmentTests() {
		for(var i=0; i<this.selected.assessmentTests.length; i++) {
			this.rehabilitationPlansService.getAssessmentTest(this.selected.assessmentTests[i]).
			subscribe(
				data => {
					console.log("Assessment test: " + JSON.stringify(data));
					this.assessmentTests.push(data);
					console.log(this.assessmentTests);
					this.showAssessmentTests = 1;
					this.showDetails = 0;
					this.showExercises = 0;
				},
				error => {
					console.log("Error");
				});
		}
	}

	//Get Treatments
	getTreatments(){
		this.rehabilitationPlansService.getTreatments().
		subscribe(
			data => {
				console.log("Treatments: " + JSON.stringify(data));
				this.data = data;
			},
			error => {
				console.log("Error");
			});
	}

	viewAssessmentTest(index) {
			console.log("View Assessment test pressed " + index);
			 var test = JSON.stringify(this.assessmentTests[index]);
			console.log("Putting this in local storage" + test);
			localStorage.setItem('assessmentTest', test);
			this.router.navigate(['/patient/assessment-test']);
	}

}
