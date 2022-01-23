import { Component, Inject } from '@angular/core';

import * as _ from 'lodash'
import { Store } from '@ngxs/store'

import { CommentState } from '../state/comment.state'
import { SetComments } from '../state/comment.actions'

import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet'

@Component({
  selector: 'app-bottom-sheet-comment',
  templateUrl: './bottom-sheet-comment.component.html',
  styleUrls: ['./bottom-sheet-comment.component.scss']
})
export class BottomSheetCommentComponent {

  comment

  constructor(
    private store: Store, 
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any, 
    private bottomSheetRef: MatBottomSheetRef<BottomSheetCommentComponent>) { }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss()
    event.preventDefault()
  }

  close() {
    this.bottomSheetRef.dismiss(false)
  }

  deleteComment(field) {
    let comments: any = _.cloneDeep(this.store.selectSnapshot(CommentState.comments))
    const index = comments.findIndex(item => item.field === field)
    comments.splice(index, 1)
    this.store.dispatch(new SetComments(comments))
    this.bottomSheetRef.dismiss(true)
  }

}
