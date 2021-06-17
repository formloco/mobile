import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireExtinguisherJobDetailsComponent } from './fire-extinguisher-job-details.component';

describe('FireExtinguisherJobDetailsComponent', () => {
  let component: FireExtinguisherJobDetailsComponent;
  let fixture: ComponentFixture<FireExtinguisherJobDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FireExtinguisherJobDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FireExtinguisherJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
