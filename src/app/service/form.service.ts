import { Injectable } from '@angular/core'

import { HttpClient } from '@angular/common/http'

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class FormService {

  formUrl = environment.formUrl
  tenant = environment.tenant

  constructor(private http: HttpClient) { }

  getForms(obj) {
    return this.http.post(this.formUrl + 'forms/', obj)
  }

  createForm(obj) {
    return this.http.post(this.formUrl, obj)
  }

  registerForm(obj) {
    return this.http.post(this.formUrl + 'register/', obj)
  }

  publishForm(obj) {
    return this.http.post(this.formUrl + 'publish/', obj)
  }

  setPermissions(obj) {
    return this.http.post(this.formUrl + 'permission/', obj)
  }

  getPermissions(obj) {
    return this.http.get(this.formUrl + 'permission/', obj)
  }
  
}
