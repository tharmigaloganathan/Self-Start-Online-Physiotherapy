import { Component, OnInit } from '@angular/core';
import { RehabilitationPlanService } from '../rehabilitation-plan.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-rehabilitation-plan',
    templateUrl: './rehabilitation-plan.component.html',
    styleUrls: ['./rehabilitation-plan.component.scss'],
    providers: [ RehabilitationPlanService ]
})
export class RehabilitationPlanComponent implements OnInit {
    rehabilitationplans = {};
    selectedfilter= "name";
    filteredrehabplans = {};
    router;

    constructor(private rehabilitationplanService: RehabilitationPlanService, router: Router) {
        this.router = router;
    }

    assignCopy(){
       this.filteredrehabplans = Object.assign([], this.rehabilitationplans);
    }
    filterItem(value){
        console.log(value);
       if(!value) this.assignCopy(); //when nothing has typed
       this.filteredrehabplans = Object.assign([], this.rehabilitationplans).filter(
          item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
       )
    }

    loadPlans() {
        this.rehabilitationplanService.getRehabilitationPlans().subscribe(data =>
            {
                this.rehabilitationplans = data.rehabilitationPlan;
                console.log(data);
                this.assignCopy();
            }
        );
    }

    //store ID of rehab plan in local storage when clicked
    storeID(plan) {
        console.log("ID", plan._id);
        localStorage.setItem('edit_rehabilitation_id', plan._id);
        this.router.navigate(['physio/rehabilitation-plans/'+ plan.name]);
    }

    //lo
    ngOnInit() {
        this.loadPlans();
    }

}
