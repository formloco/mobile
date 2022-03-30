import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeaningfulSiteTourTodoComponent } from './meaningful-site-tour-todo.component';

describe('MeaningfulSiteTourTodoComponent', () => {
  let component: MeaningfulSiteTourTodoComponent;
  let fixture: ComponentFixture<MeaningfulSiteTourTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeaningfulSiteTourTodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeaningfulSiteTourTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
