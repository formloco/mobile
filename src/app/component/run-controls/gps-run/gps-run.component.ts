import { Component, OnInit, Input } from '@angular/core'

import { FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-gps-run',
  templateUrl: './gps-run.component.html',
  styleUrls: ['./gps-run.component.scss']
})
export class GpsRunComponent implements OnInit {

  @Input() index
  @Input() runForm

  lat
  long
  isPosition = true

  constructor() {}

  ngOnInit() {
    this.runForm.addControl('Latitude', new FormControl(''))
    this.runForm.addControl('Longitude', new FormControl(''))  
  }

}
