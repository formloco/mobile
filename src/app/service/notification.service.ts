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

    const tenant = this.store.selectSnapshot(AuthState.tenant)
    let now = new Date().toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone})

    let notificationObj = {
      date: now,
      form_name: obj.name,
      email_from: obj.worker.email,
      worker_name: obj.worker.name,
      email_to: obj.supervisor.email,
      supervisor_name: obj.supervisor.name,
      form_id: obj.form_id,
      data_id: obj.data_id,
      description: obj.description,
      pdf: obj.pdf,
      correctiveAction: false,
      comment: [{
        from: obj.worker.name,
        to: obj.supervisor.name,
        date: now.toString(),
        message: obj.message
      }]
    }
    notificationObj["tenant_id"] = tenant.tenant_id
    return this.http.post(this.notificationUrl + 'notification/', notificationObj)
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
