export interface AppsModel {
  app?: App
  apps?: any[]
  appPage: string
}

export interface App {
  id: number,
  name: string,
  icon: string,
  description: string
}

export const APPS = [
  {
    id: "asset-tracker",
    name: "Asset Tracker",
    icon: "location_on",
    description: "Realtime Asset Tracking"
  }
]

export enum Branding {
  summit = 'assets/logo-summit.svg',
  formloco = 'assets/logo-light.png',
  rumzer = 'assets/logo-rumzer.svg'
}

export enum Tenant {
  summit = 'summit',
  formloco = 'formloco',
  rumzer = 'rumzer'
}

export enum IdbName {
  summit = 'summitMobileDB',
  formloco = 'formlocoMobileDB',
  rumzer = 'rumzerMobileDB'
}
