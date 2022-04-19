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
  selector: 'app-action-worksite-safety-inspection',
  templateUrl: './action-worksite-safety-inspection.component.html',
  styleUrls: ['./action-worksite-safety-inspection.component.scss']
})
export class ActionWorksiteSafetyInspectionComponent implements OnInit {

  @Input() form
  @Output() close = new EventEmitter()

  details
  kioske

  constructor(
    private store: Store,
    public appService: AppService,
    private snackBar: MatSnackBar,
    private apiService: ApiService) {}

  ngOnInit(): void {
    this.kioske = this.store.selectSnapshot(AuthState.kioske)
  }

  signForm() {
    const user = this.store.selectSnapshot(AuthState.user)
    const selectedForm: any = this.store.selectSnapshot(AuthState.selectedForm)
    const notification = this.store.selectSnapshot(NotificationState.notification)

    let obj = {
      docID: selectedForm.id,
      form_id: selectedForm.form_id,
      notification: notification,
      data_id: notification.data_id,
      date: this.appService.now,
      email: user.email,
      name: user.name
    }
    this.apiService.signForm(obj).subscribe((res: any) => {
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
