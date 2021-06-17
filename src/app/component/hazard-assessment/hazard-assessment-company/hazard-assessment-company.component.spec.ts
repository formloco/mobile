import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HazardAssessmentCompanyComponent } from './hazard-assessment-company.component';

describe('HazardAssessmentCompanyComponent', () => {
  let component: HazardAssessmentCompanyComponent;
  let fixture: ComponentFixture<HazardAssessmentCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HazardAssessmentCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HazardAssessmentCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
