/**
 * adminstration of the forms is run from the json model locally
 * to add a form 
 * users consume forms from indexedDB
 */
import { Component } from '@angular/core'
import { Observable } from 'rxjs'

import { environment } from '../../../../environments/environment'

import { AppService } from "../../../service/app.service"
import { ErrorService } from '../../../service/error.service'
import { FormService } from "../../../service/form.service"
import { SuccessService } from "../../../service/success.service"
import { IdbCrudService } from "../../../service-idb/idb-crud.service"

import { Store, Select } from '@ngxs/store'
import { LISTS, FORMS } from "../../../model/forms"
import { APPS } from '../../../state/apps/apps-state.model'

import { VEHICLE_INSPECTION } from '../../forms/vehicle-inspection/state/vehicle-inspection-state.model'
import { MEANINGFUL_SITE_TOUR } from '../../forms/meaningful-site-tour/state/meaningful-site-tour.model'
import { WORKSITE_SAFETY_INSPECTION } from '../../forms/worksite-safety-inspection/state/worksite-safety-inspection-state.model'
import { SPOT_CHECK_SAFETY } from '../../forms/spot-check-safety/state/spot-check-safety.model'

import { SetSelectedForm, SetLookupListNames, SetForms } from '../../../state/auth/auth-state.actions'
import { SetPage, SetChildPageLabel } from '../../../state/auth/auth-state.actions'
import { SetApp, SetAppPage } from '../../../state/apps/apps-state.actions'
import { AuthState } from '../../../state/auth/auth.state'

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {

  @Select(AuthState.forms) forms$: Observable<any[]>

  form
  apps = APPS
  forms = FORMS 
  lists: any = LISTS
  tenant = environment.tenant

  constructor(
    private store: Store,
    private appService: AppService,
    private formService: FormService,
    private errorService: ErrorService,
    private idbCrudService: IdbCrudService,
    private successService: SuccessService) { }

  selectForm(form) {
    let formObj = null
    if (form.id === 'vehicle-inspection') {
      formObj = VEHICLE_INSPECTION
    }
    if (form.id === 'meaningful-site-tour') {
      formObj = MEANINGFUL_SITE_TOUR
    }
    if (form.id === 'worksite-safety-inspection') {
      formObj = WORKSITE_SAFETY_INSPECTION
    }
    if (form.id === 'spot-check-safety') {
      formObj = SPOT_CHECK_SAFETY
    }
    if (formObj !== null) {
      this.store.dispatch(new SetSelectedForm(form))
      this.store.dispatch(new SetChildPageLabel(form.name))
      this.store.dispatch(new SetPage('form-admin'))

      let userCreated = { email: this.tenant.email, date_created: new Date() }

      let obj = {
        name: form.name,
        formObj: formObj,
        tenant_id: this.tenant["tenant_id"],
        user_created: userCreated
      }
      // forms are taken from local json and registered to the database
      this.formService.registerForm(obj).subscribe((form_id: any) => {

      })

    } else this.errorService.popSnackbar('Form is not Configured')

  }

  selectSharedLists() {
    this.store.dispatch(new SetLookupListNames(this.lists))
    this.appService.isListMenu = true
  }

  selectApp(app) {
    this.store.dispatch(new SetApp(app)) // app obj
    this.store.dispatch(new SetPage('apps')) // set in layout
    this.store.dispatch(new SetAppPage('map'))
  }

  publish(formObj, event) {
    this.formService.publishForm({ form_id: formObj.form_id, is_published: event.checked }).subscribe((response:any) => {
      this.appService.setFormState(response.rows)
      this.successService.popSnackbar(response.message)
    })
  }

  setPermission(formObj, event) {
    let obj = {
      is_manager: event.checked,
      form_id: formObj.form_id
    }
    this.formService.setPermissions(obj).subscribe((response: any) => {
      this.appService.setFormState(response.rows)
      this.successService.popSnackbar(response.message)
    })
  }  

}