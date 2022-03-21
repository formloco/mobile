import { Component, OnInit, Inject } from '@angular/core'

import { Observable } from 'rxjs'

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"
import { FormControl } from '@angular/forms'

import { AppService } from "../../../service/app.service"
import { ApiService } from "../../../service/api.service"
import { SuccessService } from "../../../service/success.service"

import { Store, Select } from '@ngxs/store'
import { AuthState } from '../../../state/auth/auth.state'

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.scss']
})
export class ListEditComponent implements OnInit {

  @Select(AuthState.kioske) kioske$: Observable<boolean>

  id

  constructor(
    private store: Store,
    public appService: AppService,
    private apiService: ApiService,
    private successService: SuccessService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ListEditComponent>
  ) { }

  ngOnInit(): void {
    const kioske = this.store.selectSnapshot(AuthState.kioske)
    this.id = new FormControl({value: null, disabled: kioske})  
    this.id.setValue(this.data.element.data)
  }

  update() {
    let obj = {
      id: this.data['element']['id'],
      name: this.store.selectSnapshot(AuthState.lookupListName),
      value: this.id.value
    }
    this.apiService.update(obj).subscribe((data:any) => {
      this.appService.dataSource = data.rows
      this.dialogRef.close()
      this.successService.popSnackbar('Item updated')
    })
  }

  delete() {
    let obj = {
      id: this.data['element']['id'],
      name: this.store.selectSnapshot(AuthState.lookupListName)
    }
    this.apiService.delete(obj).subscribe((data:any) => {
      this.appService.dataSource = data.rows
      this.dialogRef.close()
      this.successService.popSnackbar('Item deleted')
    })
  }

}
