// import { Injectable } from '@angular/core';
// import {
//   Router, Resolve,
//   ActivatedRouteSnapshot
// } from '@angular/router';
// import {AuthenticationService} from "./authentication.service";
//
// @Injectable()
// export class GetProfileResolveService implements Resolve {
//   user;
//   profileType;
//   constructor(private authService: AuthenticationService, private router: Router) { }
//
//   resolve(route: ActivatedRouteSnapshot): Promise | boolean {
//     return this.authService.getProfile().then(res => {
//       res => {
//         console.log("in nav-bar patient: here's what getProfile returned: ", res);
//         for (let result of res) {
//           console.log((result as any).success);
//           if ((result as any).patientProfile) {
//             this.profileType = "patient";
//             this.user = (result as any).patientProfile;
//             break;
//           } else if ((result as any).physiotherapist) {
//             this.profileType = "patient";
//             this.user = (result as any).physiotherapist;
//             break;
//           }
//         }
//         //functions after user is set goes here
//         this.authService.setActiveProfile(this.user);
//         this.authService.setActiveProfileType("patient");
//         console.log(this.user);
//       } else { // id not found
//         this.router.navigate(['/dashboard']);
//         return false;
//       }
//     });
//   }
// }
