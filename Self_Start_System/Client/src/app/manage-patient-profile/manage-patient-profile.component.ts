import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-patient-profile',
  templateUrl: './manage-patient-profile.component.html',
  styleUrls: ['./manage-patient-profile.component.scss']
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

  constructor() { }

  ngOnInit() {
  }

}
