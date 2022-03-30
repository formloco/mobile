import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeaningfulSiteTourSuggestionsComponent } from './meaningful-site-tour-suggestions.component';

describe('MeaningfulSiteTourSuggestionsComponent', () => {
  let component: MeaningfulSiteTourSuggestionsComponent;
  let fixture: ComponentFixture<MeaningfulSiteTourSuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeaningfulSiteTourSuggestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeaningfulSiteTourSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
