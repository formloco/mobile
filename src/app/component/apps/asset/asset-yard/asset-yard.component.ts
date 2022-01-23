import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';

import { FormBuilder, Validators, FormGroup, FormControl } 
from '@angular/forms';

import { MatTableDataSource, MatSort, MatPaginator } 
from '@angular/material';

import { AssetService } from "../../service/asset.service";
import { GeocodeService } from "../../service/geocode.service";

import { StateProvinces } from "../../constants/constants";

import { StateGroup } from "../../model/provinceState";

import { IAssetYard } from "../../model/asset";

@Component({
  selector: 'app-asset-yard',
  templateUrl: './asset-yard.component.html',
  styleUrls: ['./asset-yard.component.scss']
})
export class AssetYardComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @Output() refreshMarkers = new EventEmitter();
  @Input()  yardId: number;
  @Input()  yardName: string;
  @Input()  isUpdateMap: boolean;

  assets:   any;
  location: any;
  isDeploy: boolean = false;
  isFound:  boolean = false;
  assetId:  number;
  pageSize: number = 10;

  stateGroups: StateGroup[] = StateProvinces;

  assetAddressForm: FormGroup; 

  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['name', 'unit_number', 'status', 'deploy'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private fb: FormBuilder,
    private assetService: AssetService,
    private geocodeService: GeocodeService) { 
      this.assetAddressForm = this.fb.group({
        address:  [''],
        city:     [''],
        province: [''],
        postal:   ['']
      });
    }

  ngOnInit() {
    this.getAssets();
  }

  getAssets() {
    this.assetService.getYardAssets(this.yardId).subscribe((assets: IAssetYard) => {
      this.assets = assets;
      this.dataSource = new MatTableDataSource(this.assets);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  
  lookup() {
    let obj = { 
      address:  this.assetAddressForm.value.address, 
      city:     this.assetAddressForm.value.city,
      province: this.assetAddressForm.value.province,
      postal:   this.assetAddressForm.value.postal,
    }
    let address = JSON.stringify(obj);
    this.geocodeService.getAddress(address).subscribe(location => {
      this.location = location;
      if (this.location.lat !== 0) {
        this.isFound = true;
        alert('The address is found at latitude '+this.location.lat+', longitude '+this.location.lng)
      }
      else
        alert('The address is NOT found')
    });
  }

  addToMap() {
    let obj = {
      id:  this.assetId,
      lat: this.location.lat,
      lng: this.location.lng,
      city: this.assetAddressForm.value.city,
      address: this.assetAddressForm.value.address
    }
    console.log(obj)
    this.assetService.addToMap(obj).subscribe(response => {
      this.getAssets();
      this.refreshMarkers.emit();
      this.cancelDeploy();
    });

  }

  deploy(row) {
    this.assetId = row.id;
    this.isDeploy = true;
  }

  cancelDeploy() {
    this.assetAddressForm.patchValue({
      address:  '',
      city:     '',
      province: '',
      postal:   ''
    })
    this.isDeploy = false;
  }

}
