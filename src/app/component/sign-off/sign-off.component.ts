import { Component, Output, Input, EventEmitter } from '@angular/core'

import { AppService } from "../../service/app.service"

import { AppState } from "../../model/state"

@Component({
  selector: 'app-sign-off',
  templateUrl: './sign-off.component.html',
  styleUrls: ['./sign-off.component.scss']
})
export class SignOffComponent {

  @Input() state: AppState
  // @Input() companyForm
  @Output() submitForm = new EventEmitter<any>()

  constructor(public appService: AppService) { }

  save() {
    this.submitForm.emit()
  }

}
