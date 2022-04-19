import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core'

import { OverlayContainer } from '@angular/cdk/overlay'

import { fromEvent, merge, of, Subscription, Subject } from 'rxjs'
import { takeUntil, map } from 'rxjs/operators'

import { Platform } from '@angular/cdk/platform'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'

import { AppService } from "./service/app.service"
import { AuthService } from "./service/auth.service"
import { IdbCrudService } from "./service-idb/idb-crud.service"

import { Store } from '@ngxs/store'
import { SetScreenSize, SetScreenWidth } from './state/device/device-state.actions'
import { SetUserIdb, SetPage, SetTenant, SetKioske } from './state/auth/auth-state.actions'
import { SetBackground, SetIsDarkMode, SetIsOnline } from './state/device/device-state.actions'

import { environment } from '../environments/environment'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @HostBinding('class') className = 'darkMode'
  networkStatus: any
  networkStatus$: Subscription = Subscription.EMPTY

  kioske = environment.kioske
  tenant = environment.tenant

  destroyed = new Subject<void>();
  title = 'MOBILE FORMS'

  token
  prefs

  myInnerWidth = window.innerWidth

  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(
    private store: Store,
    public platform: Platform,
    public appService: AppService,
    private authService: AuthService,
    private idbCrudService: IdbCrudService,
    breakpointObserver: BreakpointObserver,
    private overlayContainer: OverlayContainer) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).pipe(takeUntil(this.destroyed)).subscribe(result => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          this.store.dispatch(new SetScreenSize(this.displayNameMap.get(query) ?? 'Unknown'))
          this.store.dispatch(new SetScreenWidth(this.myInnerWidth + 'px'))
        }
      }
    })
  }

  ngOnInit(): void {
    this.store.dispatch(new SetKioske(this.kioske))
    this.store.dispatch(new SetTenant(this.tenant))

    this.checkNetworkStatus()

    this.idbCrudService.readAll('prefs').subscribe(prefs => {
      this.prefs = prefs
      if (this.prefs.length > 0) {
        if (this.prefs[0]["user"]["isDarkMode"]) this.setMode('darkMode')
        else this.setMode('')

        this.store.dispatch(new SetUserIdb(this.prefs[0]["user"]))
        this.store.dispatch(new SetIsDarkMode(this.prefs[0]["user"]["isDarkMode"]))
      }
      else {
        this.setMode('darkMode')
        this.store.dispatch(new SetIsDarkMode(true))

        if (this.kioske) this.store.dispatch(new SetPage('kioske'))
        else this.store.dispatch(new SetPage('identify'))
      }
    })
  }

  setMode(darkClassName) {
    this.className = 'darkMode' ? darkClassName : ''

    if (darkClassName === 'darkMode') {
      this.store.dispatch(new SetBackground('#3b3b3b'))
      this.overlayContainer.getContainerElement().classList.add(darkClassName)
    }
    else {
      this.store.dispatch(new SetBackground(''))
      this.overlayContainer.getContainerElement().classList.remove('darkMode')
    }
  }

  checkNetworkStatus() {
    this.networkStatus = navigator.onLine
    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe(status => {
        if (status)
          this.authService.token().subscribe(token => {
            this.token = token
            localStorage.setItem('formToken', this.token.token)
          })
        this.store.dispatch(new SetIsOnline(status))
        // this.networkStatus = status
      })
  }

  ngOnDestroy() {
    this.destroyed.next()
    this.destroyed.complete()
  }

}

