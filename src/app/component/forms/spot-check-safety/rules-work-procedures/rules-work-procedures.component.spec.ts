import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesWorkProceduresComponent } from './rules-work-procedures.component';

describe('RulesWorkProceduresComponent', () => {
  let component: RulesWorkProceduresComponent;
  let fixture: ComponentFixture<RulesWorkProceduresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulesWorkProceduresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesWorkProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
