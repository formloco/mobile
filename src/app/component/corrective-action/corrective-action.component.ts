import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { AppService } from 'src/app/service/app.service';
import { AuthState } from '../../state/auth/auth.state';

import { CorrectiveActionState } from '../corrective-action/state/corrective-action.state';

import * as _ from 'lodash';
import { SetCorrectiveActions } from './state/corrective-action.actions';
import { AutoCompleteService } from '../../service/auto-complete.service';
@Component({
  selector: 'app-corrective-action',
  templateUrl: './corrective-action.component.html',
  styleUrls: ['./corrective-action.component.scss'],
})
export class CorrectiveActionComponent implements OnInit {
  @Input() correctiveActionForm;

  isResetDateCompleted = false;

  constructor(
    private store: Store,
    public appService: AppService,
    private formBuilder: FormBuilder,
    public autoCompleteService: AutoCompleteService,
    public dialogRef: MatDialogRef<CorrectiveActionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.correctiveActionForm = this.formBuilder.group({
      CorrectiveActionRequired: [],
      DateCorrectiveActionToBeCompleted: [],
      PersonResponsibleCorrectiveAction: [],
      DateCorrectiveActionCompleted: [],
      PersonResponsible: [],
    });
  }

  ngOnInit(): void {
    const correctiveActions = this.store.selectSnapshot(
      CorrectiveActionState.correctiveActions
    );
    const correctiveAction = correctiveActions?.filter(
      (c) => c.field == this.data.field
    );

    if (correctiveAction?.length > 0) {
      if (correctiveAction[0].dateCompleted) this.isResetDateCompleted = true;
      this.correctiveActionForm.controls[
        'DateCorrectiveActionToBeCompleted'
      ].setValue(correctiveAction[0].dateToComplete);
      this.correctiveActionForm.controls['CorrectiveActionRequired'].setValue(
        correctiveAction[0].correctiveActionRequired
      );
      this.correctiveActionForm.controls[
        'PersonResponsibleCorrectiveAction'
      ].setValue(correctiveAction[0].personResponsible);
      this.correctiveActionForm.controls[
        'DateCorrectiveActionCompleted'
      ].setValue(correctiveAction[0].dateCompleted);
      this.correctiveActionForm.controls['PersonResponsible'].setValue(
        correctiveAction[0].signature
      );
    }
  }

  async save() {
    const correctiveActions = await _.cloneDeep(
      this.store.selectSnapshot(CorrectiveActionState.correctiveActions)
    );
    const correctiveActionIdx = correctiveActions?.findIndex(
      (c) => c.field == this.data.field
    );

    if (correctiveActionIdx == -1)
      correctiveActions.push({
        label: this.data.label,
        dateToComplete:
          this.correctiveActionForm.controls[
            'DateCorrectiveActionToBeCompleted'
          ].value,
        actionItem: this.data.actionItem,
        correctiveActionRequired:
          this.correctiveActionForm.controls['CorrectiveActionRequired'].value,
        personResponsible: this.autoCompleteService.workersControl.value,
        dateCompleted:
          this.correctiveActionForm.controls['DateCorrectiveActionCompleted']
            .value,
        field: this.data.field,
        type: this.data.type,
      });
    else {
      correctiveActions[correctiveActionIdx].dateToComplete =
        this.correctiveActionForm.controls[
          'DateCorrectiveActionToBeCompleted'
        ].value;
      correctiveActions[correctiveActionIdx].correctiveActionRequired =
        this.correctiveActionForm.controls['CorrectiveActionRequired'].value;
      correctiveActions[correctiveActionIdx].personResponsible =
        this.autoCompleteService.workersControl.value;
      correctiveActions[correctiveActionIdx].dateCompleted =
        this.correctiveActionForm.controls[
          'DateCorrectiveActionCompleted'
        ].value;
      correctiveActions[correctiveActionIdx].signature =
        this.store.selectSnapshot(AuthState.user).email;
    }
    this.store.dispatch(new SetCorrectiveActions(correctiveActions));
    this.dialogRef.close();
  }

  openVoice(formField, title) {
    this.appService.popVoiceDialog(this.correctiveActionForm, formField, title);
  }

  clearDateCompleted() {
    this.isResetDateCompleted = false;
    this.correctiveActionForm.controls['DateCorrectiveActionCompleted'].reset();
  }

  setIsResetDateCompleted() {
    this.isResetDateCompleted = true;
  }
}
