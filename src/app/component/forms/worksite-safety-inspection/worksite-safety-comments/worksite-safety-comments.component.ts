import { Component, OnInit, Input } from '@angular/core'
import { AppService } from "../../../../service/app.service"

@Component({
  selector: 'app-worksite-safety-comments',
  templateUrl: './worksite-safety-comments.component.html',
  styleUrls: ['./worksite-safety-comments.component.scss']
})
export class WorksiteSafetyCommentsComponent implements OnInit {

  @Input() commentForm

  constructor(public appService: AppService) { }

  ngOnInit(): void {
  }

  openVoice(formField) {
    this.appService.popVoiceDialog(this.commentForm, formField, 'Comments And Required Action Items')
  }

}
