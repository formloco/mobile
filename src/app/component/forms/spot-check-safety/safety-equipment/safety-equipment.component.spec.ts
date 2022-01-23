import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyEquipmentComponent } from './safety-equipment.component';

describe('SafetyEquipmentComponent', () => {
  let component: SafetyEquipmentComponent;
  let fixture: ComponentFixture<SafetyEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyEquipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetyEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
