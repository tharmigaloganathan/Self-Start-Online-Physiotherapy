import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,

}                           from '@angular/router';
import { AuthenticationService} from "../authentication.service";

@Injectable()
export class PatientGuard implements CanActivate {
  redirectUrl;
  adminProfile
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log ('Patient guard canActivate called');
    if (this.authService.loggedIn()){

      var retrievedProfile = this.authService.getProfile();

      if (retrievedProfile.patientProfile) {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    } else {
      this.redirectUrl = state.url;
      this.router.navigate(['/home']);
      return false;
    }
  };
}
