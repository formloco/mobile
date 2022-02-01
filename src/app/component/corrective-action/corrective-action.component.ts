import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { AppService } from 'src/app/service/app.service';
import { CorrectiveActionState } from '../corrective-action/state/corrective-action.state';

import * as _ from 'lodash'
import { SetCorrectiveActions } from './state/corrective-action.actions';

@Component({
  selector: 'app-corrective-action',
  templateUrl: './corrective-action.component.html',
  styleUrls: ['./corrective-action.component.scss']
})
export class CorrectiveActionComponent implements OnInit {

  @Input() correctiveActionForm
  
  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<CorrectiveActionComponent>,
    private formBuilder: FormBuilder,
    public appService: AppService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.correctiveActionForm = this.formBuilder.group({
      CorrectiveActionRequired: [],
      DateCorrectiveActionToBeCompleted: [],
      PersonResonsibleCorrectiveAction: [],
      DateCorrectiveActionCompleted: [],
      PersonResonsible: []
    })
  }

  ngOnInit(): void {
    const correctiveActions = this.store.selectSnapshot(CorrectiveActionState.correctiveActions)
    const correctiveAction = correctiveActions.filter(c => c.field == this.data.field)
    if (correctiveAction.length > 0) {
      this.correctiveActionForm.controls['DateCorrectiveActionToBeCompleted'].setValue(correctiveAction[0].dateToComplete)
      this.correctiveActionForm.controls['CorrectiveActionRequired'].setValue(correctiveAction[0].correctiveActionRequired)
      this.correctiveActionForm.controls['PersonResonsibleCorrectiveAction'].setValue(correctiveAction[0].personResponsible)
      this.correctiveActionForm.controls['DateCorrectiveActionCompleted'].setValue(correctiveAction[0].dateCompleted)
      this.correctiveActionForm.controls['PersonResonsible'].setValue(correctiveAction[0].signature)
    }
  }

  save() {
    debugger
    const correctiveActions = _.cloneDeep(this.store.selectSnapshot(CorrectiveActionState.correctiveActions))
    const correctiveActionIdx = correctiveActions.findIndex(c => c.field == this.data.field)
    
    if (correctiveActionIdx == -1) 
      correctiveActions.push({
        label: this.data.label,
        dateToComplete: this.correctiveActionForm.controls['DateCorrectiveActionToBeCompleted'].value,
        correctiveActionRequired: this.correctiveActionForm.controls['CorrectiveActionRequired'].value,
        personResponsible: this.correctiveActionForm.controls['PersonResonsibleCorrectiveAction'].value,
        dateCompleted: this.correctiveActionForm.controls['DateCorrectiveActionCompleted'].value,
        signature: this.correctiveActionForm.controls['PersonResonsible'].value,
        field: this.data.field,
        type: this.data.type
      })
    else {
      correctiveActions[correctiveActionIdx].dateToComplete = this.correctiveActionForm.controls['DateCorrectiveActionToBeCompleted'].value
      correctiveActions[correctiveActionIdx].correctiveActionRequired = correctiveActions[correctiveActionIdx].correctiveActionRequired + this.correctiveActionForm.controls['CorrectiveActionRequired'].value
      correctiveActions[correctiveActionIdx].personResponsible = correctiveActions[correctiveActionIdx].personResponsible + this.correctiveActionForm.controls['PersonResonsibleCorrectiveAction'].value
      correctiveActions[correctiveActionIdx].dateCompleted = this.correctiveActionForm.controls['DateCorrectiveActionCompleted'].value
      correctiveActions[correctiveActionIdx].signature = correctiveActions[correctiveActionIdx].signature + this.correctiveActionForm.controls['PersonResonsible'].value
    }  
    
    this.store.dispatch(new SetCorrectiveActions(correctiveActions))
    this.dialogRef.close()
  }

  openVoice(formField, title) {
    this.appService.popVoiceDialog(this.correctiveActionForm, formField, title)
  }

}
