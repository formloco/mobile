import { Injectable } from '@angular/core'

import { Store } from '@ngxs/store'
import { AuthState } from '../state/auth/auth.state'

import { HttpClient } from '@angular/common/http'

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // tenant
  authUrl = environment.authUrl;
  loginStatus = false;

  constructor(
    private store: Store,
    private http: HttpClient) { 
  }

  token() {
    return this.http.get(this.authUrl+'token/')
  }

  addTenantId(obj) {
    const tenant = this.store.selectSnapshot(AuthState.tenant)
    obj["tenant_id"] = tenant.tenant_id
    return obj 
  }

  user(obj) {
    obj = this.addTenantId(obj)
    return this.http.post(this.authUrl+'user/', obj)
  }

  register(obj) {
    obj = this.addTenantId(obj)
    return this.http.post(this.authUrl+'register/', obj)
  }

  create(obj) {
    obj = this.addTenantId(obj)
    return this.http.post(this.authUrl+'create/', obj)
  }

  update(obj) {
    obj = this.addTenantId(obj)
    return this.http.post(this.authUrl+'update/', obj)
  }

  enable(obj) {
    obj = this.addTenantId(obj)
    return this.http.post(this.authUrl+'enable/', obj)
  }

  disable(obj) {
    obj = this.addTenantId(obj)
    return this.http.post(this.authUrl+'disable/', obj)
  }

  reset(obj) {
    obj = this.addTenantId(obj)
    return this.http.post(this.authUrl+'reset/', obj)
  }
  
  resetPassword(obj) {
    obj = this.addTenantId(obj)
    return this.http.post(this.authUrl+'resetpassword/', obj)
  }

  getPermissions(obj) {
    obj = this.addTenantId(obj)
    return this.http.post(this.authUrl+'permissions/', obj)
  }

  signupEmail(obj) {
    obj = this.addTenantId(obj)
    return this.http.post(this.authUrl+'email/', obj)
  }

  getTenant(obj) {
    obj = this.addTenantId(obj)
    return this.http.post(this.authUrl+'tenant/', obj)
  }

}
