import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import {Headers, Http, BaseRequestOptions, Response, RequestOptions} from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { AuthHttp } from "angular2-jwt";
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';



@Injectable()
export class AuthenticationService {
  domain = environment.apiURL;
  authToken;
  activeUser;
  options;

  constructor(
    private http: Http,
  ) { }

  login(user) {
    console.log("inside auth service, service received: ", user);
    return this.http.post(this.domain+'/UserAccounts/login', user)
      .map((response: Response) => {
        return response.json();
      });

  }

  storeUserData(token, userAccount){
    localStorage.setItem('token', token);
    localStorage.setItem('userAccount', JSON.stringify(userAccount))
    this.authToken = token;
    this.activeUser = userAccount;
  }

  getProfile(){
    this.createAuthenticationHeaders();

    console.log("this.options: ", this.options)

    var retrievedAccount = localStorage.getItem("userAccount");

    console.log(JSON.parse(retrievedAccount).patientProfile);

    if(JSON.parse(retrievedAccount).patientProfile){
      return this.http.get(this.domain + '/PatientProfiles/'+ JSON.parse(retrievedAccount).patientProfile, this.options).map(res => res.json());
    } else if (JSON.parse(retrievedAccount).physiotherapist){
      return this.http.get(this.domain +'/Physiotherapists/' + JSON.parse(retrievedAccount).physiotherapist, this.options).map(res=> res.json());
    } else if (JSON.parse(retrievedAccount).administrator){
      return this.http.get(this.domain +'/Administrators/' + JSON.parse(retrievedAccount).administrator, this.options).map(res=> res.json());
    }

  }

  createAuthenticationHeaders() {
    this.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authToken // Attach token
      })
    });
  }

  loadToken(){
    this.authToken = localStorage.getItem('token');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };
}
