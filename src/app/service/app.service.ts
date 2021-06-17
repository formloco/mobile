import { Injectable } from '@angular/core'

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { MatTableDataSource } from '@angular/material/table'

import { environment } from '../../environments/environment'

import { IdbCrudService } from "../service-idb/idb-crud.service"

import { LIST_FORM } from '../model/forms'

import * as uuid from 'uuid'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  private data
  public isListMenu

  public dataSource = new MatTableDataSource()

  public isNew
  public isRun = false
  public isData = false
  public isSettings = false
  public isDataForms = true
  public isFooter = true
  
  public canvasBackground

  public user
  public formObj
  public form_id
  public lookupLists
  public listData 
  public formData
  public selectedForm
  public history

  public fileArray = []
  public detailArray = []
  public isFileUploadRunning
  
  public details = []
  public currentDetailForm

  apiUrl = environment.apiUrl
  formUrl = environment.formUrl
  tenant = environment.tenant
  LIST_FORM = LIST_FORM

  constructor(
    private _http: HttpClient,
    private idbCrudService: IdbCrudService) {
   }

  create(obj) {
    return this._http.post(this.apiUrl, obj)
  }

  getForms() {
    return this._http.get(this.formUrl + this.tenant.tenant_id)
  }

  createList(listName) {
    this.LIST_FORM.form.name = listName
    let userCreated = { email: 'polly@formloco.com', date_created: new Date() }

    let form = ({
      pin: '369',
      name: listName,
      form: this.LIST_FORM.form,
      form_id: uuid.v4(),
      tenant_id: this.tenant.tenant_id,
      date_created: new Date(),
      date_last_access: new Date(),
      user_created: userCreated,
      is_data: true,
      is_list: true,
      is_published: true,
      type: 'dynamic'
    })
    return form
  }

  saveSettings(obj) {
    return this.idbCrudService.put('data', obj)
  }

  getFormData() {
    this.idbCrudService.readAll('data').subscribe(data => {
      this.formData = data
    })
  }

  createForm(obj) {
    return this._http.post(this.formUrl, obj)
  }

  registerForm(obj) {
    return this._http.post(this.formUrl+'register/', obj)
  }

}
