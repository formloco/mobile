import { Component, Input, OnInit } from '@angular/core';

import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { Store, Select } from '@ngxs/store';

import { SpotCheckSafetyState } from '../state/spot-check-safety.state';
import {
  SetIsAppropriateTraining,
  SetIsSafetyEquipment,
} from '../state/spot-check-safety.actions';

import { CommentComponent } from '../../../comment/comment.component';
import { CommentState } from '../../../comment/state/comment.state';
import { SetTypeFilter } from '../../../comment/state/comment.actions';

import { AppService } from '../../../../service/app.service';
import { CommentService } from '../../../comment/service/comment.service';

@Component({
  selector: 'app-communication-training',
  templateUrl: './communication-training.component.html',
  styleUrls: ['./communication-training.component.scss'],
})
export class CommunicationTrainingComponent implements OnInit {
  @Select(SpotCheckSafetyState.isAppropriateTraining)
  isAppropriateTraining$: Observable<boolean>;

  @Input() communicationForm;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    public appService: AppService,
    public commentService: CommentService
  ) {}

  ngOnInit() {
    this.store.dispatch(new SetIsAppropriateTraining(true));
    this.communicationForm.controls['AppropriateTraining'].patchValue(
      'satisfactory'
    );
  }

  openVoice(formField, title) {
    this.appService.popVoiceDialog(this.communicationForm, formField, title);
  }

  toggleAppropriateTraining(field) {
    this.store.dispatch(new SetIsAppropriateTraining(true));
    const comments: any = this.store.selectSnapshot(CommentState.comments);
    const index = comments.findIndex((item) => item.field === field);
    if (index != -1)
      this.commentService.bottomSheetComment(field, this.communicationForm);
  }

  toggle(field) {
    // this.store.dispatch(new SetIsAppropriateTraining(false))
    this.commentService.bottomSheetComment(field, this.communicationForm);
  }

  openComment(label, field) {
    if (field == 'AppropriateTraining')
      this.store.dispatch(new SetIsAppropriateTraining(false));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '100%';
    dialogConfig.data = {
      label: 'Communication & Training',
      field: field,
      type: 'isSpotCheckSafety',
    };
    this.dialog.open(CommentComponent, dialogConfig);
  }

  openDiscrepancy(label, field, discrepancy) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '100%';
    dialogConfig.data = {
      title: 'Communication & Training',
      label,
      field,
      type: 'isSpotCheckSafety',
      discrepancy,
    };
    this.dialog.open(CommentComponent, dialogConfig);
  }
}
