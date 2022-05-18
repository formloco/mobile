import { Component, OnInit } from '@angular/core'

import { MatBottomSheet } from '@angular/material/bottom-sheet'

import { environment } from '../../../../environments/environment'

import { AppService } from "../../../service/app.service"

import { Store } from '@ngxs/store'
import { AuthState } from '../../../state/auth/auth.state'
import { SetPage, SetUserIdb, SetChildPageLabel } from '../../../state/auth/auth-state.actions'
import { SetIsDarkMode } from '../../../state/device/device-state.actions'

import { SignupBottomComponent } from "../signup-bottom/signup-bottom.component"
import { ContactComponent } from "../../contact/contact.component"
@Component({
  selector: 'app-kioske',
  templateUrl: './kioske.component.html',
  styleUrls: ['./kioske.component.scss']
})
export class KioskeComponent implements OnInit {

  tenant
  logo = environment.logo
  version = environment.version
  linkedinUrl = environment.linkedinUrl
  githubUrl = environment.githubUrl
  designUrl = environment.designUrl

  constructor(
    private store: Store,
    public appService: AppService,
    private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.tenant = this.store.selectSnapshot(AuthState.tenant)
  }

  testdrive() {
    let obj = {
      isDarkMode: true,
      email: this.tenant.email
    }
   
    this.store.dispatch(new SetPage('home'))
    this.store.dispatch(new SetUserIdb(obj))
    this.store.dispatch(new SetIsDarkMode(true))
    this.store.dispatch(new SetChildPageLabel('Forms'))
    this.appService.initializeUser()
  }

  contact() {
    this.bottomSheet.open(ContactComponent)
  }

  signin() {
    this.store.dispatch(new SetPage('identify'))
  }

  signup() {
    this.bottomSheet.open(SignupBottomComponent)
  }

  pricing() {
    this.store.dispatch(new SetPage('pricing'))
  }

  whyus() {
    this.store.dispatch(new SetPage('whyus'))
  }

}
