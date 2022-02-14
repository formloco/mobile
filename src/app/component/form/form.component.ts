import { Component } from '@angular/core'

import { Observable } from 'rxjs'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MatDialogConfig, MatDialog } from "@angular/material/dialog"
import { MatBottomSheet } from '@angular/material/bottom-sheet'

import { PicsComponent } from '../pics/pics.component'
import { CameraComponent } from '../camera/camera.component'

import { Store, Select } from '@ngxs/store'
import { AuthState } from '../../state/auth/auth.state'
import { DeviceState } from '../../state/device/device.state'
import { NotificationState } from '../../state/notification/notification.state'
import { SetPage, SetChildPage, SetChildPageLabel } from '../../state/auth/auth-state.actions'

import { environment } from '../../../environments/environment'
import { ApiService } from "../../service/api.service"

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  @Select(DeviceState.pics) pics$: Observable<[]>
  @Select(AuthState.selectedForm) selectedForm$: Observable<any>
  @Select(AuthState.childPage) childPage$: Observable<any>

  runForm: FormGroup

  form
  step = 0

  tenant = environment.tenant

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private apiService: ApiService,
    private bottomSheet: MatBottomSheet) {
    this.runForm = this.fb.group({})
  }

  openPdf() {
    const notification = this.store.selectSnapshot(NotificationState.notification)
    this.apiService.getPDF(notification.pdf)
  }

  close() {
    const page = this.store.selectSnapshot(AuthState.page)
    const childPage = this.store.selectSnapshot(AuthState.childPage)

    if (page == 'form') {
      this.store.dispatch(new SetPage('home'))
      this.store.dispatch(new SetChildPageLabel('Forms'))
    }
    else {
      this.store.dispatch(new SetPage('admin'))
      this.store.dispatch(new SetChildPage('forms'))
      this.store.dispatch(new SetChildPageLabel('Forms'))
    }
    if (childPage == 'notification') {
      const childPage = this.store.selectSnapshot(AuthState.childPage)
      this.store.dispatch(new SetPage(childPage))
      this.store.dispatch(new SetChildPageLabel('Notifications'))
    }
  }

  snapShot() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.height = '100%'
    dialogConfig.width = '100%'
    dialogConfig.maxWidth = '100vw',
      dialogConfig.maxHeight = '100vh',
      dialogConfig.data = this.store.selectSnapshot(AuthState.selectedForm)
    this.dialog.open(CameraComponent, dialogConfig)
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++
  }

  prevStep() {
    this.step--
  }

  showPhotos() {
    this.bottomSheet.open(PicsComponent)
  }

}
