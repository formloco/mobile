import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs'

import { AppService } from "../../service/app.service"
import { IdbCrudService } from "../../service-idb/idb-crud.service"

import { Store, Select } from '@ngxs/store'
import { AuthState } from '../../state/auth/auth.state'
import { DeviceState } from '../../state/device/device.state'

import { SetPage, SetIsSignIn, SetChildPageLabel, SetChildPage } from '../../state/auth/auth-state.actions'


import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.scss']
})
export class LayoutAdminComponent implements OnInit {

  @Select(AuthState.page) page$: Observable<string>
  @Select(DeviceState.background) background$: Observable<string>
  @Select(DeviceState.screenWidth) screenWidth$: Observable<string>

  kioske = environment.kioske

  constructor(
    private store: Store,
    public appService: AppService,
    private idbCrudService: IdbCrudService
  ) { }

  ngOnInit(): void {
    if (this.kioske) {
      this.store.dispatch(new SetPage('admin'))
      this.store.dispatch(new SetChildPage('forms'))
      this.store.dispatch(new SetChildPageLabel('Forms'))
      this.store.dispatch(new SetIsSignIn(true))
      this.appService.initializeAdminNotifications()
    }
  }

  changeTheme() {
    let darkClassName
    let isDarkMode = this.store.selectSnapshot(DeviceState.isDarkMode)

    if (isDarkMode) {
      darkClassName = ''
      this.setUser(darkClassName, false)
    }
    else {
      darkClassName = 'darkMode'
      this.setUser(darkClassName, true)
    }
    location.reload()
  }

  setUser(darkClassName, darkModeToggle) {
    let user = this.store.selectSnapshot(AuthState.userIdb)
    user.isDarkMode = darkModeToggle
    this.idbCrudService.put('prefs', { id: 1, user: user })
    this.appService.setMode(darkClassName)
  }

}
