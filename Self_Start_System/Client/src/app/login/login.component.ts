import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";
import {AuthGuard} from "../guards/auth.guard";
import {UserAccountListService} from "../user-account-list.service";
import {MatSnackBar} from "@angular/material";
import {CreateUserAccountService} from "../create-user-account.service";
declare var require: any;
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  username;
  password;
  triedLogin = false;
  statusMessage= false;
  patientProfile_id;
  physiotherapist_id;
  admin_id;
  previousUrl;
  retrievedProfile;
  changingPassword = false;
  newPassword;
  newPasswordVerify;
  userAccount;
  loginToken;
  deactivatedUser;
  forgotPassword = false;
  forgotPasswordUsername;
  forgotPasswordEmail;
  loginSubscription;
  clickedLogin = true;
  correctEmail;
  processing = false;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private authGuard: AuthGuard,
              private userAccListServices: UserAccountListService,
              private snackBar : MatSnackBar,
              private createUserAccountService : CreateUserAccountService ) {
  }

  ngOnInit() {
    this.username = null;
    this.password = null;

    //for clicking on nav bar login when you are in "change password" mode
    this.loginSubscription= this.authService.loginOb$.subscribe((clickedLogin) => {
      this.clickedLogin = clickedLogin;
      this.forgotPassword = false;
      this.changingPassword = false;
      this.deactivatedUser = false;
      this.username = null;
      this.password = null;
      this.processing = false;
      console.log("received from subscriber: ", this.clickedLogin);
    });
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.loginSubscription.unsubscribe();
    console.log("subscription terminated");
  }

  forgotPasswordClicked(){
    this.forgotPassword = true;
    this.clickedLogin = false;
    this.forgotPasswordUsername = null;
    this.forgotPasswordEmail = null;
  }

  resetForgotPassword(){
    this.createUserAccountService.getUserAccountByName(this.forgotPasswordUsername).subscribe(result => {
      if (!result.success) {
        this.snackBar.open("Your username could not be found in our records!! Please try again", "", {
          duration: 3000
        })
      } else if (result.success) {
        console.log("in resetForgotPassword: ", result);

        if (result.userAccount.patientProfile){
          this.userAccListServices.checkForgotPasswordEmail(result.userAccount.patientProfile, "patient").subscribe(res => {
            console.log(res);
            this.correctEmail = res;
            this.changeForgottenPassword(this.forgotPasswordEmail, this.correctEmail, result);
          })
        } else if (result.userAccount.physiotherapist){
          this.userAccListServices.checkForgotPasswordEmail(result.userAccount.physiotherapist, "physiotherapist").subscribe(res => {
            console.log(res);
            this.correctEmail = res;
            this.changeForgottenPassword(this.forgotPasswordEmail, this.correctEmail, result);
          })
        }


        // if (this.correctEmail == this.forgotPasswordEmail) {
        //   let account = result.userAccount;
        //   account.encryptedPassword = "password";
        //   account.passwordReset = true;
        //   this.userAccListServices.updateUserPassword(account._id, account).subscribe(res => {
        //     this.snackBar.open("Your password has been reset! An email has been sent with your new temporary password", "", {
        //       duration: 3000
        //     });
        //     this.router.navigate(['/login']);
        //   });
        // } else {
        //   this.snackBar.open("Your email does not match our records! Please try again", "", {
        //     duration: 3000
        //   })
        // }

      }
    });
  }

  changeForgottenPassword(enteredEmail, correctEmail, useraccount){
    if (this.correctEmail == enteredEmail) {
      let account = useraccount.userAccount;
      account.encryptedPassword = "password";
      account.passwordReset = true;
      this.userAccListServices.updateUserPassword(account._id, account, enteredEmail, true).subscribe(res => {
        this.snackBar.open("Your password has been reset! An email has been sent with your new temporary password", "", {
          duration: 3000
        });
        this.deactivatedUser = false;
        this.changingPassword = false;
        this.forgotPassword = false;
        this.clickedLogin = true;
      });
    } else {
      this.snackBar.open("Your email does not match our records! Please try again", "", {
        duration: 3000
      })
    }
  }
  submitLogin() {
    console.log("submitted username is ", this.username);
    console.log("submitted password is ", this.password);
    const user = {
      userAccountName: this.username,
      encryptedPassword: this.password,
    };

    this.authService.login(user).subscribe(
      data => {
        if(!data.success){
          //if password isn't right
          console.log(data.message);
          this.triedLogin=true;
          this.statusMessage = data.message;

        } else if (!data.userAccount.activated){
          this.deactivatedUser = true;

        } else if (data.userAccount.passwordReset){
          this.loginToken = data.token;
          this.userAccount=data.userAccount;
          this.changingPassword = true;
          this.clickedLogin = false;

        } else {
          this.triedLogin=true;
          this.statusMessage=false;

          //store user data
          this.authService.storeUserData(data.token);

          //navigate to appropriate home page after 2 second delay

         this.authService.getProfile().subscribe(res => {
            console.log("in login component: here's what getProfile returned: ", res);
            this.processing = true;
            for (let result of res){
              if ((result as any).success){
                this.retrievedProfile = result;
                break;
              }
            }
           console.log('log in component, retrieved profile! ',this.retrievedProfile);


           if (this.retrievedProfile.patientProfile){
             this.authService.setActiveProfile(this.retrievedProfile.patientProfile);
             this.authService.setActiveProfileType("patient"); //patient = 1

             setTimeout(() => {
               if(this.previousUrl){
                 this.router.navigate([this.previousUrl]);
               } else {
                 this.router.navigate(['/patient']);
               }
             }, 1000);
           } else if (this.retrievedProfile.physiotherapist){
             this.authService.setActiveProfile(this.retrievedProfile.physiotherapist);
             this.authService.setActiveProfileType("physiotherapist"); //physio = 2

             //redirect to physio home page
             setTimeout(() => {
               if(this.previousUrl){
                 this.router.navigate([this.previousUrl]);
               } else {
                 this.router.navigate(['/physio']);
               }
             }, 1000);
           } else if (this.retrievedProfile.administrator){
             this.authService.setActiveProfile(this.retrievedProfile.administrator);
             this.authService.setActiveProfileType("administrator"); //admin = 3

             //redirect to admin home page
             setTimeout(() => {
               if(this.previousUrl){
                 this.router.navigate([this.previousUrl]);
               } else {
                 this.router.navigate(['/admin']);
               }
             }, 1000);
           }
          });
      }
      },
      error => {
        console.log(error);
      });
  }

  saveNewPassword(){
    let account = this.userAccount;
    account.encryptedPassword = this.newPassword;
    account.passwordReset = false;
    this.userAccListServices.updateUserPassword(account._id, account, this.correctEmail,false).subscribe(res =>{
      this.snackBar.open("New password saved!", "", {
        duration: 3000
      })

      this.triedLogin=true;

      //store user data
      this.authService.storeUserData(this.loginToken);

      //navigate to appropriate home page after 2 second delay

      this.authService.getProfile().subscribe(res => {
        console.log("in login component: here's what getProfile returned: ", res);
        for (let result of res) {
          if ((result as any).success) {
            this.retrievedProfile = result;
            console.log(this.retrievedProfile);
            break;
          }
        }
        console.log('retrieved profile! ', this.retrievedProfile);

        if (this.retrievedProfile.patientProfile) {
          this.authService.setActiveProfile(this.retrievedProfile.patientProfile);
          this.authService.setActiveProfileType("patient"); //patient = 1

          setTimeout(() => {
            if (this.previousUrl) {
              this.router.navigate([this.previousUrl]);
            } else {
              this.router.navigate(['/patient']);
            }
          }, 1000);
        } else if (this.retrievedProfile.physiotherapist) {
          this.authService.setActiveProfile(this.retrievedProfile.physiotherapist);
          this.authService.setActiveProfileType("physiotherapist"); //physio = 2

          //redirect to physio home page
          setTimeout(() => {
            if (this.previousUrl) {
              this.router.navigate([this.previousUrl]);
            } else {
              this.router.navigate(['/physio']);
            }
          }, 1000);
        } else if (this.retrievedProfile.administrator) {
          this.authService.setActiveProfile(this.retrievedProfile.administrator);
          this.authService.setActiveProfileType("administrator"); //admin = 3

          //redirect to admin home page
          setTimeout(() => {
            if (this.previousUrl) {
              this.router.navigate([this.previousUrl]);
            } else {
              this.router.navigate(['/admin']);
            }
          }, 1000);
        }
      });
    })
  }
}
