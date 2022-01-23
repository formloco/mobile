import { Component } from '@angular/core'

import { Observable } from 'rxjs'

import { Store, Select } from '@ngxs/store'

import { environment } from '../../../../../environments/environment'

// import { AppsState } from '../../../../state/apps/apps.state'
import { SetAppPage } from '../../../../state/apps/apps-state.actions'


import { DeviceState } from '../../../../state/device/device.state'

@Component({
  selector: 'app-asset-menu',
  templateUrl: './asset-menu.component.html',
  styleUrls: ['./asset-menu.component.scss']
})
export class AssetMenuComponent {

  @Select(DeviceState.isDarkMode) isDarkMode$: Observable<boolean>

  version = environment.version

  constructor(private store: Store) { }

  openPage(page) {
    this.store.dispatch(new SetAppPage(page))
  }

}
