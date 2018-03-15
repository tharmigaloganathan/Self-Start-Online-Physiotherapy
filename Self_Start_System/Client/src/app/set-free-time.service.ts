import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from './../environments/environment';

@Injectable()
export class SetFreeTimeService {

  domain = environment.apiURL;

  constructor(private http: Http) {}

  //Add free time slot
  addTimeSlot(id, slotId, startDate, endDate) {
    let body = {
      slotId: slotId,
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
}

