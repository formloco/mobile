import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksiteSafetyHazardComponent } from './worksite-safety-hazard.component';

describe('WorksiteSafetyHazardComponent', () => {
  let component: WorksiteSafetyHazardComponent;
  let fixture: ComponentFixture<WorksiteSafetyHazardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorksiteSafetyHazardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksiteSafetyHazardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
