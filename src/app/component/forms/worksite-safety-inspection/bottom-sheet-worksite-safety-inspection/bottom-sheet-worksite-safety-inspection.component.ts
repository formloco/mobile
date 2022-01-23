import { Component } from '@angular/core'

import { Store } from '@ngxs/store'

import { CommentState } from '../../../comment/state/comment.state'
import { ResetTypeComments } from '../../../comment/state/comment.actions'

import { MatBottomSheetRef } from '@angular/material/bottom-sheet'

@Component({
  selector: 'app-bottom-sheet-worksite-safety-inspection',
  templateUrl: './bottom-sheet-worksite-safety-inspection.component.html',
  styleUrls: ['./bottom-sheet-worksite-safety-inspection.component.scss']
})
export class BottomSheetWorksiteSafetyInspectionComponent {

  constructor(private store: Store, private bottomSheetRef: MatBottomSheetRef<BottomSheetWorksiteSafetyInspectionComponent>) { }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss()
    event.preventDefault()
  }

  close() {
    this.bottomSheetRef.dismiss()
  }

  deleteComments() {
    this.store.dispatch(new ResetTypeComments(this.store.selectSnapshot(CommentState.commentType)))
    this.close()
  }

}
