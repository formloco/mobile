import { Component, OnInit } from '@angular/core'

import { Observable } from 'rxjs'

import { Store, Select } from '@ngxs/store'
import { AppsState } from '../../state/apps/apps.state'
import { AssetService } from '../../service/asset.service'

import { SetPage, SetChildPageLabel } from '../../state/auth/auth-state.actions'

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit {

  @Select(AppsState.app) app$: Observable<any>
  @Select(AppsState.appPage) appPage$: Observable<any>
  
  constructor(
    private store: Store,
    private assetService: AssetService) { }

  ngOnInit(): void {
    console.log('got here')
    this.assetService.initializeApp()
  }

  close() {
    this.store.dispatch(new SetPage('home'))
    this.store.dispatch(new SetChildPageLabel('Forms'))
  }

}
