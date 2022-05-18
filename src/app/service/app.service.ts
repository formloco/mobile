import { Injectable, HostBinding } from '@angular/core'

import { OverlayContainer } from '@angular/cdk/overlay'

import { HttpClient } from '@angular/common/http'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatTableDataSource } from '@angular/material/table'
import { MatDialogConfig, MatDialog } from "@angular/material/dialog"
import { Router } from '@angular/router'

import { environment } from '../../environments/environment'

import { Store } from '@ngxs/store'
import { AuthState } from '../state/auth/auth.state'
import { SetBackground, SetIsDarkMode } from '../state/device/device-state.actions'
import { SetPage, SetChildPage, SetLookupListData, SetWorkers, SetSupervisors, SetFormsPublished, SetForms, SetIsSignIn, SetChildPageLabel } from '../state/auth/auth-state.actions'
import { SetNotificationOpen, SetNotificationSigned, SetNotificationAllOpen, SetNotificationAllSigned, SetNotificationMyCount, SetNotificationAdminCount } from '../state/notification/notification-state.actions'

import { ApiService } from "../service/api.service"
import { AuthService } from "../service/auth.service"
import { FormService } from "../service/form.service"
import { EmailService } from "../service/email.service"
import { NotificationService } from "../service/notification.service"
import { IdbCrudService } from "../service-idb/idb-crud.service"

import { LISTS, LIST_FORM } from '../model/forms'

