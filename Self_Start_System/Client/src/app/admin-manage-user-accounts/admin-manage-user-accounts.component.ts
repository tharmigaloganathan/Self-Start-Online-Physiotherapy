import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountListService } from '../user-account-list.service';
import { AuthenticationService } from "../authentication.service";
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-admin-manage-user-accounts',
  templateUrl: './admin-manage-user-accounts.component.html',
  styleUrls: ['./admin-manage-user-accounts.component.scss'],
	providers: []
})
export class AdminManageUserAccountsComponent implements OnInit {

	isDataLoaded;
	loading;
	router;
	userAccountListService;
	authenticationService;
	loading = false;
	isChanged = false;
	showPlan = false;
	user;
	account;
	today = new Date();
	age: any;
	genders;
	provinces;
	countries;
	isPatient;

  constructor(router: Router, userAccountListService: UserAccountListService, authenticationService: AuthenticationService, public toastr: ToastsManager,
	vcr: ViewContainerRef) {
		this.router = router;
		this.userAccountListService = userAccountListService;
		this.authenticationService = authenticationService;
		this.toastr.setRootViewContainerRef(vcr);
		this.isDataLoaded = true;
		this.loading = true;
}

  ngOnInit() {
		this.identifyUser();
		this.populateGenders();
		this.populateProvinces();
		this.populateCountries();
}

	//Go back to account list
	viewAccountList() {
		this.router.navigate(['/admin/user-accounts']);
}

	//Make information editable
	editPatientInfo() {
		this.isChanged = true;
}

	//Reset the patient info
	cancelEdit() {
		if(this.isPatient) {
			this.user = JSON.parse(localStorage.getItem('selectedPatient'));
		} else {
			this.user =  JSON.parse(localStorage.getItem('selectedPhysio'));
		}
		this.isChanged = false;
}

	//Update the patients information
	savePatientInfo() {
		if(!this.isPatient) {
			this.savePhysioInfo()
		} else {
			const patientProfile = {
				familyName: this.user.familyName,
				givenName: this.user.givenName,
				email: this.user.email,
				DOB: this.user.DOB,
				postalCode: this.user.postalCode,
				phone: this.user.phone,
				address: this.user.address,
				account: this.user.account,
				treatments: this.user.treatments,
				payments: this.user.payments,
				country: this.user.country,
				province:  this.user.province,
				city:  this.user.city,
				gender: this.user.gender,
				appointments: this.user.appointments
			}
			console.log(patientProfile);
			this.userAccountListService.updatePatient(this.user._id, patientProfile).
			subscribe(
				user => {
					this.user = user;
					this.isChanged = false;
					console.log("This was returned for the patient" + JSON.stringify(user));
					localStorage.setItem('selectedPatient', JSON.stringify(user));
					this.toastr.success("Information updated sucessfully!");
				},
				error => {
					console.log("Error");
					this.toastr.error("Failed to update information! Please try again.");
				});
		}
}

	//Update the physios information
	savePhysioInfo() {
		const physioProfile = {
			familyName: this.user.familyName,
			givenName: this.user.givenName,
			email: this.user.email,
			userAccount: this.user.userAccount,
			dateHired: this.user.dateHired,
			dateFinished: this.user.dateFinished,
			treatments: this.user.treatments,
			availableTimeSlots: this.user.availableTimeSlots,
			appointments: this.user.appointments
		}
		console.log(physioProfile);
		this.userAccountListService.updatePhysiotherapist(this.user._id, physioProfile).
		subscribe(
			user => {
				this.user = user;
				this.isChanged = false;
				console.log("This was returned for the physio" + JSON.stringify(user));
				localStorage.setItem('selectedPhysio', JSON.stringify(user));
				this.toastr.success("Information updated sucessfully!");
			},
			error => {
				console.log("Error");
				this.toastr.error("Failed to update information! Please try again.");
			});
}

	//Reset the users Password
	resetPassword() {
		console.log("Reset password clicked");
		this.account.encryptedPassword = "passwordreset";
		console.log(this.account);
		this.userAccountListService.updateUserAccount(this.account._id, this.account).
		subscribe(
			user => {
				this.account = user;
				localStorage.setItem('selectedAccount', JSON.stringify(user));
				console.log("This was returned for reset password" + JSON.stringify(user));
				this.toastr.success("Users password has been reset!");
			},
			error => {
				console.log("Error");
				this.toastr.error("Failed to reset! Please try again.");
			});
}

