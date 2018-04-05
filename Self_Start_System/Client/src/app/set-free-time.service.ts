import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from './../environments/environment';
import { AuthenticationService } from "./authentication.service";
import { tokenNotExpired } from 'angular2-jwt';
import { AuthHttp } from "angular2-jwt";

@Injectable()
export class SetFreeTimeService {

  options;
  domain = environment.apiURL;

  constructor(private http: Http,
              private authenticationService: AuthenticationService) {};

  /**
   * IMPORTANT, the times can be passed as moments,
   *  but when received back, it must be converted again to a moment
   *  **/

  //Add free time slot
  addTimeSlot(id, startDate, endDate) {
    this.options = this.authenticationService.createAuthenticationHeaders();
    let body = {
      startDate: startDate,
      endDate: endDate
    };
    return this.http.put(this.domain+'/Physiotherapists/free-time/'+id, body, this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  // Get physiotherapist
  getPhysioTherapist(id) {
    this.options = this.authenticationService.createAuthenticationHeaders();
    return this.http.get(this.domain+'/Physiotherapists/'+id, this.options)
      .map((response: Response) => {
        console.log("In service", response.json());
        return response.json();
      });
  }

  getAllPhysioTherapist() {
    this.options = this.authenticationService.createAuthenticationHeaders();
    return this.http.get(this.domain+'/Physiotherapists/',this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  changeOneTimeSlot(id, mongoId, startDate, endDate) {
    this.options = this.authenticationService.createAuthenticationHeaders();
    let body = {
      mongoId: mongoId,
      startDate: startDate,
      endDate: endDate
    };
    return this.http.put(this.domain+'/Physiotherapists/free-time/change-one-date/'+id,body,this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  deleteOneTimeSlot(id, mongoId) {
    this.options = this.authenticationService.createAuthenticationHeaders();
    let body = {
      mongoId: mongoId
    };
    return this.http.put(this.domain+'/Physiotherapists/free-time/delete-one-date/'+id,body,this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  retrieveAllAppointmentsForPatient(id) {
    this.options = this.authenticationService.createAuthenticationHeaders();
    return this.http.get(this.domain+'/PatientProfiles/get-all-appointments/'+id,this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  retrieveAllAppointmentsForPhysio(id) {
    this.options = this.authenticationService.createAuthenticationHeaders();
    return this.http.get(this.domain+'/Physiotherapists/get-all-appointments/'+id,this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  addNewAppointment(patientId, startDate, endDate, reason, other, timeslotId, physioID) {
    this.options = this.authenticationService.createAuthenticationHeaders();
    let body = {
      startDate: startDate,
      endDate: endDate,
      reason: reason,
      other: other,
      timeslotId: timeslotId,
      physioID: physioID
    };
    return this.http.post(this.domain+'/PatientProfiles/add-appointment/'+patientId, body,this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  deleteAppointment(id, mongoId) {
    this.options = this.authenticationService.createAuthenticationHeaders();
    let body = {
      timeslotId: mongoId
    };
    return this.http.post(this.domain+'/PatientProfiles/delete-appointment/'+id,body,this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  completeIntakeForm(id, testResults) {
    this.options = this.authenticationService.createAuthenticationHeaders();
    let body = {
      testResults: testResults
    };
    return this.http.put(this.domain+'/PatientProfiles/complete-intake-form/'+id,body,this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  viewIntakeForm(id) {
    this.options = this.authenticationService.createAuthenticationHeaders();

    return this.http.get(this.domain+'/PatientProfiles/complete-intake-form/'+id,this.options)
      .map((response: Response) => {
        return response.json();
      });
  }

  submitPayment(patientProfileID, amount, note) {
    this.options = this.authenticationService.createAuthenticationHeaders();
    let body = {
      amount: amount,
      note: note,
      patientProfile: patientProfileID
    };

    return this.http.post(this.domain+'/Payments/',body,this.options)
      .map((response: Response) => {
        return response.json();
      });
  }
}

