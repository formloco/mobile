import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationSignedComponent } from './notification-signed.component';

describe('NotificationSignedComponent', () => {
  let component: NotificationSignedComponent;
  let fixture: ComponentFixture<NotificationSignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationSignedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationSignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
