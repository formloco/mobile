import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';

import { FormBuilder, Validators, FormGroup, FormControl } 
from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { AssetService } from "../../../../service/asset.service";

import { Asset, Category, Status } from "../../../../state/asset/asset-state.model";

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit, OnChanges {

  user_id = sessionStorage.getItem('userId');

  @Input()  assetId: number;
  @Input()  isUpdateAsset: boolean;
  @Input()  isUpdate: boolean;
  @Output() cancelCreate = new EventEmitter();

  statuses:   Status;
  categories: Category;
  asset:      Asset;

  isAdd: boolean = true;

  assetForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private assetService: AssetService) { 
    this.assetForm = this.fb.group({
      name:         [null, Validators.required],
      unit_number:  [null, Validators.required],
      category:     [null, Validators.required],
      status:       [null, Validators.required]
    });
  }

  ngOnChanges() {
    if (this.assetId) {
      this.isAdd = false;
      this.assetService.getAsset(this.assetId).subscribe((asset: Asset) => {
        this.asset = asset;
        this.assetForm.setValue({
          name:        this.asset.name,
          unit_number: this.asset.unit_number,
          category:    this.asset.category,
          status:      this.asset.status
        });
      });
    }
  }

  ngOnInit() {
    this.assetService.getCategories().subscribe((response: Category) => {
      this.categories = response;
    }, error => 
      this.snackBar.open(error.error, "Error:", {duration: 5000})
    );
    this.assetService.getStatuses().subscribe((response: Status) => {
      this.statuses = response;
    }, error => 
      this.snackBar.open(error.error, "Error:", {duration: 5000})
    );
  }

  submit(){
    if (this.isAdd) {
      let obj = this.assetForm.value;
      obj.user_id = this.user_id;
      this.assetService.createAsset(obj).subscribe(response => {
        this.close();
        this.snackBar.open('Asset created.', "Success:", {duration: 5000});
      });
    }
    else {
      let obj = this.assetForm.value;
      obj.id = this.assetId;
      this.assetService.updateAsset(obj).subscribe(response => {
        this.close();
        this.snackBar.open('Asset updated.', "Success:", {duration: 5000});
      });
    }
  }

  close() {
    this.cancelCreate.emit(false);
  }

}
