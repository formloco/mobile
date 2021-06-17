import { Component, OnInit, Input } from '@angular/core';
import { AppService } from "../../../service/app.service";

import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-textbox-run',
  templateUrl: './textbox-run.component.html',
  styleUrls: ['./textbox-run.component.scss']
})
export class TextboxRunComponent implements OnInit {

  @Input() index;
  @Input() runForm;

  constructor(
    public appService: AppService) { }

  ngOnInit() {
    if (this.appService.detailArray[this.index].required)
      this.runForm.addControl(this.appService.detailArray[this.index]
          .formControlName, new FormControl(null, Validators.required));
    else
      this.runForm.addControl(this.appService.detailArray[this.index].formControlName, new FormControl(''));
  }

}
