import { Component, Input, OnInit } from '@angular/core'

import { FormControl } from "@angular/forms"
import { Store } from '@ngxs/store'

import { AuthState } from '../../../../state/auth/auth.state'

import { AutoCompleteService } from "../../../../service/auto-complete.service"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() headerForm

  header
  lookupLists

  customYearValues = [2025, 2024, 2023, 2022, 2021, 2016, 2008, 2004, 2000, 1996];
  customDayShortNames = ['s\u00f8n', 'man', 'tir', 'ons', 'tor', 'fre', 'l\u00f8r'];
  customPickerOptions: any;

  years: string[] = []
  makes: string[] = []
  models: string[] = []
  divisions: string[] = []
  stakeholders: string[] = []

  constructor(
    private store: Store,
    public autoCompleteService: AutoCompleteService) { }

  ngOnInit(): void {
    this.headerForm.controls['Date'].setValue(new Date().toISOString())
    this.lookupLists = this.store.selectSnapshot(AuthState.lookupListData)

    if (this.lookupLists) {
      this.stakeholders = this.lookupLists.filter(d => { return d.name == "stakeholders" })[0]["rows"].map(d => { return d.data })
      this.stakeholders.sort()

      this.divisions = this.lookupLists.filter(d => { return d.name == "divisions" })[0]["rows"].map(d => { return d.data })
      this.divisions.sort()

      this.years = this.lookupLists.filter(d => { return d.name == "years" })[0]["rows"].map(d => { return d.data })
      this.years.sort()
    }
  }

}
