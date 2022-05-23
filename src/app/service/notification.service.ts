import { Injectable } from '@angular/core'

import { HttpClient } from '@angular/common/http'

import { Store } from '@ngxs/store'
import { AuthState } from '../state/auth/auth.state'

import { environment } from '../../environments/environment'
import { AppService } from './app.service'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  emailUrl = environment.emailUrl
  notificationUrl = environment.notificationUrl

  constructor(
    private store: Store,
    private http: HttpClient) { }

  createNotification(obj) {
    return this.http.post(this.notificationUrl + 'notification/', obj)
  }

  addTenantId(obj) {
    obj["tenant_id"] = this.store.selectSnapshot(AuthState.tenant).tenant_id
    return obj 
  }

  getAllNotifications() {
    const obj = { tenant_id: this.store.selectSnapshot(AuthState.tenant).tenant_id }
    return this.http.post(this.notificationUrl+'notifications/', obj)
  }

  getMyNotifications() {
    const obj = {
      tenant: this.store.selectSnapshot(AuthState.tenant).tenant_id,
      emailId: this.store.selectSnapshot(AuthState.user).id
    }
    return this.http.post(this.notificationUrl + 'notification/' + obj.emailId + '/', obj)
  }

  // this updates the notification count on the alert
  getMyNotificationCount() {
    const obj = { tenant_id: this.store.selectSnapshot(AuthState.tenant).tenant_id }
    const emailId = this.store.selectSnapshot(AuthState.user).id
    return this.http.post(this.notificationUrl + 'notification/count/' + emailId + '/', obj)
  }

  updateNotificationMessage(obj) {
    obj = this.addTenantId(obj)
    return this.http.put(this.notificationUrl + 'notification/', obj)
  }

  updateNotificationRead(obj) {
    obj = this.addTenantId(obj)
    return this.http.put(this.notificationUrl+'notification/read/', obj)
  }

}
