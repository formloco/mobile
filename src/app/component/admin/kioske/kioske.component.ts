import { Component } from '@angular/core'

import { IdbCrudService } from "../../../service-idb/idb-crud.service"
import { environment } from '../../../../environments/environment'

import { AppService } from "../../../service/app.service"
import { AuthService } from "../../../service/auth.service"

import { Store } from '@ngxs/store'
import { SetPage, SetUserIdb, SetChildPageLabel } from '../../../state/auth/auth-state.actions'
import { SetIsDarkMode } from '../../../state/device/device-state.actions'


@Component({
  selector: 'app-kioske',
  templateUrl: './kioske.component.html',
  styleUrls: ['./kioske.component.scss']
})
export class KioskeComponent {

  logo = environment.logo
  linkedinUrl = environment.linkedinUrl
  githubUrl = environment.githubUrl
  designerUrl = environment.designerUrl
  kioskeEmail = environment.kioskeEmail
  kioskePassword = environment.kioskePassword

  constructor(
    private store: Store,
    public appService: AppService,
    private authService: AuthService,
    private idbCrudService: IdbCrudService) { }

  contact() {
  }

  continue() {
    const obj = {
      email: this.kioskeEmail,
      password: this.kioskePassword
    }
    this.authService.register(obj).subscribe(_ => {

      let userObj = {
        isDarkMode: true,
        email: this.kioskeEmail
      }
      let obj = {
        user: userObj
      }
      this.idbCrudService.put('prefs', obj)
      this.store.dispatch(new SetPage('home'))
      this.store.dispatch(new SetUserIdb(userObj))
      this.store.dispatch(new SetIsDarkMode(true))
      this.store.dispatch(new SetChildPageLabel('Forms'))

      this.appService.initializeUser(this.kioskeEmail)
    })
  }

}
