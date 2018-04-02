import { Component, OnInit } from '@angular/core';
import { LocationsService} from "../locations.service";

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

  constructor(private locationsService: LocationsService) { }

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
      },
      error => console.log(error)
    );
  }


  deleteCountry(countryID){
    this.locationsService.deleteCountry(countryID).subscribe(
      data => {
        console.log(data);
        this.getCountries();
        this.selectedCountry=null;
      },
      error => console.log(error)
    );
  }

  deleteProvince(provinceID){
    this.locationsService.deleteProvince(provinceID).subscribe(
      data => {
        console.log(data);
        if(this.selectedCountry){
          this.getProvinces(this.selectedCountry);
          this.selectedProvince=null;
        }
      },
      error => console.log(error)
    );
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
        },
        error => console.log(error)
      );
    }
  }

  addProvince(){
    if(this.newProvinceName && this.selectedCountry){
      let newProvince = {
        name: this.newProvinceName,
        country: this.selectedCountry,
        patientProfiles: [],
        cities: []
      };
      this.locationsService.addProvince(newProvince).subscribe(
        data => {
          console.log(data);
          if(this.selectedCountry){
            this.getProvinces(this.selectedCountry);
          }
        },
        error => console.log(error)
      );
    }
  }


}
