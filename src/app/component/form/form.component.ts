import { Component, Input, OnInit } from '@angular/core'

import { AppState } from "../../model/state"

import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms'

import { AppService } from "../../service/app.service"
import { DataService } from "../../service/data.service"
import { StateService } from "../../service/state.service"
import { IdbCrudService } from "../../service-idb/idb-crud.service"

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() state: AppState

  runForm: FormGroup

  form
  step = 0

  constructor(
    private fb: FormBuilder,
    public appService: AppService,
    private dataService: DataService,
    public stateService: StateService,
    private idbCrudService: IdbCrudService) {
    this.runForm = this.fb.group({})
  }

  close() {
    this.appService.isFooter = true
    this.state.page = 'home'
    this.state.childPageLabel = 'Mobile Forms'
  }

  ngOnInit(): void {
    if (this.state.selectedForm.history) {
      this.idbCrudService.read('form', this.state.selectedForm.id).subscribe(form => {
        this.form = form
        let obj = ({
          form_id: this.form.form_id,
          tenant_id: this.state.tenant["tenant_id"]
        })

        this.dataService.getData(obj).subscribe(data => {
          this.appService.history = data
        })
      })
    }
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++
  }

  prevStep() {
    this.step--
  }


}
