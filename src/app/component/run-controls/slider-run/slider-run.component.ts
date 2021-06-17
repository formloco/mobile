import { Component, OnInit, Input } from '@angular/core';
import { AppService } from "../../../service/app.service";

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-slider-run',
  templateUrl: './slider-run.component.html',
  styleUrls: ['./slider-run.component.scss']
})
export class SliderRunComponent implements OnInit {

  @Input() index;
  @Input() runForm;
  
  constructor(
    public appService: AppService) { }

  ngOnInit() {
    this.runForm.addControl(this.appService.detailArray[this.index]
        .formControlName, new FormControl(''));
  }

}
