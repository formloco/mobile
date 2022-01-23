import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeaningfulSiteTourHeaderComponent } from './meaningful-site-tour-header.component';

describe('MeaningfulSiteTourHeaderComponent', () => {
  let component: MeaningfulSiteTourHeaderComponent;
  let fixture: ComponentFixture<MeaningfulSiteTourHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeaningfulSiteTourHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeaningfulSiteTourHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
