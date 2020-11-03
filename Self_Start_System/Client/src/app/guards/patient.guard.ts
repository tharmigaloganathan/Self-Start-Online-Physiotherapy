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
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('Patient guard canActivate called');

    if (this.authService.loggedIn()) {
      let type = this.authService.checkRole();
      if (type == "patient") {
        return true;
      } else {
        this.redirectUrl = state.url;
        this.router.navigate(['/home']);
        return false;
      }
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
