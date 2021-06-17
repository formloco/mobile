import { Component, Input, OnInit } from '@angular/core'

import { AppService } from "../../../service/app.service"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() headerForm

  header

  customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];
  customDayShortNames = ['s\u00f8n', 'man', 'tir', 'ons', 'tor', 'fre', 'l\u00f8r'];
  customPickerOptions: any;

  workers: string[] = []
  stakeholders: string[] = []
  divisions: string[] = []
  supervisors: string[] = []

  constructor(
    public appService: AppService) { }

  ngOnInit(): void {
    this.headerForm.controls['Date'].setValue( new Date())
    if (this.appService.lookupLists !== undefined) {
      let workersObj = this.appService.lookupLists.filter(list => list.name === 'workers')
      if (workersObj.length > 0)
        workersObj[0]["rows"].forEach(element => {
          this.workers.push(element.data)
          this.workers.sort()
        })
      let supervisorsObj = this.appService.lookupLists.filter(list => list.name === 'supervisors')
      if (supervisorsObj.length > 0)
        supervisorsObj[0]["rows"].forEach(element => {
          this.supervisors.push(element.data)
          this.supervisors.sort()
        })
      let stakeholdersObj = this.appService.lookupLists.filter(list => list.name === 'stakeholders')
      if (stakeholdersObj.length > 0)
      stakeholdersObj[0]["rows"].forEach(element => {
          this.stakeholders.push(element.data)
          this.stakeholders.sort()
        })
      let divisionsObj = this.appService.lookupLists.filter(list => list.name === 'divisions')
      if (divisionsObj.length > 0)
        divisionsObj[0]["rows"].forEach(element => {
          this.divisions.push(element.data)
          this.divisions.sort()
        })
    }
  }

}
