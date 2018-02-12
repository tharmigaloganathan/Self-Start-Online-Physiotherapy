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
    data = {
        name: '',
        authorName: '',
        description: '',
        goal: '',
        timeFrameToComplete: ''
    };

  constructor(private rehabilitationplanService: RehabilitationPlanService) { }

  ngOnInit() {
  }

  putRehabilitationPlan(name: String, description: String, authorName: String, goal: String, timeframe: String) {
<<<<<<< HEAD
      this.data.name:string = name;
=======
      this.data.name = name;
>>>>>>> a791e5f3da6c3433631c5a6fa4709254815c4761
      this.data.authorName = authorName;
      this.data.goal = goal;
      this.data.description = description;
      this.data.timeFrameToComplete = timeframe;
      console.log("data: ",this.data);
      let editID = localStorage.getItem('edit_rehabilitation_id');
      this.rehabilitationplanService.updateRehabilitationPlan(this.data, editID).subscribe(res =>
          {
              console.log("RESULT",res);
          }
      );
  }

}
