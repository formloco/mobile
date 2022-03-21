import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupBottomComponent } from './signup-bottom.component';

describe('SignupBottomComponent', () => {
  let component: SignupBottomComponent;
  let fixture: ComponentFixture<SignupBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupBottomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
