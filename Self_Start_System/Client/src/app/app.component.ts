import { Component,HostListener } from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {NavbarPatientComponent} from "./navbar-patient/navbar-patient.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  @HostListener("window:onbeforeunload",["$event"])
  clearLocalStorage(event){
    localStorage.clear();
  }
}
