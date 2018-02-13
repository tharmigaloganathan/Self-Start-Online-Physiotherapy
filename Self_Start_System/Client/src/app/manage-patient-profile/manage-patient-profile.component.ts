import { Component, OnInit } from '@angular/core';
import { ManagePatientProfileService } from '../manage-patient-profile.service';
import { PatientListComponent } from '../patient-list/patient-list.component';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-manage-patient-profile',
  templateUrl: './manage-patient-profile.component.html',
  styleUrls: ['./manage-patient-profile.component.scss'],
  providers: [ManagePatientProfileService],
})
export class ManagePatientProfileComponent implements OnInit {
	patientProfileService;
	patient;
	isChanged = false;

  	constructor(patientProfileService: ManagePatientProfileService) {
	 	this.patientProfileService = patientProfileService;
  }

  	ngOnInit() {
		//Load the patient
		this.patient = JSON.parse(localStorage.getItem('selectedPatient'));
		console.log(this.patient);
  	}

	editPatientInfo() {
		this.isChanged = true;
	}

	savePatientInfo() {
		this.isChanged = false;
	}

	cancelEdit() {
		//Reset patient information
		this.patient = JSON.parse(localStorage.getItem('selectedPatient'));
		this.isChanged = false;
	}

}
