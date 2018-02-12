import { Component, OnInit } from '@angular/core';
import { RehabilitationPlanService } from '../rehabilitation-plan.service';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

@Component({
  selector: 'app-new-rehabilitation-plan',
  templateUrl: './new-rehabilitation-plan.component.html',
  styleUrls: ['./new-rehabilitation-plan.component.scss'],
  providers: [ RehabilitationPlanService ]
})
export class NewRehabilitationPlanComponent implements OnInit {
    showSidebar = true;
    data= {};

  constructor(private rehabilitationplanService: RehabilitationPlanService) { }

  postRehabilitationPlan(name: String, description: String, authorName: String, goal: String, timeframe: String) {
      this.data.rehabilitationPlan = {};
      this.data.rehabilitationPlan.name = name;
      this.data.rehabilitationPlan.authorName = authorName;
      this.data.rehabilitationPlan.goal = goal;
      this.data.rehabilitationPlan.description = description;
      this.data.rehabilitationPlan.timeFrameToComplete = timeframe;
      console.log("data: ",this.data);
      this.rehabilitationplanService.addRehabilitationPlan(this.data).subscribe(res =>
          {
              console.log(res);
          }
      );
  }

  ngOnInit() {
  }

}
