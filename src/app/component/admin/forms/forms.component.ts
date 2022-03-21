/**
 * adminstration of the forms is run from the json model locally
 * to add a form 
 * users consume forms from indexedDB
 */
import { Component } from '@angular/core'
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
import { MEANINGFUL_SITE_TOUR } from '../../forms/meaningful-site-tour/state/meaningful-site-tour.model'
import { WORKSITE_SAFETY_INSPECTION } from '../../forms/worksite-safety-inspection/state/worksite-safety-inspection-state.model'
import { SPOT_CHECK_SAFETY } from '../../forms/spot-check-safety/state/spot-check-safety.model'

import { SetSelectedForm, SetLookupListNames } from '../../../state/auth/auth-state.actions'
import { SetPage, SetChildPageLabel, SetForms } from '../../../state/auth/auth-state.actions'
import { AuthState } from '../../../state/auth/auth.state'

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {

  @Select(AuthState.forms) forms$: Observable<Form[]>
  @Select(AuthState.kioske) kioske$: Observable<boolean>

  form: Form
  forms = []
  lists: any = LISTS

  constructor(
    private store: Store,
    private appService: AppService,
    private formService: FormService,
    private errorService: ErrorService,
    private idbCrudService: IdbCrudService,
    private successService: SuccessService) {
    this.forms.push(VEHICLE_INSPECTION)
    // this.forms.push(MEANINGFUL_SITE_TOUR)
    this.forms.push(WORKSITE_SAFETY_INSPECTION)
    this.forms.push(SPOT_CHECK_SAFETY)
  }

  selectForm(form) {
    console.log(form)
    let formObjClone = _.cloneDeep(form)
    if (!form.type) this.errorService.popSnackbar('Form is not Configured')

    else if (form.type === 'custom') {
      const tenant = this.store.selectSnapshot(AuthState.tenant)

      formObjClone["user_created"] = { email: tenant.email, date_created: new Date() }

      // forms are taken from local json and registered to the database
      this.formService.registerForm(formObjClone).subscribe(_ => {
        this.runForm(formObjClone)
      })

    }
    else {
      this.appService.detailArray = form.details
      this.runForm(form)
    }

  }

  runForm(form) {
    this.store.dispatch(new SetSelectedForm(form))
    this.store.dispatch(new SetChildPageLabel(form.name))
    this.store.dispatch(new SetPage('form'))
  }

  selectSharedLists() {
    this.store.dispatch(new SetLookupListNames(this.lists))
    this.appService.isListMenu = true
  }

  publish(formObj, event) {
    let formObjClone = _.cloneDeep(formObj)

    const accessDate = new Date().toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
    formObjClone['is_published'] = event.checked
    formObjClone['date_last_access'] = accessDate

    let obj = {
      form_id: formObj.form_id,
      formObj: formObjClone,
      is_deployed: true,
      is_published: event.checked,
      date_last_accessed: accessDate
    }
    this.formService.statusToggle(obj).subscribe((response: any) => {
      this.updateIdb(formObjClone, response)
    })
  }

  setPermission(formObj, event) {
    let formObjClone = _.cloneDeep(formObj)

    const accessDate = new Date().toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
    formObjClone['is_manager'] = event.checked
    formObjClone['date_last_access'] = accessDate

    let obj = {
      formObj: formObjClone,
      is_manager: event.checked,
      form_id: formObj.form_id
    }
    this.formService.setPermissions(obj).subscribe((response: any) => {
      this.updateIdb(formObjClone, response)
    })
  }

  updateIdb(formObjClone, response) {
    this.idbCrudService.put('form', formObjClone).subscribe(_ => {
      this.idbCrudService.readAll('form').subscribe((forms: any) => {
        const formsDeployed = forms.filter(form => !form.date_archived)
        this.store.dispatch(new SetForms(formsDeployed))
      })
      this.successService.popSnackbar(response.message)
    })
  }

  archive(formObj) {
    let formObjClone = _.cloneDeep(formObj)
    formObjClone['date_archived'] = new Date().toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
    formObjClone['user_archived'] = this.store.selectSnapshot(AuthState.user)

    this.formService.update(formObjClone).subscribe((response: any) => {
      this.updateIdb(formObjClone, response)
    })
  }

}