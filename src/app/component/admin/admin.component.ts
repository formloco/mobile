import { Component, OnInit, Input, ViewChild } from '@angular/core'

import { AppState } from "../../model/state"

import * as uuid from 'uuid'
import { Router, ActivatedRoute } from '@angular/router'

import { MatSnackBar } from '@angular/material/snack-bar'
import { MatSidenav } from '@angular/material/sidenav'

import { FormBuilder, FormControl, Validators, FormGroup, FormArray } from '@angular/forms'

import { AppService } from "../../service/app.service"
import { AuthService } from "../../service/auth.service"

import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  @Input() state: AppState

  @ViewChild('sidenav') sidenav: MatSidenav

  token
  templates
  
  templateControls

  myInnerHeight = window.innerHeight

  templateForm: FormGroup

  fileArray = []
  isError = false
  isMainMenu = true
  isRightMenu = false
  isImportOpen = false
  isLookuplist = true

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public appService: AppService,
    private authService: AuthService) { 
      this.templateForm = this.formBuilder.group({
        templateArray: this.formBuilder.array([])
      })
    }
  
  ngOnInit() {}

  close(reason: string) {
    this.sidenav.close()
  }

  closeOverlay() {
    this.isImportOpen = false
  }

  selectChild(child) {
    this.state.childPage = child
  }

}