import { Injectable } from '@angular/core'

import { HttpClient } from '@angular/common/http'

import { environment } from '../../environments/environment'

import { Store } from '@ngxs/store'

import { Asset, Marker } from "../state/asset/asset-state.model"
import { SetAssets, SetCategory, SetStatus, SetLog, SetMarker } from '../state/asset/asset-state.actions'

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  assetUrl = environment.assetUrl
  tenant_id = environment.tenant.assetTenantId

  constructor(
    private store: Store,
    private _http: HttpClient
  ) { }

  public asset_id: any

  initializeApp() {
    let icon
    let markers = []
    this.getAssets().subscribe((assets: Asset[]) => {
      this.store.dispatch(new SetAssets(assets))
      assets.forEach(element => {
        if (element.status === 'Maintenance') icon = 'assets/orange.png'
        if (element.status === 'Booked') icon = 'assets/blue.png'
        if (element.status === 'Available') icon = 'assets/green.png'
        markers.push({
          lat: element.lat,
          lng: element.lng,
          label: element.unit_number,
          name: element.name,
          category: element.category,
          status: element.status,
          icon: icon,
          id: element.id
        })
      })
      this.store.dispatch(new SetMarker(markers))
    })
    this.getCategories().subscribe((categories: any) => {
      this.store.dispatch(new SetCategory(categories))
    })
    this.getStatuses().subscribe((statuses: any) => {
      this.store.dispatch(new SetStatus(statuses))
    })
    this.getLog(50,0).subscribe((log: any) => {
      this.store.dispatch(new SetLog(log))
    })
  }

  getAsset(id) {
    return this._http.get(this.assetUrl,
      { params: { id: id } })
  }

  getAssets() {
    return this._http.get(this.assetUrl + 'assets/',
      { params: { tenant_id: this.tenant_id } })
  }

  getAssetVitals(id) {
    return this._http.get(this.assetUrl + 'vitals/',
      { params: { id: id } })
  }

  updateAsset(asset: Asset) {
    return this._http.put(this.assetUrl + 'update/', (asset))
  }

  createAsset(asset: Asset) {
    asset.tenant_id = this.tenant_id
    return this._http.post(this.assetUrl + 'create/', (asset))
  }

  deleteAsset(asset: Asset) {
    return this._http.put(this.assetUrl + 'delete/', (asset))
  }

  getLog(page_size, page_index) {
    return this._http.get(this.assetUrl + 'log/', {
      params: {
        tenant_id: this.tenant_id,
        page_size: page_size,
        page_index: page_index
      }
    })
  }

  addToMap(obj: Marker) {
    return this._http.put(this.assetUrl + 'addmarker/', (obj))
  }

  deleteFromMap(obj: Marker) {
    return this._http.put(this.assetUrl + 'deleteMarker', (obj))
  }

  getCategories() {
    return this._http.get(this.assetUrl + 'category/',
      { params: { tenant_id: this.tenant_id } })
  }

  getStatuses() {
    return this._http.get(this.assetUrl + 'status/',
      { params: { tenant_id: this.tenant_id } })
  }

  // getAssetByStatusId(id) {
  //   return this._http.get(this.assetUrl + 'status/',
  //     { params: { id: id } })
  // }

  // getAssetByCategoryId(id) {
  //   return this._http.get(this.assetUrl + 'category/',
  //     { params: { id: id } })
  // }

  // getYardAssets(yard_id) {
  //   return this._http.get(this.assetUrl + 'asset/yard/read/',
  //     { params: { tenant_id: this.tenant_id, yard_id: yard_id } })
  // }

  // getAssetHistory(id) {
  //   return this._http.get(this.assetUrl + 'asset/log/',
  //     { params: { id: id } })
  // }

  // createCategory(category: Category) {
  //   category.tenant_id = this.tenant_id
  //   return this._http.post(this.assetUrl + 'category/create/', (category))
  // }

  // updateCategory(category: Category) {
  //   return this._http.put(this.assetUrl + 'category/update/', (category))
  // }

  // deleteCategory(category: Category) {
  //   return this._http.put(this.assetUrl + 'category/delete/', (category))
  // }

  // createStatus(status: Status) {
  //   status.tenant_id = this.tenant_id
  //   return this._http.post(this.assetUrl + 'status/create/', (status))
  // }

}
