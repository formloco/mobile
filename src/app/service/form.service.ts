import { Injectable } from '@angular/core'

import { Store } from '@ngxs/store'
import { AuthState } from '../state/auth/auth.state'

import { HttpClient } from '@angular/common/http'

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class FormService {

  formUrl = environment.formUrl

  constructor(
    private store: Store,
    private http: HttpClient) { }

  addTenantId(obj) {
    const tenant = this.store.selectSnapshot(AuthState.tenant)
    obj["tenant_id"] = tenant.tenant_id
    return obj 
  }

  getForm(obj) {
    obj = this.addTenantId(obj)
    return this.http.get(this.formUrl + obj.form_id+'/'+obj.data_id+'/')
  }

  getForms(obj) {
    obj = this.addTenantId(obj)
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

  publishForm(obj) {
    obj = this.addTenantId(obj)
    return this.http.post(this.formUrl + 'publish/', obj)
  }

  setPermissions(obj) {
    obj = this.addTenantId(obj)
    return this.http.post(this.formUrl + 'permission/', obj)
  }

  getPermissions(obj) {
    obj = this.addTenantId(obj)
    return this.http.get(this.formUrl + 'permission/', obj)
  }
  
}
