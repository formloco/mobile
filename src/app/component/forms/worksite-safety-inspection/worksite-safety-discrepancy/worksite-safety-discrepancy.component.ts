import { Component, OnInit, Input } from '@angular/core'

import { CommentState } from '../../../comment/state/comment.state'

import { Store } from '@ngxs/store'

@Component({
  selector: 'app-worksite-safety-discrepancy',
  templateUrl: './worksite-safety-discrepancy.component.html',
  styleUrls: ['./worksite-safety-discrepancy.component.scss']
})
export class WorksiteSafetyDiscrepancyComponent implements OnInit {

  @Input() discrepancyForm

  constructor(
    private store: Store) {}

  ngOnInit(): void {
    this.store.select(CommentState.comments).subscribe((comments:any) => {
      let commentStr = ''
      comments.forEach(comment => {
        commentStr = commentStr + comment.label + ': ' + comment.text + ', '
      })
      commentStr = commentStr.slice(0, -2)
      this.discrepancyForm.controls['Discrepancy'].setValue(commentStr)
    })
  }

}
