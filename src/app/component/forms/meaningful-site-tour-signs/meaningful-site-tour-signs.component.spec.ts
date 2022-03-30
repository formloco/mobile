import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeaningfulSiteTourSignsComponent } from './meaningful-site-tour-signs.component';

describe('MeaningfulSiteTourSignsComponent', () => {
  let component: MeaningfulSiteTourSignsComponent;
  let fixture: ComponentFixture<MeaningfulSiteTourSignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeaningfulSiteTourSignsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeaningfulSiteTourSignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
