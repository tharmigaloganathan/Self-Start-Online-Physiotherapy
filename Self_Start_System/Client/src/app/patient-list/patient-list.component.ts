import { Component, OnInit, ViewChild } from '@angular/core';
import { ManagePatientProfileService } from '../manage-patient-profile.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ExerciseService} from "../services/exercise.service";


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

  displayedColumns = ['givenName', 'familyName', 'email', 'phone', 'maritalStatus'];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;

	constructor(private exerciseService :ExerciseService, patientProfileService: ManagePatientProfileService, router: Router) {
	  this.patientProfileService = patientProfileService;
	  this.router = router;
	}

  setUpDataSource = patientProfile => {
    this.dataSource = new MatTableDataSource(patientProfile);
    this.dataSource.sort = this.sort;
  };

  ngOnInit() {
    this.exerciseService.getAllPatients().subscribe(
      data => {
        this.setUpDataSource(data.patientProfile);
      },
      error => console.log(error)
    );
  }

  selectRow = row => {
    console.log(row);
    this.patientProfileService.setSelectedPatient(row);
    this.router.navigate(['/physio/patients/'+ row.givenName + row.familyName]);
  };
}
