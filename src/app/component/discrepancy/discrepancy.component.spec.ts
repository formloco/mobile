import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscrepancyComponent } from './discrepancy.component';

describe('DiscrepancyComponent', () => {
  let component: DiscrepancyComponent;
  let fixture: ComponentFixture<DiscrepancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscrepancyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscrepancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
