import { Component } from '@angular/core'

import { MatBottomSheet } from '@angular/material/bottom-sheet'

import { IdbCrudService } from "../../../service-idb/idb-crud.service"
import { environment } from '../../../../environments/environment'

import { AppService } from "../../../service/app.service"
import { AuthService } from "../../../service/auth.service"

import { Store } from '@ngxs/store'
import { SetPage, SetUserIdb, SetChildPageLabel } from '../../../state/auth/auth-state.actions'
import { SetIsDarkMode } from '../../../state/device/device-state.actions'

import { SignupComponent } from "../signup/signup.component"
import { ContactComponent } from "../../contact/contact.component"

@Component({
  selector: 'app-kioske',
  templateUrl: './kioske.component.html',
  styleUrls: ['./kioske.component.scss']
})
export class KioskeComponent {

  logo = environment.logo
  tenant = environment.tenant
  version = environment.version
  linkedinUrl = environment.linkedinUrl
  githubUrl = environment.githubUrl
  designUrl = environment.designUrl
  kioskeEmail = environment.kioskeEmail
  kioskePassword = environment.kioskePassword

  constructor(
    private store: Store,
    public appService: AppService,
    private authService: AuthService,
    private bottomSheet: MatBottomSheet,
    private idbCrudService: IdbCrudService) { }

  testdrive() {
    const obj = {
      email: this.kioskeEmail,
      password: this.kioskePassword
    }
    let userObj = {
      isDarkMode: true,
      email: this.kioskeEmail
    }
    this.store.dispatch(new SetPage('home'))
    this.store.dispatch(new SetUserIdb(userObj))
    this.store.dispatch(new SetIsDarkMode(true))
    this.store.dispatch(new SetChildPageLabel('Forms'))
    this.appService.initializeUser(this.kioskeEmail)
  }

  contact() {
    this.bottomSheet.open(ContactComponent)
  }

  signin() {
    this.store.dispatch(new SetPage('identify'))
  }

  signup() {
    this.bottomSheet.open(SignupComponent)
  }

  pricing() {
    this.store.dispatch(new SetPage('pricing'))
  }

  whyus() {
    this.store.dispatch(new SetPage('whyus'))
  }

}
