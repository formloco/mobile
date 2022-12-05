import { Component, OnInit } from '@angular/core'

import { Observable } from 'rxjs'

import { Router } from '@angular/router'

import { FormControl } from "@angular/forms"

import { Store, Select } from '@ngxs/store'
import { AuthState } from '../../state/auth/auth.state'
import { NotificationState } from '../../state/notification/notification.state'
import { SetPage, SetChildPageLabel, SetChildPage } from '../../state/auth/auth-state.actions'

import { ApiService } from "../../service/api.service"

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  tabIndex
  notificationOpen
  notificationSigned
  public msg = new FormControl([''])

  @Select(AuthState.childPageLabel) childPageLabel$: Observable<string>

  constructor(
    private store: Store,
    private router: Router,
    private apiService: ApiService) { }

  ngOnInit() {
    this.tabIndex = this.store.selectSnapshot(NotificationState.notificationTab)
  }

  close() {
    this.store.select(AuthState.isSignIn).subscribe((isSignIn) => {
      if (isSignIn) {
        this.store.dispatch(new SetPage('admin'))
        this.store.dispatch(new SetChildPage('data-forms'))
        this.store.dispatch(new SetChildPageLabel('Data Forms'))
      }
      else {
        this.store.dispatch(new SetPage('home'))
        this.store.dispatch(new SetChildPageLabel('Forms'))
        this.router.navigate([''])
      }
    })
    
  }

  pdf() {
    const notification = this.store.selectSnapshot(NotificationState.notification)
    console.log(notification)
    this.apiService.getPDF(notification.pdf)
  }
}