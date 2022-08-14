import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core'

import { OverlayContainer } from '@angular/cdk/overlay'

import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { Platform } from '@angular/cdk/platform'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'

import { AppService } from "./service/app.service"
import { AuthService } from "./service/auth.service"
import { IdbCrudService } from "./service-idb/idb-crud.service"

import { Store } from '@ngxs/store'
import { DeviceState } from './state/device/device.state'

import { SetScreenSize, SetScreenWidth } from './state/device/device-state.actions'
import { SetUser, SetPage, SetTenant, SetKioske } from './state/auth/auth-state.actions'
import { SetBackground, SetIsDarkMode } from './state/device/device-state.actions'

import { environment } from '../environments/environment'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @HostBinding('class') className = 'darkMode'

  kioske = environment.kioske
  tenant = environment.tenant

  destroyed = new Subject<void>();
  title = 'MOBILE FORMS'

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

    this.appService.checkNetworkStatus()

    this.idbCrudService.readAll('prefs').subscribe(prefs => {
      this.prefs = prefs
      if (this.prefs.length > 0) {
        if (this.prefs[0]["user"]["isDarkMode"]) this.setMode('darkMode')
        else this.setMode('')

        this.store.dispatch(new SetUser(this.prefs[0]["user"]))
        this.store.dispatch(new SetIsDarkMode(this.prefs[0]["user"]["isDarkMode"]))

        const isOnline = this.store.selectSnapshot(DeviceState.isOnline)

        if (isOnline) this.appService.checkOfflineData()
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

  ngOnDestroy() {
    this.destroyed.next()
    this.destroyed.complete()
  }

}

