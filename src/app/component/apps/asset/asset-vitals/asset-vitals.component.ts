import { Component } from '@angular/core';

import { Observable } from 'rxjs'
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Store, Select } from '@ngxs/store'
import { AssetState } from '../../../../state/asset/asset.state'

// import { AssetService } from '../../service/asset.service'
import { Vitals } from "../../../../state/asset/asset-state.model";

@Component({
  selector: 'app-asset-vitals',
  templateUrl: './asset-vitals.component.html',
  styleUrls: ['./asset-vitals.component.scss']
})
export class AssetVitalsComponent {

  @Select(AssetState.asset) asset$: Observable<any>

  asset_vitals: Vitals;

  assetForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar) { 
    this.assetForm = this.fb.group({
      name:         [null, Validators.required],
      unit_number:  [null, Validators.required],
      category:     [null],
      status:       [null]
    })
  }

  returnToYard() {
    // let obj = {
    //   id:  this.assetId,
    //   lat: this.lat,
    //   lng: this.lng
    // }
    // this.assetService.deleteFromMap(obj).subscribe(response => {
    //   this.close();
    //   this.refreshMarkers.emit();
    //   this.snackBar.open('Asset returned to yard.', "Success:", {duration: 5000});
    // });
  }

  close() {
    // this.refreshMarkers.emit();
    // this.cancelVitals.emit(false);
  }

}
