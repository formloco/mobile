import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

import { AppState } from "../../../model/state"

import * as uuid from 'uuid'

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog'

import { FormControl, Validators, FormGroup, FormBuilder } from "@angular/forms"

import { AppService } from "../../../service/app.service"

import { DataService } from "../../../service/data.service"

import { IdbCrudService } from "../../../service-idb/idb-crud.service"

import { environment } from '../../../../environments/environment'

@Component({
  selector: 'app-form-lists',
  templateUrl: './form-lists.component.html',
  styleUrls: ['./form-lists.component.scss']
})
export class FormListsComponent implements OnInit {

  @Input() state: AppState
  @Output() selectChild = new EventEmitter<any>()

  token
  isLookupOpen = false

  lookupListForm: FormGroup

  constructor(
    private dialog: MatDialog,
    public appService: AppService,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private idbCrudService: IdbCrudService) {
    this.lookupListForm = this.formBuilder.group({
      lookupListName: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.state.childPageLabel = 'Administration - Form Lists'
  }

  createLookuplist() {
    let form = this.appService.createList(this.lookupListForm.get('lookupListName').value)
    this.appService.createForm(form).subscribe(res => {
      this.closeOverlay()
      this.lookupListForm.reset()
  
      this.dataService.getLists({tenant_id: this.state.tenant["tenant_id"]}).subscribe(lists => {
        this.appService.lookupLists = lists
        console.log(this.appService.lookupLists)
      })
    })
  }

  run(formObj) {
    console.log(this.state)
    this.appService.isListMenu = false
    this.state.childPage = 'list'
    this.state.childPageLabel = formObj.name
    this.state.selectedForm = formObj
    this.appService.dataSource.data = this.state.selectedForm["rows"]
  }

  closeOverlay() {
    this.isLookupOpen = false
  }

}
