import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionVehicleInspectionComponent } from './action-vehicle-inspection.component';

describe('ActionVehicleInspectionComponent', () => {
  let component: ActionVehicleInspectionComponent;
  let fixture: ComponentFixture<ActionVehicleInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionVehicleInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionVehicleInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
