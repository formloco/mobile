import { Component, Input } from '@angular/core';

import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

import { CommentComponent } from '../../../comment/comment.component';
import { AppService } from '../../../../service/app.service';
import { CommentService } from '../../../comment/service/comment.service';

@Component({
  selector: 'app-personal-protective-equipment',
  templateUrl: './personal-protective-equipment.component.html',
  styleUrls: ['./personal-protective-equipment.component.scss'],
})
export class PersonalProtectiveEquipmentComponent {
  @Input() personalEquipmentForm;

  constructor(
    private dialog: MatDialog,
    public appService: AppService,
    public commentService: CommentService
  ) {}

  openVoice(formField, title) {
    this.appService.popVoiceDialog(
      this.personalEquipmentForm,
      formField,
      title
    );
  }

  openComment(label, field) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '100%';
    dialogConfig.data = {
      title: 'Personal Protective Equipment',
      label: label,
      field: field,
      type: 'isSpotCheckSafety',
    };
    this.dialog.open(CommentComponent, dialogConfig);
  }

  openDiscrepancy(label, field, discrepancy) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '100%';
    dialogConfig.data = {
      title: 'Personal Protective Equipment',
      label,
      field,
      type: 'isSpotCheckSafety',
      discrepancy,
    };
    this.dialog.open(CommentComponent, dialogConfig);
  }
  toggle(field) {
    this.commentService.bottomSheetComment(field, this.personalEquipmentForm);
  }
}
