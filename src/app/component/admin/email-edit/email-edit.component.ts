import { Component, OnInit, Inject } from '@angular/core'

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"
import { FormControl, Validators } from '@angular/forms'

import { AppService } from "../../../service/app.service"
import { AuthService } from "../../../service/auth.service"
import { SuccessService } from "../../../service/success.service"

import { Store } from '@ngxs/store'
import { AuthState } from '../../../state/auth/auth.state'
import { environment } from '../../../../environments/environment'

@Component({
  selector: 'app-email-edit',
  templateUrl: './email-edit.component.html',
  styleUrls: ['./email-edit.component.scss']
})
export class EmailEditComponent implements OnInit {

  kioske = environment.kioske

  id
  enabled
  admin
  worker
  supervisor
  disabledName
  disabledEmail

  name = new FormControl({value: null, disabled: this.kioske}, [Validators.required])
  email = new FormControl({value: null, disabled: this.kioske}, [Validators.required, Validators.email])

  constructor(
    private store: Store,
    public appService: AppService,
    private authService: AuthService,
    private successService: SuccessService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EmailEditComponent>
  ) { }

  ngOnInit(): void {
    this.id = this.appService.dataSource.data[this.data.idx]["id"]
    this.admin = this.appService.dataSource.data[this.data.idx]["admin"]
    this.worker = this.appService.dataSource.data[this.data.idx]["worker"]
    this.enabled = this.appService.dataSource.data[this.data.idx]["enabled"]
    this.supervisor = this.appService.dataSource.data[this.data.idx]["supervisor"]
    this.name.setValue(this.appService.dataSource.data[this.data.idx]["name"])
    this.email.setValue(this.appService.dataSource.data[this.data.idx]["email"])
    this.disabledName = this.appService.dataSource.data[this.data.idx]["name"]
    this.disabledEmail = this.appService.dataSource.data[this.data.idx]["email"]
  }

  update() {
    let obj = {
      id: this.id,
      admin: this.admin,
      worker: this.worker,
      supervisor: this.supervisor,
      name: this.name.value,
      email: this.email.value
    }
    this.authService.update(obj).subscribe(data => {
      this.data = data
      this.data.sort()
      this.appService.dataSource.data = this.data
      this.dialogRef.close()
      this.successService.popSnackbar('Email updated.')
    })
  }

  disable() {
    let obj = {
      id: this.id
    }
    this.authService.disable(obj).subscribe(data => {
      this.data = data
      this.data.sort()
      this.appService.dataSource.data = this.data
      this.dialogRef.close()
      this.successService.popSnackbar('Email disabled.')
    })
  }

  enable() {
    let obj = {
      id: this.id
    }
    this.authService.enable(obj).subscribe(data => {
      this.data = data
      this.data.sort()
      this.appService.dataSource.data = this.data
      this.dialogRef.close()
      this.successService.popSnackbar('Email enabled.')
    })
  }

  reset() {
    let obj = {
      id: this.id
    }
    this.authService.reset(obj).subscribe(data => {
      this.data = data
      this.data.sort()
      this.appService.dataSource.data = this.data
      this.dialogRef.close()
      this.successService.popSnackbar('Email reset.')
    })
  }

}
