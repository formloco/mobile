import { Component } from '@angular/core'

import { Observable } from 'rxjs'
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { IdbCrudService } from "../../../service-idb/idb-crud.service"
import { environment } from '../../../../environments/environment'

import { AppService } from "../../../service/app.service"
import { AuthService } from "../../../service/auth.service"
import { EmailService } from "../../../service/email.service"
import { ErrorService } from "../../../service/error.service"
import { SuccessService } from "../../../service/success.service"

import { Store, Select } from '@ngxs/store'
import { DeviceState } from '../../../state/device/device.state'
import { SetPage, SetUserIdb, SetChildPageLabel } from '../../../state/auth/auth-state.actions'
import { SetIsDarkMode } from '../../../state/device/device-state.actions'

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent {
  
  @Select(DeviceState.isDarkMode) isDarkMode$: Observable<boolean>

  tenant = environment.tenant
  version = environment.version

  data
  idForm: FormGroup

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public appService: AppService,
    private authService: AuthService, 
    private idbCrudService: IdbCrudService) { 
    this.idForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required,]]
    })
  }

  save() {
    const obj = {
      email: this.idForm.value['email'],
      password: this.idForm.value['password']
    }
    this.authService.register(obj).subscribe(data => {
      this.data = data

      let userObj = {
        isDarkMode: true,
        email: this.idForm.value['email']
      }
      let obj = {
        user: userObj
      }
      this.idbCrudService.put('prefs', obj)
      this.store.dispatch(new SetPage('home'))
      this.store.dispatch(new SetUserIdb(userObj))
      this.store.dispatch(new SetIsDarkMode(true))
      this.store.dispatch(new SetChildPageLabel('Forms'))

      this.appService.initializeUser(this.idForm.value['email'])
    })
  }

  getEmail() {
    this.store.dispatch(new SetPage('send-password'))
  }

}

