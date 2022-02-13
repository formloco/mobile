import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

import { FormBuilder, FormGroup } from "@angular/forms"
import { MatSnackBar } from '@angular/material/snack-bar'

import { Store } from '@ngxs/store'
import { AuthState } from '../../../../state/auth/auth.state'
import { NotificationState } from '../../../../state/notification/notification.state'
import { SetPage, SetChildPageLabel } from '../../../../state/auth/auth-state.actions'
import { MEANINGFUL_SITE_TOUR } from '../../../forms/meaningful-site-tour/state/meaningful-site-tour.model'

import { AppService } from "../../../../service/app.service"
import { ApiService } from "../../../../service/api.service"

import { environment } from '../../../../../environments/environment'


@Component({
  selector: 'app-action-meaningful-site-tour',
  templateUrl: './action-meaningful-site-tour.component.html',
  styleUrls: ['./action-meaningful-site-tour.component.scss']
})
export class ActionMeaningfulSiteTourComponent implements OnInit {

  @Input() form
  @Output() close = new EventEmitter()

  details
  kioske = environment.kioske
  feedbackSummaryForm: FormGroup

  constructor(
    private store: Store,
    public appService: AppService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private apiService: ApiService) { 
    this.feedbackSummaryForm = this.formBuilder.group({
      FeedbackSummary: []
    })
  }

  ngOnInit(): void {
    this.feedbackSummaryForm.controls['FeedbackSummary'].setValue(this.form.FeedbackSummary)
  }

  signForm() {
    const user = this.store.selectSnapshot(AuthState.user)
    const notification = this.store.selectSnapshot(NotificationState.notification)
    let obj = {
      docID: MEANINGFUL_SITE_TOUR.form.id,
      notificationID: notification.id,
      docName: notification.pdf,
      dataID: notification.data_id,
      formID: notification.form_id,
      date: new Date().toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}),
      email: user.email,
      name: user.name
    }

    this.apiService.signForm(obj).subscribe((res:any) => {
      this.appService.initializeMyNotifications(user.email)
      this.store.dispatch(new SetPage('home'))
      this.store.dispatch(new SetChildPageLabel('Forms'))
      this.close.emit()
      this.snackBar.open(res.message, 'Success', {
        duration: 3000,
        verticalPosition: 'bottom'
      })
    })
  }

}
