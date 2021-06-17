import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core'

import * as uuid from 'uuid'

import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms'

import { AppService } from "../../service/app.service"
import { DataService } from "../../service/data.service"
import { AuthService } from "../../service/auth.service"
import { BuilderService } from "../../service/builder.service"
import { SuccessService } from "../../service/success.service"
import { IdbCrudService } from "../../service-idb/idb-crud.service"
import { TransformRunService } from "../../service/transform-run.service"

import { AppState } from "../../model/state"

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RunComponent implements OnInit {

  @Input() state: AppState
  @Input() runForm: FormGroup
  
  id
  newform
  user
  data
  forms
  lists
  formObj
  fileArray
  user_created

  constructor(
    private fb: FormBuilder,
    public appService: AppService,
    private dataService: DataService,
    public idbCrudService: IdbCrudService,
    private successService: SuccessService,
    private transformRunService: TransformRunService) {

    this.runForm = this.fb.group({})
  }

  ngOnInit() {}

  saveCloud() {
    let obj = {
      data: this.transformRunService.parseDataCloud(this.runForm.value, this.state.selectedForm.formObject),
      columns: this.transformRunService.parseColumns(this.state.selectedForm.formObject["form"]["details"]),
      user: this.state.tenant,
      formObj: this.state.selectedForm.formObject["form"]
    }

    this.dataService.save(obj).subscribe(() => {
      this.successService.popSnackbar('Successfully Saved.')
    })
  }

}


