import { Component, Output, EventEmitter } from '@angular/core'

import { Store } from '@ngxs/store'

import { AppService } from "../../../service/app.service"
import { SetChildPage, SetChildPageLabel } from '../../../state/auth/auth-state.actions'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(
    private store: Store,
    public appService: AppService) { }

  selectMenu(child) {
    if (child === 'data-forms') 
      this.store.dispatch(new SetChildPageLabel('Data Forms'))
    if (child === 'list-forms') 
      this.store.dispatch(new SetChildPageLabel('Form Lists'))
    if (child === 'email')
      this.store.dispatch(new SetChildPageLabel('Users'))
    if (child === 'forms')
      this.store.dispatch(new SetChildPageLabel('Forms'))
    this.store.dispatch(new SetChildPage(child))
  }

}
