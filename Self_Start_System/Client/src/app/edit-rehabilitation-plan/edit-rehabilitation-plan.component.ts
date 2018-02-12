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
    data: Object;

  constructor(private rehabilitationplanService: RehabilitationPlanService) { }

  ngOnInit() {
  }

  putRehabilitationPlan(name: String, description: String, authorName: String, goal: String, timeframe: String) {
      this.data = {
         name: name,
         authorName: authorName,
         description: description,
         goal: goal,
         timeFrameToComplete: timeframe
     };

      console.log("data: ",this.data);
      let editID = localStorage.getItem('edit_rehabilitation_id');
      this.rehabilitationplanService.updateRehabilitationPlan(this.data, editID).subscribe(res =>
          {
              console.log("RESULT",res);
          }
      );
  }

}
