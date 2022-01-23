import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksiteFireExtinguisherComponent } from './worksite-fire-extinguisher.component';

describe('WorksiteFireExtinguisherComponent', () => {
  let component: WorksiteFireExtinguisherComponent;
  let fixture: ComponentFixture<WorksiteFireExtinguisherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorksiteFireExtinguisherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksiteFireExtinguisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
