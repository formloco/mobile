import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetVitalsComponent } from './asset-vitals.component';

describe('AssetVitalsComponent', () => {
  let component: AssetVitalsComponent;
  let fixture: ComponentFixture<AssetVitalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetVitalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetVitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
