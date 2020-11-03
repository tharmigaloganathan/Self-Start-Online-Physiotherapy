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
import * as jwt_decode from 'jwt-decode';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthenticationService {
  domain = environment.apiURL;
  authToken;
  options;
  patientReturn;
  physioReturn;
  adminReturn;
  activeUser;
  activeProfile;
  activeProfileType;
  clickedNavLogin = true;

  profileOb$: Observable<any>;
  private profileSubject: Subject<any>;
  loginOb$ : Observable<any>;
  private loginSubject : Subject<any>;

  constructor(
    private http: Http,
  ) {
    this.profileSubject = new Subject<any>();
    this.profileOb$ = this.profileSubject.asObservable();

    this.loginSubject = new Subject<any>();
    this.loginOb$ =  this.loginSubject.asObservable();
  }

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
    this.activeProfile = null;
    this.activeProfileType = null;
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

  getUserAccount(){
    this.options = this.createAuthenticationHeaders();
    console.log("in auth service getActiveUser", this.options);
    return this.http.get(this.domain + '/UserAccounts/activeUser/editProfile', this.options).map(res=>{
      console.log(res.json());
      return res.json().userAccount;
    });
  }

  getActiveProfile(){
    return this.activeProfile;
  }

  setActiveProfile(profile){
    this.activeProfile = profile;
    console.log("auth service set activeProfile is: ", this.activeProfile);
    this.profileSubject.next(profile);
  }

  getActiveProfileType(){
    return this.activeProfileType;
  }

  setActiveProfileType(profileType){
    this.activeProfileType = profileType;
    console.log("auth service activeProfileType is: ", this.activeProfileType);
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
  }

  checkRole(){
    this.loadToken();
    if(!this.authToken){
      return null;
    }
    const tokenPayload = jwt_decode(this.authToken);
    console.log("in auth service check role, token payload is: ", tokenPayload);
    this.setActiveProfileType((tokenPayload as any).profileType);
    return (tokenPayload as any).profileType;
  }

  refreshLogin(){
    console.log("refresh login in service called");
    this.clickedNavLogin = true;
    this.loginSubject.next(this.clickedNavLogin);
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
