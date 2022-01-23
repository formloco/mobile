import { Component, Input } from '@angular/core'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'

import { AppService } from "../../../../service/app.service"

import { DetailCommentsComponent } from '../detail-comments/detail-comments.component'

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

  setCheckboxes() {
    const selectedComments = this.store.selectSnapshot(VehicleInspectionState.selectedComments)
    selectedComments.forEach(element => {
      this.detailForm.controls[element].patchValue(true)
    });
  }

  openComments(fieldName) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.minHeight = 400
    dialogConfig.minWidth = window.innerWidth
    dialogConfig.data = {
      detailForm: this.detailForm,
      fieldName: fieldName,
      formControlName: fieldName+'Comments'
    };
    const dialogRef = this.dialog.open(DetailCommentsComponent, dialogConfig).afterClosed().subscribe(() => {
      this.setCheckboxes()
    })
  }

  closeOverlay() {
    this.isHistory = false
  }

}
