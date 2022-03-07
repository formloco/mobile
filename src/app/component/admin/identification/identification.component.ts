import { Component } from '@angular/core'

import { Observable } from 'rxjs'
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { IdbCrudService } from "../../../service-idb/idb-crud.service"
import { environment } from '../../../../environments/environment'

import { AppService } from "../../../service/app.service"
import { AuthService } from "../../../service/auth.service"

import { Store, Select } from '@ngxs/store'
import { DeviceState } from '../../../state/device/device.state'
import { SetPage, SetUser, SetChildPageLabel, SetTenant, SetUserIdb, SetIsSignIn } from '../../../state/auth/auth-state.actions'
import { SetIsDarkMode } from '../../../state/device/device-state.actions'

import { IdbPersistenceService } from '../../../service-idb/idb-persistence.service';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent {

  @Select(DeviceState.isDarkMode) isDarkMode$: Observable<boolean>

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
    // if kioske=true use client env for tenant 
    // else get tenant from kioske db or customer tenant db
    if (this.kioske) {
      // tenant running from formloco kioske mode
      this.authService.getTenant(this.idForm.value).subscribe((tenant: any) => {
        this.setIndexedDbUser()
        this.store.dispatch(new SetTenant({
          email: this.idForm.value['email'],
          tenant_id: tenant.tenant_id
        }))
        this.setFormState()
        const tenantLogin = true
        this.appService.initializeUser(this.idForm.value['email'], tenantLogin)
      })
    }
    else {
      // tenant running from mobile environment
      this.authService.register(this.idForm.value).subscribe(_ => {
        this.setIndexedDbUser()
        this.setFormState()

        this.authService.user({ email: this.idForm.value['email'] }).subscribe((data: any) => {
          this.store.dispatch(new SetUser(data))
        })
        const tenantLogin = false
        this.appService.initializeUser(this.idForm.value['email'], tenantLogin)

      })
    }
    
  }

  setFormState() {
    this.store.dispatch(new SetPage('home'))
    this.store.dispatch(new SetIsSignIn(true))
    this.store.dispatch(new SetIsDarkMode(true))
    this.store.dispatch(new SetChildPageLabel('Forms'))
  }

  setIndexedDbUser() {
    let darkMode = true
    this.idbCrudService.readAll('prefs').subscribe((prefs: any) => {
      if (prefs.length > 0) darkMode = prefs.isDarkMode
    })
    let userObj = {
      isDarkMode: darkMode,
      email: this.idForm.value['email']
    }
    let obj = {
      user: userObj
    }
    this.store.dispatch(new SetUserIdb(userObj))
    this.idbCrudService.clear('prefs')
    this.idbCrudService.put('prefs', obj)
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

