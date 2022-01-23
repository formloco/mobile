import { Component, OnInit, Inject } from '@angular/core'

import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef, MatDialog } from "@angular/material/dialog"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"

import { AppService } from "../../../../service/app.service"
import { CameraComponent } from '../../../camera/camera.component'

import { Store } from '@ngxs/store'
import { VehicleInspectionState } from '../state/vehicle-inspection.state'
import { SetSelectedComments } from '../state/vehicle-inspection-state.actions'

@Component({
  selector: 'app-detail-comments',
  templateUrl: './detail-comments.component.html',
  styleUrls: ['./detail-comments.component.scss']
})
export class DetailCommentsComponent implements OnInit {

  commentForm: FormGroup

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    public appService: AppService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DetailCommentsComponent>) {
    this.commentForm = this.formBuilder.group({
      comments: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.commentForm.controls['comments'].setValue(this.data.detailForm.get(this.data.formControlName).value)
  }

  snapShot() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.height = '100%'
    dialogConfig.width = '100%'
    dialogConfig.maxWidth = '100vw',
    dialogConfig.maxHeight = '100vh',
    dialogConfig.data = this.data.formControlName
    this.dialog.open(CameraComponent, dialogConfig)
  }

  save() {
    let selectedComments:any = this.store.selectSnapshot(VehicleInspectionState.selectedComments)
    const isSaved = selectedComments.find(c => c == this.data.fieldName)
    if (!isSaved) selectedComments.push(this.data.fieldName)
    this.store.dispatch(new SetSelectedComments(selectedComments))
    this.data.detailForm.controls[this.data.formControlName].setValue(this.commentForm.get('comments').value)
    this.appService.currentDetailForm = this.data.detailForm.value
    this.dialogRef.close()
  }

  delete() {
    //TODO - delete pics for formfield
    let selectedComments:any = this.store.selectSnapshot(VehicleInspectionState.selectedComments)
    const idx = selectedComments.findIndex(c => c == this.data.fieldName)
    selectedComments.splice(idx,1)
    this.store.dispatch(new SetSelectedComments(selectedComments))
    this.data.detailForm.controls[this.data.formControlName].setValue(null)
    this.dialogRef.close()
  }
}
