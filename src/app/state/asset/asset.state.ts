import { Injectable } from '@angular/core'
import { State, Selector, StateContext, Action } from '@ngxs/store'

import * as AssetActions from './asset-state.actions'
import { AssetModel, Asset, Vitals, Marker, Category, Status, Log } from './asset-state.model'

@Injectable()
@State<AssetModel>({
  name: 'app'
})

export class AssetState {

  @Selector()
  static assets(state: AssetModel): Asset[] {
    return state.assets
  }

  @Selector()
  static asset(state: AssetModel): Asset {
    return state.asset
  }

  @Selector()
  static assetVitals(state: AssetModel): Vitals {
    return state.assetVitals
  }

  @Selector()
  static assetCategory(state: AssetModel): Category[] {
    return state.assetCategory
  }

  @Selector()
  static assetStatus(state: AssetModel): Status[] {
    return state.assetStatus
  }

  @Selector()
  static assetLog(state: AssetModel): Log[] {
    return state.assetLog
  }

  @Selector()
  static assetMarker(state: AssetModel): Marker[] {
    return state.assetMarker
  }

  @Action(AssetActions.SetAsset)
  onSetAsset(ctx: StateContext<AssetModel>, { asset }: AssetActions.SetAsset) {
    ctx.patchState({
      asset: asset
    });
  }

  @Action(AssetActions.SetAssets)
  onSetAssets(ctx: StateContext<AssetModel>, { assets }: AssetActions.SetAssets) {
    ctx.patchState({
      assets: assets
    })
  }

  @Action(AssetActions.SetVitals)
  onSetAssetVitals(ctx: StateContext<AssetModel>, { assetVitals }: AssetActions.SetVitals) {
    ctx.patchState({
      assetVitals: assetVitals
    })
  }

  @Action(AssetActions.SetMarker)
  onSetMarker(ctx: StateContext<AssetModel>, { assetMarker }: AssetActions.SetMarker) {
    ctx.patchState({
      assetMarker: assetMarker
    })
  }

  @Action(AssetActions.SetCategory)
  onSetMapCategory(ctx: StateContext<AssetModel>, { assetCategory }: AssetActions.SetCategory) {
    ctx.patchState({
      assetCategory: assetCategory
    })
  }

  @Action(AssetActions.SetStatus)
  onSetMapStatus(ctx: StateContext<AssetModel>, { assetStatus }: AssetActions.SetStatus) {
    ctx.patchState({
      assetStatus: assetStatus
    })
  }

  @Action(AssetActions.SetLog)
  onSetMapLog(ctx: StateContext<AssetModel>, { assetLog }: AssetActions.SetLog) {
    ctx.patchState({
      assetLog: assetLog
    })
  }

}

