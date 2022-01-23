import { Component, Inject } from "@angular/core"
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"

import { Observable } from 'rxjs'
import { Store, Select } from '@ngxs/store'
import { DeviceState } from '../../state/device/device.state'
import { SetPics } from '../../state/device/device-state.actions'

@Component({
  selector: 'app-pic-delete',
  templateUrl: './pic-delete.component.html',
  styleUrls: ['./pic-delete.component.scss']
})
export class PicDeleteComponent {

  @Select(DeviceState.pics) pics$: Observable<[]>

  pics

  constructor(
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PicDeleteComponent>
  ) { }

  deletePhoto() {
    this.pics = this.store.selectSnapshot(DeviceState.pics)
    this.pics.splice(this.data,1)
    this.store.dispatch(new SetPics(this.pics))
    // this.stateService.state.pics.splice(this.data,1)
    // this.dialogRef.close()
  }

}
