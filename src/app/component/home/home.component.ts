import { Component, Output, EventEmitter, OnInit } from '@angular/core'

import { Observable } from 'rxjs'

import { NotificationService } from '../../service/notification.service'

import { environment } from '../../../environments/environment'

import { Store, Select } from '@ngxs/store'

import { AppsState } from '../../state/apps/apps.state'
import { SetApp } from '../../state/apps/apps-state.actions'
import { APPS } from '../../state/apps/apps-state.model'

import { AuthState } from '../../state/auth/auth.state'
import { SetPage, SetSelectedForm, SetIsSignIn, SetChildPageLabel, SetFormData } from '../../state/auth/auth-state.actions'
import { SetAppPage } from '../../state/apps/apps-state.actions'
import { DeviceState } from '../../state/device/device.state'

import { NotificationState } from '../../state/notification/notification.state'
import { SetNotificationTab, SetNotificationMyCount, SetNotificationOpen } from '../../state/notification/notification-state.actions'

import { IdbPersistenceService } from '../../service-idb/idb-persistence.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Output() changeTheme = new EventEmitter()

  @Select(AppsState.apps) apps$: Observable<any[]>

  @Select(AuthState.isSignIn) isSignIn$: Observable<boolean>
  @Select(AuthState.forms) forms$: Observable<any[]>
  @Select(DeviceState.background) background$: Observable<string>
  @Select(DeviceState.isDarkMode) isDarkMode$: Observable<boolean>
  @Select(AuthState.childPageLabel) childPageLabel$: Observable<string>
  @Select(NotificationState.notificationMyCount) notificationCount$: Observable<number>

  apps = APPS
  form
  prefs
  checkform
  notificationCount

  tenant = environment.tenant
  version = environment.version

  constructor(
    private store: Store,
    private idbPersistenceService: IdbPersistenceService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    
    setInterval(() => {
      this.store.select(AuthState.user).subscribe((user: any) => {
        if (user) {
          this.notificationService.getMyNotificationCount(user.email).subscribe((notification: any) => {
            if (notification.count == 0) this.store.dispatch(new SetNotificationMyCount(undefined))
            else this.store.dispatch(new SetNotificationMyCount(notification.count))
          })
        }
      })
    }, 120000)
  }

  selectForm(form) {
    this.store.dispatch(new SetFormData([]))
    this.store.dispatch(new SetSelectedForm(form))
    this.store.dispatch(new SetPage('form'))
  }

  selectApp(app) {
    this.store.dispatch(new SetApp(app)) // app obj
    this.store.dispatch(new SetPage('apps')) // set in layout
    this.store.dispatch(new SetAppPage('map'))
  }

  goPIN() {
    this.store.dispatch(new SetPage('pin'))
  }

  signin() {
    this.store.dispatch(new SetPage('pin'))
    this.store.dispatch(new SetIsSignIn(true))
  }

  toggleTheme() {
    this.changeTheme.emit()
  }

  openNotifications(tabIndex) {
    if (tabIndex === 0) {
      const user = this.store.selectSnapshot(AuthState.user)
      this.notificationService.getMyNotifications({ email: user.email }).subscribe((notifications: any) => {
        let openNotifications: any = []
        notifications.forEach(element => {
          if (!element.email_signed) openNotifications.push(element)
        })
        this.store.dispatch(new SetNotificationOpen(openNotifications))
      })
    }
    this.store.dispatch(new SetPage('notification'))
    this.store.dispatch(new SetChildPageLabel('Notifications'))
    this.store.dispatch(new SetNotificationTab(tabIndex))
  }

  openProfile() {
    this.store.dispatch(new SetPage('profile'))
  }

  upGradeIndexDB() {
    this.idbPersistenceService.deleteDb()
  }

}
