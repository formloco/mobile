import { Component, Input } from '@angular/core'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'

import { AppService } from "../../../../service/app.service"
import { CommentComponent } from '../../../comment/comment.component'

// import { DetailCommentsComponent } from '../detail-comments/detail-comments.component'

import { Store } from '@ngxs/store'
import { VehicleInspectionState } from '../state/vehicle-inspection.state'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {

  @Input() detailForm

  yAxis = 0
  xAxis = 0

  isHistory = false
  fieldName

  constructor(
    private store: Store,
    private dialog: MatDialog,
    public appService: AppService) { }

  openComment(label, field) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '100%'
    dialogConfig.data = { title: 'Vehicle Inspection Details', label: label, field: field, type: 'isVehicleInspection' }
    this.dialog.open(CommentComponent, dialogConfig).afterClosed().subscribe((isSave) => {
      this.detailForm.controls[field].patchValue(isSave)
    })
  }

  closeOverlay() {
    this.isHistory = false
  }

}
