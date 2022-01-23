import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksiteSafetyEquipmentComponent } from './worksite-safety-equipment.component';

describe('WorksiteSafetyEquipmentComponent', () => {
  let component: WorksiteSafetyEquipmentComponent;
  let fixture: ComponentFixture<WorksiteSafetyEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorksiteSafetyEquipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksiteSafetyEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
