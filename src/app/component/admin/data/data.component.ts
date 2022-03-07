import { Component, OnInit } from '@angular/core'

import { Observable } from 'rxjs'
import { ApiService } from "../../../service/api.service"
import { IdbCrudService } from "../../../service-idb/idb-crud.service"

import { saveAs } from 'file-saver'

import { Store, Select } from '@ngxs/store'
import { AuthState } from '../../../state/auth/auth.state'

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  @Select(AuthState.selectedForm.name) name$: Observable<string>

  name
  forms
  records

  isData = false

  constructor(
    private store: Store,
    private apiService: ApiService,
    public idbCrudService: IdbCrudService) { }

  ngOnInit() {
    this.getCloud()
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
      this.apiService.getData(obj).subscribe(data => {
        this.records = data
        if (this.records.length > 0) this.isData = true
      })
    })
  }

  exportData() {
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(this.records[0]);
    let csv = this.records.map(row =>
      header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');
    var blob = new Blob([csvArray], { type: 'text/csv' })
    saveAs(blob, this.store.selectSnapshot(AuthState.page))
  }

}