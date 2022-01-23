import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotCheckSafetyComponent } from './spot-check-safety.component';

describe('SpotCheckSafetyComponent', () => {
  let component: SpotCheckSafetyComponent;
  let fixture: ComponentFixture<SpotCheckSafetyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotCheckSafetyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotCheckSafetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
