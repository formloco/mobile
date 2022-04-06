import { Component, Input } from '@angular/core'
import { AppService } from "../../../../service/app.service"
@Component({
  selector: 'app-worksite-key-positive-finding',
  templateUrl: './worksite-key-positive-finding.component.html',
  styleUrls: ['./worksite-key-positive-finding.component.scss']
})
export class WorksiteKeyPositiveFindingComponent {

  @Input() keyPositiveFindingsForm

  constructor(public appService: AppService) { }

  openVoice(formField) {
    this.appService.popVoiceDialog(this.keyPositiveFindingsForm, formField, 'Scope of Work')
  }

}
