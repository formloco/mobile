import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalProtectiveEquipmentComponent } from './personal-protective-equipment.component';

describe('PersonalProtectiveEquipmentComponent', () => {
  let component: PersonalProtectiveEquipmentComponent;
  let fixture: ComponentFixture<PersonalProtectiveEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalProtectiveEquipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalProtectiveEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
