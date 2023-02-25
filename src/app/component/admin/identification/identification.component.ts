import { Component } from '@angular/core'

import { Observable } from 'rxjs'
import { Router } from '@angular/router'

import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { IdbCrudService } from "../../../service-idb/idb-crud.service"
import { environment } from '../../../../environments/environment'

import { AppService } from "../../../service/app.service"
import { AuthService } from "../../../service/auth.service"
import { ErrorService } from "../../../service/error.service"

import { Store, Select } from '@ngxs/store'
import { DeviceState } from '../../../state/device/device.state'
import { SetPage, SetUser, SetChildPageLabel, SetTenant, SetIsSignIn, SetKioske } from '../../../state/auth/auth-state.actions'
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
  tenant = environment.tenant

  data
  idForm: FormGroup

  constructor(
    private store: Store,
    private router: Router,
    private fb: FormBuilder,
    public appService: AppService,
    private authService: AuthService,
    private errorService: ErrorService,
    private idbCrudService: IdbCrudService,
    private idbPersistenceService: IdbPersistenceService) {
    this.idForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required,]]
    })
  }

  signin() {
    if (this.kioske) {
      // tenant got from formloco kioske signin
      // endpoint runs against kioske user db
      this.authService.getTenant(this.idForm.value).subscribe((tenant: any) => {
        this.store.dispatch(new SetTenant({
          email: this.idForm.value['email'],
          tenant_id: tenant.tenant_id
        }))
        this.store.dispatch(new SetKioske(false))
        // this.appService.setIndexedDbUser(this.idForm.value['email'], tenant.tenant_id)
        this.registerUser(tenant.tenant_id)
      })
    }
    // tenant got from mobile environment
    // endpoint runs against tenant user db
    else {
      // this.appService.setIndexedDbUser(this.idForm.value['email'], this.tenant.tenant_id)
      this.registerUser(this.tenant.tenant_id)
    }
  }

  registerUser(tenant_id) {
    // register cheecks for account, account disabled, no account and valid password
    this.authService.register(this.idForm.value).subscribe(response => {

      if (response['row']) {
        this.authService.user({ email: this.idForm.value['email'] }).subscribe((user: any) => {
          if (user.row) {
            this.store.dispatch(new SetUser(user.row))
            this.appService.initializeUser()
    
            if (this.kioske) this.router.navigate(['forms/' + this.idForm.value['email'] + '/' + tenant_id])
            else this.store.dispatch(new SetPage('home'))
    
            this.store.dispatch(new SetIsSignIn(true))
            this.store.dispatch(new SetIsDarkMode(true))
            this.store.dispatch(new SetChildPageLabel('Forms'))
          }
        })
      }
      else this.errorService.popSnackbar(response['message'])
    })
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
