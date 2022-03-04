import { Component } from '@angular/core'

import { Store } from '@ngxs/store'
import { MatBottomSheetRef } from '@angular/material/bottom-sheet'

import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  githubUrl = environment.githubUrl

  constructor(
    public matBottomSheetRef: MatBottomSheetRef<ContactComponent>) { }

  close() {
    this.matBottomSheetRef.dismiss()
  }

  signup() {}

}
