import { Component, Output, EventEmitter, OnInit } from '@angular/core'

import { Observable } from 'rxjs'

import { MatBottomSheet } from '@angular/material/bottom-sheet'

import { AppService } from "../../service/app.service"
import { NotificationService } from '../../service/notification.service'

import { environment } from '../../../environments/environment'

import { Store, Select } from '@ngxs/store'

import { AuthState } from '../../state/auth/auth.state'
import { SetComments } from '../comment/state/comment.actions'
import { SetCorrectiveActions } from '../corrective-action/state/corrective-action.actions'

import { SetPage, SetSelectedForm, SetIsSignIn, SetChildPageLabel, SetFormData, SetChildPage, SetChildPageIcon } from '../../state/auth/auth-state.actions'
import { DeviceState } from '../../state/device/device.state'
import { Form } from '../../state/auth/auth-state.model'

import { NotificationState } from '../../state/notification/notification.state'
import { SetNotificationTab, SetNotificationMyCount, SetNotificationOpen } from '../../state/notification/notification-state.actions'

import { IdbPersistenceService } from '../../service-idb/idb-persistence.service';

import { SignupComponent } from "../admin/signup/signup.component"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Output() changeTheme = new EventEmitter()

  @Select(AuthState.isSignIn) isSignIn$: Observable<boolean>
  @Select(AuthState.formsPublished) formsPublished$: Observable<Form[]>
  @Select(AuthState.childPageLabel) childPageLabel$: Observable<string>

  @Select(DeviceState.isOnline) isOnline$: Observable<boolean>
  @Select(DeviceState.background) background$: Observable<string>
  @Select(DeviceState.isDarkMode) isDarkMode$: Observable<boolean>

  @Select(NotificationState.notificationMyCount) notificationCount$: Observable<number>

  user
  form
  prefs
  tenant
  checkform
  notificationCount

  kioske = environment.kioske
  version = environment.version
  signinUrl = environment.signinUrl
  homeUrl = environment.homeUrl
  designUrl = environment.designUrl
  kioskeTenant = environment.tenant

  constructor(
    private store: Store,
    public appService: AppService,
    private bottomSheet: MatBottomSheet,
    private idbPersistenceService: IdbPersistenceService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.user = this.store.selectSnapshot(AuthState.user)
    this.tenant = this.store.selectSnapshot(AuthState.tenant)

    setInterval(() => {
      const isOnline = this.store.selectSnapshot(DeviceState.isOnline)

      if (this.user && isOnline) {
        this.notificationService.getMyNotificationCount().subscribe((notification: any) => {
          if (notification.count == 0) this.store.dispatch(new SetNotificationMyCount(undefined))
          else this.store.dispatch(new SetNotificationMyCount(notification.count))
        })
      }
    }, 120000)
  }

  selectForm(form) {
    this.store.dispatch(new SetComments([]))
    this.store.dispatch(new SetCorrectiveActions([]))
    this.store.dispatch(new SetFormData([]))
    this.store.dispatch(new SetSelectedForm(form))
    this.store.dispatch(new SetChildPage(null))
    this.store.dispatch(new SetPage('form'))
  }

  goPIN() {
    this.store.dispatch(new SetPage('pin'))
  }

  goAdmin() {
    this.store.dispatch(new SetPage('pin'))
  }

  signin() {
    this.store.dispatch(new SetPage('admin'))
    this.store.dispatch(new SetChildPage('dashboard'))
    this.store.dispatch(new SetChildPageLabel('Dashboard'))
    this.store.dispatch(new SetChildPageIcon('space_dashboard'))
    this.store.dispatch(new SetIsSignIn(true))
    this.appService.initializeAdminNotifications()
  }

  signup() {
    this.bottomSheet.open(SignupComponent)
  }

  toggleTheme() {
    this.changeTheme.emit()
  }

  openNotifications(tabIndex) {
    if (tabIndex === 0) {
      // const user = this.store.selectSnapshot(AuthState.userIdb)
      this.notificationService.getMyNotifications().subscribe((notifications: any) => {
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
