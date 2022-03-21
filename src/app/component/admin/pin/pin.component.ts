import { Component, Output, EventEmitter } from '@angular/core'

import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from "@angular/forms"

import { AppService } from "../../../service/app.service"
import { AuthService } from "../../../service/auth.service"
import { ErrorService } from "../../../service/error.service"

import { environment } from '../../../../environments/environment'

import { Store, Select } from '@ngxs/store'
import { DeviceState } from '../../../state/device/device.state'
import { SetPage, SetChildPage, SetChildPageLabel, SetIsSignIn, SetChildPageIcon } from '../../../state/auth/auth-state.actions'

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent {

  @Output() changeTheme = new EventEmitter()

  @Select(DeviceState.background) background$: Observable<string>

  auth
  token
  prefs

  pin = environment.pin
  tenant = environment.tenant

  pinForm: FormGroup

  constructor(
    private store: Store,
    private router: Router,
    private fb: FormBuilder,
    public appService: AppService,
    private authService: AuthService, 
    private errorService: ErrorService) { 
    this.pinForm = this.fb.group({
      pin: ['', Validators.required]
    })
  }

  loginPIN() {
    if (this.pin == this.pinForm.controls['pin'].value) {
      this.store.dispatch(new SetPage('admin'))
      this.store.dispatch(new SetChildPage('forms'))
      this.store.dispatch(new SetChildPageLabel('Forms'))
      this.store.dispatch(new SetChildPageIcon('dynamic_form'))
      this.store.dispatch(new SetIsSignIn(true))
      this.appService.initializeAdminNotifications()
    }
    else this.errorService.popSnackbar('Incorrect PIN')
  }

  close() {
    this.store.dispatch(new SetPage('home'))
  }

}
