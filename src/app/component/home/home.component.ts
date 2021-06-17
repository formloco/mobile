import { Component, Input, OnChanges } from '@angular/core'

import { AppState } from "../../model/state"

import { Router } from '@angular/router'
import { AppService } from "../../service/app.service"
import { StateService } from "../../service/state.service"
import { ErrorService } from "../../service/error.service"
import { IdbCrudService } from "../../service-idb/idb-crud.service"

import { FORMS, FIRE_EXTINGUISHER, HAZARD_ASSESSMENT, QR_CODE_SCANNER } from "../../model/forms"
import { MAINTENANCE_INSPECTION } from "../../model/maintenance-inspection"
import { BEHAVIOUR_BASED_OBSERVATION } from '../../model/behaviour-based-observation'

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
        if (form.id === 'qr-code-scanner') formObj = QR_CODE_SCANNER
        if (form.id === 'hazard-assessment') formObj = HAZARD_ASSESSMENT
        if (form.id === 'fire-extinguisher') formObj = FIRE_EXTINGUISHER
        if (form.id === 'maintenance-inspection') formObj = MAINTENANCE_INSPECTION
        if (form.id === 'bahaviour-based-observation') formObj = BEHAVIOUR_BASED_OBSERVATION
    
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
        this.state.page = 'form'
      }
    })
  }
  
}
