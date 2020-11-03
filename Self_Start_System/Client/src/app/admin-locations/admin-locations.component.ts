import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LocationsService} from "../locations.service";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {ConfirmDeleteDialogBoxComponent} from "../confirm-delete-dialog-box/confirm-delete-dialog-box.component";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-admin-locations',
  templateUrl: './admin-locations.component.html',
  styleUrls: ['./admin-locations.component.scss']
})
export class AdminLocationsComponent implements OnInit {

  allCountries: any[];
  allProvinces: any[];
  selectedCountry;
  selectedProvince;
  newCountryName;
  newProvinceName;
  editingCountry = false;
  editingProvince = false;
  editedCountryName;
  editedProvinceName;

  constructor(private locationsService: LocationsService,
              public toastr: ToastsManager,
              vcr: ViewContainerRef,
              public dialog: MatDialog) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getCountries();
    // this.getProvinces();
  }

  getCountries(){
    this.locationsService.getCountries().subscribe(
      data => {
        console.log(data);
        data.country.sort((a,b)=>{
          if(a.name.toUpperCase() < b.name.toUpperCase()){
            return -1;
          }
          if(a.name.toUpperCase() > b.name.toUpperCase()){
            return 1;
          }
          return 0;
        });
        this.allCountries = data.country;
        if(this.allCountries){
          this.selectedCountry = this.allCountries[0];
          this.getProvinces(this.selectedCountry._id);
        }
      },
      error => console.log(error)
    );
  }
  getProvinces(countryID){
    console.log(countryID);
    this.locationsService.getProvinces(countryID).subscribe(
      data => {
        console.log(data);
        data.province.sort((a,b)=>{
          if(a.name.toUpperCase() < b.name.toUpperCase()){
            return -1;
          }
          if(a.name.toUpperCase() > b.name.toUpperCase()){
            return 1;
          }
          return 0;
        });
        this.allProvinces = data.province;
        if(this.allProvinces){
          this.selectedProvince = this.allProvinces[0];
        }
      },
      error => console.log(error)
    );
  }


  deleteCountry(countryID){
    this.locationsService.deleteCountry(countryID).subscribe(
      data => {
        console.log(data);
        if(data.success){
          this.getCountries();
          this.toastr.warning(this.selectedCountry.name + " deleted!");
        }
      },
      error => console.log(error)
    );
  }

  deleteProvince(provinceID){
    this.locationsService.deleteProvince(provinceID).subscribe(
      data => {
        console.log(data);
        if(this.selectedCountry && data.success){
          this.toastr.warning(this.selectedProvince.name + " deleted!");
          this.getProvinces(this.selectedCountry._id);
          console.log(this.allProvinces.length);
        }
      },
      error => console.log(error)
    );
  }

  //Used when deleting the countries
  openCountryDialog(): void {
    let dialogRef = this.dialog.open(ConfirmDeleteDialogBoxComponent, {
      width: '250px',
      data: { }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteCountry(this.selectedCountry._id);
      }
    });
  }

  //Used when deleting the countries
  openProvinceDialog(): void {
    let dialogRef = this.dialog.open(ConfirmDeleteDialogBoxComponent, {
      width: '250px',
      data: { }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(this.selectedProvince);
        this.deleteProvince(this.selectedProvince._id);
      }
    });
  }

  addCountry(){
    if(this.newCountryName){
      console.log(this.newCountryName);
      let newCountry = {
        name: this.newCountryName,
        patientProfiles: [],
        provinces: []
      };
      console.log(newCountry);
      this.locationsService.addCountry(newCountry).subscribe(
        data => {
          this.getCountries();
          this.toastr.success(this.newCountryName+ " added!");
          this.newCountryName ="";
        },
        error => console.log(error)
      );
    }
  }

  addProvince(){
    if(this.newProvinceName && this.selectedCountry){
      let newProvince = {
        name: this.newProvinceName,
        country: this.selectedCountry._id,
        patientProfiles: [],
        cities: []
      };
      this.locationsService.addProvince(newProvince).subscribe(
        data => {
          console.log(data);
          if(this.selectedCountry){
            this.getProvinces(this.selectedCountry._id);
            this.toastr.success(this.newProvinceName + " added!");
            this.newProvinceName ="";
          }
        },
        error => console.log(error)
      );
    }
  }

  editCountry(){
    if(this.selectedCountry){
      this.editingCountry=true;
    }
  }
  editProvince(){
    if(this.selectedProvince){
      this.editingProvince=true;
    }
  }

  cancelCountryEdit(){
    this.editingCountry = false;
    this.editedCountryName="";
  }
  cancelProvinceEdit(){
    this.editingProvince = false;
    this.editedProvinceName="";
  }

  changeCountry(){
    if(this.selectedCountry && this.editedCountryName){
      this.selectedCountry.name = this.editedCountryName;
      this.locationsService.updateCountry(this.selectedCountry).subscribe(
        data => {
          console.log(data);
          this.getCountries();
          this.toastr.success("Changed name to " + this.editedCountryName + "!");
          this.editedCountryName ="";
        },
        error => console.log(error)
      );
    }
  }
  changeProvince(){
    if(this.selectedCountry && this.selectedProvince && this.editedProvinceName){
      this.selectedProvince.name = this.editedProvinceName;
      this.locationsService.updateProvince(this.selectedProvince).subscribe(
        data => {
          console.log(data);
          if(this.selectedCountry){
            this.getProvinces(this.selectedCountry._id);
            this.toastr.success("Changed name to " + this.editedProvinceName + "!");
            this.editedProvinceName ="";
          }
        },
        error => console.log(error)
      );
    }
  }
}
