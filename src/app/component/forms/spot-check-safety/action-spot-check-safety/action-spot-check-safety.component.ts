import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

import { FormBuilder, FormGroup } from "@angular/forms"
import { MatSnackBar } from '@angular/material/snack-bar'

import { Store } from '@ngxs/store'
import { AuthState } from '../../../../state/auth/auth.state'
import { NotificationState } from '../../../../state/notification/notification.state'
import { SetPage, SetChildPageLabel } from '../../../../state/auth/auth-state.actions'

import { AppService } from "../../../../service/app.service"
import { ApiService } from "../../../../service/api.service"

@Component({
  selector: 'app-action-spot-check-safety',
  templateUrl: './action-spot-check-safety.component.html',
  styleUrls: ['./action-spot-check-safety.component.scss']
})
export class ActionSpotCheckSafetyComponent implements OnInit {

  @Input() form
  @Output() close = new EventEmitter()

  details
  kioske
  
  correctiveAction: FormGroup

  constructor(
    private store: Store,
    public appService: AppService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private apiService: ApiService) { 
    this.correctiveAction = this.formBuilder.group({
      CorrectiveActionRequired: []
    })
  }

  ngOnInit(): void {
    this.kioske = this.store.selectSnapshot(AuthState.kioske)
    this.correctiveAction.controls['CorrectiveActionRequired'].setValue(this.form.correctiveAction.CorrectiveActionRequired)
  }

  signForm() {
    const user = this.store.selectSnapshot(AuthState.user)
    const notification = this.store.selectSnapshot(NotificationState.notification)
    
    let obj = {
      docID: 'spot-check-safety',
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

