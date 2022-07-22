import { Component, Input, OnInit } from '@angular/core'

import { MatDialogConfig, MatDialog } from "@angular/material/dialog"
import { MatBottomSheet } from '@angular/material/bottom-sheet'

import { Observable } from 'rxjs'
import { Store, Select } from '@ngxs/store'

import { WorksiteSafetyInspectionState } from '../state/worksite-safety-inspection.state'
import { SetIsConfinedSpace } from '../state/worksite-safety-inspection-state.actions'

import { CommentComponent } from '../../../comment/comment.component'
import { SetTypeFilter } from '../../../comment/state/comment.actions'

import { ConfinedSpaceLabels } from '../state/worksite-safety-inspection-state.model'

@Component({
  selector: 'app-worksite-safety-confined-space',
  templateUrl: './worksite-safety-confined-space.component.html',
  styleUrls: ['./worksite-safety-confined-space.component.scss']
})
export class WorksiteSafetyConfinedSpaceComponent implements OnInit {

  @Select(WorksiteSafetyInspectionState.isConfinedSpace) isConfinedSpace$: Observable<string>

  @Input() confinedSpaceForm

  label = ConfinedSpaceLabels
  
  constructor(
    private store: Store,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.store.dispatch(new SetTypeFilter('isConfinedSpace'))
    // this.confinedSpaceForm.controls['DoesTheProjectInvolveConfinedSpaceEntry'].patchValue('yes')
  }

  toggle(toggle) {
    this.store.dispatch(new SetIsConfinedSpace(toggle))
  }

  openComment(label, field) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '100%'
    dialogConfig.data = { title: 'Confined Space Entry', label: label, field: field, type: 'isFireExtinguisher' }
    this.dialog.open(CommentComponent, dialogConfig)
  }

}

