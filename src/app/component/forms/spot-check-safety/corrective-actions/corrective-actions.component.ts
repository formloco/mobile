import { Component, Input } from '@angular/core'

import { MatDialogConfig, MatDialog } from "@angular/material/dialog"

import { Store } from '@ngxs/store'
import { DeviceState } from '../../../../state/device/device.state'

import { SetSelectedVoiceFieldLabel } from '../../../../state/auth/auth-state.actions'
import { SetTranscription } from '../../../../state/device/device-state.actions'

import { VoiceComponent } from '../../../voice/voice.component'
import { AppService } from "../../../../service/app.service"

@Component({
  selector: 'app-corrective-actions',
  templateUrl: './corrective-actions.component.html',
  styleUrls: ['./corrective-actions.component.scss']
})
export class CorrectiveActionsComponent {

  @Input() correctiveActionForm
  
  constructor(
    private store: Store,
    private dialog: MatDialog,
    public appService: AppService) { }

  ngOnInit(): void {
  }

  openVoice(formField, title) {
    this.appService.popVoiceDialog(this.correctiveActionForm, formField, title)
  }

}
