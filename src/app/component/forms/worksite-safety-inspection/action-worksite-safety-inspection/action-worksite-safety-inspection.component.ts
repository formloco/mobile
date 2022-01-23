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

  discrepancyForm: FormGroup

  constructor(
    private store: Store,
    public appService: AppService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private apiService: ApiService) { 
    this.discrepancyForm = this.formBuilder.group({
      Discrepancy: []
    })
  }

  ngOnInit(): void {
    this.discrepancyForm.controls['Discrepancy'].setValue(this.form.discrepancy.Discrepancy)
  }

  signForm() {
    const user = this.store.selectSnapshot(AuthState.user)
    const notification = this.store.selectSnapshot(NotificationState.notification)
    console.log(notification)
    let obj = {
      docID: 'worksite-safety-inspection',
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
