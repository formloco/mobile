import { Component, OnInit, ViewChild } from '@angular/core'

import { Observable } from 'rxjs'
import { MatSidenav } from '@angular/material/sidenav'

import { FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'

import { Store, Select } from '@ngxs/store'
import { AuthState } from '../../state/auth/auth.state'
import { DeviceState } from '../../state/device/device.state'
import { NotificationState } from '../../state/notification/notification.state'
import { SetPage, SetChildPage, SetChildPageLabel, SetIsSignIn, SetEmailList, SetChildPageIcon } from '../../state/auth/auth-state.actions'
import { SetNotificationTab } from '../../state/notification/notification-state.actions'
import { SetForms } from '../../state/auth/auth-state.actions'

import { AppService } from "../../service/app.service"
import { ApiService } from "../../service/api.service"
import { IdbCrudService } from "../../service-idb/idb-crud.service"

import { environment } from '../../../environments/environment'

import { SetIsDarkMode } from '../../state/device/device-state.actions'
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes'
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav

  @Select(AuthState.page) page$: Observable<string>
  @Select(AuthState.childPage) childPage$: Observable<string>
  
  @Select(AuthState.childPageIcon) childPageIcon$: Observable<string>
  @Select(AuthState.childPageLabel) childPageLabel$: Observable<string>
  @Select(DeviceState.isDarkMode) isDarkMode$: Observable<boolean>
  @Select(DeviceState.background) background$: Observable<string>
  @Select(DeviceState.screenWidth) screenWidth$: Observable<string>
  @Select(NotificationState.notificationAdminCount) notificationCount$: Observable<number>

  prefs
  token
  templates
  lookupListWorkers
  lookupListSupervisors
  
  templateControls

  myInnerHeight = window.innerHeight

  templateForm: FormGroup

  fileArray = []
  isError = false
  isMainMenu = true
  isRightMenu = false
  isImportOpen = false
  isLookuplist = true
  isListMenu

  kioske = environment.kioske

  signinUrl = environment.signinUrl

  constructor(
    private store: Store,
    public appService: AppService,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private idbCrudService: IdbCrudService) { 
      this.templateForm = this.formBuilder.group({
        templateArray: this.formBuilder.array([])
      })
    }
  
  ngOnInit() {
    this.store.select(AuthState.tenant).subscribe((tenant: any) => {
      this.apiService.getEmailList({ tenant_id: tenant.tenant_id }).subscribe(lists => {
        let emailLists:any = lists
        emailLists = emailLists.filter(l => {return l.name !== null})
        emailLists.sort((a, b) => a.name.localeCompare(b.name))
        this.store.dispatch(new SetEmailList(emailLists))
      })
    })
    
    this.idbCrudService.readAll('prefs').subscribe(prefs => {
      this.prefs = prefs
      if (this.prefs.length > 0) {
        if (this.prefs[0]["user"]["isDarkMode"]) this.appService.setMode('darkMode')
        else this.appService.setMode('')

        this.store.dispatch(new SetIsDarkMode(this.prefs[0]["user"]["isDarkMode"]))
      }
      else {
        this.appService.setMode('darkMode')
        this.store.dispatch(new SetIsDarkMode(true)) 
      }
    })
    
  }

  close(reason: string) {
    this.sidenav.close()
  }

  closeOverlay() {
    this.isImportOpen = false
  }

  selectList() {
  
  }

  selectPage() {
    const childPage = this.store.selectSnapshot(AuthState.childPage)
    if ( childPage === 'list-forms') {
      this.store.dispatch(new SetChildPageIcon('list_alt'))
      this.appService.isListMenu = true
    }
    if ( childPage === 'data-forms') {
      this.store.dispatch(new SetChildPageIcon('table_chart'))
      this.store.dispatch(new SetChildPage('data'))
    }
    if ( childPage === 'forms') {
      this.store.dispatch(new SetChildPageIcon('dynamic_form'))
      this.store.dispatch(new SetChildPage('forms'))
    }
  }

  signout() {
    this.store.dispatch(new SetPage('home'))
    this.store.dispatch(new SetIsSignIn(false))
  }

  openNotifications(tabIndex) {
    if (tabIndex === 0) {
      const user = this.store.selectSnapshot(AuthState.user)
    }
    this.store.dispatch(new SetPage('notification'))
    this.store.dispatch(new SetChildPageLabel('Forms'))
    this.store.dispatch(new SetNotificationTab(tabIndex))
  }

  settings() {
    this.store.dispatch(new SetChildPageLabel('Settings'))
    this.store.dispatch(new SetChildPage('settings'))
  }
  
}