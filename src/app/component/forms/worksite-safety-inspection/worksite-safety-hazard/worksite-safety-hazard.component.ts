import { Component, OnInit, Input } from '@angular/core'

import { MatDialogConfig, MatDialog } from "@angular/material/dialog"

import { CommentComponent } from '../../../comment/comment.component'

import { HazardFormLabels } from '../state/worksite-safety-inspection-state.model'

@Component({
  selector: 'app-worksite-safety-hazard',
  templateUrl: './worksite-safety-hazard.component.html',
  styleUrls: ['./worksite-safety-hazard.component.scss']
})
export class WorksiteSafetyHazardComponent implements OnInit {

  @Input() hazardForm

  label = HazardFormLabels

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {}

  openComment(label, field) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '100%'
    dialogConfig.data = {title: 'Job Site Management', label: label, field: field, type: 'isWorksiteSafetyHazard'}
    this.dialog.open(CommentComponent, dialogConfig)
  }

}
