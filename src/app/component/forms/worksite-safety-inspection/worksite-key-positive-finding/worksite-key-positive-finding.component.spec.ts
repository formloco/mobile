import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksiteKeyPositiveFindingComponent } from './worksite-key-positive-finding.component';

describe('WorksiteKeyPositiveFindingComponent', () => {
  let component: WorksiteKeyPositiveFindingComponent;
  let fixture: ComponentFixture<WorksiteKeyPositiveFindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorksiteKeyPositiveFindingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksiteKeyPositiveFindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
