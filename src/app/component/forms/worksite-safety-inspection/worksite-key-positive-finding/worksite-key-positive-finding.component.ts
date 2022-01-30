import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-worksite-key-positive-finding',
  templateUrl: './worksite-key-positive-finding.component.html',
  styleUrls: ['./worksite-key-positive-finding.component.scss']
})
export class WorksiteKeyPositiveFindingComponent {

  @Input() keyPositiveFindingsForm

  constructor() { }

}
