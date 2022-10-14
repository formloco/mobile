import { Component, Input } from '@angular/core'

import { MatDialogConfig, MatDialog } from "@angular/material/dialog"

import { Store } from '@ngxs/store'

import { CommentComponent } from '../../../comment/comment.component'

import { AppService } from "../../../../service/app.service"
import { CommentService } from "../../../comment/service/comment.service"

@Component({
  selector: 'app-incident-reporting',
  templateUrl: './incident-reporting.component.html',
  styleUrls: ['./incident-reporting.component.scss']
})
export class IncidentReportingComponent {

  @Input() incidentForm

  constructor(
    private store: Store,
    private dialog: MatDialog,
    public appService: AppService,
    public commentService: CommentService) { }

  openVoice(formField, title) {
    this.appService.popVoiceDialog(this.incidentForm, formField, title)
  }

  openComment(label, field) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '100%'
    dialogConfig.data = { title: 'Incident Reporting', label: label, field: field, type: 'isSpotCheckSafety' }
    this.dialog.open(CommentComponent, dialogConfig)
  }
  openDiscrepancy(label, field, discrepancy) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '100%';
    dialogConfig.data = {
      title: 'Incident Reporting',
      label,
      field,
      type: 'isSpotCheckSafety',
      discrepancy,
    };
    this.dialog.open(CommentComponent, dialogConfig);
  }

  toggle(field) {
    this.commentService.bottomSheetComment(field, this.incidentForm)
  }

}
