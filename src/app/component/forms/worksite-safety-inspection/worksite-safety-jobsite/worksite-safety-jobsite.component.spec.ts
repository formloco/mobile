import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksiteSafetyJobsiteComponent } from './worksite-safety-jobsite.component';

describe('WorksiteSafetyJobsiteComponent', () => {
  let component: WorksiteSafetyJobsiteComponent;
  let fixture: ComponentFixture<WorksiteSafetyJobsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorksiteSafetyJobsiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksiteSafetyJobsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
