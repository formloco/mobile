import { Component, Output, EventEmitter } from '@angular/core'

import { Store } from '@ngxs/store'
import { environment } from '../../../../environments/environment'

import { AppService } from "../../../service/app.service"

import { SetChildPage, SetChildPageLabel, SetChildPageIcon } from '../../../state/auth/auth-state.actions'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  designUrl = environment.designUrl

  constructor(
    private store: Store,
    public appService: AppService) { }

  selectMenu(child) {
    if (child === 'dashboard') {
      this.store.dispatch(new SetChildPageIcon('space_dashboard'))
      this.store.dispatch(new SetChildPageLabel('Dashboard'))
    }

    if (child === 'data-forms') {
      this.store.dispatch(new SetChildPageIcon('table_chart'))
      this.store.dispatch(new SetChildPageLabel('Data'))
    }
      
    if (child === 'list-forms') {
      this.store.dispatch(new SetChildPageIcon('list_alt'))
      this.store.dispatch(new SetChildPageLabel('Lists'))
    }
      
    if (child === 'email') {
      this.store.dispatch(new SetChildPageIcon('manage_accounts'))
      this.store.dispatch(new SetChildPageLabel('Users'))
    }
      
    if (child === 'forms') {
      this.store.dispatch(new SetChildPageIcon('dynamic_form'))
      this.store.dispatch(new SetChildPageLabel('Forms'))
    }

    if (child === 'sdk') {
      this.store.dispatch(new SetChildPageIcon('settings_applications'))
      this.store.dispatch(new SetChildPageLabel('SDK'))
    }
      
    this.store.dispatch(new SetChildPage(child))
  }

}
