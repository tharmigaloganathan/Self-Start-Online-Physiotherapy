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

    var retrievedAccount = localStorage.getItem("accountType");

    console.log("here is the accountTYpe from localstorage: ", retrievedAccount);
    if (!retrievedAccount) {
      return true;
    } else if (retrievedAccount) {
      if (retrievedAccount == "patient") {
        this.router.navigate(['/patient/home']);
        return false;
      } else if (retrievedAccount == "physio") {
        this.router.navigate(['/physio/home']);
        return false;
      } else if (retrievedAccount == "admin") {
        this.router.navigate(['/admin/home']);
        return false;
      }
    }
  }
}
