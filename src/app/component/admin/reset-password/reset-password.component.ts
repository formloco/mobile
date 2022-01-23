import { Component, OnInit } from '@angular/core'

import { Observable } from 'rxjs'
import { Router, ActivatedRoute, Params } from '@angular/router'

import { FormBuilder, FormGroup, Validators } from "@angular/forms"

import { AppService } from "../../../service/app.service"
import { AuthService } from "../../../service/auth.service"
import { SuccessService } from "../../../service/success.service"
import { IdbCrudService } from "../../../service-idb/idb-crud.service"

import { Store, Select } from '@ngxs/store'
import { AuthState } from '../../../state/auth/auth.state'
import { DeviceState } from '../../../state/device/device.state'
import { SetPage } from '../../../state/auth/auth-state.actions'

import { SetIsDarkMode } from '../../../state/device/device-state.actions'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  @Select(DeviceState.background) background$: Observable<string>

  prefs
  email
  token
  hide = true
  passwordForm: FormGroup;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public appService: AppService,
    private authService: AuthService,
    private successService: SuccessService,
    private idbCrudService: IdbCrudService) { 
    this.passwordForm = this.fb.group({
      password: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.email = params.email
    })
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
      this.router.navigate([''])
    });  
  }

  close() {
    this.router.navigate(['identify'])
  }

}
