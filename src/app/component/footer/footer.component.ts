import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core'

import { AppState } from "../../model/state"

import { AppService } from "../../service/app.service"

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent  implements OnInit {

  @Input() state: AppState
  @Output() getHistory = new EventEmitter<any>()

  form
  isHistory = false

  myInnerWidth = window.innerWidth
  
  constructor(public appService: AppService) {}

  ngOnInit(): void {}

  closeOverlay() {
    this.isHistory = false
  }

  restoreData(idx) {
    this.isHistory = false
    this.getHistory.emit(idx)
    this.appService.isFooter = false
  }
  
}
