import { Component, OnChanges, Input } from '@angular/core';

import { AppService } from "../../../../service/app.service"

@Component({
  selector: 'app-discrepancy',
  templateUrl: './discrepancy.component.html',
  styleUrls: ['./discrepancy.component.scss']
})
export class DiscrepancyComponent implements OnChanges {

  @Input() discrepancyForm
  @Input() detailForm

  constructor(public appService: AppService) { }

  ngOnChanges(): void {
    if (this.detailForm !== undefined) {
      const details = Object.keys(this.detailForm)
    
      let descrepancies = []
      
      details.forEach(element => {
        if (this.detailForm[element]) {
          let lastEight = element.substr(element.length - 8)
          if (lastEight === 'Comments') descrepancies.push(this.detailForm[element]+ ". ")
          else descrepancies.push(element+'; ') 
        }
      })
      let str = descrepancies.toString().replace(/,/g, '')
      this.discrepancyForm.controls['Discrepancy'].setValue(str)
    }
  }

}
