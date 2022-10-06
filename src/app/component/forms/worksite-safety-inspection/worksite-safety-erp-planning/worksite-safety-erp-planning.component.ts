import { Component, OnInit, Input } from '@angular/core';

import { MatDialogConfig, MatDialog } from "@angular/material/dialog"
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { Observable } from 'rxjs'
import { Store, Select } from '@ngxs/store'

import { WorksiteSafetyInspectionState } from '../state/worksite-safety-inspection.state'
import { SetIsErpPlanning } from '../state/worksite-safety-inspection-state.actions'

import { CommentComponent } from '../../../comment/comment.component'
import { CommentState } from '../../../comment/state/comment.state'
import { SetTypeFilter } from '../../../comment/state/comment.actions'

import { ErpPlanningFormLabels } from '../state/worksite-safety-inspection-state.model'
import { BottomSheetWorksiteSafetyInspectionComponent } from '../bottom-sheet-worksite-safety-inspection/bottom-sheet-worksite-safety-inspection.component'

@Component({
  selector: 'app-worksite-safety-erp-planning',
  templateUrl: './worksite-safety-erp-planning.component.html',
  styleUrls: ['./worksite-safety-erp-planning.component.scss']
})
export class WorksiteSafetyErpPlanningComponent implements OnInit {

  @Select(WorksiteSafetyInspectionState.isErpPlanning) isErpPlanning$: Observable<string>

  @Input() erpPlanningForm

  label = ErpPlanningFormLabels

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
    this.store.dispatch(new SetTypeFilter('isErpPlanning'))
  }

  toggle(toggle) {
    this.store.dispatch(new SetIsErpPlanning(toggle))
    if (toggle) {
      const comments:any = this.store.selectSnapshot(CommentState.commentsByType)
      if (comments.length > 0) this.bottomSheet.open(BottomSheetWorksiteSafetyInspectionComponent)
    }
    if (!toggle) {
      this.openComment(this.label.EmergencyResponsePlanOnSite, 'EmergencyResponsePlanOnSite')
    }
  }

  openComment(label, field) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '100%'
    dialogConfig.data = { title: 'ERP Planning', label: label, field: field, type: 'isErpPlanning' }
    this.dialog.open(CommentComponent, dialogConfig)
  }

  openDiscrepancy(label, field, discrepancy) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '100%'
    dialogConfig.data = { 
      title: 'ERP Planning', 
      label, field, 
      type: 'isErpPlanning',
      discrepancy
    }
    this.dialog.open(CommentComponent, dialogConfig)
  }

}
