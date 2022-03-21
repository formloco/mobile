import { Component, Output, EventEmitter  } from '@angular/core'

import { Observable } from 'rxjs'

import { Store, Select } from '@ngxs/store'
import { LISTS } from "../../../model/forms"

import { AppService } from "../../../service/app.service"
import { SetSelectedForm, SetLookupListNames } from '../../../state/auth/auth-state.actions'
import { AuthState } from '../../../state/auth/auth.state'

@Component({
  selector: 'app-list-forms',
  templateUrl: './list-forms.component.html',
  styleUrls: ['./list-forms.component.scss']
})
export class ListFormsComponent {

  @Select(AuthState.forms) forms$: Observable<any[]>

  @Output() selectData = new EventEmitter<any>()

  lists:any = LISTS

  constructor(
    private store: Store,
    private appService: AppService) { }

  selectForm(formObj) {
    console.log(formObj)
    this.store.dispatch(new SetSelectedForm(formObj))
    this.store.dispatch(new SetLookupListNames(formObj.lists))
    this.selectData.emit()
  }

  selectSharedLists() {
    this.store.dispatch(new SetLookupListNames(this.lists))
    this.appService.isListMenu = true
  }

}