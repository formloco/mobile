import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationOpenComponent } from './notification-open.component';

describe('NotificationOpenComponent', () => {
  let component: NotificationOpenComponent;
  let fixture: ComponentFixture<NotificationOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationOpenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
