import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotCheckSafetyHeaderComponent } from './spot-check-safety-header.component';

describe('SpotCheckSafetyHeaderComponent', () => {
  let component: SpotCheckSafetyHeaderComponent;
  let fixture: ComponentFixture<SpotCheckSafetyHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotCheckSafetyHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotCheckSafetyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
