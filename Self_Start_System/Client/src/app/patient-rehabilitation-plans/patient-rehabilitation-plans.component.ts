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
	viewExerciseDetails = 0;
	showAssessmentTest = 0;
	account: any;
	data = ["5a817b6d734d1d0d42ea62c6"];
	treatments = [];
	rehabilitationPlans = [];
	exercises = [];
	assessmentTests = [];
	selected: any;
	activeExercise;

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
		this.showAssessmentTest = 0;
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
		for(var i=0; i<this.selected.exercises.length; i++) {
			this.rehabilitationPlansService.getExercise(this.selected.exercises[i]).
			subscribe(
				data => {
					console.log("Exercise: " + JSON.stringify(data));
					this.exercises.push(data);
					console.log(this.exercises);
					this.showAssessmentTest = 0;
					this.showDetails = 0;
					this.showExercises = 1;
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
					this.showAssessmentTest = 1;
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

	//Route to complete assessment test component
	viewAssessmentTest(index) {
			console.log("View Assessment test pressed " + index);
			 var test = JSON.stringify(this.assessmentTests[index]);
			 var plan = JSON.stringify(this.selected);
			console.log("Putting this in local storage" + test);
			localStorage.setItem('assessmentTest', test);
			console.log("Putting this in local storage for rehab plan" + test);
			localStorage.setItem('rehabPlan', plan )
			this.router.navigate(['/patient/assessment-test']);
	}

	//Show the exercise details
	showExerciseDetails(index) {
		this.viewExerciseDetails = 1;
		this.showAssessmentTest = 0;
		this.showDetails = 0;
		this.showExercises = 0;
		console.log("Show exercise clicked" + index);
		console.log(this.exercises[index][index]);
		this.activeExercise = this.exercises[index][index];
	}

	//Show exercise list
	showExerciseList() {
		this.viewExerciseDetails = 0;
		this.showAssessmentTest = 0;
		this.showDetails = 0;
		this.showExercises = 1;
	}

}
