import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HazardAssessmentComponent } from './hazard-assessment.component';

describe('HazardAssessmentComponent', () => {
  let component: HazardAssessmentComponent;
  let fixture: ComponentFixture<HazardAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HazardAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HazardAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
