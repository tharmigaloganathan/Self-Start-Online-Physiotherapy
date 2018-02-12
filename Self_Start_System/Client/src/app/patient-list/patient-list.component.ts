import { Component, OnInit } from '@angular/core';
import { ManagePatientProfileService } from '../manage-patient-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
  providers: [ManagePatientProfileService],
})
export class PatientListComponent implements OnInit {
	router;
	patientProfileService;
	patientList = {};
	selectedPatient;

	constructor(patientProfileService: ManagePatientProfileService, router: Router) {
  	  this.patientProfileService = patientProfileService;
	  this.router = router;
    }

	ngOnInit() {
  	  this.getPatientList();
	  f.form.disable();
    }

    //Get all patients
    getPatientList() {
  	this.patientProfileService.getPatients()
  	.subscribe(
  		data => {
  			console.log(data)
  			this.patientList = data;
  		},
  		error => {
  		});
    }

	//View the selected patients profile
	viewProfile(i) {
		console.log(this.patientList[i]));
		this.patientProfileService.setSelectedPatient(this.patientList[i]);
		//this.selectedPatient = this.patientList[i]);
		this.router.navigate(['/dashboard/manage-patient-profile']);
	}

}
