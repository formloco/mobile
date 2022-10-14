import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { MatBottomSheet } from '@angular/material/bottom-sheet';

import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from '../../../../environments/environment';

import { Store, Select } from '@ngxs/store';

import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

import { NotificationActionComponent } from '../notification-action/notification-action.component';

import { ApiService } from '../../../service/api.service';
import { EmailService } from '../../../service/email.service';
import { IdbCrudService } from '../../../service-idb/idb-crud.service';
import { NotificationService } from '../../../service/notification.service';

import { AuthState } from '../../../state/auth/auth.state';
import { SetPics } from '../../../state/device/device-state.actions';
import { SetComments } from '../../comment/state/comment.actions';
import {
  SetSelectedForm,
  SetPage,
  SetFormData,
  SetChildPage,
} from '../../../state/auth/auth-state.actions';
import { NotificationState } from '../../../state/notification/notification.state';
import {
  SetNotification,
  SetNotificationIdx,
  SetNotificationComments,
} from '../../../state/notification/notification-state.actions';
import { SetIsWorksiteSafetyHeaderValid } from '../../forms/worksite-safety-inspection/state/worksite-safety-inspection-state.actions';
import { SetCorrectiveActions } from '../../corrective-action/state/corrective-action.actions';

import { PicsComponent } from '../../pics/pics.component';
import { CameraComponent } from '../../camera/camera.component';

@Component({
  selector: 'app-notification-open',
  templateUrl: './notification-open.component.html',
  styleUrls: ['./notification-open.component.scss'],
})
export class NotificationOpenComponent implements OnInit {
  @Output() pdf = new EventEmitter<any>();

  @Select(NotificationState.notificationOpen)
  notificationOpen$: Observable<string>;
  @Select(NotificationState.notificationIdx)
  notificationIdx$: Observable<number>;
  @Select(NotificationState.notificationComments)
  notificationComments$: Observable<any[]>;

  @Select(AuthState.kioske) kioske$: Observable<boolean>;

  kioske = environment.kioske;
  messageUrl = environment.messageUrl;

  data;
  user;
  sendTo;
  formData;
  picArray = [];
  customExpandedHeight: string = '80px';
  step;

  messageForm: FormGroup;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private apiService: ApiService,
    private emailService: EmailService,
    private bottomSheet: MatBottomSheet,
    private idbCrudService: IdbCrudService,
    private notificationService: NotificationService
  ) {
    this.messageForm = this.fb.group({
      message: [{ value: null, disabled: this.kioske }, [Validators.required]],
    });
  }

  ngOnInit() {
    this.user = this.store.selectSnapshot(AuthState.user);
  }

  sendMessage(idx) {
    const notifications = this.store.selectSnapshot(
      NotificationState.notificationOpen
    );

    const notification = notifications[idx];
    const user = this.user;

    const message = this.messageForm.get('message').value;

    this.messageForm.reset();
    let messageObj = {
      email_to_id:
        notification.email_to_id === user.id
          ? notification.email_from_id
          : notification.email_to_id,
      email_from_id:
        notification.email_to_id !== user.id
          ? notification.email_from_id
          : notification.email_to_id,
      notificationID: notification.id,
      date: new Date().toLocaleString('en-US', {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
      message: message,
    };

    this.notificationService
      .updateNotificationMessage(messageObj)
      .subscribe((response: any) => {
        this.snackBar.open('Message Submitted!', 'Success', {
          duration: 3000,
          verticalPosition: 'bottom',
        });

        this.store.dispatch(
          new SetNotificationComments(response.data.comments)
        );

        let toEmail, fromEmail
        toEmail = notification.email_to_id === user.id
          ? notification.email_from
          : notification.email_to
  
        fromEmail = notification.email_to_id !== user.id
          ? notification.email_from
          : notification.email_to

        const subject = notification.form_name+' message from '+user.name+' '+new Date()

        const obj = {
          tenant: this.store.selectSnapshot(AuthState.tenant),
          toName: response.data.toName,
          messageID: response.data.notificationID,
          url: this.messageUrl,
          subject: subject,
          emailTo: toEmail,
          emailFrom: fromEmail
        };
        this.emailService.sendNotificationEmail(obj).subscribe((_) => {});
      });
  }

  setStep(index: number) {
    this.step = index;
  }

  setNotification(notification, i) {
    const notifications = this.store.selectSnapshot(
      NotificationState.notificationOpen
    );

    const user = this.store.selectSnapshot(AuthState.user);
    const workers = this.store.selectSnapshot(AuthState.workers);
    const worker = workers.find(
      (worker) => worker.email == notification.email_from
    );
    const supervisors = this.store.selectSnapshot(AuthState.supervisors);
    const supervisor = supervisors.find(
      (supervisor) => supervisor.email == notification.email_to
    );

    if (worker && worker.email !== user.email) this.sendTo = worker.name;
    if (supervisor.email !== user.email) this.sendTo = supervisor.name;

    this.idbCrudService.readAll('form').subscribe((forms: any) => {
      const form = forms.find((f) => {
        return f.form_id == notification.form_id;
      });

      this.store.dispatch(new SetSelectedForm(form));
      this.store.dispatch(new SetNotificationComments(notification.comment));
    });
  }

  openSign(notification) {

    this.store.dispatch(new SetNotification(notification));
    this.apiService
      .getFormData(notification.form_id, notification.data_id)
      .subscribe((form) => {
        const obj = {
          form: form,
          notification: notification,
        };
        const dialogConfig = new MatDialogConfig();
        dialogConfig.height = '100%';
        dialogConfig.width = '100%';
        (dialogConfig.maxWidth = '100vw'),
          (dialogConfig.maxHeight = '100vh'),
          (dialogConfig.data = obj);
        this.dialog.open(NotificationActionComponent, dialogConfig);
      });
  }

  openPdf(notification) {
    this.store.dispatch(new SetNotification(notification));
    this.pdf.emit();
  }

  openForm(notification, idx) {
    this.store.dispatch(new SetComments([]));
    this.store.dispatch(new SetCorrectiveActions([]));
    this.store.dispatch(new SetNotification(notification));
    this.store.dispatch(new SetNotificationIdx(idx));
    const page = this.store.selectSnapshot(AuthState.page);
    const childPage = this.store.selectSnapshot(AuthState.childPage);
    this.apiService
      .getFormData(notification.form_id, notification.data_id)
      .subscribe((data: any) => {
        const selectedForm: any = this.store.selectSnapshot(
          AuthState.selectedForm
        );
        this.store.dispatch(new SetIsWorksiteSafetyHeaderValid(false));
        this.store.dispatch(new SetSelectedForm(selectedForm));
        this.store.dispatch(new SetFormData(data));
        this.store.dispatch(new SetCorrectiveActions(data.correctiveAction));
        this.store.dispatch(new SetChildPage('notification'));
        this.store.dispatch(new SetPage('form'));
      });
  }

  openImage() {
    this.bottomSheet.open(PicsComponent);
  }

  snapShot() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '100%';
    dialogConfig.width = '100%';
    (dialogConfig.maxWidth = '100vw'),
      (dialogConfig.maxHeight = '100vh'),
      (dialogConfig.data = this.store.selectSnapshot(AuthState.selectedForm));
    this.dialog.open(CameraComponent, dialogConfig);
  }

  setRead(notification) {
    const user = this.store.selectSnapshot(AuthState.user);
    if (notification.email_from !== user.email) {
      let obj = {
        notificationID: notification.id,
        email_from: user.email,
      };
      this.notificationService.updateNotificationRead(obj).subscribe(() => {});
    }
  }
}
