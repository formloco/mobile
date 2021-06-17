import { Component, Input, OnInit } from '@angular/core'

import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'

import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms"

import { AppService } from "../../../service/app.service"

@Component({
  selector: 'app-fire-extinguisher-company',
  templateUrl: './fire-extinguisher-company.component.html',
  styleUrls: ['./fire-extinguisher-company.component.scss']
})
export class FireExtinguisherCompanyComponent implements OnInit {

  @Input() companyForm

  company

  customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];
  customDayShortNames = ['s\u00f8n', 'man', 'tir', 'ons', 'tor', 'fre', 'l\u00f8r'];
  customPickerOptions: any;

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
