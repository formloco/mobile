import { Component, OnInit, HostBinding } from '@angular/core'

import { OverlayContainer } from '@angular/cdk/overlay'

import { AppState, Form } from "./model/state"

import { AppService } from "./service/app.service"
import { AuthService } from "./service/auth.service"
import { DataService } from "./service/data.service"
import { StateService } from "./service/state.service"
import { IdbCrudService } from "./service-idb/idb-crud.service"

import { environment } from '../environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'MOBILE FORMS'

  @HostBinding('class') className = 'darkMode'

  prefs
  token
  // state

  form: Form
  state: AppState

  tenant = environment.tenant
  myInnerHeight = window.innerHeight

  constructor(
    public appService: AppService,
    private authService: AuthService,
    private dataService: DataService,
    public stateService: StateService,
    private idbCrudService: IdbCrudService,
    private overlayContainer: OverlayContainer) {
    this.appService.canvasBackground = '#3b3b3b'
  }

  ngOnInit(): void {
    this.idbCrudService.readAll('prefs').subscribe(prefs => {
      this.prefs = prefs
      let darkClassName = 'darkMode'

      // set default prefs on first load
      if (this.prefs.length === 0) {
        let obj = { id: 0, dark_mode: true, user: {} }
        this.idbCrudService.put('prefs', obj)
        this.setStateIdentified()
      }
      else {

          if (!this.prefs[0].dark_mode) darkClassName = ''

          // state: identified, user is undefined until identified
          if (this.prefs[0]["user"]["userID"] !== undefined) {
            this.appService.user = this.prefs[0]['user']

            this.state = {
              identified: true,
              page: 'home',
              childPage: '',
              childPageLabel: 'Mobile Forms',
              lat: null,
              long: null,
              user: this.prefs[0]['user'],
              darkMode: this.prefs[0]["dark_mode"],
              tenant: this.tenant,
              signIn: false,
              selectedForm: this.form
            }
            this.stateService.setState(this.state)
          }
          else this.setStateIdentified()
        }
        this.setMode(darkClassName)
      })

    this.authService.token().subscribe(token => {
      this.token = token
      localStorage.setItem('formToken', this.token.token)

      this.dataService.getLists({ tenant_id: this.tenant.tenant_id }).subscribe(lists => {
        this.appService.lookupLists = lists
        this.appService.lookupLists.sort()
      })
    })
  }

  setStateIdentified() {
     this.state = {
      identified: true,
      page: 'identified',
      childPage: '',
      childPageLabel: '',
      lat: null,
      long: null,
      user: {},
      darkMode: true,
      tenant: this.tenant,
      signIn: false,
      selectedForm: this.form
    }
  }

  toggleTheme() {
    let darkClassName = ''

    if (this.state.darkMode) darkClassName = ''
    else darkClassName = 'darkMode'

    this.setMode(darkClassName)

    this.idbCrudService.readAll('prefs').subscribe(prefs => {
      if (prefs[0] !== undefined) {
        let obj = prefs[0]
        obj["dark_mode"] = this.state.darkMode
        this.idbCrudService.put('prefs', obj)
      }
    })
  }

  setMode(darkClassName) {
    this.className = 'darkMode' ? darkClassName : ''

    if (darkClassName === 'darkMode') {
      this.overlayContainer.getContainerElement().classList.add(darkClassName)
      this.appService.canvasBackground = '#3b3b3b'
    }
    else {
      this.overlayContainer.getContainerElement().classList.remove('darkMode')
      this.appService.canvasBackground = '#ffffff'
    }
  }

}

