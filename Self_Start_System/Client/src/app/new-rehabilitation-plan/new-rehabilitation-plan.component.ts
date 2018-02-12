import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

@Component({
  selector: 'app-new-rehabilitation-plan',
  templateUrl: './new-rehabilitation-plan.component.html',
  styleUrls: ['./new-rehabilitation-plan.component.scss']
})
export class NewRehabilitationPlanComponent implements OnInit {
    showSidebar = true;

  constructor() { }

  ngOnInit() {
  }

}
