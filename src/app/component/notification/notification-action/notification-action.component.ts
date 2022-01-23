import { Component, Inject, OnInit } from '@angular/core'

import { Observable } from 'rxjs'
import { MatBottomSheet } from '@angular/material/bottom-sheet'

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

import { ApiService } from '../../../service/api.service'
import { IdbCrudService } from "../../../service-idb/idb-crud.service"

import { Store, Select } from '@ngxs/store'
import { SetPics } from '../../../state/device/device-state.actions'
import { SetSelectedForm } from '../../../state/auth/auth-state.actions'
import { DeviceState } from "../../../state/device/device.state"
import { NotificationState } from '../../../state/notification/notification.state'

import { PicsComponent } from '../../pics/pics.component'

@Component({
  selector: 'app-notification-action',
  templateUrl: './notification-action.component.html',
  styleUrls: ['./notification-action.component.scss']
})

export class NotificationActionComponent implements OnInit{

  @Select(DeviceState.pics) pics$: Observable<[]>

  picArray = []

  constructor(
    private store: Store,
    private apiService: ApiService,
    private bottomSheet: MatBottomSheet,
    private idbCrudService: IdbCrudService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NotificationActionComponent>
  ) { }

  ngOnInit() {
    console.log(this.data)
    const notification = this.store.selectSnapshot(NotificationState.notification)
    console.log(notification)
    this.idbCrudService.readAll('form').subscribe((forms:any) => {

      const form = forms.find(f => f.form_id == notification.form_id)
      this.store.dispatch(new SetSelectedForm(form))

      this.idbCrudService.readAll('pics').subscribe((pics:any) => {
        console.log(pics)
        this.picArray = pics.find(p => p.id == notification.pdf)
        if (this.picArray) this.store.dispatch(new SetPics(this.picArray["pics"]))
      })
    })
  }

  openPdf() {
    this.apiService.getPDF(this.data.notification.pdf)
  }

  openImage() {
    this.bottomSheet.open(PicsComponent)
  }

  close() {
    this.dialogRef.close()
  }

}
