import { Component, OnInit } from '@angular/core'
import { Observable, of } from 'rxjs'

import { MatBottomSheet } from '@angular/material/bottom-sheet'

import { Store, Select } from '@ngxs/store'

import { AssetState } from '../../../../state/asset/asset.state'
import { SetAppPage } from '../../../../state/apps/apps-state.actions'
import { SetAsset } from '../../../../state/asset/asset-state.actions'
import { AssetService } from "../../../../service/asset.service"
// import { Assets } from "../../../../state/asset/asset-state.model";

import { AssetVitalsComponent } from '../asset-vitals/asset-vitals.component'

@Component({
  selector: 'app-asset-map',
  templateUrl: './asset-map.component.html',
  styleUrls: ['./asset-map.component.scss']
})
export class AssetMapComponent implements OnInit {

  @Select(AssetState.assetMarker) assetMarker$: Observable<any[]>
  
  isYard:        boolean = true;
  isAssetVitals: boolean = false;
  isUpdateAsset: boolean = false;
  isUpdateMap:   boolean = false;

  allMarkers = []
  assetId: number;
  yardId:  number;

  assets:           any
  infoWindowOpened: any
  prevInfoWindow:   any
  filteredMarkers = [];

  selectedName:     string;
  selectedUnitNo:   string;
  selectedCategory: string;
  selectedStatus:   string;
  icon:             string;
  yardName:         string;
  
  zoom: number = 7;
  
  lat: number = 51.0486;
  lng: number = -114.0708;

  constructor(
    private store: Store,
    private assetService: AssetService,
    private bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
    // console.log('got here'),this.assetMarker$.subscribe((markers:any) => {console.log(markers)})
  }

  closePrevInfo() {
    if (this.prevInfoWindow) this.prevInfoWindow.close();
    this.isAssetVitals = false;
  }

  clickedMarker(marker) {
    const assets = this.store.selectSnapshot(AssetState.assets)
    const asset = assets.find(a => a.id === marker.id)
    this.store.dispatch(new SetAsset(asset))
    this.bottomSheet.open(AssetVitalsComponent)
  }

  filterCategory($event) {
    // this.assetService.getAssetByCategoryId($event.value)
    //     .subscribe((assets: AssetCategory) => {
    //   this.assets = assets;
    //   this.allMarkers = [];
    //   this.getMarkers();
    // });
    // this.isAssetVitals = false;
  }

  filterStatus($event) {
    // this.assetService.getAssetByStatusId($event.value)
    //     .subscribe((assets: AssetStatus) => {
    //   this.assets = assets;
    //   this.allMarkers = [];
    //   this.getMarkers();
    // });
    // this.isAssetVitals = false;
  }


}
