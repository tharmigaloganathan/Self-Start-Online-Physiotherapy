import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
}                           from '@angular/router';
import { AuthenticationService} from "../authentication.service";

@Injectable()
export class NotAuthGuard implements CanActivate {
  user;
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    console.log('Not Auth guard canActivate called');

    var retrievedAccount = localStorage.getItem("userAccount");
    console.log("here is the retrieved account from localstorage: ", retrievedAccount);
    if (!retrievedAccount) {
      return true;
    } else if (retrievedAccount) {
      if (JSON.parse(retrievedAccount).patientProfile) {
        this.router.navigate(['/patient/home']);
        return false;
      } else if (JSON.parse(retrievedAccount).physiotherapist) {
        this.router.navigate(['/physio/home']);
        return false;
      } else if (JSON.parse(retrievedAccount).administrator) {
        this.router.navigate(['/admin/home']);
        return false;
      }
    }
  }
}
