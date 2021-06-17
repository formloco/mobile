import { Component, Output, Input, OnInit, EventEmitter } from '@angular/core'

import { AppState } from "../../model/state"

import { OverlayContainer } from '@angular/cdk/overlay'

import { AppService } from "../../service/app.service"
import { StateService } from "../../service/state.service"
import { AuthService } from "../../service/auth.service"
import { IdbCrudService } from "../../service-idb/idb-crud.service"

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Output() changeTheme = new EventEmitter();
  @Input() state: AppState

  constructor(
    public appService: AppService,
    public authService: AuthService,
    public stateService: StateService,
    private idbCrudService: IdbCrudService,
    private overlayContainer: OverlayContainer) { }

  ngOnInit(): void { }

  signin() {
    this.state.page = 'pin'
    this.state.signIn = true
  }

  signout() {
    this.state.page = 'home'
    this.state.childPageLabel = 'Mobile Forms'
    this.state.signIn = false
    location.reload()
  }

  toggleTheme(event) {
    this.changeTheme.emit();
  }

}
