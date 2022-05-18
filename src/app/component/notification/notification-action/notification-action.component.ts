import { Component, Inject } from '@angular/core'

import { Observable } from 'rxjs'

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'

import { AppService } from "../../../service/app.service"
import { ApiService } from '../../../service/api.service'

import { Store, Select } from '@ngxs/store'
import { SetPage, SetChildPageLabel } from '../../../state/auth/auth-state.actions'

import { environment } from '../../../../environments/environment'

import { AuthState } from '../../../state/auth/auth.state'
import { DeviceState } from "../../../state/device/device.state"

import { NotificationState } from '../../../state/notification/notification.state'
@Component({
  selector: 'app-notification-action',
  templateUrl: './notification-action.component.html',
  styleUrls: ['./notification-action.component.scss']
})

export class NotificationActionComponent {

  @Select(DeviceState.pics) pics$: Observable<[]>

  picArray = []
  kioske = environment.kioske

  constructor(
    private store: Store,
    public appService: AppService,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NotificationActionComponent>
  ) { }

  openPdf() {
    this.apiService.getPDF(this.data.notification.pdf)
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
      this.appService.initializeMyNotifications()
      this.store.dispatch(new SetPage('home'))
      this.store.dispatch(new SetChildPageLabel('Forms'))
      this.dialogRef.close()
      this.snackBar.open(res.message, 'Success', {
        duration: 3000,
        verticalPosition: 'bottom'
      })
    })

  }

}
