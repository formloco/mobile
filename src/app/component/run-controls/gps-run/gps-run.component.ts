import { Component, OnInit, Input } from '@angular/core'
import { AppService } from "../../../service/app.service"

import { FormControl, Validators } from '@angular/forms'
import { AppState } from "../../../model/state"

@Component({
  selector: 'app-gps-run',
  templateUrl: './gps-run.component.html',
  styleUrls: ['./gps-run.component.scss']
})
export class GpsRunComponent implements OnInit {

  @Input() index
  @Input() runForm
  @Input() state: AppState

  lat
  long
  isPosition = true

  constructor(
    public appService: AppService) {}

  ngOnInit() {
    this.runForm.addControl('Latitude', new FormControl(''))
    this.runForm.addControl('Longitude', new FormControl(''))  
    this.runForm.controls['Latitude'].setValue(this.state["lat"])
    this.runForm.controls['Longitude'].setValue(this.state["long"])
  }

}
