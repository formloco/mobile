import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksiteSafetyInspectionComponent } from './worksite-safety-inspection.component';

describe('WorksiteSafetyInspectionComponent', () => {
  let component: WorksiteSafetyInspectionComponent;
  let fixture: ComponentFixture<WorksiteSafetyInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorksiteSafetyInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksiteSafetyInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
