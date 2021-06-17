import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core'

import { AppState } from "../../../model/state"

import { FORMS } from "../../../model/forms"

@Component({
  selector: 'app-data-forms',
  templateUrl: './data-forms.component.html',
  styleUrls: ['./data-forms.component.scss']
})
export class DataFormsComponent implements OnInit {

  @Input() state: AppState
  @Output() selectChild = new EventEmitter<any>()

  forms = FORMS

  constructor() { }

  ngOnInit(): void {
    this.state.childPageLabel = 'Administration - Data Forms'
  }

  selectForm(formObj) {
    this.state.selectedForm = formObj
    this.selectChild.emit('data')
  }

}
