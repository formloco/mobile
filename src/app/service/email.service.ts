import { Injectable } from '@angular/core'

import { HttpClient } from '@angular/common/http'

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  emailUrl = environment.emailUrl

  constructor(private http: HttpClient) { }

  sendNotificationEmail(obj) {
    return this.http.post(this.emailUrl + 'notification/', obj)
  }

  forgotPassword(obj) {
    return this.http.post(this.emailUrl + 'forgot/password/', obj)
  }

  signup(obj) {
    return this.http.post(this.emailUrl + 'signup', obj)
  }
  
}

