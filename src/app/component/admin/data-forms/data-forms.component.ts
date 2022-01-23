import { Component, Output, EventEmitter  } from '@angular/core'

import { Observable } from 'rxjs'
import { Store, Select } from '@ngxs/store'
import { FORMS } from "../../../model/forms"

import { AuthState } from '../../../state/auth/auth.state'
import { SetSelectedForm } from '../../../state/auth/auth-state.actions'

@Component({
  selector: 'app-data-forms',
  templateUrl: './data-forms.component.html',
  styleUrls: ['./data-forms.component.scss']
})
export class DataFormsComponent {

  @Select(AuthState.forms) forms$: Observable<any[]>

  @Output() selectData = new EventEmitter<any>()

  // forms = FORMS

  constructor(private store: Store) { }

  selectForm(formObj) {
    this.store.dispatch(new SetSelectedForm(formObj))
    this.selectData.emit()
  }

}
