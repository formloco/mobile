import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KioskeComponent } from './kioske.component';

describe('KioskeComponent', () => {
  let component: KioskeComponent;
  let fixture: ComponentFixture<KioskeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KioskeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KioskeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
