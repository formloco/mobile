import { Component, Input, OnInit } from '@angular/core'

import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'

import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms"

import { AppService } from "../../../service/app.service"

@Component({
  selector: 'app-hazard-assessment-company',
  templateUrl: './hazard-assessment-company.component.html',
  styleUrls: ['./hazard-assessment-company.component.scss']
})
export class HazardAssessmentCompanyComponent implements OnInit {

  @Input() companyForm

  options: string[] = []
  filteredOptions: Observable<string[]>

  constructor(
    public appService: AppService,
    private formBuilder: FormBuilder) { }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase()

    return this.options.filter(option => option.toLowerCase().includes(filterValue))
  }

  ngOnInit(): void {
    let companyObj = this.appService.lookupLists.filter(list => list.name === 'company')
    companyObj[0]["rows"].forEach(element => {
      this.options.push(element.data)
      this.options.sort()
    })
  }

}
