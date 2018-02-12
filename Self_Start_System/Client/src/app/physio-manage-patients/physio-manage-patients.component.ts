import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-physio-manage-patients',
  templateUrl: './physio-manage-patients.component.html',
  styleUrls: ['./physio-manage-patients.component.scss']
})
export class PhysioManagePatientsComponent implements OnInit {

  displayedColumns = ['givenName', 'name', 'email', 'phone', 'maritalStatus'];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;

  getPatients = () => {
    fetch(
      environment.apiURL + 'PatientProfiles'
    ).then(
      resp => {
        return resp.json().then(
          json => {
            if (resp.ok){
              console.log(json.patientProfile);
              this.setUpDataSource(json.patientProfile);
            } else {
              return Promise.reject({
                status: resp.status,
                statusText: resp.statusText
              })
            }
          }
        );
      }
    ).catch(error => {
      console.log(error);
    });
  };

  setUpDataSource = patientProfile => {
    this.dataSource = new MatTableDataSource(patientProfile);
    this.dataSource.sort = this.sort;
  };

  selectRow = row => {
    console.log(row._id);
  };

  ngOnInit() {
    this.getPatients();
  }
}
