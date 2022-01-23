import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksiteSafetyDiscrepancyComponent } from './worksite-safety-discrepancy.component';

describe('WorksiteSafetyDiscrepancyComponent', () => {
  let component: WorksiteSafetyDiscrepancyComponent;
  let fixture: ComponentFixture<WorksiteSafetyDiscrepancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorksiteSafetyDiscrepancyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksiteSafetyDiscrepancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
