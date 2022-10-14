import { Component, OnInit, ViewChild } from '@angular/core'

import { Observable } from 'rxjs'
import { ApiService } from "../../../service/api.service"
import { IdbCrudService } from "../../../service-idb/idb-crud.service"

import { MatSort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'

import { saveAs } from 'file-saver'

import { Store, Select } from '@ngxs/store'
import { AuthState } from '../../../state/auth/auth.state'
import { AutoCompleteService } from "../../../service/auto-complete.service"

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  @Select(AuthState.selectedForm) selectedForm$: Observable<string>

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  dataSource
  displayedColumns: string[] = ['Worker', 'Supervisor', 'date_created', 'SignoffDate', 'pdf', 'comments', 'corrective_actions', 'notifications', 'form']
 
  name
  forms
  records

  isData = false
  
  constructor(
    private store: Store,
    private apiService: ApiService,
    public idbCrudService: IdbCrudService,
    public autoCompleteService: AutoCompleteService) { }

  ngOnInit() {
    this.getCloud()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCloud() {
    this.idbCrudService.readAll('form').subscribe(forms => {
      this.forms = forms
      const selectedForm = this.store.selectSnapshot(AuthState.selectedForm)
      const tenant = this.store.selectSnapshot(AuthState.tenant)
      let form = this.forms.filter(f => f.id === selectedForm["id"])
      let obj = {
        form_id: form[0]["form_id"],
        tenant_id: tenant["tenant_id"]
      }
      this.apiService.getData(obj).subscribe((data: any) => {
        console.log(data)
        this.dataSource = new MatTableDataSource(data)
        // this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // this.appService.
        if (data.length > 0) this.isData = true
      })
    })
  }

  exportData() {
    const dataKeys = Object.keys(this.records[0].data);
   
    console.log(dataKeys)
     dataKeys.forEach((key, idx) => {
      this.records.forEach(record => {
        // console.log(key, record)
        let tt = dataKeys[idx]
        console.log(tt)
        // allData.push({key: record[key]})
        // console.log(record[key])
      })
    })
    // let allData = []
    // dataKeys.forEach(key => {
    //   let ff = key[]
    //   allData.push(key,[])
    // })

    // console.log(allData)
    // let dataArray = []
    // this.records.forEach(record => {
    //   dataArray.push(record.data)
    // })

    // let allData = []
    // dataKeys.forEach(key => {
    //   dataArray.forEach(record => {
    //     console.log(key)
    //     // allData.push({key: record[key]})
    //     // console.log(record[key])
    //   })
    // })
    // console.log(allData)
    // let csv = this.records.map(row =>
    //   header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    // csv.unshift(header.join(','));
    // let csvArray = csv.join('\r\n');

    // console.log(csvArray)
    // var blob = new Blob([csvArray], { type: 'text/csv' })
    // saveAs(blob, this.store.selectSnapshot(AuthState.page))
  }

  openPdf(pdf) {
    const pdfName = pdf.slice(0, -4)
    this.apiService.getPDF(pdfName)
  }

}