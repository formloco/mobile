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
  selector: 'app-action-vehicle-inspection',
  templateUrl: './action-vehicle-inspection.component.html',
  styleUrls: ['./action-vehicle-inspection.component.scss']
})
export class ActionVehicleInspectionComponent implements OnInit {

  @Input() form
  @Output() close = new EventEmitter()

  details
  kioske
  
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
    this.details = []
    let allDetails = []
    this.kioske = this.store.selectSnapshot(AuthState.kioske)
    Object.keys(this.form.detail).map(key => {
      allDetails.push({name:(key), value:this.form.detail[key]})
    });
    allDetails.forEach(element => {
      let name
      if (element.value === true) name = element.name

      if (name) {
        let comments= allDetails.find(d => d.name === name+'Comments')
        this.details.push({name: name, comments: comments.value})
      }
    })
    this.discrepancyForm.controls['Discrepancy'].setValue(this.form.discrepancy.Discrepancy)
  }

  signForm() {
    const user = this.store.selectSnapshot(AuthState.user)
    const notification = this.store.selectSnapshot(NotificationState.notification)
    let obj = {
      docID: 'vehicle-inspection',
      notificationID: notification.id,
      docName: notification.pdf,
      dataID: notification.data_id,
      formID: notification.form_id,
      date:  this.appService.now,
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
