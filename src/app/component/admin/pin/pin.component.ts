import { Component, OnInit, Input } from '@angular/core'

import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms"

import { AppState } from "../../../model/state"

import { AppService } from "../../../service/app.service"
import { AuthService } from "../../../service/auth.service"
import { StateService } from "../../../service/state.service"
import { ErrorService } from "../../../service/error.service"
import { IdbCrudService } from "../../../service-idb/idb-crud.service"

import { environment } from '../../../../environments/environment'

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {

  @Input() state: AppState

  auth
  token
  prefs

  pin = environment.pin
  pinForm: FormGroup

  constructor(
    private fb: FormBuilder,
    public appService: AppService,
    private authService: AuthService,
    public stateService: StateService,
    private errorService: ErrorService,
    private idbCrudService: IdbCrudService) { 
    this.pinForm = this.fb.group({
      pin: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.idbCrudService.readAll('prefs').subscribe(prefs => {
      this.prefs = prefs[0]
      this.pin = environment.pin
      if (this.prefs !== undefined && this.prefs.pin !== undefined) this.pin = this.prefs.pin
    })
  }

  loginPIN() {
    if (this.pin == this.pinForm.controls['pin'].value) {
      this.state.page = 'admin'
      this.state.childPage = 'data-forms'
      this.state.childPageLabel = 'Admin - Data Forms'
      this.state.signIn = true
    }
    else this.errorService.popSnackbar('Incorrect PIN')
  }

  goHome() {
    this.state.page = 'home'
    this.state.childPageLabel = 'Mobile Forms'
    this.state.signIn = false
  }

}
