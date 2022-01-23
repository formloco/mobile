import { Asset, Vitals, Marker, Category, Status, Log } from './asset-state.model'

export class SetAssets {
  static type = '[Asset] SetAssets'
  constructor(public assets: Asset[]) {}
}

export class SetAsset {
  static type = '[Asset] SetAsset'
  constructor(public asset: Asset) {}
}

export class SetMarker {
  static type = '[Asset] SetMarker'
  constructor(public assetMarker: Marker[]) {}
}

export class SetVitals {
  static type = '[Asset] SetVitals'
  constructor(public assetVitals: Vitals) {}
}

export class SetCategory {
  static type = '[Asset] SetCategory'
  constructor(public assetCategory: Category[]) {}
}

export class SetStatus {
  static type = '[Asset] SetStatus'
  constructor(public assetStatus: Status[]) {}
}

export class SetLog {
  static type = '[Asset] SetLog'
  constructor(public assetLog: Log[]) {}
}

