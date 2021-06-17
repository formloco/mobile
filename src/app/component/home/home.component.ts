import { Component, Input, OnChanges } from '@angular/core'

import { AppState } from "../../model/state"

import { Router } from '@angular/router'
import { AppService } from "../../service/app.service"
import { StateService } from "../../service/state.service"
import { ErrorService } from "../../service/error.service"
import { IdbCrudService } from "../../service-idb/idb-crud.service"

import { FORMS, VEHICLE_INSPECTION } from "../../model/forms"

import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnChanges {

  @Input() state: AppState

  form
  checkform
  forms = FORMS

  tenant = environment.tenant

  constructor(
    private router: Router,
    public appService: AppService,
    public stateService: StateService,
    private errorService: ErrorService,
    private idbCrudService: IdbCrudService) { }

  ngOnChanges() {
  }

  selectForm(form) {
    this.form = form
    let formObj = null

    this.idbCrudService.read('form', form.id).subscribe(registeredForm => {
      if (registeredForm === undefined) {
        if (form.id === 'vehicle-inspection') formObj = VEHICLE_INSPECTION

        if (formObj !== null) {
          let userCreated = { email: this.tenant.email, date_created: new Date() }
    
          let obj = {
            name: this.form.name,
            formObj: formObj,
            tenant_id: this.state.tenant["tenant_id"],
            user_created: userCreated
          }
    
          this.appService.registerForm(obj).subscribe(data => {
            let formdata = data
            form["form_id"] = formdata["form_id"]
            this.idbCrudService.put('form', this.form)
            this.state.selectedForm = this.form
            this.state.page = 'form'
          })
          
        } else this.errorService.popSnackbar('Form is not Configured')
      }
      else {
        this.form["form_id"] = registeredForm["form_id"]
        this.state.selectedForm = this.form
        console.log(this.state.selectedForm)
        this.state.page = 'form'
      }
    })
  }
  
}
