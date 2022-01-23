import { Component, Output, EventEmitter, OnInit } from '@angular/core'

import { MatBottomSheet } from '@angular/material/bottom-sheet'

import { Observable } from 'rxjs'
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { MatSnackBar } from '@angular/material/snack-bar'

import { environment } from '../../../../environments/environment'

import { Store, Select } from '@ngxs/store'

import { MatDialogConfig, MatDialog } from "@angular/material/dialog"

import { NotificationActionComponent } from '../notification-action/notification-action.component'

import { ApiService } from "../../../service/api.service"
import { EmailService } from "../../../service/email.service"
import { IdbCrudService } from "../../../service-idb/idb-crud.service"
import { NotificationService } from "../../../service/notification.service"

import { AuthState } from "../../../state/auth/auth.state"
import { SetPics } from '../../../state/device/device-state.actions'
import { SetSelectedForm } from '../../../state/auth/auth-state.actions'
import { NotificationState } from '../../../state/notification/notification.state'
import { SetNotification, SetNotificationOpen } from '../../../state/notification/notification-state.actions'

import { PicsComponent } from '../../pics/pics.component'

@Component({
  selector: 'app-notification-open',
  templateUrl: './notification-open.component.html',
  styleUrls: ['./notification-open.component.scss']
})
export class NotificationOpenComponent implements OnInit{

  @Output() pdf = new EventEmitter<any>()

  @Select(NotificationState.notificationOpen) notificationOpen$: Observable<string>

  messageUrl = environment.messageUrl

  data
  user
  sendTo
  picArray = []
  customExpandedHeight: string = '80px'

  messageForm: FormGroup

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private apiService: ApiService,
    private emailService: EmailService,
    private bottomSheet: MatBottomSheet,
    private idbCrudService: IdbCrudService,
    private notificationService: NotificationService) {
    this.messageForm = this.fb.group({
      message: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    const tt = this.store.selectSnapshot(NotificationState.notificationOpen)
    console.log(tt)
    this.user = this.store.selectSnapshot(AuthState.user)
  }

  sendMessage(idx) {
    const notifications = this.store.selectSnapshot(NotificationState.notificationOpen)

    const notification = notifications[idx]
    const user = this.store.selectSnapshot(AuthState.user)
    
    const subject = notification.form_name + ' form message from ' + user.name + 'date:' + new Date()
  
    const message = this.messageForm.get('message').value

    this.messageForm.reset()
    let messageObj = {
      notificationID: notification.id,
      date: new Date().toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}),
      email_to: notification.email_from,
      email_from: user.email,
      subject: subject,
      message: message
    }

    this.notificationService.updateNotificationMessage(messageObj).subscribe((response: any) => {
      this.snackBar.open("Message Submitted!", 'Success', {
        duration: 3000,
        verticalPosition: 'bottom'
      })

      const obj = {
        toName: response.data.toName,
        messageID: response.data.notificationID,
        url: this.messageUrl,
        subject: subject,
        emailTo: notification.email_from,
        emailFrom: user.email
      }
      this.emailService.sendNotificationEmail(obj).subscribe(() => { })
    })
  }

  setNotificationMessage(notification) {
    const user = this.store.selectSnapshot(AuthState.user)
    const workers = this.store.selectSnapshot(AuthState.workers)
    const worker = workers.find(worker => worker.email == notification.email_from)
    const supervisors = this.store.selectSnapshot(AuthState.supervisors)
    const supervisor = supervisors.find(supervisor => supervisor.email == notification.email_to)

    if (worker.email !== user.email) this.sendTo = worker.name
    if (supervisor.email !== user.email) this.sendTo = supervisor.name

    this.idbCrudService.readAll('form').subscribe((forms:any) => {
      const form = forms.find(f => f.form_id == notification.form_id)
      this.store.dispatch(new SetSelectedForm(form))
      this.idbCrudService.readAll('pics').subscribe((pics:any) => {
        if (pics[0].length > 0) {
          this.picArray = pics[0].find(p => p.id == notification.pdf)
          this.store.dispatch(new SetPics(this.picArray["pics"]))
        }
      })
    })
  }

  openSign(notification) {
    this.store.dispatch(new SetNotification(notification))
    this.apiService.getFormData(notification.form_id, notification.data_id).subscribe(form => {
      const obj = {
        form: form,
        notification: notification
      }
      const dialogConfig = new MatDialogConfig()
      dialogConfig.height = '100%'
      dialogConfig.width = '100%'
      dialogConfig.maxWidth = '100vw',
        dialogConfig.maxHeight = '100vh',
        dialogConfig.data = obj
      this.dialog.open(NotificationActionComponent, dialogConfig)
    })
  }

  openPdf(notification) {
    this.store.dispatch(new SetNotification(notification))
    this.pdf.emit()
  }

  openImage() {
    this.bottomSheet.open(PicsComponent)
  }

  setRead(notification) {
    const user = this.store.selectSnapshot(AuthState.user)
    if (notification.email_from !== user.email) {
      let obj = {
        notificationID: notification.id,
        email_from: user.email
      }
      this.notificationService.updateNotificationRead(obj).subscribe(() => { })
    }
  }

}
