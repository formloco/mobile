import { Injectable } from '@angular/core'

import { Store } from '@ngxs/store'
import { AuthState } from '../state/auth/auth.state'

import { HttpClient, HttpHeaders } from '@angular/common/http'

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = environment.apiUrl

  constructor(
    private store: Store,
    private http: HttpClient) { }

  addTenantId(obj) {
    const tenant = this.store.selectSnapshot(AuthState.tenant)
    obj["tenant_id"] = tenant.tenant_id
    return obj
  }

  save(obj) {
    obj = this.addTenantId(obj)
    return this.http.post(this.apiUrl, obj)
  }

  getFormData(form_id, data_id) {
    const tenant = this.store.selectSnapshot(AuthState.tenant)
    return this.http.get(this.apiUrl + 'form/' + tenant.tenant_id + '/' + form_id + '/' + data_id + '/')
  }

  getData(obj) {
    obj = this.addTenantId(obj)
    return this.http.get(this.apiUrl + obj.tenant_id + '/' + obj.form_id + '/')
  }

  saveList(obj) {
    obj = this.addTenantId(obj)
    return this.http.post(this.apiUrl + 'list/', obj)
  }

  getLists(obj) {
    obj = this.addTenantId(obj)
    return this.http.post(this.apiUrl + 'lists/', obj)
  }

  getEmailList(obj) {
    obj = this.addTenantId(obj)
    return this.http.post(this.apiUrl + 'emails/', obj)
  }

  update(obj) {
    obj = this.addTenantId(obj)
    return this.http.put(this.apiUrl, obj)
  }

  delete(obj) {
    obj = this.addTenantId(obj)
    return this.http.post(this.apiUrl + 'delete/', obj)
  }

  signForm(obj) {
    obj = this.addTenantId(obj)
    return this.http.put(this.apiUrl + 'form/sign/', obj)
  }

  getPDF(name) {
    try {
      let headers = new HttpHeaders().set('Accept', 'application/pdf')
      this.http.get(this.apiUrl + 'pdf/' + name + '/', {
        headers: headers,
        responseType: 'blob'
      }).subscribe(data => {
        const blob: Blob = new Blob([data], { type: 'application/pdf' });
        const fileName = name;
        const objectUrl: string = URL.createObjectURL(blob);
        const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

        a.href = objectUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(objectUrl);
      })
    }
    catch (error) {
      throw error;
    }
  }

}
