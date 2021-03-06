import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class ManagePatientProfileService {
  private baseURL = 'http://localhost:3700/';
  options;

	constructor(private authenticationService: AuthenticationService, private http: Http) {}

  	//Function to get all patients
	getPatients() {
    this.options = this.authenticationService.createAuthenticationHeaders();
    return this.http.get(this.baseURL + 'PatientProfiles/', this.options)
  		.map((response: Response) => {
	 	return response.json().patientProfile;
  		});
	}

  // Function to get all patients
  getPatient(patientID) {
	  this.options = this.authenticationService.createAuthenticationHeaders();
    return this.http.get(this.baseURL + 'PatientProfiles/' + patientID, this.options)
      .map((response: Response) => {
        return response.json().patientProfile;
      });
  }

  addTreatment(rehabPlan) {
    let bodyString = JSON.stringify(rehabPlan);
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option
    console.log('JSON body: ', bodyString);
    // ...using post request
    return this.http.post(this.baseURL + 'Treatments', bodyString, options)
    // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPatientsWithoutTreatments() {
      // let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      // let options       = new RequestOptions({ headers: headers }); // Create a request option
      this.options = this.authenticationService.createAuthenticationHeaders();
      let URL = this.baseURL + "PatientProfiles/without-physio";
      return this.http.get(URL, this.options)
      // ...and calling .json() on the response to return data
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }


  updatePatient(body: Object, id: string) {
    let bodyString = JSON.stringify(body); //Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option
    this.options = this.authenticationService.createAuthenticationHeaders();
    let Url = this.baseURL + "PatientProfiles/" + id;
    console.log("JSON body: ", bodyString);
    console.log("URL", Url, id);

    // ...using post request
    return this.http.put(Url, bodyString, this.options)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      //...errors if any
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateTreatment(body: Object, id: string) {
    let bodyString = JSON.stringify(body); //Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option
    let Url = this.baseURL + "Treatments/" + id;
    console.log("JSON body: ", bodyString);
    console.log("URL", Url, id);

    // ...using post request
    return this.http.put(Url, bodyString, options)
    // ...and calling .json() on the response to return data
      .map((res:Response) => res.json())
      //...errors if any
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

	//Function to set the selected patient
	setSelectedPatient(patient: any) {
		//Temporay fix to pass selected patient
		localStorage.setItem('selectedPatient', JSON.stringify(patient));
	}

  getTreatments() {
      return this.http.get(this.baseURL + 'Treatments')
      // ...and calling .json() on the response to return data
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getAllPayments(patientProfileID){
    this.options = this.authenticationService.createAuthenticationHeaders();

    let body = {
      patientProfileID:patientProfileID
    };

    return this.http.put(this.baseURL + 'Payments/get-payment-by-patient-id', body, this.options)
    // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
