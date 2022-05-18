import { Injectable } from '@angular/core'

import { Store } from '@ngxs/store'
import { AuthState } from '../state/auth/auth.state'
import { DeviceState } from '../state/device/device.state'

import { ApiService } from "../service/api.service"
import { IdbCrudService } from "../service-idb/idb-crud.service"

import { Form } from "../state/auth/auth-state.model"
import { SetPage, SetChildPageLabel } from '../state/auth/auth-state.actions'
import { MatSnackBar } from '@angular/material/snack-bar'

import { HttpClient } from '@angular/common/http'

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class FormService {

  formUrl = environment.formUrl

  constructor(
    private store: Store,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private apiService: ApiService,
    private idbCrudService: IdbCrudService) { }

  addTenantId(obj) {
    obj["tenant_id"] = this.store.selectSnapshot(AuthState.tenant).tenant_id
    return obj 
  }

  getForm(obj) {
    obj = this.addTenantId(obj)
    return this.http.get(this.formUrl + obj.form_id+'/'+obj.data_id+'/')
  }

  getForms() {
    const obj = {
      tenant: this.store.selectSnapshot(AuthState.tenant).tenant_id,
      userId: this.store.selectSnapshot(AuthState.user).id
    }
    return this.http.post(this.formUrl + 'forms/', obj)
  }

  createForm(obj) {
    obj = this.addTenantId(obj)
    return this.http.post(this.formUrl, obj)
  }

  registerForm(obj) {
    obj = this.addTenantId(obj)
    return this.http.post(this.formUrl + 'register/', obj)
  }

  statusToggle(obj) {
    obj = this.addTenantId(obj)
    return this.http.post(this.formUrl + 'status/', obj)
  }

  setPermissions(obj) {
    obj = this.addTenantId(obj)
    return this.http.post(this.formUrl + 'permission/', obj)
  }

  update(form: Form) {
    form = this.addTenantId(form)
    return this.http.put(this.formUrl, form)
  }

  updateForm(form, formData, data) {
    const user = this.store.selectSnapshot(AuthState.user)

    const isOnline = this.store.selectSnapshot(DeviceState.isOnline)
    const now = new Date().toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })

    let userUpdated = {
      email: user.email,
      date_created: now
    }

    if (!isOnline) {
      const obj = {
        id: form["id"],
        data: data,
        user: userUpdated,
        data_id: null,
        form_id: form["form_id"],
        date: now,
        pics: this.store.selectSnapshot(DeviceState.pics)
      }
      this.idbCrudService.readAll('data').subscribe((data: any) => {
        const idbData = data.find(data => data.id === form['id'])
        obj.data = idbData
        this.idbCrudService.put('data', obj)
      })
    }
    else {
      const obj = {
        id: form["id"],
        data: JSON.stringify(data),
        user: userUpdated,
        data_id: formData["id"],
        form_id: form["form_id"],
        date: now,
        pics: this.store.selectSnapshot(DeviceState.pics)
      }

      this.apiService.update(obj).subscribe((res) => {
        this.store.dispatch(new SetPage('notification'))
        this.store.dispatch(new SetChildPageLabel('Forms'))
        this.snackBar.open(res["message"], 'Success', {
          duration: 3000,
          verticalPosition: 'bottom'
        })
      })
    }
    return this.http.put(this.formUrl, form)
  }

  // getPermissions(obj) {
  //   obj = this.addTenantId(obj)
  //   return this.http.get(this.formUrl + 'permission/', obj)
  // }
  
}
