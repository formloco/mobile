import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs'
import { environment } from '../../../../environments/environment'

import { FormBuilder, FormGroup, Validators } from "@angular/forms"

import { AppService } from "../../../service/app.service"
import { AuthService } from "../../../service/auth.service"
import { SuccessService } from "../../../service/success.service"
import { IdbCrudService } from "../../../service-idb/idb-crud.service"

import { Store, Select } from '@ngxs/store'
import { AuthState } from '../../../state/auth/auth.state'
import { User } from '../../../model/auth'
import { DeviceState } from '../../../state/device/device.state'
import { SetPage } from '../../../state/auth/auth-state.actions'

import { SetIsDarkMode } from '../../../state/device/device-state.actions'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Select(DeviceState.isDarkMode) isDarkMode$: Observable<boolean>
  @Select(DeviceState.background) background$: Observable<string>
  @Select(AuthState.user) user$: Observable<User>
  
  @Output() changeTheme = new EventEmitter()

  prefs
  email
  token
  hide = true
  
  passwordForm: FormGroup;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public appService: AppService,
    private authService: AuthService,
    private successService: SuccessService,
    private idbCrudService: IdbCrudService) { 
    this.passwordForm = this.fb.group({
      password: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.idbCrudService.readAll('prefs').subscribe(prefs => {
      this.prefs = prefs
      if (this.prefs.length > 0) {
        if (this.prefs[0]["user"]["isDarkMode"]) this.appService.setMode('darkMode')
        else this.appService.setMode('')

        this.store.dispatch(new SetIsDarkMode(this.prefs[0]["user"]["isDarkMode"]))
        this.email = this.prefs[0]["user"]["email"]
      }
      else {
        this.appService.setMode('darkMode')
        this.store.dispatch(new SetIsDarkMode(true)) 
      }
    })
  }

  resetPassword() {
    const obj = this.passwordForm.value
    obj["email"] = this.email
    this.authService.resetPassword(obj).subscribe((res:any) => {
      this.successService.popSnackbar(res.message)
      this.store.dispatch(new SetPage('home'))
    });  
  }

  toggleTheme() {
    this.changeTheme.emit()
  }

  close() {
    this.store.dispatch(new SetPage('home'))
  }

}
