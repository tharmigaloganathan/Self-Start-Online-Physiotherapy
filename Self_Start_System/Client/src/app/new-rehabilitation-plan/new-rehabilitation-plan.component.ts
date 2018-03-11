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
    data = {
            name: '',
            authorName: '',
            description: '',
            goal: '',
            timeFrameToComplete: ''
    
    };

  constructor(private rehabilitationplanService: RehabilitationPlanService) { }

  postRehabilitationPlan(name: string, description: string, authorName: string, goal: string, timeframe: string) {
      console.log("post name",name);
      this.data.name = name;
      this.data.authorName = authorName;
      this.data.goal = goal;
      this.data.description = description;
      this.data.timeFrameToComplete = timeframe;
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
