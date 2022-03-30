import { Injectable } from '@angular/core'

import { Store } from '@ngxs/store'

import { HttpClient } from '@angular/common/http'
import { fromEvent, merge, of, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'

import { environment } from '../../environments/environment'
import { IdbCrudService } from '../service-idb/idb-crud.service'
import { AuthService } from "../service/auth.service"
import { SetIsOnline } from '../state/device/device-state.actions'

@Injectable({
  providedIn: 'root'
})
export class SyncService {

  networkStatus: any
  networkStatus$: Subscription = Subscription.EMPTY

  apiUrl = environment.apiUrl

  constructor(
    private store: Store,
    private http: HttpClient,
    private authService: AuthService,
    private idbCrudService: IdbCrudService) { }


  syncDataToCloud() {
    this.idbCrudService.readAll('data').subscribe((data: any) => {
      if (data.length > 0) {
        this.syncData(data).subscribe(res => {
          let response = res
          if (response["message"] === 'Data synchronized.') {
            this.idbCrudService.clear('data').subscribe()
          }
        })
      }
    })
  }

  syncData(data) {
    return this.http.post(this.apiUrl+'sync/', data)
  }

  checkNetworkStatus() {
    const networkStatus = navigator.onLine
    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe(status => {
        if (status)
          this.authService.token().subscribe((token: any) => {
            localStorage.setItem('formToken', token.token)
          })
        this.store.dispatch(new SetIsOnline(status))
        console.log('status', status)
        // this.networkStatus = status
      })
  }
}
