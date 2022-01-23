import { Component, OnInit, Input } from '@angular/core'

import { Store } from '@ngxs/store'

import { AutoCompleteService } from "../../../../service/auto-complete.service"

@Component({
  selector: 'app-meaningful-site-tour-header',
  templateUrl: './meaningful-site-tour-header.component.html',
  styleUrls: ['./meaningful-site-tour-header.component.scss']
})
export class MeaningfulSiteTourHeaderComponent implements OnInit {

  @Input() headerForm

  header
  lookupLists

  customYearValues = [2025, 2024, 2023, 2022, 2021, 2016, 2008, 2004, 2000, 1996];
  customDayShortNames = ['s\u00f8n', 'man', 'tir', 'ons', 'tor', 'fre', 'l\u00f8r'];
  customPickerOptions: any;
  
  constructor(
    public autoCompleteService: AutoCompleteService) { 
     }

  ngOnInit(): void {
    this.headerForm.controls['Date'].setValue(new Date().toISOString())
  }

}
