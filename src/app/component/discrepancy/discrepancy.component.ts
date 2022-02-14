import { Component } from '@angular/core'

import { MatDialog, MatDialogConfig } from '@angular/material/dialog'

import { Select } from '@ngxs/store'
import { Observable } from 'rxjs'
import { CommentComponent } from 'src/app/component/comment/comment.component'
import { CorrectiveActionComponent } from 'src/app/component/corrective-action/corrective-action.component'

import { CommentState } from '../comment/state/comment.state'
import { AuthState } from '../../state/auth/auth.state'

@Component({
  selector: 'app-discrepancy',
  templateUrl: './discrepancy.component.html',
  styleUrls: ['./discrepancy.component.scss']
})
export class DiscrepancyComponent {

  @Select(AuthState.selectedForm) selectedForm$: Observable<any>
  @Select(CommentState.comments) comments$: Observable<any[]>
  @Select(CommentState.commentLabel) label$: Observable<string>

  constructor(
    private dialog: MatDialog
  ) { }

  openComment(label, field) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '100%'
    dialogConfig.data = { title: label, label: label, field: field, type: 'isSpotCheckSafety' }
    this.dialog.open(CommentComponent, dialogConfig)
  }

  openCorrectiveActionDialog(comment) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.maxWidth = '100vw'
    dialogConfig.maxHeight = '100vh'
    dialogConfig.width = '100vw'
    dialogConfig.height = '100vh'
    dialogConfig.data = { title: comment.label, label: comment.label, field: comment.field, type: comment.type }
    this.dialog.open(CorrectiveActionComponent, dialogConfig)
  }
}
