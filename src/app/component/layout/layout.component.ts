import { Component, OnInit } from '@angular/core'

import { Observable } from 'rxjs'

import * as _ from 'lodash'

import { ActivatedRoute, Params } from '@angular/router'

import { Store, Select } from '@ngxs/store'

import { AppService } from "../../service/app.service"
import { AuthService } from "../../service/auth.service"
import { NotificationService } from "../../service/notification.service"
import { IdbCrudService } from "../../service-idb/idb-crud.service"

import { AuthState } from '../../state/auth/auth.state'
import { DeviceState } from '../../state/device/device.state'

import { SetPage, SetChildPageLabel, SetTenant, SetUser, SetKioske } from '../../state/auth/auth-state.actions'
import { SetNotificationOpen, SetNotificationTab } from '../../state/notification/notification-state.actions'

import { environment } from '../../../environments/environment'
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  prefs
  kioske
  tenant = environment.tenant

  @Select(AuthState.page) page$: Observable<string>
  @Select(DeviceState.background) background$: Observable<string>
  @Select(DeviceState.screenWidth) screenWidth$: Observable<string>

  constructor(
    private store: Store,
    public appService: AppService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private idbCrudService: IdbCrudService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {

    this.kioske = this.store.selectSnapshot(AuthState.kioske)

    if (this.kioske) {
      const msg = this.route.snapshot.paramMap.get('msg')
      const email = this.route.snapshot.paramMap.get('email')
      const tenant_id = this.route.snapshot.paramMap.get('tenant_id')

      // console.log(msg, email, tenant_id)

      if (email && !msg && tenant_id) {
        this.authService.user({ email: email }).subscribe((user: any) => {
          this.idbCrudService.clear('form')
          this.store.dispatch(new SetUser(user.row))
          this.store.dispatch(new SetKioske(false))
          this.store.dispatch(new SetTenant({ tenant_id: tenant_id, email: email }))
          this.appService.setIndexedDbUser(email, tenant_id)
          this.appService.initializeUser(email)
          this.store.dispatch(new SetPage('home'))
        })
      }
      else if (msg && !email && !tenant_id) this.store.dispatch(new SetPage('signup'))
      else {
        this.idbCrudService.clear('prefs')
        this.idbCrudService.clear('form')
        this.idbCrudService.clear('pics')
        this.idbCrudService.clear('voice')
        this.authService.user({ email: this.tenant.email }).subscribe((user: any) => {
          this.store.dispatch(new SetUser(user.row))
          this.appService.setIndexedDbUser(this.tenant.email, this.tenant.tenant_id)
          this.store.dispatch(new SetPage('kioske'))
        })
      }
    }
    else {
      // these params are used to get the notifications from email link
      this.route.queryParams.subscribe((params: Params) => {
        if (params && params.email && Object.keys(params.email).length) {
          this.notificationService.getMyNotifications({ email: params.email }).subscribe((notifications: any) => {
            let openNotifications: any = []
            openNotifications = notifications.filter(not => not.date_signed === null)
            this.store.dispatch(new SetNotificationOpen(openNotifications))
            this.store.dispatch(new SetPage('notification'))
            this.store.dispatch(new SetChildPageLabel('forms'))
            this.store.dispatch(new SetNotificationTab(0))
          })
        }
        else {
          const isOnline = this.store.selectSnapshot(DeviceState.isOnline)
          this.idbCrudService.readAll('prefs').subscribe(prefs => {
            this.prefs = prefs
            if (this.prefs.length > 0) {
              if (isOnline) {
                this.authService.user({ email: this.prefs[0]['user']['email'] }).subscribe((user: any) => {
                  this.appService.initializeUser(this.prefs[0]['user']['email'])
                  this.store.dispatch(new SetUser(user.row))
                  this.store.dispatch(new SetPage('home'))
                  this.store.dispatch(new SetChildPageLabel('Forms'))
                })
              }
              else this.appService.initializeOfflineUser()
            }
            else this.store.dispatch(new SetPage('identify'))
          })
        }
      })
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
    let user = _.cloneDeep(this.store.selectSnapshot(AuthState.userIdb))
    user.isDarkMode = darkModeToggle
    this.idbCrudService.put('prefs', { id: 1, user: user })
    this.appService.setMode(darkClassName)
  }

}
