import { Component, OnInit, Input } from '@angular/core'

import { MatDialogConfig, MatDialog } from "@angular/material/dialog"
import { MatBottomSheet } from '@angular/material/bottom-sheet'

import { Observable } from 'rxjs'
import { Store, Select } from '@ngxs/store'

import { WorksiteSafetyInspectionState } from '../state/worksite-safety-inspection.state'
import { SetIsGroundwork } from '../state/worksite-safety-inspection-state.actions'

import { CommentComponent } from '../../../comment/comment.component'
import { CommentState } from '../../../comment/state/comment.state'
import { SetTypeFilter } from '../../../comment/state/comment.actions'

import { GroundFormLabels } from '../state/worksite-safety-inspection-state.model'
import { BottomSheetWorksiteSafetyInspectionComponent } from '../bottom-sheet-worksite-safety-inspection/bottom-sheet-worksite-safety-inspection.component'


@Component({
  selector: 'app-worksite-safety-ground',
  templateUrl: './worksite-safety-ground.component.html',
  styleUrls: ['./worksite-safety-ground.component.scss']
})
export class WorksiteSafetyGroundComponent implements OnInit {

  @Select(WorksiteSafetyInspectionState.isGroundwork) isGroundwork$: Observable<string>

  @Input() groundForm

  label = GroundFormLabels

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet) { }

    ngOnInit() {
      this.store.dispatch(new SetTypeFilter('isGroundwork'))
      this.groundForm.controls['DoesTheProjectInvolveGroundDisturbance'].patchValue('yes')
    }
  
    toggle(toggle) {
      this.store.dispatch(new SetIsGroundwork(toggle))
      // if (toggle) {
      //   const comments:any = this.store.selectSnapshot(CommentState.commentsByType)
      //   if (comments.length > 0) this.bottomSheet.open(BottomSheetWorksiteSafetyInspectionComponent)
      // }
      // if (!toggle) {
      //   this.openComment(this.label.DoesTheProjectInvolveGroundDisturbance, 'DoesTheProjectInvolveGroundDisturbance')
      // }
    }
  
    openComment(label, field) {
      const dialogConfig = new MatDialogConfig()
      dialogConfig.width = '100%'
      dialogConfig.data = { title: 'Ground Disturbance', label: label, field: field, type: 'isGroundwork' }
      this.dialog.open(CommentComponent, dialogConfig)
    }

}
