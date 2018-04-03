import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
declare let paypal: any;

@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.scss']
})
export class PaypalButtonComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PaypalButtonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    paypal.Button.render({
      env: 'sandbox', // sandbox | production
      // PayPal Client IDs - replace with your own
      client: {
        sandbox: 'AU0tPaiK5Dm2sg19S07CuwD6KjWSpWuu0xCRKJZ9CRYJiMvB27vzQ1xGisiE8tX6UBE8XT7dYTTE_KIG',
        production: ''
      },
      // Show the buyer a 'Pay Now' button in the checkout flow
      commit: true,
      // payment() is called when the button is clicked
      payment: function (data, actions) {
        // Make a call to the REST api to create the payment
        return actions.payment.create({
          payment: {
            transactions: [{amount: {total: '0.01', currency: 'USD'}}]
          }
        });
      },
      // onAuthorize() is called when the buyer approves the payment
      onAuthorize: function (data, actions) {
        // Make a call to the REST api to execute the payment
        return actions.payment.execute().then(function (transaction) {
          console.log(transaction);
        });
      }
    }, '#paypal-button-container');
  }


  public onNoClick(transaction): void {
    this.dialogRef.close();
  }



}
