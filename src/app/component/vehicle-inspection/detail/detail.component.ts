import { Component, Input, OnInit } from '@angular/core'

import { FormControl } from '@angular/forms'

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog'

import { AppService } from "../../../service/app.service"

import { DiscrepancyDetailComponent } from '../discrepancy-detail/discrepancy-detail.component'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  @Input() detailForm

  yAxis = 0
  xAxis = 0

  // formControlName
  isHistory = false
  myInnerWidth = window.innerWidth - 30

  constructor(
    private dialog: MatDialog,
    public appService: AppService) { }

  ngOnInit() {

  }

  openComments(item) {
    console.log(item)
    // this.detailForm.controls[item].setValue(true);
    // this.detailForm.pathValue({item: true})
    let comments = ''
    if (!this.detailForm.controls[item].value) comments = this.detailForm.controls[item+'Comments'].value
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minHeight = 200;
    dialogConfig.minWidth = window.innerWidth;
    dialogConfig.data = {
      detailForm: this.detailForm,
      formControlName: item+'Comments',
      formControlValue: comments
    };
    const dialogRef = this.dialog.open(DiscrepancyDetailComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(data => {
    })
  }

  closeOverlay() {
    this.isHistory = false
  }

}
