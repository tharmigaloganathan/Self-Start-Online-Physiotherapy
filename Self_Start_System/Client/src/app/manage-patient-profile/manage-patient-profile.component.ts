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
	_id;
	givenName;
	familyName;
	email;
	gender;
	DOB;
	Street;
	City;
	postalCode;
	Province;
	phone;
	healthCardNumber;
	maritalStatus;
	occupation;
	patientProfileService;
	patient;

  	constructor(patientProfileService: ManagePatientProfileService) {
	 	this.patientProfileService = patientProfileService;
  }

  	ngOnInit() {
		//this.patientProfileService.selectedPatient.subscribe(
			//data=> this.patient = JSON.stringify(data);
			//console.log("Patient data: " + JSON.stringify(this.patient));
		//)
		//Load the patient
		this.patient = JSON.parse(localStorage.getItem('selectedPatient'));
		console.log(this.patient);
  	}

}
