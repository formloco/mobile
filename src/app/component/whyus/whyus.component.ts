import { Component, OnInit } from '@angular/core'

import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet'

import { Store } from '@ngxs/store'
import { SetPage } from '../../state/auth/auth-state.actions'

import { environment } from '../../../environments/environment'

import { SignupComponent } from "../admin/signup/signup.component"
import { ContactComponent } from "../contact/contact.component"

@Component({
  selector: 'app-whyus',
  templateUrl: './whyus.component.html',
  styleUrls: ['./whyus.component.scss']
})
export class WhyusComponent implements OnInit {

  githubUrl = environment.githubUrl

  constructor(
    private store: Store,
    private bottomSheet: MatBottomSheet,
    public matBottomSheetRef: MatBottomSheetRef<WhyusComponent>) { }

  ngOnInit(): void {
  }

  signup() {
    this.bottomSheet.open(SignupComponent)
  }

  close() {
    this.matBottomSheetRef.dismiss()
  }

  contact() {
    this.bottomSheet.open(ContactComponent)
  }

}