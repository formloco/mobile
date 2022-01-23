import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksiteSafetyGroundComponent } from './worksite-safety-ground.component';

describe('WorksiteSafetyGroundComponent', () => {
  let component: WorksiteSafetyGroundComponent;
  let fixture: ComponentFixture<WorksiteSafetyGroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorksiteSafetyGroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksiteSafetyGroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
