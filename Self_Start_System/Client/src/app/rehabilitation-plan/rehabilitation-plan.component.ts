import { Component, OnInit } from '@angular/core';
import { RehabilitationPlanService } from '../rehabilitation-plan.service';
// import { RehabilitationPlanService } from '../services/rehabilitation-plan.service';


@Component({
    selector: 'app-rehabilitation-plan',
    templateUrl: './rehabilitation-plan.component.html',
    styleUrls: ['./rehabilitation-plan.component.scss'],
    providers: [ RehabilitationPlanService ]
})
export class RehabilitationPlanComponent implements OnInit {
    showSidebar = true;
    rehabilitationplans = {};

    constructor(private rehabilitationplanService: RehabilitationPlanService) {
        this.loadUser();
        console.log(this.rehabilitationplans);
    }

    loadUser() {
        this.rehabilitationplanService.getRehabilitationPlans().subscribe(data =>
            {
                this.rehabilitationplans = data;
                console.log(data);
                // console.log(data.rehabilitationPlan[0]);
            }
        );
    }

    ngOnInit() {
    }

}
