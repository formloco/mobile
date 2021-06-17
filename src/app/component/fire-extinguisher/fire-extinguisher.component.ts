import { Component, OnInit, Input, Output, ChangeDetectionStrategy } from '@angular/core'

import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import { Router, ActivatedRoute } from '@angular/router'

import { AppState } from "../../model/state"

import { AppService } from "../../service/app.service"
import { AuthService } from "../../service/auth.service"
import { DataService } from "../../service/data.service"
import { IdbCrudService } from "../../service-idb/idb-crud.service"

import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from "@angular/forms"
import { MatSnackBar } from '@angular/material/snack-bar'

import { FIRE_EXTINGUISHER } from '../../model/forms'

@Component({
  selector: 'app-fire-extinguisher',
  templateUrl: './fire-extinguisher.component.html',
  styleUrls: ['./fire-extinguisher.component.scss'],
})
export class FireExtinguisherComponent implements OnInit {

  @Input() state: AppState

  step = 0

  form
  history = []

  companyForm: FormGroup
  jobDetailForm: FormGroup
  signOffForm: FormGroup

  myInnerWidth = window.innerWidth

  FIRE_EXTINGUISHER = FIRE_EXTINGUISHER

  isPanelOpen = false
  constructor(
    private router: Router,
    public appService: AppService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dataService: DataService,
    private _snackBar: MatSnackBar,
    private idbCrudService: IdbCrudService) {

    this.companyForm = this.formBuilder.group({
      date: [''],
      company: [''],
      address: [''],
      jobNumber: ['']
    })

    this.jobDetailForm = this.formBuilder.group({
      floor: [''],
      location: [''],
      size: [''],
      make: [''],
      serialNumber: [''],
      sixYear: [''],
      nextHST: [''],
      workPerformed: [''],
      remarks: ['']
    })

  }

  ngOnInit(): void {
    console.log(this.state)
    this.companyForm.patchValue({ date: new Date() })
  }

  goPIN() {
    this.router.navigate(['admin'])
  }

  submitForm() {
    let dataObj = []

    let userCreated = { name: this.appService.user.name, date_created: new Date() }

    dataObj.push(null)
    dataObj.push(JSON.stringify(userCreated))
    dataObj.push(new Date())
    dataObj.push(new Date())
    dataObj.push(this.companyForm.controls['company'].value)
    dataObj.push(this.companyForm.controls['address'].value)
    dataObj.push(this.companyForm.controls['jobNumber'].value)
    dataObj.push(JSON.stringify(this.appService.details))
    this.FIRE_EXTINGUISHER["form_id"] = this.state.selectedForm["form_id"]
    this.FIRE_EXTINGUISHER["is_published"] = true
    this.FIRE_EXTINGUISHER["is_data"] = true

    let obj = {
      data: dataObj,
      columns: this.FIRE_EXTINGUISHER["columns"],
      user: this.state.tenant,
      formObj: this.FIRE_EXTINGUISHER
    }

    this.dataService.save(obj).subscribe(data => {
      this.companyForm.reset()
      this.jobDetailForm.reset()
      this.state.page = 'home'
      this.state.childPageLabel = 'Mobile Forms'
      this._snackBar.open("Form Submitted!", 'Success', {
        duration: 3000,
        verticalPosition: 'bottom'
      })
    })
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

  getHistory(idx) {
    this.companyForm.patchValue({
      date: new Date(),
      company: this.appService.history[idx].company_name,
      address: this.appService.history[idx].company_address,
      jobNumber: this.appService.history[idx].job_number
    })
  
    this.history = this.appService.history[idx].data
  }

}
