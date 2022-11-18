import { Component, Input, OnInit } from '@angular/core'

import { MatDialogConfig, MatDialog } from "@angular/material/dialog"
import { MatBottomSheet } from '@angular/material/bottom-sheet'

import { Observable } from 'rxjs'
import { Store, Select } from '@ngxs/store'

import { WorksiteSafetyInspectionState } from '../state/worksite-safety-inspection.state'
import { SetIsFireExtinguisher } from '../state/worksite-safety-inspection-state.actions'

import { CommentComponent } from '../../../comment/comment.component'
import { CommentState } from '../../../comment/state/comment.state'
import { SetTypeFilter } from '../../../comment/state/comment.actions'

import { FireExtinguisherFormLabels } from '../state/worksite-safety-inspection-state.model'
import { BottomSheetWorksiteSafetyInspectionComponent } from '../bottom-sheet-worksite-safety-inspection/bottom-sheet-worksite-safety-inspection.component'

@Component({
  selector: 'app-worksite-fire-extinguisher',
  templateUrl: './worksite-fire-extinguisher.component.html',
  styleUrls: ['./worksite-fire-extinguisher.component.scss']
})
export class WorksiteFireExtinguisherComponent implements OnInit {

  @Select(WorksiteSafetyInspectionState.isFireExtinguisher) isFireExtinguisher$: Observable<string>

  @Input() fireExtinguisherForm

  label = FireExtinguisherFormLabels
  
  constructor(
    private store: Store,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.store.dispatch(new SetTypeFilter('isFireExtinguisher'))
    // this.fireExtinguisherForm.controls['TwentyPoundMinimumFireExtinguisherAvailable'].patchValue('yes')
  }

  toggle(toggle) {
    this.store.dispatch(new SetIsFireExtinguisher(toggle))
    if (toggle) {
      const comments:any = this.store.selectSnapshot(CommentState.commentsByType)
      if (comments.length > 0) this.bottomSheet.open(BottomSheetWorksiteSafetyInspectionComponent)
    }
    if (!toggle) {
      this.openComment(this.label.TwentyPoundMinimumFireExtinguisherAvailable, 'TwentyPoundMinimumFireExtinguisherAvailable')
    }
  }

  clearFields() {
    this.fireExtinguisherForm.controls['FireExtinguisherInspected'].patchValue('')
    this.fireExtinguisherForm.controls['FireExtinguisherVisibleUnobstructed'].patchValue('')
    this.fireExtinguisherForm.controls['FireExtinguisherCharged'].patchValue('')
    this.fireExtinguisherForm.controls['FireExtinguisherSafetyPinSecured'].patchValue('')
    this.fireExtinguisherForm.controls['FireExtinguisherOperatingInstructions'].patchValue('')
    this.fireExtinguisherForm.controls['FireExtinguisherNoVisibleDamage'].patchValue('')
    this.fireExtinguisherForm.controls['FireExtinguisherCertification'].patchValue('')

  }

  openComment(label, field) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '100%'
    dialogConfig.data = { title: 'Fire Extinguisher', label: label, field: field, type: 'isFireExtinguisher' }
    this.dialog.open(CommentComponent, dialogConfig)
  }

}
