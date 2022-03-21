import { Component, OnInit } from '@angular/core'

import { Observable } from 'rxjs'
import { FormBuilder, FormGroup, Validators } from "@angular/forms"

import { AppService } from "../../../service/app.service"
import { AuthService } from "../../../service/auth.service"
import { EmailService } from "../../../service/email.service"
import { ErrorService } from "../../../service/error.service"
import { SuccessService } from "../../../service/success.service"

import { environment } from '../../../../environments/environment'

import { Store, Select } from '@ngxs/store'
import { AuthState } from '../../../state/auth/auth.state'
import { DeviceState } from '../../../state/device/device.state'
import { SetPage, SetChildPageLabel, SetTenant, SetIsSignIn, SetChildPage, SetChildPageIcon } from '../../../state/auth/auth-state.actions'
import { IdbCrudService } from "../../../service-idb/idb-crud.service"

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  @Select(DeviceState.background) background$: Observable<string>

  tenant
  logo = environment.logo
  signinForm: FormGroup

  redirectForgotPasswordUrl = environment.redirectForgotPasswordUrl

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public appService: AppService,
    private authService: AuthService,
    private errorService: ErrorService,
    private emailService: EmailService,
    private idbCrudService: IdbCrudService,
    private successService: SuccessService) {
    this.signinForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.tenant = this.store.selectSnapshot(AuthState.tenant)
  }

  signin() {
    let obj = {
      email: this.signinForm.controls['email'].value,
      password: this.signinForm.controls['password'].value
    }
    this.authService.signinEmail(obj).subscribe((user: any) => {
      this.store.dispatch(new SetTenant({ tenant_id: user.tenant_id, email: user.email }))

      const obj = {
        user: {
          isDarkMode: true,
          email: user.email,
          tenant_id: user.tenant_id
        }
      }
      this.idbCrudService.clear('prefs')
      this.idbCrudService.put('prefs', obj)

      this.authService.register(this.signinForm.value).subscribe(_ => {
        this.store.dispatch(new SetPage('admin'))
        this.store.dispatch(new SetChildPage('forms'))
        this.store.dispatch(new SetChildPageLabel('Forms'))
        this.store.dispatch(new SetChildPageIcon('dynamic_form'))
        this.store.dispatch(new SetIsSignIn(true))
        this.appService.initializeAdminNotifications()

      })
    })
  }

  close() {
    this.store.dispatch(new SetPage('home'))
  }

  getEmail() {
    this.store.dispatch(new SetPage('send-password'))
  }

  forgotPasswordEmail() {
    let obj = {
      email: this.tenant.email,
      url: this.redirectForgotPasswordUrl
    }
    if (obj.email !== null)
      this.emailService.forgotPassword(obj).subscribe(() => {
        this.successService.popSnackbar('Email Sent.')
      })
    else this.errorService.popSnackbar('Please Enter a Valid Email.')
  }

}
