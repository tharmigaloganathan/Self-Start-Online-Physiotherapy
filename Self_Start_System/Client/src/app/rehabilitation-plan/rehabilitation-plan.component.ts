import { Component, OnInit, ViewChild } from '@angular/core';
import { RehabilitationPlanService } from '../rehabilitation-plan.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
    selector: 'app-rehabilitation-plan',
    templateUrl: './rehabilitation-plan.component.html',
    styleUrls: ['./rehabilitation-plan.component.scss'],
    providers: [ RehabilitationPlanService ]
})
export class RehabilitationPlanComponent implements OnInit {
    displayedColumns = ['name', 'authorName', 'goal', 'timeFrameToComplete'];
    dataSource;
    rehabilitationplans = [];
    selectedfilter= "name";
    filteredrehabplans = [];
    router;

    constructor(private rehabilitationplanService: RehabilitationPlanService, router: Router) {
        this.router = router;
    }


    //store ID of rehab plan in local storage when clicked
    storeID(plan) {
        console.log("ID", plan._id);
        localStorage.setItem('edit_rehabilitation_id', plan._id);
        this.router.navigate(['physio/rehabilitation-plans/'+ plan.name]);
    }

    assignCopy(){
        this.filteredrehabplans = Object.assign([], this.rehabilitationplans);
    }

    filterItem(value: string) {
		value = value.trim();
		value = value.toLowerCase();
		this.dataSource.filter = value;
	}

    loadPlans() {
        this.rehabilitationplanService.getRehabilitationPlans().subscribe(data =>
            {
                for(let i = 0; i< data.rehabilitationPlan.length; i++){
                    if(!data.rehabilitationPlan[i].custom){
                        this.rehabilitationplans.push(data.rehabilitationPlan[i]);
                    }
                }
                console.log(data);
                this.assignCopy();
                this.dataSource = new MatTableDataSource(this.filteredrehabplans);
            }
        );
    }

    //setting up the data source once data has been retrieved
    setUpDataSource = patients => {
		this.dataSource = new MatTableDataSource(patients);
	};

    //lo
    ngOnInit() {
        this.loadPlans();
    }

}
