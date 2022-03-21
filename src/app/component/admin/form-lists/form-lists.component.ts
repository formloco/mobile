import { Component, Output, EventEmitter } from '@angular/core'

import { Observable } from 'rxjs'
import { Validators, FormGroup, FormBuilder } from "@angular/forms"

import { AppService } from "../../../service/app.service"
import { FormService } from "../../../service/form.service"
import { ApiService } from "../../../service/api.service"

import { Store, Select } from '@ngxs/store'
import { AuthState } from '../../../state/auth/auth.state'
import { DeviceState } from '../../../state/device/device.state'
import { SetChildPage, SetChildPageLabel , SetLookupListName } from '../../../state/auth/auth-state.actions'

import { environment } from '../../../../environments/environment'

@Component({
  selector: 'app-form-lists',
  templateUrl: './form-lists.component.html',
  styleUrls: ['./form-lists.component.scss']
})
export class FormListsComponent {

  @Select(AuthState.lookupListNames) lookupListNames$: Observable<any>
  @Select(DeviceState.background) background$: Observable<string>

  @Output() selectChild = new EventEmitter<any>()

  token
  lookupLists
  isLookupOpen = false

  lookupListForm: FormGroup

  constructor(
    private store: Store,
    public appService: AppService,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private apiService: ApiService) {
    this.lookupListForm = this.formBuilder.group({
      lookupListName: ['', Validators.required]
    })
  }

  createLookuplist() {
    let form = this.appService.createList(this.lookupListForm.get('lookupListName').value)
    this.formService.createForm(form).subscribe(res => {
      this.closeOverlay()
      this.lookupListForm.reset()
      const tenant = this.store.selectSnapshot(AuthState.tenant)
      this.apiService.getLists({tenant_id: tenant.tenant_id}).subscribe(lists => {
        this.appService.lookupLists = lists
      })
    })
  }

  run(name) {
    this.store.dispatch(new SetLookupListName(name))
    this.store.dispatch(new SetChildPage('list'))
    this.store.dispatch(new SetChildPageLabel('Form Lists'))
    const lookupListArray = this.store.selectSnapshot(AuthState.lookupListData)
    console.log(lookupListArray)
    const lookupList = lookupListArray.find(list => list["name"] == name)
    if (lookupList) this.appService.dataSource.data = lookupList["rows"]
    else this.appService.dataSource.data = []
    this.appService.isListMenu = false
  }

  closeOverlay() {
    this.isLookupOpen = false
  }

}