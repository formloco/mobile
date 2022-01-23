import { Component, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-sign-off',
  templateUrl: './sign-off.component.html',
  styleUrls: ['./sign-off.component.scss']
})
export class SignOffComponent {

  @Output() submitForm = new EventEmitter<any>()

  constructor() { }

  save() {
    this.submitForm.emit()
  }

}
