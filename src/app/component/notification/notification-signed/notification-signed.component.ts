import { Component, Output, EventEmitter } from '@angular/core'

import { MatBottomSheet } from '@angular/material/bottom-sheet'

import { Observable } from 'rxjs'
import { FormControl } from "@angular/forms"
import { Store, Select } from '@ngxs/store'

import { IdbCrudService } from "../../../service-idb/idb-crud.service"

import { NotificationState } from '../../../state/notification/notification.state'
import { SetNotification } from '../../../state/notification/notification-state.actions'

import { PicsComponent } from '../../pics/pics.component'

@Component({
  selector: 'app-notification-signed',
  templateUrl: './notification-signed.component.html',
  styleUrls: ['./notification-signed.component.scss']
})
export class NotificationSignedComponent {

  @Output() save = new EventEmitter<any>()
  @Output() pdf = new EventEmitter<any>()
  @Output() pic = new EventEmitter<any>()

  @Select(NotificationState.notificationSigned) notificationSigned$: Observable<string>

  public msgSigned = new FormControl([''])

  constructor(
    private store: Store,
    private bottomSheet: MatBottomSheet,
    private idbCrudService: IdbCrudService) {}

  openPdf(notification) {
    this.store.dispatch(new SetNotification(notification))
    this.pdf.emit()
  }

}