	//Disable the users account
	disableAccount() {
		console.log("Disable account clicked");
		var data = {};
		if(this.isPatient) {
			data = {
				encryptedPassword: this.account.encryptedPassword,
				userAccountName: this.account.userAccountName,
				patientProfile: this.user._id,
				activated: false,
				hasPaid: this.account.hasPaid,
				passwordReset: this.account.passwordReset
			}
		} else {
				data = {
					encryptedPassword: this.account.encryptedPassword,
					userAccountName: this.account.userAccountName,
					physiotherapist: this.user._id,
					activated: false,
					hasPaid: this.account.hasPaid,
					passwordReset: this.account.passwordReset
			}
		}
		//Update the user account
		console.log(data);
		this.userAccountListService.updateUserAccount(this.account._id, data).
		subscribe(
			user => {
				this.account = user;
				localStorage.setItem('selectedAccount', JSON.stringify(user));
				console.log("This was returned for diable account" + JSON.stringify(user));
				this.toastr.success("Users account is now disabled!");
			},
			error => {
				console.log("Error");
				this.toastr.error("Failed to disable users account! Please try again.");
			});
		}

	//Enable the users account
	enableAccount() {
	console.log("Enable account clicked");
	var data = {};
	if(this.isPatient) {
		data = {
			encryptedPassword: this.account.encryptedPassword,
			userAccountName: this.account.userAccountName,
			patientProfile: this.user._id,
			activated: true,
			hasPaid: this.account.hasPaid,
			passwordReset: this.account.passwordReset
		}
	} else {
		data = {
			encryptedPassword: this.account.encryptedPassword,
			userAccountName: this.account.userAccountName,
			physiotherapist: this.user._id,
			activated: true,
			hasPaid: this.account.hasPaid,
			passwordReset: this.account.passwordReset

		}
	}
	//Update the user account
	console.log(data);
	this.userAccountListService.updateUserAccount(this.account._id, data).
	subscribe(
		user => {
			this.account = user;
			localStorage.setItem('selectedAccount', JSON.stringify(user));
			console.log("This was returned for enable account" + JSON.stringify(user));
			this.toastr.success("Users account is now active!");
		},
		error => {
			console.log("Error");
			this.toastr.error("Failed to activate users account! Please try again.");
		});
}

	//Get all the genders
	populateGenders() {
		this.userAccountListService.getGenders().
		subscribe(
			data => {
				this.genders = data;
			},
			error => {
				console.log("Error");
			});
}

	//Get all provinces
	populateProvinces() {
	this.userAccountListService.getProvinces().
	subscribe(
		data => {
			this.provinces = data;
		},
		error => {
			console.log("Error");
		});
}

	//Get all countries
	populateCountries() {
		this.userAccountListService.getCountries().
		subscribe(
			data => {
				this.countries = data;
			},
			error => {
				console.log("Error");
			});
	}

	//Get the users account
	populatePopulatePatient(id) {
		this.userAccountListService.getPatientProfile(id).subscribe(
			data => {
				this.user = data;
				localStorage.setItem('selectedPatient', JSON.stringify(data));
				//this.age = (Date.parse(this.today) - Date.parse(this.user.DOB))/(60000 * 525600);
				//this.age = this.age.toFixed(0) + " years";
				console.log(this.user);
				console.log("Patient profile" + JSON.stringify(this.user));
			});
	 }

	//Identify the user
	identifyUser() {
	var userAccount = JSON.parse(localStorage.getItem('selectedAccount'));
		if(userAccount.patientProfile == null) {
			this.isPatient = false;
			this.account = userAccount;
			this.user =  JSON.parse(localStorage.getItem('selectedPhysio'));
			//console.log("Patient " + this.isPatient);
			console.log("Physio" + JSON.stringify(this.user));
			this.isDataLoaded = true;
			this.loading = false;
		} else {
			this.isPatient = true;
			this.account = userAccount;
			this.populatePopulatePatient(this.account.patientProfile);
			//console.log("Patient " + this.isPatient);
			console.log("Patient" + JSON.stringify(this.user));
			this.isDataLoaded = true;
			this.loading = false;
		}
	}

}
