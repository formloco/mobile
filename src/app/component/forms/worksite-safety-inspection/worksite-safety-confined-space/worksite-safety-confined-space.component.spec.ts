import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksiteSafetyConfinedSpaceComponent } from './worksite-safety-confined-space.component';

describe('WorksiteSafetyConfinedSpaceComponent', () => {
  let component: WorksiteSafetyConfinedSpaceComponent;
  let fixture: ComponentFixture<WorksiteSafetyConfinedSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorksiteSafetyConfinedSpaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksiteSafetyConfinedSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
