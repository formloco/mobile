import { Component, OnChanges, Output, Input, EventEmitter } from '@angular/core'

import * as uuid from 'uuid'
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import { Router, ActivatedRoute } from '@angular/router'

import { AppState, Form } from "../../model/state"

import { AppService } from "../../service/app.service"
import { AuthService } from "../../service/auth.service"
import { StateService } from "../../service/state.service"
import { IdbCrudService } from "../../service-idb/idb-crud.service"

import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from "@angular/forms"

import { environment } from '../../../environments/environment'
import { ɵNullViewportScroller } from '@angular/common';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnChanges {

  @Input() state: AppState
  @Output() toggleTheme = new EventEmitter<any>()

  myInnerWidth = window.innerWidth
  myInnerHeight = window.innerHeight

  isPin = false
  isSignin = false
  canvasBackground = '#3b3b3b'

  tenant = environment.tenant

  token
  prefs
  history

  form: Form

  isRightMenu = false
  isLookuplist = false

  constructor(
    private router: Router,
    public appService: AppService,
    private authService: AuthService,
    public stateService: StateService,
    private idbCrudService: IdbCrudService) { }

  ngOnChanges(): void {
    console.log(this.myInnerWidth)
  }

  goPIN() {
    this.state.page = 'pin'
  }

  openLists() {
    this.isLookuplist = true
    this.isRightMenu = !this.isRightMenu
  }

  changeTheme(event) {
    this.toggleTheme.emit();
  }

}
