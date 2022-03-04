import { Component } from '@angular/core';

import { MatBottomSheet } from '@angular/material/bottom-sheet'

import { Store } from '@ngxs/store'
import { SetPage } from '../../state/auth/auth-state.actions'

import { environment } from '../../../environments/environment'

import { SignupComponent } from "../admin/signup/signup.component"
import { ContactComponent } from "../contact/contact.component"
// import { PaymentComponent } from "../payment/payment.component"
// import { PaypalComponent } from "../payment/paypal/paypal.component"

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent {

  githubUrl = environment.githubUrl

  constructor(
    private store: Store,
    private bottomSheet: MatBottomSheet) { }

  signup() {
    this.bottomSheet.open(SignupComponent)
  }

  close() {
    this.store.dispatch(new SetPage('kioske'))
  }

  contact() {
    this.bottomSheet.open(ContactComponent)
  }

}
