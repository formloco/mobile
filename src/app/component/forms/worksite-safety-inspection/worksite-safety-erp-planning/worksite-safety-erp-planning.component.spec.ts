import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksiteSafetyErpPlanningComponent } from './worksite-safety-erp-planning.component';

describe('WorksiteSafetyErpPlanningComponent', () => {
  let component: WorksiteSafetyErpPlanningComponent;
  let fixture: ComponentFixture<WorksiteSafetyErpPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorksiteSafetyErpPlanningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksiteSafetyErpPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
