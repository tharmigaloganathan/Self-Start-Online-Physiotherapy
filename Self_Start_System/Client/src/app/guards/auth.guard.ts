
import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,

}                           from '@angular/router';
import { AuthenticationService} from "../authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {
  redirectUrl;

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log ('Auth guard canActivate called');
    if (this.authService.loggedIn()){
      return true;
    } else {
      this.redirectUrl = state.url;
      this.router.navigate(['/login']);
      return false;
    }
  };
}
