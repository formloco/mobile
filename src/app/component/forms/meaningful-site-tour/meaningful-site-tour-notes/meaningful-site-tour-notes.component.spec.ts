import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeaningfulSiteTourNotesComponent } from './meaningful-site-tour-notes.component';

describe('MeaningfulSiteTourNotesComponent', () => {
  let component: MeaningfulSiteTourNotesComponent;
  let fixture: ComponentFixture<MeaningfulSiteTourNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeaningfulSiteTourNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeaningfulSiteTourNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
