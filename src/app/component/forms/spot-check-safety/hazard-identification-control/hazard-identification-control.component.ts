import { Component, Input } from '@angular/core'

import { MatDialogConfig, MatDialog } from "@angular/material/dialog"

import { AppService } from "../../../../service/app.service"
import { CommentService } from "../../../comment/service/comment.service"
import { CommentComponent } from '../../../comment/comment.component'

@Component({
  selector: 'app-hazard-identification-control',
  templateUrl: './hazard-identification-control.component.html',
  styleUrls: ['./hazard-identification-control.component.scss']
})
export class HazardIdentificationControlComponent {

  @Input() hazardForm

  constructor(
    private dialog: MatDialog,
    public appService: AppService,
    public commentService: CommentService) { }

  openVoice(formField) {
    this.appService.popVoiceDialog(this.hazardForm, formField, 'Hazard Identification & Control Comments')
  }

  openComment(label, field) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '100%'
    dialogConfig.data = { 
      title: 'Hazard Identification & Control', 
      label: label, 
      field: field, 
      type: 'isHazardIdentification' 
    }
    this.dialog.open(CommentComponent, dialogConfig)
  }
  
  openDiscrepancy(label, field, discrepancy: boolean) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '100%'
    dialogConfig.data = { 
      title: 'Hazard Identification & Control', 
      label, 
      field, 
      type: 'isHazardIdentification',
      discrepancy
    }
    this.dialog.open(CommentComponent, dialogConfig)
  }

  toggle(field) {
    this.commentService.bottomSheetComment(field, this.hazardForm)
  }

}
