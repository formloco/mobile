import { Component, OnInit, Inject } from '@angular/core'

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"

import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms"


@Component({
  selector: 'app-discrepancy-detail',
  templateUrl: './discrepancy-detail.component.html',
  styleUrls: ['./discrepancy-detail.component.scss']
})
export class DiscrepancyDetailComponent implements OnInit {

  detailForm: FormGroup

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DiscrepancyDetailComponent>) { 
      this.detailForm = this.data.detailForm
    }

  ngOnInit(): void {
  }

}
