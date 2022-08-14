import { Injectable, HostBinding } from '@angular/core'

import { fromEvent, merge, of, Subscription, Subject } from 'rxjs'
import { takeUntil, map } from 'rxjs/operators'

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
import { SetSelectedVoiceFieldLabel } from 'src/app/state/auth/auth-state.actions'
import { SetIsOnline } from '../state/device/device-state.actions'

import { VoiceComponent } from '../component/voice/voice.component'
import { DeviceState } from '../state/device/device.state'
import { NotificationState } from '../state/notification/notification.state'

import * as uuid from 'uuid'
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable'

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

  token
  networkStatus: any
  networkStatus$: Subscription = Subscription.EMPTY

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
        this.idbCrudService.clear('lists')
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
        this.idbCrudService.clear('workers')
        this.idbCrudService.clear('supervisors')
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
      this.store.dispatch(new SetLookupListData(lookupLists[0]))
    })
    this.idbCrudService.readAll('workers').subscribe((workers: any) => {
      this.store.dispatch(new SetWorkers(workers[0]))
    })
    this.idbCrudService.readAll('supervisors').subscribe((supervisors: any) => {
      this.store.dispatch(new SetSupervisors(supervisors[0]))
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

  getWorker(name) {
    const workers: any = this.store.selectSnapshot(AuthState.workers)
    let worker = workers.find(worker => worker.name === name)
    if (!worker) {
      let worker = { name: name, email: null }
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

  sendEmail() {
    const user = this.store.selectSnapshot(AuthState.user)
    const form = this.store.selectSnapshot(AuthState.selectedForm)
    const notification = this.store.selectSnapshot(NotificationState.notification)

    const subject =
      form["name"] + ' updated by ' + user.name + ' ' + new Date()

    const obj = {
      tenant: this.store.selectSnapshot(AuthState.tenant),
      toName: notification.email_to.substring(0, notification.email_to.indexOf('@')),
      messageID: notification.id,
      url: this.messageUrl,
      subject: subject,
      emailTo: notification.email_to,
      emailFrom: user.email
    }
    this.emailService.sendNotificationEmail(obj).subscribe((_) => { });
  }

  createNotification(obj) {
    const tenant = this.store.selectSnapshot(AuthState.tenant)
    let now = new Date().toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })

    // if a worker is added to the form manually send the name entered
    // the name will be used as the email address, can be updated
    // after the fact in admin panel
    let workerEmail = obj.worker.email
    if (workerEmail == null) workerEmail = obj.worker.name

    let notificationObj = {
      date: now,
      form_name: obj.name,
      email_from: workerEmail,
      worker_name: obj.worker.name,
      email_to: obj.supervisor.email,
      supervisor_name: obj.supervisor.name,
      form_id: obj.form_id,
      data_id: obj.data_id,
      description: obj.description,
      subject: obj.subject,
      pdf: obj.pdf,
      correctiveAction: false,
      comment: [{
        from: obj.worker.name,
        to: obj.supervisor.name,
        date: now.toString(),
        message: obj.message
      }]
    }
    notificationObj["tenant_id"] = tenant.tenant_id
    this.notificationService.createNotification(notificationObj).subscribe((myNotifications: any) => {
      if (myNotifications) {
        this.store.dispatch(new SetNotificationOpen(myNotifications.data))

        const obj = {
          tenant: this.store.selectSnapshot(AuthState.tenant),
          toName: notificationObj.supervisor_name,
          messageID: myNotifications.data[0]["id"],
          url: this.messageUrl,
          subject: notificationObj.subject,
          emailTo: notificationObj.email_to,
          emailFrom: this.tenant.email
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
    this.authService.token().subscribe((token: any) => {
      localStorage.setItem('formToken', token.token)
      window.location.reload()
    })
  }

  checkNetworkStatus() {
    this.networkStatus = navigator.onLine
    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe(status => {
        if (status)
          this.authService.token().subscribe(token => {
            this.token = token
            localStorage.setItem('formToken', this.token.token)
          })
        this.store.dispatch(new SetIsOnline(status))
      })
  }

  checkOfflineData() {
    this.idbCrudService.readAll('data').subscribe((data: any) => {
      if (data.length > 0) {
        data.forEach(element => {
          let saveObj = {
            data: element.data,
            user: element.user,
            form: element.form,
            type: 'custom',
            date: element.date,
            name: element.name,
            pics: element.pics
          }

          this.apiService.save(saveObj).subscribe(id => {
            element.notification["date"] = this.now,
            element.notification["form_name"] = element.notification.name,
            element.notification["email_from"] = element.notification.worker.email,
            element.notification["worker_name"] = element.notification.worker.name,
            element.notification["email_to"] = element.notification.supervisor.email,
            element.notification["supervisor_name"] = element.notification.supervisor.name,
            element.notification["correctiveAction"] = false,
            element.notification["comment"] = [{
              from: element.notification.worker.name,
              to: element.notification.supervisor.name,
              date: this.now.toString(),
              message: element.notification.message
            }]
            element.notification.data_id = id
            element.notification.pdf = element.form.id + id
            element.notification["tenant_id"] = this.tenant.tenant_id
            
            this.notificationService.createNotification(element.notification).subscribe((myNotifications: any) => {
              if (myNotifications) {
                this.store.dispatch(new SetNotificationOpen(myNotifications.data))
                const obj = {
                  tenant: this.store.selectSnapshot(AuthState.tenant),
                  toName: element.notification.supervisor.name,
                  messageID: myNotifications.data[0]["id"],
                  url: this.messageUrl,
                  subject: element.notification.subject,
                  emailTo: element.notification.supervisor.email,
                  emailFrom: this.tenant.email
                }
                this.emailService.sendNotificationEmail(obj).subscribe(() => { })
              }
            })
          })
        })
        this.idbCrudService.clear('data').subscribe()
        this.store.dispatch(new SetPage('home'))
        this.store.dispatch(new SetChildPage('Forms'))
        this.snackBar.open('Offline data saved', 'Success', {
          duration: 3000,
          verticalPosition: 'bottom'
        })
      }
    })
  }

}
