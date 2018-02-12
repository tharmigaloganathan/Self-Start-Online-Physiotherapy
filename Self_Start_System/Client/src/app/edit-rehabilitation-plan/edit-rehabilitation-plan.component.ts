import { Component, OnInit } from '@angular/core';
import { RehabilitationPlanService } from '../rehabilitation-plan.service';

@Component({
  selector: 'app-edit-rehabilitation-plan',
  templateUrl: './edit-rehabilitation-plan.component.html',
  styleUrls: ['./edit-rehabilitation-plan.component.scss'],
  providers: [ RehabilitationPlanService ]
})
export class EditRehabilitationPlanComponent implements OnInit {
    showSidebar = true;

  constructor(private rehabilitationplanService: RehabilitationPlanService) { }

  ngOnInit() {
  }

  putRehabilitationPlan(name: String, description: String, authorName: String, goal: String, timeframe: String) {
      this.data.rehabilitationPlan = {};
      this.data.rehabilitationPlan.name = name;
      this.data.rehabilitationPlan.authorName = authorName;
      this.data.rehabilitationPlan.goal = goal;
      this.data.rehabilitationPlan.description = description;
      this.data.rehabilitationPlan.timeFrameToComplete = timeframe;
      console.log("data: ",this.data);
      this.rehabilitationplanService.putRehabilitationPlan(this.data).subscribe(res =>
          {
              console.log(res);
          }
      );
  }

}
