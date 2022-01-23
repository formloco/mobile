import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationTrainingComponent } from './communication-training.component';

describe('CommunicationTrainingComponent', () => {
  let component: CommunicationTrainingComponent;
  let fixture: ComponentFixture<CommunicationTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunicationTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
