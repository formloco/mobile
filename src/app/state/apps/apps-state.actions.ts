import { AppsModel, App } from './apps-state.model'
export class SetApps {
  static type = '[Apps] SetApps'
  constructor(public apps: App[]) {}
}

export class SetApp {
  static type = '[Apps] SetApp'
  constructor(public app: App) {}
}

export class SetAppPage {
  static type = '[Apps] SetAppPage'
  constructor(public appPage: string) {}
}

