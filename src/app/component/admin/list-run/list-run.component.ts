import { Component, Input, Output, EventEmitter } from '@angular/core'

import { AppState } from "../../../model/state"

import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms'

import { AppService } from "../../../service/app.service"
import { AuthService } from "../../../service/auth.service"
import { DataService } from "../../../service/data.service"
import { SuccessService } from "../../../service/success.service"

import { IdbCrudService } from "../../../service-idb/idb-crud.service"

import { LIST_FORM } from '../../../model/forms'

@Component({
  selector: 'app-list-run',
  templateUrl: './list-run.component.html',
  styleUrls: ['./list-run.component.scss']
})
export class ListRunComponent {

  @Input() state: AppState

  runForm: FormGroup

  id = new FormControl('');

  user
  data
  allData
  selectedIdx
  isSync = false
  LIST_FORM = LIST_FORM

  myInnerHeight = window.innerHeight

  displayedColumns: string[] = ['id']

  constructor(
    public appService: AppService,
    public authService: AuthService,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private successService: SuccessService,
    private idbCrudService: IdbCrudService) {
    this.runForm = this.formBuilder.group({
      item: ['', Validators.required]
    })
  }

  edit(idx, element) {
    this.selectedIdx = idx
    this.id.setValue(element.data)
  }

  save() {
    let dataObj = []
    let userCreated = { email: this.appService.tenant.email, date_created: new Date() }

    dataObj.push(null)
    dataObj.push(JSON.stringify(userCreated))
    dataObj.push(new Date())
    dataObj.push(new Date())
    dataObj.push(this.runForm.controls['item'].value)
    this.LIST_FORM["form_id"] = this.state.selectedForm["form_id"]
    this.LIST_FORM["is_published"] = true
    this.LIST_FORM["is_data"] = true

    this.runForm.controls['item'].reset()

    let obj = {
      data: dataObj,
      columns: this.LIST_FORM["columns"],
      user: this.appService.tenant,
      formObj: this.LIST_FORM,
      type: 'dynamic',
      name: this.state.selectedForm.name
    }
    console.log(obj)
    this.dataService.saveList(obj).subscribe(res => {this.getCloud()})
  }

  update(idx) {
    let obj = {
      id: this.appService.dataSource.data[idx]["id"],
      form_id: this.state.selectedForm["form_id"],
      tenant_id: this.state["tenant"]["tenant_id"],
      params: ` data = '` + this.id.value + `'`
    }
    this.dataService.update(obj).subscribe(data => {
      this.data = data
      this.appService.dataSource.data = this.data.rows
      this.successService.popSnackbar(this.data.message)
      this.selectedIdx = null
    })
  }

  delete(idx) {
    let obj = {
      id: this.appService.dataSource.data[idx]["id"],
      form_id: this.state.selectedForm["form_id"],
      tenant_id: this.state["tenant"]["tenant_id"]
    }
    this.dataService.delete(obj).subscribe(data => {
      this.data = data
      this.successService.popSnackbar(this.data.message)
      this.selectedIdx = null
      this.getCloud()
    })
  }

  getCloud() {
    let obj = {
      form_id: this.state.selectedForm["form_id"],
      tenant_id: this.state.tenant["tenant_id"]
    }
    this.dataService.getData(obj).subscribe(data => {
      this.data = data
      this.appService.dataSource.data = this.data
      this.appService.dataSource.sort
    })
  }

  openList() {
    this.appService.isListMenu = true;
  }

}

