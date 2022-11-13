import { Component, Input, OnInit } from '@angular/core'

import { MatDialogConfig, MatDialog } from "@angular/material/dialog"
import { MatBottomSheet } from '@angular/material/bottom-sheet'

import { Observable } from 'rxjs'
import { Store, Select } from '@ngxs/store'

import { WorksiteSafetyInspectionState } from '../state/worksite-safety-inspection.state'
import { SetIsHotwork } from '../state/worksite-safety-inspection-state.actions'

import { CommentComponent } from '../../../comment/comment.component'
import { SetTypeFilter } from '../../../comment/state/comment.actions'

import { HotWorkLabels } from '../state/worksite-safety-inspection-state.model'

@Component({
  selector: 'app-worksite-safety-hot-work',
  templateUrl: './worksite-safety-hot-work.component.html',
  styleUrls: ['./worksite-safety-hot-work.component.scss']
})
export class WorksiteSafetyHotWorkComponent implements OnInit {

  @Select(WorksiteSafetyInspectionState.isHotwork) isHotwork$: Observable<string>

  @Input() hotWorkForm

  label = HotWorkLabels
  
  constructor(
    private store: Store,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.store.dispatch(new SetTypeFilter('isFireExtinguisher'))
    // this.hotWorkForm.controls['DoesTheProjectInvolveHotWork'].patchValue('yes')
  }

  toggle(toggle) {
    this.store.dispatch(new SetIsHotwork(toggle))
  }

  clearFields() {
    this.hotWorkForm.controls['HotWorkPermitIssued'].patchValue('')
    this.hotWorkForm.controls['FireHazardsIdentifiedControls'].patchValue('')
    this.hotWorkForm.controls['FireSafetyWatchAvailable'].patchValue('')
  }

  openComment(label, field) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '100%'
    dialogConfig.data = { title: 'Fire Extinguisher', label: label, field: field, type: 'isFireExtinguisher' }
    this.dialog.open(CommentComponent, dialogConfig)
  }

}

