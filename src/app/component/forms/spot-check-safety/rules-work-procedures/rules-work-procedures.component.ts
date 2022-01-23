import { Component, Input } from '@angular/core';

import { MatDialogConfig, MatDialog } from "@angular/material/dialog"

import { CommentComponent } from '../../../comment/comment.component'

import { AppService } from "../../../../service/app.service"
import { CommentService } from "../../../comment/service/comment.service"

@Component({
  selector: 'app-rules-work-procedures',
  templateUrl: './rules-work-procedures.component.html',
  styleUrls: ['./rules-work-procedures.component.scss']
})
export class RulesWorkProceduresComponent {

  @Input() rulesForm

  constructor(
    private dialog: MatDialog,
    public appService: AppService,
    public commentService: CommentService) { }

  ngOnInit(): void {
  }

  openVoice(formField, title) {
    this.appService.popVoiceDialog(this.rulesForm, formField, title)
  }

  openComment(label, field) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '100%'
    dialogConfig.data = { title: label, label: label, field: field, type: 'isSpotCheckSafety' }
    this.dialog.open(CommentComponent, dialogConfig)
  }

  toggle(field) {
    this.commentService.bottomSheetComment(field, this.rulesForm)
  }

}
