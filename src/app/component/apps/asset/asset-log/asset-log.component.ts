import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { AssetService } from "../../../../service/asset.service";

import { Log } from "../../../../state/asset/asset-state.model";

@Component({
  selector: 'app-asset-log',
  templateUrl: './asset-log.component.html',
  styleUrls: ['./asset-log.component.scss']
})
export class AssetLogComponent implements OnInit {

  @Input() assetId: number;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  history: any;
  isLoader: boolean = false;
  dataSource: MatTableDataSource<any>;

  columnsToDisplay: string[] = ['unit_number', 'date', 'user', 'action'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private snackBar: MatSnackBar,
    private assetService: AssetService) { }

  ngOnInit() {
    // this.assetService.getAssetHistory(this.assetId).subscribe((history: Log) => {
    //   this.history = history;
    //   this.dataSource = new MatTableDataSource(this.history);
    //   this.dataSource.sort = this.sort;
    //   this.dataSource.paginator = this.paginator;
    // });
  }

}
