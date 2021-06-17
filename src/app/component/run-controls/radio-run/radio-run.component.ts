import { Component, OnInit, Input } from '@angular/core';
import { AppService } from "../../../service/app.service";

import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-radio-run',
  templateUrl: './radio-run.component.html',
  styleUrls: ['./radio-run.component.scss']
})
export class RadioRunComponent implements OnInit {

  @Input() index;
  @Input() runForm;

  constructor(
    public appService: AppService) { }

  ngOnInit() {
    if (this.appService.detailArray[this.index].required !== undefined)
      this.runForm.addControl(this.appService.detailArray[this.index]
          .formControlName, new FormControl(null, Validators.required));
    else
      this.runForm.addControl(this.appService.detailArray[this.index]
          .formControlName, new FormControl(''));
  }
   
}
