/**
 * adminstration of the forms is run from the json model locally
 * to add a form 
 * users consume forms from indexedDB
 */
 import { Component, OnInit } from '@angular/core'
 import { Observable } from 'rxjs'
 
 import * as _ from 'lodash'
 
 import { AppService } from "../../../service/app.service"
 import { ErrorService } from '../../../service/error.service'
 import { FormService } from "../../../service/form.service"
 import { SuccessService } from "../../../service/success.service"
 import { IdbCrudService } from "../../../service-idb/idb-crud.service"
 
 import { Store, Select } from '@ngxs/store'
 import { LISTS } from "../../../model/forms"
 import { Form } from '../../../state/auth/auth-state.model'
 
 // custom forms
 import { VEHICLE_INSPECTION } from '../../forms/vehicle-inspection/state/vehicle-inspection-state.model'
 import { WORKSITE_SAFETY_INSPECTION } from '../../forms/worksite-safety-inspection/state/worksite-safety-inspection-state.model'
 import { SPOT_CHECK_SAFETY } from '../../forms/spot-check-safety/state/spot-check-safety.model'
 
 import { SetSelectedForm } from '../../../state/auth/auth-state.actions'
 import { SetPage, SetChildPageLabel, SetForms } from '../../../state/auth/auth-state.actions'
 import { AuthState } from '../../../state/auth/auth.state'

@Component({
  selector: 'app-sdk',
  templateUrl: './sdk.component.html',
  styleUrls: ['./sdk.component.scss']
})
export class SdkComponent implements OnInit {

  @Select(AuthState.kioske) kioske$: Observable<boolean>

  forms = []

  constructor(
    private store: Store,
    private appService: AppService,
    private formService: FormService,
    private errorService: ErrorService,
    private idbCrudService: IdbCrudService,
    private successService: SuccessService) {
    this.forms.push(VEHICLE_INSPECTION)
    this.forms.push(WORKSITE_SAFETY_INSPECTION)
    this.forms.push(SPOT_CHECK_SAFETY)
  }

  ngOnInit() {
    console.log('got here',this.forms)
  }

  deploy(form) {
    let formObjClone = _.cloneDeep(form)
    if (!form.type) this.errorService.popSnackbar('Form is not Configured')

    else if (form.type === 'custom') {
      const tenant = this.store.selectSnapshot(AuthState.tenant)

      formObjClone["user_created"] = { email: tenant.email, date_created: new Date() }
      const rawForm = _.cloneDeep(formObjClone)
      formObjClone["formObj"] = rawForm

      //forms are taken from local json and registered to the database
      this.formService.registerForm(formObjClone).subscribe((form_id :any) => {
        formObjClone['form_id'] = form_id
        this.idbCrudService.put('form', formObjClone).subscribe(_ => {
          this.idbCrudService.readAll('form').subscribe((forms: any) => {
            this.store.dispatch(new SetForms(forms))
          })
          this.successService.popSnackbar("Form Registered")
        })
      })
    }

  }

}