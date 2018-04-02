import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class LocationsService {
  private baseURL = 'http://localhost:3700/';
  options;

  constructor(private authenticationService: AuthenticationService, private http: Http) { }

  //Function to get all patients
  getCountries() {
    this.options = this.authenticationService.createAuthenticationHeaders();
    return this.http.get(this.baseURL + 'Countries/', this.options)
      .map((response: Response) => {
        console.log(response);
        return response.json();
      });
  }

  //Function to get all patients
  getProvinces(countryID) {
    this.options = this.authenticationService.createAuthenticationHeaders();
    return this.http.get(this.baseURL + 'Provinces/country/' + countryID, this.options)
      .map((response: Response) => {
        console.log(response);
        return response.json();
      });
  }

  deleteCountry(countryID){
    return this.http.delete(this.baseURL + 'Countries/' + countryID)
      .map((response: Response) => {
        console.log(response);
        return response.json();
      });
  }

  deleteProvince(provinceID){
    return this.http.delete(this.baseURL + 'Provinces/' + provinceID)
      .map((response: Response) => {
        console.log(response);
        return response.json();
      });
  }

  addCountry(country) {
    let bodyString = JSON.stringify(country);
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option
    console.log('JSON body: ', bodyString);
    // ...using post request
    return this.http.post(this.baseURL + 'Countries', bodyString, options)
    // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  addProvince(province) {
    let bodyString = JSON.stringify(province);
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option
    console.log('JSON body: ', bodyString);
    // ...using post request
    return this.http.post(this.baseURL + 'Provinces', bodyString, options)
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

}
