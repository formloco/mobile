import { Component, ViewContainerRef, Inject } from "@angular/core"

import * as _ from 'lodash'

import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"

import { Subject, Observable } from 'rxjs'
import { WebcamImage } from 'ngx-webcam'

import { PicsComponent } from '../pics/pics.component'
import { Store, Select } from '@ngxs/store'
import { DeviceState } from '../../state/device/device.state'
import { SetPics } from '../../state/device/device-state.actions'

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent {

  @Select(DeviceState.pics) pics$: Observable<[]>

  public webcamImage: WebcamImage = null;
  private trigger: Subject<void> = new Subject<void>();

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  
  WIDTH = window.innerWidth
  HEIGHT = window.innerHeight

  idx
  pics
  isDelete = false

  constructor(
    private store: Store,
    private bottomSheet: MatBottomSheet,
    public viewContainerRef: ViewContainerRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CameraComponent>) {}

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage
    this.pics = _.cloneDeep(this.store.selectSnapshot(DeviceState.pics))
    this.pics.push(this.webcamImage.imageAsDataUrl)
    this.store.dispatch(new SetPics(this.pics))
  }

  deletePhoto() {
    this.pics = this.store.selectSnapshot(DeviceState.pics)
    this.pics.splice(this.idx,1)
    this.store.dispatch(new SetPics(this.pics))
    this.isDelete = false
  }

  selectPhoto(idx: number) {
    this.idx = idx
    this.isDelete = true
  }

  showPhotos() {
    this.bottomSheet.open(PicsComponent)
  }

}
