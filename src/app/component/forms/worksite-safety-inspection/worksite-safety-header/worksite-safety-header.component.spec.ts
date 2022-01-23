import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksiteSafetyHeaderComponent } from './worksite-safety-header.component';

describe('WorksiteSafetyHeaderComponent', () => {
  let component: WorksiteSafetyHeaderComponent;
  let fixture: ComponentFixture<WorksiteSafetyHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorksiteSafetyHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksiteSafetyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
