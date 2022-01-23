import { Component, OnInit, Input } from '@angular/core'

import { AutoCompleteService } from "../../../../service/auto-complete.service"

@Component({
  selector: 'app-spot-check-safety-header',
  templateUrl: './spot-check-safety-header.component.html',
  styleUrls: ['./spot-check-safety-header.component.scss']
})
export class SpotCheckSafetyHeaderComponent implements OnInit {

  @Input() headerForm

  constructor(public autoCompleteService: AutoCompleteService) { }

  ngOnInit(): void {
    this.headerForm.controls['Date'].setValue(new Date().toISOString())
  }
  
}
