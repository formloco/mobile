import { Component, Input } from '@angular/core'

import { MatDialogConfig, MatDialog } from "@angular/material/dialog"

import { CommentComponent } from '../../../comment/comment.component'
import { AppService } from "../../../../service/app.service"
import { CommentService } from "../../../comment/service/comment.service"

@Component({
  selector: 'app-safety-equipment',
  templateUrl: './safety-equipment.component.html',
  styleUrls: ['./safety-equipment.component.scss']
})
export class SafetyEquipmentComponent {

  @Input() safetyEquipmentForm

  constructor(
    private dialog: MatDialog,
    public appService: AppService,
    public commentService: CommentService) { }

  openVoice(formField, title) {
    this.appService.popVoiceDialog(this.safetyEquipmentForm, formField, title)
  }

  toggle(field) {
    this.commentService.bottomSheetComment(field, this.safetyEquipmentForm)
  }

  openComment(label, field) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '100%'
    dialogConfig.data = { title: 'Safety Equipment', label: label, field: field, type: 'isSpotCheckSafety' }
    this.dialog.open(CommentComponent, dialogConfig)
  }
  

  openDiscrepancy(label, field, discrepancy) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '100%'
    dialogConfig.data = { title: 
      'Safety Equipment', 
      label, 
      field, 
      type: 'isSpotCheckSafety', 
      discrepancy }
    this.dialog.open(CommentComponent, dialogConfig)
  }

}
