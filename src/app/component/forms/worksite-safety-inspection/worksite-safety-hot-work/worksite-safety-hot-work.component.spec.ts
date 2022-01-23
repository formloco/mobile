import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksiteSafetyHotWorkComponent } from './worksite-safety-hot-work.component';

describe('WorksiteSafetyHotWorkComponent', () => {
  let component: WorksiteSafetyHotWorkComponent;
  let fixture: ComponentFixture<WorksiteSafetyHotWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorksiteSafetyHotWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksiteSafetyHotWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
