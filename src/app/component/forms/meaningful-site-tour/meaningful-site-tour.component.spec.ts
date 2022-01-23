import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeaningfulSiteTourComponent } from './meaningful-site-tour.component';

describe('MeaningfulSiteTourComponent', () => {
  let component: MeaningfulSiteTourComponent;
  let fixture: ComponentFixture<MeaningfulSiteTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeaningfulSiteTourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeaningfulSiteTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
