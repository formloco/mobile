import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionWorksiteSafetyInspectionComponent } from './action-worksite-safety-inspection.component';

describe('ActionWorksiteSafetyInspectionComponent', () => {
  let component: ActionWorksiteSafetyInspectionComponent;
  let fixture: ComponentFixture<ActionWorksiteSafetyInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionWorksiteSafetyInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionWorksiteSafetyInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
