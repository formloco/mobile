import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionMeaningfulSiteTourComponent } from './action-meaningful-site-tour.component';

describe('ActionMeaningfulSiteTourComponent', () => {
  let component: ActionMeaningfulSiteTourComponent;
  let fixture: ComponentFixture<ActionMeaningfulSiteTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionMeaningfulSiteTourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionMeaningfulSiteTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
