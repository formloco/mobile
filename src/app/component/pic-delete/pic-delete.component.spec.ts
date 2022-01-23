import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicDeleteComponent } from './pic-delete.component';

describe('PicDeleteComponent', () => {
  let component: PicDeleteComponent;
  let fixture: ComponentFixture<PicDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
