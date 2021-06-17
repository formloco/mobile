import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscrepancyDetailComponent } from './discrepancy-detail.component';

describe('DiscrepancyDetailComponent', () => {
  let component: DiscrepancyDetailComponent;
  let fixture: ComponentFixture<DiscrepancyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscrepancyDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscrepancyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
