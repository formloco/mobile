import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HazardAssessmentJobDetailsComponent } from './hazard-assessment-job-details.component';

describe('HazardAssessmentJobDetailsComponent', () => {
  let component: HazardAssessmentJobDetailsComponent;
  let fixture: ComponentFixture<HazardAssessmentJobDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HazardAssessmentJobDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HazardAssessmentJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
