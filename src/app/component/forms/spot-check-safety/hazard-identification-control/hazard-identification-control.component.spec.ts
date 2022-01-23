import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HazardIdentificationControlComponent } from './hazard-identification-control.component';

describe('HazardIdentificationControlComponent', () => {
  let component: HazardIdentificationControlComponent;
  let fixture: ComponentFixture<HazardIdentificationControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HazardIdentificationControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HazardIdentificationControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
