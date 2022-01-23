import { Component, ViewContainerRef, Inject } from "@angular/core"

import { MatDialogConfig, MatDialog } from "@angular/material/dialog"
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet'

import { Observable } from 'rxjs'
import { WebcamImage } from 'ngx-webcam'

import { PicDeleteComponent } from '../pic-delete/pic-delete.component'

import { Select } from '@ngxs/store'
import { AuthState } from '../../state/auth/auth.state'
import { DeviceState } from '../../state/device/device.state'

@Component({
  selector: 'app-pics',
  templateUrl: './pics.component.html',
  styleUrls: ['./pics.component.scss']
})
export class PicsComponent {

  @Select(DeviceState.pics) pics$: Observable<[]>
  @Select(AuthState.selectedForm) selectedForm$: Observable<string>

  public webcamImage: WebcamImage = null
  
  WIDTH = window.innerWidth
  HEIGHT = window.innerHeight

  idx
  hidden = false
  public isChangedBlock = {}

  constructor(
    private dialog: MatDialog,
    public viewContainerRef: ViewContainerRef,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    public matBottomSheetRef: MatBottomSheetRef<PicsComponent>) { }

  selectPhoto(idx: number) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '100%'
    dialogConfig.data = idx
    const dialogRef = this.dialog.open(PicDeleteComponent, dialogConfig)
  }

  close() {
    this.matBottomSheetRef.dismiss()
  }

}
