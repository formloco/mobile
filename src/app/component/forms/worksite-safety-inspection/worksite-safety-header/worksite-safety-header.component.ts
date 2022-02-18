import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'

import { MatDialog } from "@angular/material/dialog"

import { Store } from '@ngxs/store'

import { AppService } from "../../../../service/app.service"
import { AuthState } from '../../../../state/auth/auth.state'
import { AutoCompleteService } from "../../../../service/auto-complete.service"
import { SpeechRecognitionService } from "../../../../service/speech-recognition.service"

@Component({
  selector: 'app-worksite-safety-header',
  templateUrl: './worksite-safety-header.component.html',
  styleUrls: ['./worksite-safety-header.component.scss']
})
export class WorksiteSafetyHeaderComponent implements OnInit {

  @Input() headerForm
  @Output() checkValidHeader = new EventEmitter<any>()

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
    private dialog: MatDialog,
    public appService: AppService,
    public autoCompleteService: AutoCompleteService,
    public speechRecognitionService: SpeechRecognitionService) { }

  ngOnInit(): void {
    this.headerForm.controls['Date'].setValue(new Date().toISOString())
    this.lookupLists = this.store.selectSnapshot(AuthState.lookupListData)

    if (this.lookupLists) {
      this.divisions = this.lookupLists.filter(d => { return d.name == "divisions" })[0]["rows"].map(d => { return d.data })
      this.divisions.sort()
    }

    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude
      const long = position.coords.longitude
      this.headerForm.controls['Latitude'].setValue(lat)
      this.headerForm.controls['Longitude'].setValue(long)
    })

  }

  validHeaderCheck() {
    this.checkValidHeader.emit()
  }

  openVoice(formField) {
    this.appService.popVoiceDialog(this.headerForm, formField, 'Scope of Work')
  }

}

