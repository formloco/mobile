import { Component, Input } from '@angular/core'

import * as uuid from 'uuid'

import { Router } from '@angular/router'

import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms"

import { AppService } from "../../../service/app.service"
import { AuthService } from "../../../service/auth.service"
import { ErrorService } from "../../../service/error.service"
import { IdbCrudService } from "../../../service-idb/idb-crud.service"

import { AppState, Form } from "../../../model/state"
import { environment } from '../../../../environments/environment'

import { StateService } from "../../../service/state.service"

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent {

  @Input() state: AppState
  
  auth
  token
  prefs

  form: Form
  
  tenant = environment.tenant
  idForm: FormGroup

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public appService: AppService,
    private authService: AuthService,
    public stateService: StateService,
    private errorService: ErrorService,
    private idbCrudService: IdbCrudService) { 
    this.idForm = this.fb.group({
      name: ['', Validators.required]
    })
  }

  save() {
    this.idbCrudService.readAll('prefs').subscribe(prefs => {
      let obj = prefs[0]

      obj["user"]["userID"] = uuid.v4()
      obj["user"]["name"] = this.idForm.value['name']
      obj["user"]["tenant_id"] = this.appService.tenant.tenant_id
      this.idbCrudService.put('prefs', obj)
      location.reload()
      
    })   
  }

}

