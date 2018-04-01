import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from "../authentication.service";
import { FormService} from "../form.service";
import { UserAccountListService } from '../user-account-list.service';
import { Router} from "@angular/router";


@Component({
    selector: 'app-dashboard-admin',
    templateUrl: './dashboard-admin.component.html',
    styleUrls: ['./dashboard-admin.component.scss'],
    providers:[AuthenticationService,FormService, UserAccountListService]
})
export class DashboardAdminComponent implements OnInit {
    forms: any[];
    filteredforms: any[];
    users: any[];
    filteredusers: any[];
    user;
    successCounter = 0;
    constructor(
        private authService: AuthenticationService,
        private formService: FormService,
        private userAccountListService: UserAccountListService,
        private router: Router)
    { this.authService = authService; }

    ngOnInit() {
        // this.authService.getProfile().subscribe(profile => {
        //     console.log(profile);
        //     this.user = profile.administrator;
        //
        // });
        this.authService.getProfile().subscribe(res => {
          console.log("in login component: here's what getProfile returned: ", res);
          for (let result of res){
            console.log((result as any).success);
            if ((result as any).administrator){
              this.successCounter++; //a profile was returned
              this.user = (result as any).administrator;
              console.log(this.user);
              this.getAllForms();
              this.getAllPatientAccounts();
              break;
            }
          }
          if (this.successCounter==0){
            this.authService.logout();
            this.router.navigate(['home']);
          }
          //functions after user is set goes here

        })
    }


    filterUsers(value){
       if(!value) this.filteredusers = Object.assign([], this.users);
       this.filteredusers = Object.assign([], this.users).filter(
          item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
       )
    }

    filterForms(value){
       if(!value) this.filteredforms = Object.assign([], this.forms);
       this.filteredforms = Object.assign([], this.forms).filter(
          item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
       )
    }

    getAllPatientsWithoutPhysiotherapists() {
        //get all patients (already done)
        //compare with treatments (nested for loop)
        //if patient is in an entry in treatments, continue
        //otherwise add to another array and show in the dashboard
    }

    //Get all user patient accounts
	getAllPatientAccounts() {
		this.userAccountListService.getAllPatients().
		subscribe(
			user => {
                //concatenating givenName and familyName to make search feature more effective
                for(var i = 0; i < user.length; i++) {
                    user[i].name = user[i].givenName + " " +  user[i].familyName;
                }
				this.users = user;
                this.filteredusers = user;
			},
			error => {
				console.log("Error");
			});
	}

    getAllForms(){
        this.formService.getAllForms().subscribe(
            data => {
                this.forms = data.form;
                this.filteredforms = data.form;
            },
            error => console.log(error)
        );
    }

    storeFormID(id: string){
        localStorage.setItem("edit_form_id", id);
    }

}
