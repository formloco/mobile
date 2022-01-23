import { Component, OnInit } from '@angular/core'

import { Observable } from 'rxjs'
import { FormBuilder, FormGroup, Validators } from "@angular/forms"

import { EmailService } from "../../../service/email.service"
import { ErrorService } from "../../../service/error.service"
import { SuccessService } from "../../../service/success.service"

import { environment } from '../../../../environments/environment'

import { Store, Select } from '@ngxs/store'
import { AuthState } from '../../../state/auth/auth.state'
import { SetPage } from '../../../state/auth/auth-state.actions'

@Component({
  selector: 'app-send-password',
  templateUrl: './send-password.component.html',
  styleUrls: ['./send-password.component.scss']
})
export class SendPasswordComponent implements OnInit {

  @Select(AuthState.childPage) childPage$: Observable<string>

  emailForm: FormGroup

  redirectForgotPasswordUrl = environment.redirectForgotPasswordUrl

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private emailService: EmailService,
    private errorService: ErrorService,
    private successService: SuccessService
    ) { 
    this.emailForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
  }

  forgotPasswordEmail() {
    let obj = {
      email: this.emailForm.value['email'],
      url: this.redirectForgotPasswordUrl
    }
    if (obj.email !== null)
    this.emailService.forgotPassword(obj).subscribe(() => {
      this.successService.popSnackbar('Email Sent.')
      this.store.dispatch(new SetPage('identify'))
    })
    else this.errorService.popSnackbar('Please Enter a Valid Email.')
  }

  close() {
    this.store.dispatch(new SetPage('identify'))
  }

}
