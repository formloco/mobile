import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core'

import { Observable } from 'rxjs'

import { FormBuilder, FormGroup } from '@angular/forms'

import { Store, Select } from '@ngxs/store'
import { ApiService } from "../../service/api.service"
import { SuccessService } from "../../service/success.service"
import { IdbCrudService } from "../../service-idb/idb-crud.service"
import { TransformRunService } from "../../service/transform-run.service"

import { AuthState } from '../../state/auth/auth.state'

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RunComponent implements OnInit {

  @Input() runForm: FormGroup

  @Select(AuthState.selectedForm) selectedForm$: Observable<any>
  
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
    private store: Store,
    private fb: FormBuilder,
    private apiService: ApiService,
    public idbCrudService: IdbCrudService,
    private successService: SuccessService,
    private transformRunService: TransformRunService) {

    this.runForm = this.fb.group({})
  }

  ngOnInit() {}

  saveCloud() {
    let obj = {
      data: this.transformRunService.parseDataCloud(this.runForm.value, this.store.selectSnapshot(AuthState.selectedForm["formObject"])),
      columns: this.transformRunService.parseColumns(this.store.selectSnapshot(AuthState.selectedForm["formObject"]["form"]["details"])),
      user: this.store.selectSnapshot(AuthState.user),
      formObj: this.store.selectSnapshot(AuthState.selectedForm["formObject"])
    }

    this.apiService.save(obj).subscribe(() => {
      this.successService.popSnackbar('Successfully Saved.')
    })
  }

}


