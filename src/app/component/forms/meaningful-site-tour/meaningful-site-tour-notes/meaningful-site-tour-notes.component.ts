import { Component, Input } from '@angular/core'

import { MatDialogConfig, MatDialog } from "@angular/material/dialog"

import { Store } from '@ngxs/store'
import { DeviceState } from '../../../../state/device/device.state'

import { SetSelectedVoiceFieldLabel } from '../../../../state/auth/auth-state.actions'
import { SetTranscription } from '../../../../state/device/device-state.actions'
import { VoiceComponent } from '../../../voice/voice.component'
import { AppService } from "../../../../service/app.service"

@Component({
  selector: 'app-meaningful-site-tour-notes',
  templateUrl: './meaningful-site-tour-notes.component.html',
  styleUrls: ['./meaningful-site-tour-notes.component.scss']
})
export class MeaningfulSiteTourNotesComponent {

  @Input() notesForm

  constructor(
    private store: Store,
    private dialog: MatDialog,
    public appService: AppService) { }

  openVoice(formField, title) {
    this.appService.popVoiceDialog(this.notesForm, formField, title)
  }
}
