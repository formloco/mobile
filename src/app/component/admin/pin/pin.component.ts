import { Component, Output, EventEmitter } from '@angular/core'

import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from "@angular/forms"

import { AppService } from "../../../service/app.service"
import { ErrorService } from "../../../service/error.service"
import { IdbCrudService } from "../../../service-idb/idb-crud.service"

import { environment } from '../../../../environments/environment'

import { Store, Select } from '@ngxs/store'
import { AuthState } from '../../../state/auth/auth.state'
import { DeviceState } from '../../../state/device/device.state'
import { SetPage, SetChildPage, SetChildPageLabel, SetIsSignIn } from '../../../state/auth/auth-state.actions'

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent {

  @Output() changeTheme = new EventEmitter()

  @Select(DeviceState.background) background$: Observable<string>
  @Select(DeviceState.isDarkMode) isDarkMode$: Observable<boolean>
  @Select(AuthState.childPageLabel) childPageLabel$: Observable<string>

  auth
  token
  prefs

  pin = environment.pin
  pinForm: FormGroup

  constructor(
    private store: Store,
    private router: Router,
    private fb: FormBuilder,
    public appService: AppService,
    private errorService: ErrorService,
    private idbCrudService: IdbCrudService) { 
    this.pinForm = this.fb.group({
      pin: ['', Validators.required]
    })
  }

  loginPIN() {
    if (this.pin == this.pinForm.controls['pin'].value) {
      this.store.dispatch(new SetPage('admin'))
      this.store.dispatch(new SetChildPage('forms'))
      this.store.dispatch(new SetChildPageLabel('Forms'))
      this.store.dispatch(new SetIsSignIn(true))
      this.appService.initializeAdminNotifications()
    }
    else this.errorService.popSnackbar('Incorrect PIN')
  }

  toggleTheme() {
    this.changeTheme.emit()
  }

  close() {
    this.store.dispatch(new SetPage('home'))
  }

}
