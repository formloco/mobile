import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireExtinguisherCompanyComponent } from './fire-extinguisher-company.component';

describe('FireExtinguisherCompanyComponent', () => {
  let component: FireExtinguisherCompanyComponent;
  let fixture: ComponentFixture<FireExtinguisherCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FireExtinguisherCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FireExtinguisherCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
