import { Component } from '@angular/core'

import { MatBottomSheetRef } from '@angular/material/bottom-sheet'

import { FormBuilder, FormGroup, Validators } from "@angular/forms"

import { IdbCrudService } from "../../../service-idb/idb-crud.service"
import { environment } from '../../../../environments/environment'

import { AuthService } from "../../../service/auth.service"
import { EmailService } from "../../../service/email.service"
import { ErrorService } from "../../../service/error.service"

import { MatBottomSheet } from '@angular/material/bottom-sheet'
// import { AppService } from "../../../service/app.service"
// import { AuthService } from "../../../service/auth.service"

import { Store, Select } from '@ngxs/store'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  auth
  step = 0
  notContinue = true
  terms = false
  subscription

  logo = environment.logo
  linkedinUrl = environment.linkedinUrl
  githubUrl = environment.githubUrl
  kioskeEmail = environment.kioskeEmail

  emailSignupForm: FormGroup
  forgotPasswordForm: FormGroup

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private authService: AuthService,
    private errorService: ErrorService,
    private emailService: EmailService,
    private idbCrudService: IdbCrudService,
    public matBottomSheetRef: MatBottomSheetRef<SignupComponent>) {
    this.emailSignupForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  close() {
    this.matBottomSheetRef.dismiss()
  }

  signupEmail() {
    this.authService.signupEmail(this.emailSignupForm.value).subscribe(auth => {
      this.auth = auth

      if (this.auth.message === 'Signup sucessful.') {
        this.step = 1
        this.emailService.signup({ email: this.auth.user.email }).subscribe(_ => {})
      }
      else
        this.errorService.popSnackbar(this.auth.message)

    })
  }

  checkTerms(terms) {
    this.terms = terms
    if (!this.terms) this.notContinue = true
    else if (this.subscription) this.notContinue = false
  }

  selectSubscription() {
    console.log(this.terms, this.subscription)
    if (this.terms) this.notContinue = false
    else this.notContinue = true
  }

}
