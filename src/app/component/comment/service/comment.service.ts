import { Injectable } from '@angular/core'

import { Store } from '@ngxs/store'

import { CommentState } from '../state/comment.state'
import { SetComments } from '../state/comment.actions'
import { MatBottomSheet } from '@angular/material/bottom-sheet'

import { BottomSheetCommentComponent } from '../bottom-sheet-comment/bottom-sheet-comment.component'

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private store: Store,
    private bottomSheet: MatBottomSheet) { }

  bottomSheetComment(field, form) {
    const comments: any = this.store.selectSnapshot(CommentState.comments)
    const comment = comments.filter(c => c.field == field)
    if (comment.length > 0) {
      this.bottomSheet.open(BottomSheetCommentComponent, {
        data: { comment: comment }
      }).afterDismissed().subscribe(isSatisfactory => {
        if (isSatisfactory) form.controls[field].setValue('satisfactory')
        else form.controls[field].setValue('unsatisfactory')
      })
    }
  }

}
