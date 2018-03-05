import { Component, OnInit } from '@angular/core';
import { RehabilitationPlanService } from '../rehabilitation-plan.service';
import { Router } from '@angular/router';

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
    router;

    constructor(private rehabilitationplanService: RehabilitationPlanService, router: Router) {

        this.router = router;
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

    storeID(plan) {
        console.log("ID", plan._id);
        localStorage.setItem('edit_rehabilitation_id', plan._id);
        this.router.navigate(['physio/rehabilitation-plans/'+ plan.name]);
    }

    ngOnInit() {
      this.loadUser();
      console.log(this.rehabilitationplans);
    }

}
