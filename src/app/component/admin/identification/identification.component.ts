import { Component } from '@angular/core'

import { Observable } from 'rxjs'
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { IdbCrudService } from "../../../service-idb/idb-crud.service"
import { environment } from '../../../../environments/environment'

import { AppService } from "../../../service/app.service"
import { AuthService } from "../../../service/auth.service"

import { Store, Select } from '@ngxs/store'
import { DeviceState } from '../../../state/device/device.state'
import { SetPage, SetUserIdb, SetChildPageLabel, SetTenant } from '../../../state/auth/auth-state.actions'
import { SetIsDarkMode } from '../../../state/device/device-state.actions'

import { IdbPersistenceService } from '../../../service-idb/idb-persistence.service';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent {

  @Select(DeviceState.isDarkMode) isDarkMode$: Observable<boolean>

  tenant = environment.tenant
  version = environment.version
  logo = environment.logo
  kioske = environment.kioske

  data
  idForm: FormGroup

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public appService: AppService,
    private authService: AuthService,
    private idbCrudService: IdbCrudService,
    private idbPersistenceService: IdbPersistenceService,) {
    this.idForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required,]]
    })
  }

  save() {
    // if not kioske use client env for tenant else get tenant from kioske db
    if (!this.kioske) {
      // tenant running from client environment
      this.authService.register(this.idForm.value).subscribe(data => {
        this.data = data
        this.setUser()
      })
    }
    else {
      // tenant running from formloco kioske
      this.authService.getTenant(this.idForm.value).subscribe((tenant:any) => {
        console.log(tenant)
    
        this.store.dispatch(new SetTenant({
          email:this.idForm.value['email'],
          tenant_id: tenant
        }))
        this.setUser()
      })
    }
    
  }

  setUser() {
    let userObj = {
      isDarkMode: true,
      email: this.idForm.value['email']
    }
    let obj = {
      user: userObj
    }
    this.idbCrudService.clear('prefs')
    this.idbCrudService.put('prefs', obj)
    this.store.dispatch(new SetPage('home'))
    this.store.dispatch(new SetUserIdb(userObj))
    this.store.dispatch(new SetIsDarkMode(true))
    this.store.dispatch(new SetChildPageLabel('Forms'))

    this.appService.initializeUser(this.idForm.value['email'])
  }

  getEmail() {
    this.store.dispatch(new SetPage('send-password'))
  }

  upGradeIndexDB() {
    this.idbPersistenceService.deleteDb()
  }

  close() {
    this.store.dispatch(new SetPage('kioske'))
  }

}

