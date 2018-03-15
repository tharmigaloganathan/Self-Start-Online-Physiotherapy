import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import {Headers, Http, BaseRequestOptions, Response} from '@angular/http';
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
  user;
  options;

  constructor(
    private http: Http,
  ) { }

  login(user) {
    console.log("inside auth service");
    // return this.http.post(this.domain+'/login', user)
    //   .map((response: Response) => {
    //     return response.json();
    //   });

    return this.http.post(this.domain+'/UserAccounts/login', user)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
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
  // createAuthenticationHeaders() {
  //   this.loadToken(); // Get token so it can be attached to headers
  //   // Headers configuration options
  //   this.options = new RequestOptions({
  //     headers: new Headers({
  //       'Content-Type': 'application/json', // Format set to JSON
  //       'authorization': this.authToken // Attach token
  //     })
  //   });
  // }
}
