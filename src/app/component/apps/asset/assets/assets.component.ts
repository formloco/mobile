import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core'

import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms'

import { animate, state, style, transition, trigger } from '@angular/animations'

import { MatSort } from '@angular/material/sort'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog'

import { AssetService } from "../../../../service/asset.service";

import { environment } from '../../../../../environments/environment';

import { Store, Select } from '@ngxs/store'

import { AssetState } from '../../../../state/asset/asset.state'
import { Asset, Log, Category, Status } from "../../../../state/asset/asset-state.model";

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AssetsComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  isCreate: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;

  assets: any;
  assetId: number;
  history: any;
  security: any;
  isNewAsset: boolean = false;
  isHistory: boolean = false;
  dataSource: MatTableDataSource<any>;

  // columnsToDisplay: string[] = ['image', 'name', 'unit_number', 'category', 'status',

  columnsToDisplay: string[] = ['name', 'unit_number', 'category', 'status',
    'date_created'];

  assetForm: FormGroup;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private assetService: AssetService) {
    this.assetForm = this.fb.group({
      name: [null, Validators.required],
      unit_number: [null, Validators.required],
      category: [null, Validators.required],
      status: [null, Validators.required]
    })
  }

  ngOnInit() {
    this.store.select(AssetState.assets).subscribe((assets: Asset[]) => {
      this.dataSource = new MatTableDataSource(assets)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  newAsset() {
    this.isNewAsset = true;
  }

  cancelCreate() {
    this.isNewAsset = false;
  }

  updateForm(element) {
    this.assetForm.controls['name'].setValue(element.name);
    this.assetForm.controls['status'].setValue(element.status_id);
    this.assetForm.controls['category'].setValue(element.category_id);
    this.assetForm.controls['unit_number'].setValue(element.unit_number);
  }

  update(id) {
    let obj = this.assetForm.value;
    obj.id = id;
    this.assetService.updateAsset(obj).subscribe(response => {
      this.snackBar.open('Asset updated.', "Success:", { duration: 5000 });
      // this.getAssets();
    });
  }

  delete(id) {
    // this.assetService.deleteAsset(obj).subscribe(response => {
    //   this.snackBar.open('Asset deleted.', "Success:", {duration: 5000});
    //   // this.getAssets();
    // });
  }

  showHistory(element) {
    this.isHistory = true;
    this.assetId = element.id;
  }

  hideHistory() {
    this.isHistory = false;
  }

}


