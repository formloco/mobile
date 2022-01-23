import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscrepancySpotCheckSafetyComponent } from './discrepancy-spot-check-safety.component';

describe('DiscrepancySpotCheckSafetyComponent', () => {
  let component: DiscrepancySpotCheckSafetyComponent;
  let fixture: ComponentFixture<DiscrepancySpotCheckSafetyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscrepancySpotCheckSafetyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscrepancySpotCheckSafetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
