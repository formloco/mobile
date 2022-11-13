import { Component, OnInit, Input } from '@angular/core'

import { MatDialogConfig, MatDialog } from "@angular/material/dialog"
import { MatBottomSheet } from '@angular/material/bottom-sheet'

import { Observable } from 'rxjs'
import { Store, Select } from '@ngxs/store'

import { WorksiteSafetyInspectionState } from '../state/worksite-safety-inspection.state'
import { SetIsGroundwork } from '../state/worksite-safety-inspection-state.actions'

import { CommentComponent } from '../../../comment/comment.component'
import { SetTypeFilter } from '../../../comment/state/comment.actions'

import { GroundFormLabels } from '../state/worksite-safety-inspection-state.model'

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
    }
    
    toggle(toggle) {
      this.store.dispatch(new SetIsGroundwork(toggle))
    }
    
    clearFields() {
      console.log(this.groundForm.controls)
      this.groundForm.controls['DoesTheProjectInvolveGroundDisturbance'].patchValue('')
      this.groundForm.controls['GroundDisturbanceChecklistIsInPlace'].patchValue('')
      this.groundForm.controls['OneCallNotificationHasBeenRegistered'].patchValue('')
      this.groundForm.controls['AllUndergroundLinesWithinFiveMetresOfTheWorkAreaManuallyExposed'].patchValue('')
      this.groundForm.controls['ThirtyMetreSearchAreaAroundTheWorkAreaClearlyDefined'].patchValue('')
      this.groundForm.controls['ThirdPartyLineLocatesCompletedWithinTheSearchArea'].patchValue('')
      this.groundForm.controls['AllRequiredCrossingOrProximityAgreementsInPlace'].patchValue('')
    }
    
    openComment(label, field) {
      const dialogConfig = new MatDialogConfig()
      dialogConfig.width = '100%'
      dialogConfig.data = { title: 'Ground Disturbance', label: label, field: field, type: 'isGroundwork' }
      this.dialog.open(CommentComponent, dialogConfig)
    }

}
