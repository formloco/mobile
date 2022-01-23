import { Component, OnInit, Input } from '@angular/core'

import { MatDialogConfig, MatDialog } from "@angular/material/dialog"

import { CommentComponent } from '../../../comment/comment.component'

import { EquipmentLabels } from '../state/worksite-safety-inspection-state.model'

@Component({
  selector: 'app-worksite-safety-equipment',
  templateUrl: './worksite-safety-equipment.component.html',
  styleUrls: ['./worksite-safety-equipment.component.scss']
})
export class WorksiteSafetyEquipmentComponent implements OnInit {

  @Input() equipmentForm

  label = EquipmentLabels

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {}

  openComment(label, field) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '100%'
    dialogConfig.data = {title: 'Summit Vehicles & Equipment', label: label, field: field, type: 'isSummitVehicleEquipment'}
    this.dialog.open(CommentComponent, dialogConfig)
  }

}

