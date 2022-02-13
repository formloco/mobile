import { Component, OnInit } from '@angular/core'

import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms'
import { MatDialogConfig, MatDialog } from "@angular/material/dialog"

import { Store, Select } from '@ngxs/store'
import { AuthState } from '../../../state/auth/auth.state'

import { Observable } from 'rxjs'

import { AppService } from "../../../service/app.service"
import { AuthService } from "../../../service/auth.service"
import { ErrorService } from "../../../service/error.service"

import { EmailEditComponent } from '../email-edit/email-edit.component'

import { environment } from '../../../../environments/environment'

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss']
})
export class EmailListComponent implements OnInit{

  @Select(AuthState.lookupListName) lookupListName$: Observable<string>
  emailForm: FormGroup

  kioske = environment.kioske

  user
  data
  allData
  selectedIdx
  isSync = false
  lookupListWorkers
  lookupListSupervisors

  displayedColumns: string[] = ['status', 'email']

  constructor(
    private store: Store,
    private dialog: MatDialog,
    public appService: AppService,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private errorService: ErrorService) {
    this.emailForm = this.formBuilder.group({
      name: [{value: null, disabled: this.kioske}, Validators.compose([Validators.required])],
      email: [{value: null, disabled: this.kioske}, Validators.compose([Validators.required, Validators.email])],
      worker: [{value: null, disabled: this.kioske}],
      supervisor: [{value: null, disabled: this.kioske}]
    })
  }

  ngOnInit() {
    const emailList:any = this.store.selectSnapshot(AuthState.emailList)
    this.appService.dataSource.data = emailList
  }

  edit(idx) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '100%'
    dialogConfig.data = {idx: idx}
    this.dialog.open(EmailEditComponent, dialogConfig)
  }

  save() {
    let obj = Object.assign(this.emailForm.value)
    this.authService.create(obj).subscribe(data => {
      this.data = data
      if (this.data.rows.length == 0)
        this.errorService.popSnackbar(this.data.msg)
      else {
        this.emailForm.reset()
        Object.keys(this.emailForm.controls).forEach((key) => {
          const control = this.emailForm.controls[key];
          control.setErrors(null);
      });
        this.appService.dataSource.data = this.data.rows
      }
    })
  }

}