import { SetTranscription } from 'src/app/state/device/device-state.actions'
import { SetSelectedVoiceFieldLabel, SetUserIdb, SetUser } from 'src/app/state/auth/auth-state.actions'

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
  public now = new Date().toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })

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
  messageUrl = environment.messageUrl

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
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private apiService: ApiService,
    private authService: AuthService,
    private formService: FormService,
    private emailService: EmailService,
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

  initializeUser() {
    this.setIdbUser()
    const user = this.store.selectSnapshot(AuthState.user)
    // kioske email is used to get forms and notifications
    // get lookuplists array and dispatch to lookuplist state
    this.store.select(AuthState.tenant).subscribe(tenant => {
      this.apiService.getLists({ tenant_id: tenant.tenant_id }).subscribe(lists => {
        const lookupLists: any = lists
        LISTS.forEach(element => {
          if (lookupLists.filter(list => list.name != element))
            lookupLists.push({ name: element, rows: [] })
        })
        this.store.dispatch(new SetLookupListData(lookupLists))
        this.idbCrudService.put('lists', lookupLists)
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
        this.idbCrudService.put('workers', workers)
        this.idbCrudService.put('supervisors', supervisors)
      })

      this.formService.getForms().subscribe((forms: any) => {
        this.idbCrudService.clear('form')
        
        // form_id needs to be added idb form
        forms.forEach((ele) => {
          ele.form["form_id"] = ele.form_id
          this.idbCrudService.put('form', ele.form)
        })

        this.idbCrudService.readAll('form').subscribe((forms: any) => {
          this.store.dispatch(new SetForms(forms))
          const formsPublished = forms.filter(form => form.is_published === true)
          this.store.dispatch(new SetFormsPublished(formsPublished))
        })
      })
      this.initializeMyNotifications()
    })
  }

  initializeOfflineUser() {
    this.idbCrudService.readAll('lists').subscribe((lookupLists: any) => {
      this.store.dispatch(new SetLookupListData(lookupLists))
    })
    this.idbCrudService.readAll('workers').subscribe((workers: any) => {
      this.store.dispatch(new SetWorkers(workers))
    })
    this.idbCrudService.readAll('supervisors').subscribe((supervisors: any) => {
      this.store.dispatch(new SetSupervisors(supervisors))
    })
    this.idbCrudService.readAll('form').subscribe((forms: any) => {
      this.store.dispatch(new SetForms(forms))
      const formsPublished = forms.filter(form => form.is_published === true)
      this.store.dispatch(new SetFormsPublished(formsPublished))
    })

    this.store.dispatch(new SetPage('home'))
    this.store.dispatch(new SetIsSignIn(true))
    this.store.dispatch(new SetIsDarkMode(true))
    this.store.dispatch(new SetChildPageLabel('Forms'))
  }

  initializeMyNotifications() {
    this.notificationService.getMyNotifications().subscribe((data: any) => {
      this.setNotifications(data)
      this.store.dispatch(new SetNotificationOpen(this.notificationOpen))
      this.store.dispatch(new SetNotificationSigned(this.notificationSigned))
      if (data.length == 0) this.store.dispatch(new SetNotificationMyCount(undefined))
      else this.store.dispatch(new SetNotificationMyCount(data.length))
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

  setIdbUser() {
    const user = this.store.selectSnapshot(AuthState.user)
    console.log(user)
    let darkMode = true
    this.idbCrudService.readAll('prefs').subscribe((prefs: any) => {
      if (prefs.length > 0) darkMode = prefs.isDarkMode
    })
    let obj = {
      user: {
        id: user.id,
        isDarkMode: darkMode,
        email: user.email,
        tenant_id: user.tenant_id
      }
    }
    this.idbCrudService.clear('prefs')
    this.idbCrudService.put('prefs', obj)
  }

  // setIndexedDbUser(email, tenant_id) {
  //   let darkMode = true
  //   this.idbCrudService.readAll('prefs').subscribe((prefs: any) => {
  //     if (prefs.length > 0) darkMode = prefs.isDarkMode
  //   })
  //   let userObj = {
  //     isDarkMode: darkMode,
  //     email: email
  //   }
  //   let obj = {
  //     user: {
  //       isDarkMode: darkMode,
  //       email: email,
  //       tenant_id: tenant_id
  //     }
  //   }
  //   this.store.dispatch(new SetUserIdb(userObj))
  //   this.idbCrudService.clear('prefs')
  //   this.idbCrudService.put('prefs', obj)
  // }

  getWorker(name) {
    const workers: any = this.store.selectSnapshot(AuthState.workers)
    let worker = workers.find(worker => worker.name === name)
    if (!worker) {
      let worker = {name: name, email: null}
      return worker
    }
    return worker
  }

  getSupervisor(name) {
    const supervisors: any = this.store.selectSnapshot(AuthState.supervisors)
    const supervisor = supervisors.find(worker => worker.name === name)
    if (!supervisor) {
      supervisor["name"] = supervisor.name
      supervisor["email"] = supervisor.email
    }
    return supervisor
  }

  sendNotification(notificationObj) {
    this.notificationService.createNotification(notificationObj).subscribe((myNotifications: any) => {
      if (myNotifications) {
        this.store.dispatch(new SetNotificationOpen(myNotifications.data))

        const obj = {
          tenant: this.store.selectSnapshot(AuthState.tenant),
          toName: notificationObj.supervisor.name,
          messageID: myNotifications.data[0]["id"],
          url: this.messageUrl,
          subject: notificationObj.subject,
          emailTo: notificationObj.supervisor.email
        }
  
        this.emailService.sendNotificationEmail(obj).subscribe(() => {
          this.store.dispatch(new SetPage('home'))
          this.store.dispatch(new SetChildPage('Forms'))
          this.snackBar.open(myNotifications.message, 'Success', {
            duration: 3000,
            verticalPosition: 'bottom'
          })
        })
      }
    })
  }

  refreshToken() {
    this.idbCrudService.readAll('prefs').subscribe((prefs: any) => {
      if (prefs.length > 0) {
        this.authService.token().subscribe((token: any) => {
          localStorage.setItem('formToken', token.token)
          this.authService.user({ email: prefs.email }).subscribe((user: any) => {
            this.store.dispatch(new SetUser(user.row))
            this.router.navigate['']
          })
          
        })
      }
        this.authService.token()
    })
  }

}
