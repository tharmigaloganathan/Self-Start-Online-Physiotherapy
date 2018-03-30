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
import {forkJoin} from "rxjs/observable/forkJoin";


@Injectable()
export class AuthenticationService {
  domain = environment.apiURL;
  authToken;
  options;
  patientReturn;
  physioReturn;
  adminReturn;
  activeUser;

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

  logout(){
    this.authToken = null;
    localStorage.clear();
    console.log("End of logout() in AuthService. Successfully logged out!");
  }

  loggedIn(){
    return tokenNotExpired();
  }
  storeUserData(token){
    localStorage.setItem('token', token);
    //localStorage.setItem('userAccount', JSON.stringify(userAccount))
    this.authToken = token;
  }

  getProfile() {
    this.options = this.createAuthenticationHeaders();
    this.patientReturn= this.http.get(this.domain + '/PatientProfiles/ActiveProfile', this.options).map(res => {return  res.json()});
    this.physioReturn = this.http.get(this.domain + '/Physiotherapists/ActiveProfile', this.options).map(res => {return res.json()});
    this.adminReturn = this.http.get(this.domain + '/Administrators/ActiveProfile', this.options).map(res => {return res.json()});
    return forkJoin([this.patientReturn,this.physioReturn,this.adminReturn]);
  }

  getActiveUser(){
    return this.activeUser;
  }
  setActiveUser(user){
    this.activeUser = user;
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
    return this.options;
  }

  loadToken(){
    this.authToken = localStorage.getItem('token');
    console.log("here is the retrieved token from localstorage: ", this.authToken);

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
