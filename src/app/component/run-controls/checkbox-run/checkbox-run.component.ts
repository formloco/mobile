import { Component, OnInit, Input } from '@angular/core';
import { AppService } from "../../../service/app.service";

import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkbox-run',
  templateUrl: './checkbox-run.component.html',
  styleUrls: ['./checkbox-run.component.scss']
})
export class CheckboxRunComponent implements OnInit {

  @Input() index;
  @Input() runForm;

  constructor(
    public appService: AppService) { }

  ngOnInit() {
    this.appService.detailArray[this.index].checkboxArray.forEach(element => {
      if (element.required)
        this.runForm.addControl(element.formControlName, 
            new FormControl(false, Validators.required));
      else
        this.runForm.addControl(element.formControlName, new FormControl(false));
    });
  }

}
