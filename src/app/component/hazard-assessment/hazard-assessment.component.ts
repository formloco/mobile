import { Component, OnInit, Input } from '@angular/core'

import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import { Router, ActivatedRoute } from '@angular/router'

import { AppService } from "../../service/app.service"
import { AuthService } from "../../service/auth.service"
import { DataService } from "../../service/data.service"

import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from "@angular/forms"
import { MatSnackBar } from '@angular/material/snack-bar'

import { AppState } from "../../model/state"

import { HAZARD_ASSESSMENT } from '../../model/forms'

@Component({
  selector: 'app-hazard-assessment',
  templateUrl: './hazard-assessment.component.html',
  styleUrls: ['./hazard-assessment.component.scss']
})
export class HazardAssessmentComponent implements OnInit {

  token
  @Input() state: AppState


  HAZARD_ASSESSMENT = HAZARD_ASSESSMENT

  step = 0

  isRightMenu = false
  isLookuplist = false

  companyForm: FormGroup
  hazardsForm: FormGroup
  jobDetailForm: FormGroup
  signOffForm: FormGroup

  myInnerHeight = window.innerHeight
  isPanelOpen = false
  constructor(
    private router: Router,
    public appService: AppService,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private authService: AuthService,
    private _snackBar: MatSnackBar) {

    this.companyForm = this.formBuilder.group({
      dateCreated: [''],
      company: [''],
      location: [''],
      musterPoint: [''],
      jobNumber: [''],
      ppeInspection: ['']
    })

    let formArray: FormArray = this.formBuilder.array([
      this.formBuilder.group({
        tasks: [''],
        hazards: [''],
        severity: [''],
        probability: ['']
      })
    ])
    this.hazardsForm = this.formBuilder.group({
      values: formArray
    })
    this.jobDetailForm = this.formBuilder.group({
      isPreInspectionComplete: [''],
      isWorkingAlone: [''],
      commentOnWorkingAlone: [''],
      warningRibbonNeeded: [''],
      allPermitsClosedOut: ['NA'],
      areaCleanedUp: ['NA'],
      hazardsRemaining: [''],
      commentOnRemainingHazards: [''],
      anyIncidents: [''],
      commentOnIncidents: ['']
    })

  }

  ngOnInit(): void {
    this.companyForm.patchValue({ dateCreated: new Date() })
  }

  goPIN() {
    this.router.navigate(['admin'])
  }

  submitForm() {

    let dataObj = []

    this.state["user"]
    let userCreated = { name: this.appService.user.name, date_created: new Date() }

    if (this.companyForm.controls['ppeInspection'].value !== true) 
      this.companyForm.controls['ppeInspection'].setValue(false)

    if (this.jobDetailForm.controls['isPreInspectionComplete'].value !== true)
      this.jobDetailForm.controls['isPreInspectionComplete'].setValue(false)

    if (this.jobDetailForm.controls['isWorkingAlone'].value !== true)
      this.jobDetailForm.controls['isWorkingAlone'].setValue(false)

    if (this.jobDetailForm.controls['warningRibbonNeeded'].value !== true)
      this.jobDetailForm.controls['warningRibbonNeeded'].setValue(false)

    if (this.jobDetailForm.controls['hazardsRemaining'].value !== true)
      this.jobDetailForm.controls['hazardsRemaining'].setValue(false)

    if (this.jobDetailForm.controls['anyIncidents'].value !== true)
      this.jobDetailForm.controls['anyIncidents'].setValue(false)

    dataObj.push(null)
    dataObj.push(JSON.stringify(userCreated))
    dataObj.push(new Date())
    dataObj.push(new Date())
    dataObj.push(this.companyForm.controls['company'].value)
    dataObj.push(this.companyForm.controls['location'].value)
    dataObj.push(this.companyForm.controls['musterPoint'].value)
    dataObj.push(this.companyForm.controls['jobNumber'].value)
    dataObj.push(this.companyForm.controls['ppeInspection'].value)
    dataObj.push(this.jobDetailForm.controls['isPreInspectionComplete'].value)
    dataObj.push(this.jobDetailForm.controls['isWorkingAlone'].value)
    dataObj.push(this.jobDetailForm.controls['commentOnWorkingAlone'].value)
    dataObj.push(this.jobDetailForm.controls['warningRibbonNeeded'].value)
    dataObj.push(this.jobDetailForm.controls['allPermitsClosedOut'].value)
    dataObj.push(this.jobDetailForm.controls['areaCleanedUp'].value)
    dataObj.push(this.jobDetailForm.controls['hazardsRemaining'].value)
    dataObj.push(this.jobDetailForm.controls['commentOnRemainingHazards'].value)
    dataObj.push(this.jobDetailForm.controls['anyIncidents'].value)
    dataObj.push(this.jobDetailForm.controls['commentOnIncidents'].value)
    dataObj.push(JSON.stringify(this.hazardsForm.value.values))
    this.HAZARD_ASSESSMENT["form_id"] = this.state.selectedForm["form_id"]
    this.HAZARD_ASSESSMENT["is_published"] = true
    this.HAZARD_ASSESSMENT["is_data"] = true

    let obj = {
      data: dataObj,
      columns: this.HAZARD_ASSESSMENT["columns"],
      user: this.state.tenant,
      formObj: this.HAZARD_ASSESSMENT
    }

    this.dataService.save(obj).subscribe(data => {
      this.companyForm.reset()
      this.hazardsForm.reset()
      this.jobDetailForm.reset()
      this.state.page = 'home'
      this.state.childPageLabel = 'Mobile Forms'
      this._snackBar.open("Form Submitted!", 'Success', {
        duration: 3000,
        verticalPosition: 'bottom'
      })
    })


    let formArray: FormArray = this.hazardsForm.get('values') as FormArray
    while (formArray.length !== 1) {
      formArray.removeAt(0)
    }
    this._snackBar.open("Form Submitted!", '', {
      duration: 3000,
      verticalPosition: 'bottom'
    })
  }

  openLists() {
    this.isLookuplist = true
    this.isRightMenu = !this.isRightMenu
  }

  getHistory(data) {
    this.companyForm.patchValue({
      date: data.date,
      company: data.company,
      location: data.location,
      musterPoint: data.musterPoint,
      jobNumber: data.jobNumber,
      ppeInspection: data.ppeInspection
    })

    data.values.forEach(element => {
      this.hazardsForm.patchValue({
        tasks: element.tasks,
        hazards: element.hazards,
        severity: element.severity,
        probability: element.probability
      })
    })

    this.jobDetailForm.patchValue({
      isPreInspectionComplete: data.isPreInspectionComplete,
      isWorkingAlone: data.isWorkingAlone,
      commentOnWorkingAlone: data.ommentOnWorkingAlone,
      warningRibbonNeeded: data.warningRibbonNeeded,
      allPermitsClosedOut: data.allPermitsClosedOut,
      areaCleanedUp: data.areaCleanedUp,
      hazardsRemaining: data.hazardsRemaining,
      commentOnRemainingHazards: data.commentOnRemainingHazards,
      anyIncidents: data.anyIncidents,
      commentOnIncidents: data.commentOnIncidents
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

}
