import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hazard-assessment-job-details',
  templateUrl: './hazard-assessment-job-details.component.html',
  styleUrls: ['./hazard-assessment-job-details.component.scss']
})
export class HazardAssessmentJobDetailsComponent implements OnInit {

  @Input() jobDetailForm;

  constructor() { }

  ngOnInit(): void {
  }

}
