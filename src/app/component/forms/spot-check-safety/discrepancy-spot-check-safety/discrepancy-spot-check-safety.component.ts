import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Select, Store } from '@ngxs/store'
import { Observable } from 'rxjs';
import { CommentComponent } from 'src/app/component/comment/comment.component';
import { CorrectiveActionComponent } from 'src/app/component/corrective-action/corrective-action.component';
import { CorrectiveActionState } from 'src/app/component/corrective-action/state/corrective-action.state';

import { CommentState } from '../../../comment/state/comment.state'

@Component({
  selector: 'app-discrepancy-spot-check-safety',
  templateUrl: './discrepancy-spot-check-safety.component.html',
  styleUrls: ['./discrepancy-spot-check-safety.component.scss']
})
export class DiscrepancySpotCheckSafetyComponent {

  @Input() discrepancyForm
  @Select(CorrectiveActionState.correctiveActions) correctiveActions$: Observable<any[]>
 
  discrepancyComments

  constructor(
    private store: Store,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.store.select(CommentState.comments).subscribe((comments:any) => {
      console.log(comments)

      this.discrepancyComments = comments

      let commentStr = ''
      comments.forEach(comment => {
        commentStr = commentStr + comment.label + ': ' + comment.text + ', '
      })
      commentStr = commentStr.slice(0, -2)
      this.discrepancyForm.controls['Discrepancy'].setValue(commentStr)
    })
  }

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
