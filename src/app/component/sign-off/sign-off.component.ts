import { Component, Output, EventEmitter } from '@angular/core'

import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-sign-off',
  templateUrl: './sign-off.component.html',
  styleUrls: ['./sign-off.component.scss']
})
export class SignOffComponent {

  @Output() submitForm = new EventEmitter<any>()

  isEdit = false
  kioske = environment.kioske

  constructor() { }

  save() {
    this.submitForm.emit()
  }

}
