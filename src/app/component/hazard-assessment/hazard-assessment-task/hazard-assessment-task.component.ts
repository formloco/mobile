import { Component, ElementRef, ViewChild, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core'

import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms"

import { AppService } from "../../../service/app.service"
import { environment } from "../../../../environments/environment"

@Component({
  selector: 'app-hazard-assessment-task',
  templateUrl: './hazard-assessment-task.component.html',
  styleUrls: ['./hazard-assessment-task.component.scss']
})
export class HazardAssessmentTaskComponent implements OnChanges, OnInit {

  @Input() hazardsForm
  
  @ViewChild('taskInput') taskInput: ElementRef<HTMLInputElement>

  panelOpenState:boolean = false
  selectedIndex = 0

  data
  tasks: any = []
  severities: string[] = []
  hazards: string[] = []
  probabilities: string[] = []
  values: FormArray
 
  constructor(
    public appService: AppService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    let hazardsObj = this.appService.lookupLists.filter(list => list.name === 'hazards')
    hazardsObj[0]["rows"].forEach(element => {
      this.hazards.push(element.data)
      this.hazards.sort()
    })
    let probabilityObj = this.appService.lookupLists.filter(list => list.name === 'probability')
    probabilityObj[0]["rows"].forEach(element => {
      this.probabilities.push(element.data)
      this.probabilities.sort()
    })
    let severityObj = this.appService.lookupLists.filter(list => list.name === 'severity')
    severityObj[0]["rows"].forEach(element => {
      this.severities.push(element.data)
      this.severities.sort()
    })
    this.panelOpened(0)
  }

  ngOnChanges() {
    if (this.hazardsForm.value.values.length > 1) this.appService.isNew = true
    this.values = this.hazardsForm.get('values')            
  }

  saveTask(){
    this.appService.isNew = true
    this.panelOpenState = false
  }

  addMoreTasks(state) {
    this.hazardsForm.get('values').push(this.formBuilder.group({
      tasks:[''],
      hazards: [''],
      severity: [''],
      probability: ['']
    }))
    this.selectedIndex = this.hazardsForm.get('values').length -1
    this.panelOpenState = state
    this.appService.isNew = state
  }
 
  panelOpened(index) {
    this.selectedIndex = index
    this.panelOpenState = true
  }

  panelClosed(index) {
    if (index == this.selectedIndex) this.panelOpenState = false
  }

  deleteTask(idx) {
    this.values.removeAt(idx)
    this.panelOpenState = false
    if (this.values.length == 0) {
      this.addMoreTasks(false)
      this.panelOpenState = true
    }
  }

}

