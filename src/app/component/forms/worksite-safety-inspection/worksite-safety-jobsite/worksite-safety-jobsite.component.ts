import { Component, OnInit, Input } from '@angular/core'

import { MatDialogConfig, MatDialog } from "@angular/material/dialog"

import { CommentComponent } from '../../../comment/comment.component'

import { JobsiteFormLabels } from '../state/worksite-safety-inspection-state.model'


@Component({
  selector: 'app-worksite-safety-jobsite',
  templateUrl: './worksite-safety-jobsite.component.html',
  styleUrls: ['./worksite-safety-jobsite.component.scss'],
})
export class WorksiteSafetyJobsiteComponent implements OnInit {

  @Input() jobsiteForm

  label = JobsiteFormLabels

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }


  openComment(label, field) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '100%'
    dialogConfig.data = {title: 'Worksite Safety Hazard', label: label, field: field, type: 'isWorksiteSafetyJobsite'}
    this.dialog.open(CommentComponent, dialogConfig)
  }

}

