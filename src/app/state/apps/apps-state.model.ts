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
