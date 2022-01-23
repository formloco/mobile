import { Component, Input } from '@angular/core';

import { Store } from '@ngxs/store'

import { CommentState } from '../../../comment/state/comment.state'

@Component({
  selector: 'app-discrepancy-spot-check-safety',
  templateUrl: './discrepancy-spot-check-safety.component.html',
  styleUrls: ['./discrepancy-spot-check-safety.component.scss']
})
export class DiscrepancySpotCheckSafetyComponent {

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

