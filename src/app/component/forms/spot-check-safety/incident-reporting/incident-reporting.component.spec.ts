import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentReportingComponent } from './incident-reporting.component';

describe('IncidentReportingComponent', () => {
  let component: IncidentReportingComponent;
  let fixture: ComponentFixture<IncidentReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentReportingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
