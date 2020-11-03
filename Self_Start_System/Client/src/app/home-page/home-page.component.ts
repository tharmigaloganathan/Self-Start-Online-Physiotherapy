import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from "../authentication.service";
import { Router } from "@angular/router";
import { FlashMessagesModule, FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [FlashMessagesService]

})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
