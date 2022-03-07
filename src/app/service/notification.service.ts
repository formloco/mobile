import { Injectable } from '@angular/core'

import { HttpClient } from '@angular/common/http'

import { Store } from '@ngxs/store'
import { AuthState } from '../state/auth/auth.state'

import { environment } from '../../environments/environment'

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

    let d = new Date().toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone})

    let notificationObj = {
      date: d,
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
        date: d.toString(),
        message: obj.message
      }]
    }
    return this.http.post(this.notificationUrl, notificationObj)
  }

  addTenantId(obj) {
    const tenant = this.store.selectSnapshot(AuthState.tenant)
    obj["tenant_id"] = tenant.tenant_id
    return obj 
  }

  getAllNotifications() {
    const tenant = this.store.selectSnapshot(AuthState.tenant)
    const obj = { tenant_id: tenant.tenant_id }
    return this.http.post(this.notificationUrl, obj)
  }

  getMyNotifications(obj) {
    obj = this.addTenantId(obj)
    return this.http.post(this.notificationUrl + obj.email + '/', obj)
  }

  getMyNotificationCount(email) {
    const tenant = this.store.selectSnapshot(AuthState.tenant)
    const obj = { tenant_id: tenant.tenant_id }
    return this.http.post(this.notificationUrl + 'count/' + email + '/', obj)
  }

  updateNotificationMessage(obj) {
    obj = this.addTenantId(obj)
    return this.http.put(this.notificationUrl, obj)
  }

  updateNotificationRead(obj) {
    obj = this.addTenantId(obj)
    return this.http.put(this.notificationUrl+'read/', obj)
  }

}
