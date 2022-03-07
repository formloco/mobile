import { Injectable, HostBinding } from '@angular/core'

import { OverlayContainer } from '@angular/cdk/overlay'

import { HttpClient } from '@angular/common/http'
import { MatTableDataSource } from '@angular/material/table'
import { MatDialogConfig, MatDialog } from "@angular/material/dialog"

import { environment } from '../../environments/environment'

import { Store } from '@ngxs/store'
import { AuthState } from '../state/auth/auth.state'
import { SetLookupListData, SetWorkers, SetSupervisors, SetUser, SetForms } from '../state/auth/auth-state.actions'
import { SetNotificationOpen, SetNotificationSigned, SetNotificationAllOpen, SetNotificationAllSigned, SetNotificationMyCount, SetNotificationAdminCount } from '../state/notification/notification-state.actions'
import { SetBackground } from '../state/device/device-state.actions'

import { AuthService } from "../service/auth.service"
import { FormService } from "../service/form.service"
import { ApiService } from "../service/api.service"
import { NotificationService } from "../service/notification.service"
import { IdbCrudService } from "../service-idb/idb-crud.service"

import { FORMS, LISTS, LIST_FORM } from '../model/forms'

import { SetTranscription } from 'src/app/state/device/device-state.actions'
import { SetSelectedVoiceFieldLabel } from 'src/app/state/auth/auth-state.actions'
import { VoiceComponent } from '../component/voice/voice.component'
import { DeviceState } from '../state/device/device.state'

