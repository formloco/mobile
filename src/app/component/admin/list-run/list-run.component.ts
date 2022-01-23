import { Component } from '@angular/core'

import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms'
import { MatDialogConfig, MatDialog } from "@angular/material/dialog"

import { Store, Select } from '@ngxs/store'
import { AuthState } from '../../../state/auth/auth.state'

import { Observable } from 'rxjs'

import { AppService } from "../../../service/app.service"
import { AuthService } from "../../../service/auth.service"
import { ApiService } from "../../../service/api.service"
import { SuccessService } from "../../../service/success.service"

import { ListEditComponent } from '../list-edit/list-edit.component'

import { LIST_FORM } from '../../../model/forms'

@Component({
  selector: 'app-list-run',
  templateUrl: './list-run.component.html',
  styleUrls: ['./list-run.component.scss']
})
export class ListRunComponent {

  @Select(AuthState.lookupListName) lookupListName$: Observable<string>
  runForm: FormGroup

  id = new FormControl('')

  user
  data
  allData
  selectedIdx
  lookupLists
  isSync = false
  LIST_FORM = LIST_FORM

  displayedColumns: string[] = ['id']

  constructor(
    private store: Store,
    private dialog: MatDialog,
    public appService: AppService,
    private apiService: ApiService,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private successService: SuccessService) {
    this.runForm = this.formBuilder.group({
      item: ['', Validators.required]
    })
  }

  edit(idx, element) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '100%'
    dialogConfig.data = { id: idx, element: element }
    const dialogRef = this.dialog.open(ListEditComponent, dialogConfig)
  }

  save() {
    let obj = {
      value: this.runForm.controls['item'].value,
      name: this.store.selectSnapshot(AuthState.lookupListName)
    }
    this.apiService.saveList(obj).subscribe((data:any) => {
      this.runForm.controls['item'].reset()
      this.appService.dataSource = data.rows
      this.successService.popSnackbar('Item Saved')
    })
  }

  openMenu() {
    this.runForm.reset()
    this.selectedIdx = undefined
    this.appService.isListMenu = true
  }

}

