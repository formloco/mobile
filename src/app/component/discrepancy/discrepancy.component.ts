import { Component, Input, OnInit } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CommentComponent } from 'src/app/component/comment/comment.component';
import { CorrectiveActionComponent } from 'src/app/component/corrective-action/corrective-action.component';

import { CommentState } from '../comment/state/comment.state';
import { AuthState } from '../../state/auth/auth.state';

@Component({
  selector: 'app-discrepancy',
  templateUrl: './discrepancy.component.html',
  styleUrls: ['./discrepancy.component.scss'],
})
export class DiscrepancyComponent implements OnInit {
  @Select(AuthState.selectedForm) selectedForm$: Observable<any>;
  @Select(CommentState.comments) comments$: Observable<any[]>;
  @Select(CommentState.comments) discrepancies$: Observable<any[]>;
  @Select(CommentState.commentLabel) label$: Observable<string>;
  @Select(AuthState) state$: Observable<any[]>;

  constructor(private dialog: MatDialog, private store: Store) {}

  @Input() step: number;
  ngOnInit(): void {}

  openComment(label, field) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '100%';
    dialogConfig.data = {
      title: label,
      label: label,
      field: field,
      type: 'isSpotCheckSafety',
    };
    this.dialog.open(CommentComponent, dialogConfig);
  }

  openCorrectiveActionDialog(comment) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.width = '100vw';
    dialogConfig.height = '100vh';
    dialogConfig.data = {
      label: comment.label,
      field: comment.field,
      type: comment.type,
      actionItem: comment.text,
    };
    this.dialog.open(CorrectiveActionComponent, dialogConfig);
  }

  isCommentTab = (step: number) => {
    if (step === 8 || step === 2 || step === 10) return true;
  };

  isDiscrepancy(comment) {
    return comment.discrepancy
  }
}