import * as uuid from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  @HostBinding('class') className = 'darkMode'

  private data

  public isNew
  public isListMenu
  public lookupLists
  public fileArray = []
  public detailArray = []
  public currentDetailForm
  public isFileUploadRunning

  public dataSource = new MatTableDataSource()

  apiUrl = environment.apiUrl
  tenant = environment.tenant
  kioske = environment.kioske

  LIST_FORM = LIST_FORM

  private notificationOpen: any = []
  private notificationSigned: any = []

  private setNotifications(data) {
    this.notificationOpen = []
    this.notificationSigned = []
    const notifications: any = data

    notifications.forEach(element => {
      if (element.email_signed) this.notificationSigned.push(element)
      else this.notificationOpen.push(element)
    })
  }

  public popVoiceDialog(form, formField, title) {
    this.store.dispatch(new SetTranscription(form.controls[formField].value))
    this.store.dispatch(new SetSelectedVoiceFieldLabel(title))
    const dialogConfig = new MatDialogConfig()
    dialogConfig.height = '100%'
    dialogConfig.width = '100%'
    dialogConfig.maxWidth = '100vw',
      dialogConfig.maxHeight = '100vh',
      this.dialog.open(VoiceComponent, dialogConfig).afterClosed().subscribe(() => {
        form.controls[formField].setValue(this.store.selectSnapshot(DeviceState.transcription))
      })
  }

  constructor(
    private store: Store,
    private http: HttpClient,
    private dialog: MatDialog,
    private apiService: ApiService,
    private authService: AuthService,
    private formService: FormService,
    private idbCrudService: IdbCrudService,
    private overlayContainer: OverlayContainer,
    private notificationService: NotificationService) {
  }

  create(obj) {
    return this.http.post(this.apiUrl, obj)
  }

  getCloud() {
    const tenant = this.store.selectSnapshot(AuthState.tenant)
    return this.http.get(this.apiUrl + tenant.tenant_id + '/' + this.store.selectSnapshot(AuthState.selectedForm["form_id"]) + '/')
  }

  createList(listName) {
    const tenant = this.store.selectSnapshot(AuthState.tenant)
    this.LIST_FORM.form.name = listName
    let userCreated = { email: 'polly@formloco.com', date_created: new Date() }

    let form = ({
      pin: '369',
      name: listName,
      form: this.LIST_FORM.form,
      form_id: uuid.v4(),
      tenant_id: tenant.tenant_id,
      date_created: new Date(),
      date_last_access: new Date(),
      user_created: userCreated,
      is_data: true,
      is_list: true,
      is_published: true,
      type: 'dynamic'
    })
    return form
  }

  saveSettings(obj) {
    return this.idbCrudService.put('data', obj)
  }

  initializeUser(email, tenantLogin) {
    console.log('sds')
    // get lookuplists array and dispatch to lookuplist state
    const tenant = this.store.select(AuthState.tenant).subscribe(tenant => {
      this.apiService.getLists({ tenant_id: tenant.tenant_id }).subscribe(lists => {
        const lookupLists: any = lists
        LISTS.forEach(element => {
          if (lookupLists.filter(list => list.name != element))
            lookupLists.push({ name: element, rows: [] })
        })
        this.store.dispatch(new SetLookupListData(lookupLists))
      })
      // get worker and supervisor lists and dispatch to state
      this.apiService.getEmailList({ tenant_id: tenant.tenant_id }).subscribe(lists => {
        const emailList: any = lists
        let workers: any[] = []
        let supervisors: any[] = []
        emailList.forEach(element => {
          if (element.worker) {
            workers.push({ name: element.name, email: element.email })
          }
          if (element.supervisor) {
            supervisors.push({ name: element.name, email: element.email })
          }
        })

        workers.sort()
        supervisors.sort()
        this.store.dispatch(new SetWorkers(workers))
        this.store.dispatch(new SetSupervisors(supervisors))
      })
  
      // email is used to list of registered forms with permissions
      if (!tenantLogin) {
        this.formService.getForms({ email: email }).subscribe((forms: any) => {
          this.setFormState(forms)
        })
      }
      else {
        this.formService.getForms({ email: email }).subscribe((forms: any) => {
          this.idbCrudService.clear('form')
          this.store.dispatch(new SetForms(forms))
          this.idbCrudService.put('form', forms)
        })
      }
      this.initializeMyNotifications(email)
    })
  }

  // uses FORMS const to set forms state
  setFormState(forms) {
    this.idbCrudService.clear('form')
    forms.forEach((ele) => {
      let form = FORMS.filter(f => f.name == ele.name)
      if (form) {
        form[0]["form_id"] = ele["form_id"]
        form[0]["is_published"] = ele["is_published"]
        form[0]["is_manager"] = ele["is_manager"]
      }
      this.idbCrudService.put('form', form[0])
    })
    this.idbCrudService.readAll('form').subscribe((forms: any) => {
      this.store.dispatch(new SetForms(forms))
    })
  }


  initializeMyNotifications(email) {
    console.log('got here')
    this.notificationService.getMyNotifications({ email: email }).subscribe(data => {
      this.setNotifications(data)
      this.store.dispatch(new SetNotificationOpen(this.notificationOpen))
      this.store.dispatch(new SetNotificationSigned(this.notificationSigned))
    })
    this.notificationService.getMyNotificationCount(email).subscribe((notification: any) => {
      if (notification.count == 0) this.store.dispatch(new SetNotificationMyCount(undefined))
      else this.store.dispatch(new SetNotificationMyCount(notification.count))
    })
  }

  initializeAdminNotifications() {
    this.notificationService.getAllNotifications().subscribe(data => {
      this.setNotifications(data)
      this.store.dispatch(new SetNotificationAllOpen(this.notificationOpen))
      this.store.dispatch(new SetNotificationAllSigned(this.notificationSigned))
      let count = 0
      this.notificationOpen.forEach(element => {
        if (element.read === false) count = count + 1
      })
      this.store.dispatch(new SetNotificationAdminCount(count))
    })
  }

  setMode(darkClassName) {
    this.className = 'darkMode' ? darkClassName : ''

    if (darkClassName === 'darkMode') {
      this.store.dispatch(new SetBackground('#3b3b3b'))
      this.overlayContainer.getContainerElement().classList.add(darkClassName)
    }
    else {
      this.store.dispatch(new SetBackground(''))
      this.overlayContainer.getContainerElement().classList.remove('darkMode')
    }
  }

}
