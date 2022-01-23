import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetYardComponent } from './asset-yard.component';

describe('AssetYardComponent', () => {
  let component: AssetYardComponent;
  let fixture: ComponentFixture<AssetYardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetYardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetYardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
