import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksiteSafetyCommentsComponent } from './worksite-safety-comments.component';

describe('WorksiteSafetyCommentsComponent', () => {
  let component: WorksiteSafetyCommentsComponent;
  let fixture: ComponentFixture<WorksiteSafetyCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorksiteSafetyCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksiteSafetyCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
