import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescrepancyComponent } from './discrepancy.component';

describe('DescrepancyComponent', () => {
  let component: DescrepancyComponent;
  let fixture: ComponentFixture<DescrepancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescrepancyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescrepancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
