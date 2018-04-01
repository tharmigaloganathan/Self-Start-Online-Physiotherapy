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

    // var retrievedAccount = localStorage.getItem("accountType");

    let type = this.authService.checkRole();
    console.log("here is the account type from authService: ", type);
    if (!type) {
      return true;
    } else if (type) {
      if (type == "patient") {
        this.router.navigate(['/patient/home']);
        return false;
      } else if (type == "physio") {
        this.router.navigate(['/physio/home']);
        return false;
      } else if (type == "admin") {
        this.router.navigate(['/admin/home']);
        return false;
      }
    }
  }
}
