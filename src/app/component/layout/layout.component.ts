import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs'

import { ActivatedRoute, Params } from '@angular/router'

import { Store, Select } from '@ngxs/store'
import { NotificationService } from "../../service/notification.service"

import { AppService } from "../../service/app.service"
import { IdbCrudService } from "../../service-idb/idb-crud.service"

import { AuthState } from '../../state/auth/auth.state'
import { DeviceState } from '../../state/device/device.state'

import { SetPage, SetChildPageLabel } from '../../state/auth/auth-state.actions'
import { SetNotificationOpen, SetNotificationTab } from '../../state/notification/notification-state.actions'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @Select(AuthState.page) page$: Observable<string>
  @Select(DeviceState.background) background$: Observable<string>
  @Select(DeviceState.screenWidth) screenWidth$: Observable<string>

  prefs

  constructor(
    private store: Store,
    public appService: AppService,
    private route: ActivatedRoute,
    private idbCrudService: IdbCrudService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params && params.email && Object.keys(params.email).length) {
        this.notificationService.getMyNotifications({ email: params.email }).subscribe((notifications: any) => {
          let openNotifications: any = []
          openNotifications = notifications.filter(not => not.date_signed === null)
          this.store.dispatch(new SetNotificationOpen(openNotifications))
          this.store.dispatch(new SetPage('notification'))
          this.store.dispatch(new SetChildPageLabel('Notifications'))
          this.store.dispatch(new SetNotificationTab(0))
        })
      }
      else {
        this.idbCrudService.readAll('prefs').subscribe(prefs => {
          this.prefs = prefs
          if (this.prefs.length > 0) {
            this.store.dispatch(new SetPage('home'))
            this.store.dispatch(new SetChildPageLabel('Forms'))
          }
          else {
            this.store.dispatch(new SetPage('identify'))
          }
        })
      }
    })
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
