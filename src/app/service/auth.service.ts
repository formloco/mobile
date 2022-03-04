import { Injectable } from '@angular/core'

import { Store } from '@ngxs/store'
import { AuthState } from '../state/auth/auth.state'

import { HttpClient } from '@angular/common/http'

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tenant
  authUrl = environment.authUrl;
  loginStatus = false;

  constructor(
    private store: Store,
    private http: HttpClient) { 
    this.tenant = this.store.selectSnapshot(AuthState.tenant)
  }

  token() {
    return this.http.get(this.authUrl+'token/')
  }

  user(email) {
    const tenant = this.store.selectSnapshot(AuthState.tenant)

    console.log(this.tenant, tenant)
    return this.http.post(this.authUrl+'user/', email)
  }

  register(obj) {
    return this.http.post(this.authUrl+'register/', obj)
  }

  create(obj) {
    return this.http.post(this.authUrl+'create/', obj)
  }

  update(obj) {
    return this.http.post(this.authUrl+'update/', obj)
  }

  enable(obj) {
    return this.http.post(this.authUrl+'enable/', obj)
  }

  disable(obj) {
    return this.http.post(this.authUrl+'disable/', obj)
  }

  reset(obj) {
    return this.http.post(this.authUrl+'reset/', obj)
  }
  
  resetPassword(obj) {
    return this.http.post(this.authUrl+'resetpassword/', obj)
  }

  getPermissions(obj) {
    return this.http.post(this.authUrl+'permissions/', obj)
  }

  signupEmail(obj) {
    return this.http.post(this.authUrl+'email/', obj)
  }

  getTenant(obj) {
    return this.http.post(this.authUrl+'tenant/', obj)
  }

}
