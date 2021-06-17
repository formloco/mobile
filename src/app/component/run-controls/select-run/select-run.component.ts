import { Component, OnInit, Input } from '@angular/core'

import { AppService } from "../../../service/app.service"
import { AuthService } from "../../../service/auth.service"
import { DataService } from "../../../service/data.service"

import { IdbCrudService } from "../../../service-idb/idb-crud.service"

import { FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-select-run',
  templateUrl: './select-run.component.html',
  styleUrls: ['./select-run.component.scss']
})
export class SelectRunComponent implements OnInit {

  multi: boolean
  data
  lists

  @Input() index
  @Input() runForm

  constructor(
    public appService: AppService,
    private authService: AuthService,
    private dataService: DataService,
    private idbCrudService: IdbCrudService) { }

  ngOnInit() {
    // if (this.appService.detailArray[this.index].list !== undefined) {
    //  this.getListsCloud()
    // }

    this.multi = this.appService.detailArray[this.index].multiple
    if (this.appService.detailArray[this.index].required)
      this.runForm.addControl(this.appService.detailArray[this.index]
        .formControlName, new FormControl(null, Validators.required))
    else
      this.runForm.addControl(this.appService.detailArray[this.index]
        .formControlName, new FormControl(''))
  }

  getListsCloud() {
    let obj = ({
      form_id: this.appService.detailArray[this.index].list.form_id,
      tenant_id: this.appService.detailArray[this.index].list.tenant_id
    })
    this.dataService.getData(obj).subscribe(data => {
      this.data = data
      if (this.data.length === 0) this.appService.detailArray[this.index].selectArray = []
      this.appService.detailArray[this.index].selectArray = this.data
    })
  }

}

