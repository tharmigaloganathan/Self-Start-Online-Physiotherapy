import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {AuthenticationService} from './authentication.service';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RehabilitationPlanService {
    // Resolve HTTP using the constructor
    constructor(private authenticationService: AuthenticationService, private http: Http) { }
    // private instance variable to hold base url
    private baseUrl = 'http://localhost:3700/RehabilitationPlans';

    getRehabilitationPlans() {
        // ...using get request
        return this.http.get(this.baseUrl)
            // ...and calling .json() on the response to return data
            .map((res:Response) => res.json())
            //...errors if any
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getOneRehabilitationPlan(_id) {
      return this.http.get(this.baseUrl + "/" + _id)
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    addRehabilitationPlan(body: Object) {
        let bodyString = JSON.stringify(body); //Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option
        console.log("JSON body: ", bodyString);
        // ...using post request
        return this.http.post(this.baseUrl, bodyString, options)
            // ...and calling .json() on the response to return data
            .map((res:Response) => res.json())
            //...errors if any
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateRehabilitationPlan(body: Object, id: string) {
        let bodyString = JSON.stringify(body); //Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option
        let Url = this.baseUrl + "/" + id;
        console.log("JSON body: ", bodyString);
        console.log("URL", Url, id);

        // ...using post request
        return this.http.put(Url, bodyString, options)
            // ...and calling .json() on the response to return data
            .map((res:Response) => res.json())
            //...errors if any
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

}
