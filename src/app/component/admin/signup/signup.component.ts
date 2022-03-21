import { Component } from '@angular/core'

import { FormBuilder, FormGroup, Validators } from "@angular/forms"

import { environment } from '../../../../environments/environment'

import { AuthService } from "../../../service/auth.service"
import { EmailService } from "../../../service/email.service"
import { ErrorService } from "../../../service/error.service"

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

  emailSignupForm: FormGroup
  forgotPasswordForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private errorService: ErrorService,
    private emailService: EmailService) {
    this.emailSignupForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  close() {
    
  }

  signupEmail() {
    this.authService.signupEmail(this.emailSignupForm.value).subscribe(auth => {
      this.auth = auth

      if (this.auth.message === 'Signup sucessful.') {
        this.step = 1
        this.emailService.signup({ email: this.auth.user.email }).subscribe(_ => {})
      }
      else this.errorService.popSnackbar(this.auth.message)
    })
  }

  checkTerms(terms) {
    this.terms = terms
    if (!this.terms) this.notContinue = true
    else if (this.subscription) this.notContinue = false
  }

  selectSubscription() {
    if (this.terms) this.notContinue = false
    else this.notContinue = true
  }

}
