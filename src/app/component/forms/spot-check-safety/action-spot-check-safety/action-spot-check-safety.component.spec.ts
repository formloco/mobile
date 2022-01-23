import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionSpotCheckSafetyComponent } from './action-spot-check-safety.component';

describe('ActionSpotCheckSafetyComponent', () => {
  let component: ActionSpotCheckSafetyComponent;
  let fixture: ComponentFixture<ActionSpotCheckSafetyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionSpotCheckSafetyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionSpotCheckSafetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
