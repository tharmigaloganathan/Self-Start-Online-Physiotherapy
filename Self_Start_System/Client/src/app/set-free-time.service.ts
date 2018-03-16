import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from './../environments/environment';

@Injectable()
export class SetFreeTimeService {

  domain = environment.apiURL;

  constructor(private http: Http) {}

  /**
   * IMPORTANT, the times can be passed as moments,
   *  but when received back, it must be converted again to a moment
   *  **/

  //Add free time slot
  addTimeSlot(id, startDate, endDate) {
    let body = {
      startDate: startDate,
      endDate: endDate
    };
    return this.http.put(this.domain+'/Physiotherapists/free-time/'+id, body)
      .map((response: Response) => {
        return response.json();
      });
  }

  //Add free time slot
  getPhysioTherapist(id) {
    return this.http.get(this.domain+'/Physiotherapists/'+id)
      .map((response: Response) => {
        return response.json();
      });
  }

  getAllPhysioTherapist() {
    return this.http.get(this.domain+'/Physiotherapists/')
      .map((response: Response) => {
        return response.json();
      });
  }

  changeOneTimeSlot(id, mongoId, startDate, endDate) {
    let body = {
      mongoId: mongoId,
      startDate: startDate,
      endDate: endDate
    };
    return this.http.put(this.domain+'/Physiotherapists/free-time/change-one-date/'+id,body)
      .map((response: Response) => {
        return response.json();
      });
  }

  retrieveAllAppointmentsForPatient(id) {
    return this.http.get(this.domain+'/PatientProfiles/get-all-appointments/'+id)
      .map((response: Response) => {
        return response.json();
      });
  }

  addNewAppointment(patientId, startDate, endDate, reason, other, timeslotId, physioID) {
    let body = {
      startDate: startDate,
      endDate: endDate,
      reason: reason,
      other: other,
      timeslotId: timeslotId,
      physioID: physioID
    };
    return this.http.post(this.domain+'/PatientProfiles/add-appointment/'+patientId, body)
      .map((response: Response) => {
        return response.json();
      });
  }
}

