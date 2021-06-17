import { Component, Input, Output, EventEmitter } from '@angular/core'

import { AppState } from "../../../model/state"

import { OverlayContainer } from '@angular/cdk/overlay'

import { AppService } from "../../../service/app.service";
import { AuthService } from "../../../service/auth.service";
import { IdbCrudService } from "../../../service-idb/idb-crud.service"

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Input() state: AppState
  @Output() selectChild = new EventEmitter<any>()

  constructor(
    public appService: AppService,
    public authService: AuthService,
    private idbCrudService: IdbCrudService,
    private overlayContainer: OverlayContainer) { }

  selectMenu(child) {
    this.appService.isListMenu = false
    if (child === 'data-forms') this.state.childPageLabel = 'Admin - Data'
    if (child === 'settings') this.state.childPageLabel = 'Admin - User Settings'
    this.selectChild.emit(child)
  }

  list() {
    this.appService.isListMenu = !this.appService.isListMenu
  }

}
