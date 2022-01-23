import { Component, Output, EventEmitter  } from '@angular/core'

import { Store } from '@ngxs/store'
import { FORMS, LISTS } from "../../../model/forms"

import { AppService } from "../../../service/app.service"
import { SetSelectedForm, SetLookupListNames } from '../../../state/auth/auth-state.actions'

@Component({
  selector: 'app-list-forms',
  templateUrl: './list-forms.component.html',
  styleUrls: ['./list-forms.component.scss']
})
export class ListFormsComponent {

  @Output() selectData = new EventEmitter<any>()

  forms = FORMS
  lists:any = LISTS

  constructor(
    private store: Store,
    private appService: AppService) { }

  selectForm(formObj) {
    this.store.dispatch(new SetSelectedForm(formObj))
    this.store.dispatch(new SetLookupListNames(formObj.lists))
    this.selectData.emit()
  }

  selectSharedLists() {
    this.store.dispatch(new SetLookupListNames(this.lists))
    this.appService.isListMenu = true
  }

}