import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetWorksiteSafetyInspectionComponent } from './bottom-sheet-worksite-safety-inspection.component';

describe('BottomSheetWorksiteSafetyInspectionComponent', () => {
  let component: BottomSheetWorksiteSafetyInspectionComponent;
  let fixture: ComponentFixture<BottomSheetWorksiteSafetyInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomSheetWorksiteSafetyInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSheetWorksiteSafetyInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
