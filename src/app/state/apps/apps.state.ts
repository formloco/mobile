import { Injectable } from '@angular/core'
import { State, Selector, StateContext, Action } from '@ngxs/store'

import * as AppActions from './apps-state.actions'
import { AppsModel, App } from './apps-state.model'

@Injectable()
@State<AppsModel>({
  name: 'apps'
})
export class AppsState {

  @Selector()
  static apps(state: AppsModel): any[] {
    return state.apps
  }

  @Selector()
  static app(state: AppsModel): App {
    return state.app
  }

  @Selector()
  static appPage(state: AppsModel): string {
    return state.appPage
  }

  @Action(AppActions.SetApp)
  onSetSelectedApp(ctx: StateContext<AppsModel>, { app }: AppActions.SetApp) {
    ctx.patchState({
      app: app
    });
  }

  @Action(AppActions.SetApps)
  onSetApps(ctx: StateContext<AppsModel>, { apps }: AppActions.SetApps) {
    ctx.patchState({
      apps: apps
    })
  }

  @Action(AppActions.SetAppPage)
  onSetAppPage(ctx: StateContext<AppsModel>, { appPage }: AppActions.SetAppPage) {
    ctx.patchState({
      appPage: appPage
    })
  }
  

}

