import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HazardAssessmentTaskComponent } from './hazard-assessment-task.component';

describe('HazardAssessmentTaskComponent', () => {
  let component: HazardAssessmentTaskComponent;
  let fixture: ComponentFixture<HazardAssessmentTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HazardAssessmentTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HazardAssessmentTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
